---
slug: /api
title: REST API
sidebar_label: REST API
---

# REST API

The same REST API that powers the panel is available for integrations and automation. For
most scripting needs the [CLI](/cli) is the easiest entry point, since it handles auth and
output formatting for you.

## Base URL

```
https://api.auranode.app/api/v1
```

## Authentication

Authenticated endpoints expect a **bearer token**:

```bash
curl https://api.auranode.app/api/v1/billing/plans \
  -H "Authorization: Bearer $AURANODE_TOKEN"
```

Obtain a token via the CLI (`auranode auth token`) or the panel. Requests are scoped to your
tenant and enforced with row‑level security on the backend.

## Public endpoints

A few endpoints are unauthenticated, used by the public website:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Liveness/health check. |
| `GET` | `/public/plans?lng=en` | Plan catalog: prices, trial days and localized feature lists. |

```bash
curl "https://api.auranode.app/api/v1/public/plans?lng=en"
```

```json
{
  "plans": [
    { "plan": "free", "name": "Free", "monthly_cents": 0, "annual_cents": 0,
      "features": ["Up to 10 servers with real-time monitoring", "..."],
      "features_intro": "Includes:" }
  ],
  "trial_days": 14
}
```

## Conventions

- Responses are JSON.
- Errors use a stable shape: `{ "error": "CODE", "message": "..." }` with an appropriate HTTP
  status (`401` unauthenticated, `403` forbidden / plan required, `404` not found, `409`
  conflict, `429` rate‑limited).
- Endpoints are rate‑limited per client.

:::note
The authenticated surface (servers, metrics, logs, exec, tunnels, migrations, AI, billing,
team/SSO) mirrors what the panel and CLI use. If you need a specific endpoint documented
here, reach out at **support@auranode.app**.
:::
