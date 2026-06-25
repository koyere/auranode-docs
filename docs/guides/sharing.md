---
slug: /guides/sharing
title: Sharing servers
sidebar_label: Sharing
---

# Sharing servers

You can share an individual server with another AuraNode account — useful for contractors,
clients or cross‑team collaboration — without giving them access to the rest of your fleet.

## Permissions

| Permission | Allows |
| --- | --- |
| **Read‑only** | View metrics, logs and the file manager (read). |
| **Operator** | Everything in read‑only, plus remote exec, file writes and the web terminal. |

## How it works

- Only the **owner** of the server's account can share it, and there is no re‑sharing.
- The invited user sees the server in a separate **"Shared with me"** list — they stay in
  their own account; nothing changes tenants.
- A shared server **counts toward the guest's server quota**.
- Infrastructure operations (tunnels, migrations, privileged mode) remain owner‑only by
  design — they're fleet operations, not single‑server actions.

## Requirements

Sharing requires the **Starter** or **Pro** plan. The invited user must already have an
AuraNode account (you share by email).

Manage shares from the server's page in the panel: **Share**, pick the permission, and
revoke at any time.
