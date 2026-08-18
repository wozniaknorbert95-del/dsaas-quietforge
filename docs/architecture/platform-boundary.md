# Platform boundary

`dsaas-quietforge` is the active test tenant. It owns the QuietForge website, copy,
case studies, intake, brand profile, goals, KPI definitions and environment bindings.

Generic DSaaS behavior belongs to `dsaas-platform-main`:

- decision and policy evaluation;
- lifecycle and evidence ledgers;
- virtual employee runtimes;
- durable execution;
- Kokpit, Maszynownia and KODA contracts;
- reusable Growth OS templates.

The tenant consumes a platform projection through
`src/lib/platform/PlatformGrowthClient.ts`. The client is read-only and refuses
cross-tenant responses. If the platform is unavailable, the tenant reports that
state and executes no synthetic fallback.

The former local NOOA runtime and `quietforge-growth-os` engine were removed from
the active tree during consolidation. Their full history remains recoverable from
Git and the local consolidation archive. Tenant-specific configuration now lives
under `tenant-config/`.
