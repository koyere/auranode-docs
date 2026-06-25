---
slug: /
title: Getting started
sidebar_label: Getting started
sidebar_position: 1
---

# AuraNode

AuraNode is a control plane for your whole fleet of servers. You install a small
**agent** on each machine and operate everything from one panel: live metrics, logs,
remote command execution, a web terminal, secure tunnels, server‑to‑server migrations
and AI insights.

It works with **any Linux server** — a VPS, a dedicated/bare‑metal box, a cloud instance
or a machine behind NAT. The agent connects **outbound** to AuraNode, so there are **no
inbound ports to open and no SSH credentials to hand over**.

## How it works

1. **Create an account** at [panel.auranode.app](https://panel.auranode.app) and add a
   server. You get an install command with a one‑time agent token.
2. **Install the agent** (one command). It registers, then keeps a single outbound
   WebSocket connection to `api.auranode.app`.
3. **Operate from the panel** — metrics and logs stream in; you can run commands, open a
   web terminal, create tunnels, migrate data between servers, and ask the AI about your
   infrastructure.

```bash
# On the server (replace the token with the one from your panel):
curl -fsSL https://get.auranode.app/agent | AURANODE_TOKEN=ant_xxx sudo -E bash
```

The server appears in your panel within a few seconds.

## Why agent‑first

- **No SSH honeypot.** AuraNode never asks for, stores, or uses your SSH keys. The agent
  is the channel; it dials out over TLS.
- **Runs unprivileged.** The agent runs as a dedicated system user with no root access and
  a read‑only filesystem (`NoNewPrivileges`, `ProtectSystem=strict`). An optional,
  bounded [privileged mode](/agent/privileged) can be enabled per server for specific
  tasks — it is never unrestricted root.
- **Works behind NAT/firewalls.** Because the connection is outbound, you don't need port
  forwarding or a public IP on the server.

## Next steps

- [Install the agent](/agent/install)
- [How the agent works](/agent)
- [Command‑line interface (CLI)](/cli)
- [Security model](/security)

:::tip Open source
The agent and CLI are open source — audit every line before installing:
[auranode-agent](https://github.com/koyere/auranode-agent) ·
[auranode-cli](https://github.com/koyere/auranode-cli).
:::
