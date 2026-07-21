---
slug: /agent/troubleshooting
title: Troubleshooting connectivity
sidebar_label: Troubleshooting
---

# Troubleshooting connectivity

This page explains what the **Disconnected** state means for a server, why it happens, and
how to diagnose and fix it from your VPS.

## What "Disconnected" means

A server is **Online** while its agent holds a live WebSocket connection to AuraNode. When
that connection drops, the panel shows the server as **Disconnected** until the agent
reconnects. It does **not** mean the server is down or that your data is lost — only that
the control channel is momentarily closed.

## Is a brief disconnect normal?

Yes. The connection can be cut by the network between your server and AuraNode — most
often a NAT, proxy or firewall closing an idle connection. When that happens the agent
reconnects on its own, and the server returns to **Online** automatically.

:::tip Fast reconnection
Agent **v1.12.1** and later reconnect within seconds after a network drop. Older versions
could take up to 5 minutes to come back after a blip. If your servers flap to
**Disconnected** for minutes at a time, [update the agent](/agent/updates).
:::

## See the connection history in the panel

Open the server (**Servers → your server**) and scroll to **Connection history**. Each
connect/disconnect is listed with its timestamp and, for disconnects, the reason reported
by the network (for example `unexpected EOF`). This lets you tell a one‑off blip apart
from a server that never reconnects — without leaving the panel.

## Diagnose from the VPS

If a server stays **Disconnected**, log in to it and check the agent:

```bash
# Is the service running?
sudo systemctl status auranode-agent

# Recent logs (look for "ws: conectado" and "ws: disconnected, reintentando")
sudo journalctl -u auranode-agent -n 50 --no-pager

# Restart the agent (also resets the reconnection backoff)
sudo systemctl restart auranode-agent
```

What to look for in the logs:

- **`ws: conectado`** — the agent reached AuraNode and the connection is up.
- **`ws: disconnected, reintentando`** — the connection dropped and the agent is retrying.
  The `en` field is how long it will wait before the next attempt.
- Repeated retries that never reach `ws: conectado` point to a **network or auth** problem
  rather than a passing blip (see the checklist below).

## If it never reconnects

Work through this checklist on the server:

1. **The service is active.** `systemctl is-active auranode-agent` should print `active`.
   If not, start it with `sudo systemctl start auranode-agent` and read the logs.
2. **Outbound HTTPS is allowed.** The agent connects out to `api.auranode.app` on port
   **443** (WebSocket over TLS). Confirm nothing blocks it:
   ```bash
   curl -fsS https://api.auranode.app/health
   ```
   If this fails, a local firewall or the host provider is blocking outbound 443.
3. **The clock is roughly correct.** A large time skew breaks the TLS handshake. Check with
   `timedatectl` and enable NTP if needed.
4. **The token is still valid.** If the agent's token was rotated or the server was deleted
   from the panel, re‑install the agent to register a fresh token. See
   [Installing the agent](/agent/install).

## Updating the agent

Re‑running the installer reuses the token already stored on the machine, so you don't need
it again:

```bash
curl -fsSL https://get.auranode.app/agent | sudo -E bash
```

See [Updating the agent](/agent/updates) for the full update flow and the check‑and‑notify
policy.
