package marketing.guardrails

# =============================================================================
# MARKETING GUARDRAILS — Policy-as-Code for Economic Viability
# =============================================================================
# Evaluates every marketing proposal before Commander approval.
# Input: JSON with estimated_reach, target_cpa, product_price, gross_margin
# Output: allow (boolean) + error_message (string)
# Rule: target_cpa MUST be < 40% of gross_margin
# =============================================================================

default allow := false
default error_message := ""

# -----------------------------------------------------------------------------
# PRIMARY ECONOMIC GUARDRAIL
# -----------------------------------------------------------------------------
# target_cpa < (0.40 * gross_margin)
# 
# Rationale: 
# - Gross margin on Automation Map (€290) = ~60% after delivery cost
# - Gross margin on Builds (€2,400–€12,000) = ~60-70%
# - Max 40% of margin to CPA leaves 60% for profit/reinvestment
# - If CPA >= 40% margin, the campaign is economically irrational
# -----------------------------------------------------------------------------

allow := true {
    input.target_cpa < (0.40 * input.gross_margin)
}

# -----------------------------------------------------------------------------
# ERROR MESSAGES (Human-readable, Commander-facing)
# -----------------------------------------------------------------------------

error_message := msg {
    not allow
    margin_40 := 0.40 * input.gross_margin
    msg := sprintf(
        "ECONOMIC VIOLATION: target_cpa €%.2f >= 40%% gross_margin (€%.2f). Campaign would lose money. Reduce CPA target or increase product price/margin. Abort.",
        [input.target_cpa, margin_40]
    )
}

# -----------------------------------------------------------------------------
# ADDITIONAL GUARDRAILS (Warnings — don't block, but flag)
# -----------------------------------------------------------------------------

# Warning: Estimated reach too low for statistical significance
warning_low_reach := true {
    input.estimated_reach < 1000
}

warning_low_reach_msg := "WARNING: Estimated reach < 1,000. Results may not be statistically significant. Consider broader targeting or longer timebox."

# Warning: Product price below Automation Map minimum
warning_low_price := true {
    input.product_price < 290
}

warning_low_price_msg := "WARNING: Product price < €290 (Automation Map floor). Verify this is a qualified lead path, not a 'free call' trap."

# Warning: Gross margin suspiciously high (data quality check)
warning_high_margin := true {
    input.gross_margin > 0.85
}

warning_high_margin_msg := "WARNING: Gross margin > 85%% seems inflated. Verify delivery costs are included. Commander must confirm."

# -----------------------------------------------------------------------------
# COMPOSITE OUTPUT
# -----------------------------------------------------------------------------

# Full evaluation result for logging
result := {
    "allow": allow,
    "error": error_message,
    "warnings": warnings,
    "input_echo": input,
    "calculated": {
        "max_allowed_cpa": 0.40 * input.gross_margin,
        "margin_40_pct": 0.40 * input.gross_margin,
        "cpa_to_margin_ratio": input.target_cpa / input.gross_margin
    }
}

warnings := warning_msgs {
    warning_msgs := []
    warning_msgs := array.concat(warning_msgs, [warning_low_reach_msg]) { warning_low_reach }
    warning_msgs := array.concat(warning_msgs, [warning_low_price_msg]) { warning_low_price }
    warning_msgs := array.concat(warning_msgs, [warning_high_margin_msg]) { warning_high_margin }
}

# -----------------------------------------------------------------------------
# TEST CASES (for verification)
# -----------------------------------------------------------------------------
# Run: opa test content-engine/opa-policies/marketing_guardrails.rego

test_allow_valid_campaign {
    allow with input as {"estimated_reach": 5000, "target_cpa": 50, "product_price": 290, "gross_margin": 0.60}
}

test_deny_cpa_too_high {
    not allow with input as {"estimated_reach": 5000, "target_cpa": 150, "product_price": 290, "gross_margin": 0.60}
}

test_deny_exact_boundary {
    not allow with input as {"estimated_reach": 5000, "target_cpa": 0.24, "product_price": 290, "gross_margin": 0.60}
}

test_allow_high_margin_product {
    allow with input as {"estimated_reach": 2000, "target_cpa": 200, "product_price": 5000, "gross_margin": 0.65}
}

test_warning_low_reach {
    warning_low_reach with input as {"estimated_reach": 500, "target_cpa": 50, "product_price": 290, "gross_margin": 0.60}
}

test_warning_low_price {
    warning_low_price with input as {"estimated_reach": 5000, "target_cpa": 50, "product_price": 199, "gross_margin": 0.60}
}

test_warning_high_margin {
    warning_high_margin with input as {"estimated_reach": 5000, "target_cpa": 50, "product_price": 290, "gross_margin": 0.90}
}