#!/usr/bin/env python3
"""GA4 weekly LI→Map attribution report for Quietforge.

Writes JSON artefact to docs/operations/artefacts/ga4-weekly-{YYYY-MM-DD}.json

Requires:
  GOOGLE_APPLICATION_CREDENTIALS (service account with Viewer on 543331587)

Run: npm run ga4:weekly
     python scripts/ga4-weekly-attribution.py
"""

from __future__ import annotations

import importlib.util
import json
import sys
from datetime import date
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
ARTEFACTS = ROOT / "docs" / "operations" / "artefacts"

MAP_FUNNEL_EVENTS = [
    "book_discovery_view",
    "cta_book_map_click",
    "intake_submit",
    "book_payment_start",
    "book_payment_complete",
]


def _load_audit_module():
    path = SCRIPT_DIR / "ga4-api-audit.py"
    spec = importlib.util.spec_from_file_location("ga4_api_audit", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load {path}")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def prior_week_path(today: date) -> Path | None:
    if not ARTEFACTS.is_dir():
        return None
    files = sorted(ARTEFACTS.glob("ga4-weekly-*.json"), reverse=True)
    today_name = f"ga4-weekly-{today.isoformat()}.json"
    for f in files:
        if f.name != today_name:
            return f
    return None


def sum_linkedin_sessions(traffic: dict) -> dict:
    li_sessions = 0
    li_users = 0
    fb_sessions = 0
    direct_sessions = 0
    rows_out = []
    for row in traffic.get("rows", []):
        sm = row["dimensions"][0] if row["dimensions"] else ""
        sessions = int(row["metrics"][0] or 0)
        users = int(row["metrics"][1] or 0) if len(row["metrics"]) > 1 else 0
        rows_out.append({"source_medium": sm, "sessions": sessions, "active_users": users})
        lower = sm.lower()
        if "linkedin" in lower:
            li_sessions += sessions
            li_users += users
        if "facebook" in lower:
            fb_sessions += sessions
        if lower in ("(direct) / (none)", "(direct)/(none)"):
            direct_sessions += sessions
    return {
        "linkedin_sessions_28d": li_sessions,
        "linkedin_active_users_28d": li_users,
        "facebook_sessions_28d": fb_sessions,
        "direct_sessions_28d": direct_sessions,
        "by_source_medium": rows_out,
    }


def map_funnel_counts(canon_events: dict) -> dict:
    counts = {e: 0 for e in MAP_FUNNEL_EVENTS}
    for row in canon_events.get("rows", []):
        name = row["dimensions"][0] if row["dimensions"] else ""
        if name in counts:
            counts[name] = int(row["metrics"][0] or 0)
    return counts


def delta(current: dict, prior: dict | None) -> dict:
    if not prior:
        return {"note": "no_prior_week"}
    cur = current.get("summary", {})
    prev = prior.get("summary", {})
    return {
        "linkedin_sessions_delta": cur.get("linkedin_sessions_28d", 0)
        - prev.get("linkedin_sessions_28d", 0),
        "book_discovery_view_delta": cur.get("map_funnel_28d", {}).get("book_discovery_view", 0)
        - prev.get("map_funnel_28d", {}).get("book_discovery_view", 0),
        "intake_submit_delta": cur.get("map_funnel_28d", {}).get("intake_submit", 0)
        - prev.get("map_funnel_28d", {}).get("intake_submit", 0),
    }


def main() -> None:
    audit = _load_audit_module()
    audit.require_credentials()
    import os

    cred_path = str(audit.CREDENTIALS)
    if not os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
    c = audit.client()
    today = date.today()

    traffic_28d = audit.run_report(
        c, ["sessionSourceMedium"], ["sessions", "activeUsers"], audit.DATE_RANGE_28D, limit=25
    )
    traffic_7d = audit.run_report(
        c, ["sessionSourceMedium"], ["sessions", "activeUsers"], audit.DATE_RANGE_7D, limit=15
    )
    canon_28d = audit.run_report(
        c,
        ["eventName"],
        ["eventCount"],
        audit.DATE_RANGE_28D,
        dimension_filter={
            "filter": {
                "field_name": "eventName",
                "in_list_filter": {"values": audit.CANON_EVENTS, "case_sensitive": True},
            }
        },
        limit=25,
    )
    campaigns = audit.run_report(
        c,
        ["sessionCampaignName", "sessionSourceMedium"],
        ["sessions", "activeUsers"],
        audit.DATE_RANGE_28D,
        limit=30,
    )
    funnel_7d = audit.run_funnel()

    traffic_summary = sum_linkedin_sessions(traffic_28d)
    map_funnel = map_funnel_counts(canon_28d)

    report = {
        "generated": today.isoformat(),
        "property_id": audit.PROPERTY_ID,
        "measurement_id": "G-LY0E7MW0HF",
        "display_name": "Quietforge",
        "domain": "quietforge.flexgrafik.nl",
        "period": "28d rolling + 7d funnel",
        "summary": {
            **traffic_summary,
            "map_funnel_28d": map_funnel,
            "funnel_7d": funnel_7d.get("steps", []),
        },
        "traffic_7d": traffic_7d,
        "campaigns_28d": campaigns,
        "canon_events_28d": canon_28d,
    }

    prior_path = prior_week_path(today)
    if prior_path and prior_path.is_file():
        prior = json.loads(prior_path.read_text(encoding="utf-8"))
        report["delta_vs_prior"] = delta(report, prior)
        report["prior_artefact"] = str(prior_path.relative_to(ROOT)).replace("\\", "/")
    else:
        report["delta_vs_prior"] = {"note": "no_prior_week"}

    out_path = ARTEFACTS / f"ga4-weekly-{today.isoformat()}.json"
    ARTEFACTS.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"wrote: {out_path}")
    print(json.dumps(report["summary"], indent=2))


if __name__ == "__main__":
    main()
