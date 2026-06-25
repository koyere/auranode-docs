---
slug: /guides/tunnels
title: Tunnels & port forwarding
sidebar_label: Tunnels
---

# Tunnels & port forwarding

AuraNode tunnels carry TCP traffic over the agent's existing **encrypted, outbound**
channel — there are no public ports to open on your servers and no IPs to expose.

## Types

| Type | What it does |
| --- | --- |
| **Local** | Forward a port from your machine (or the CLI) to a service on a server. Reach a database or admin UI that only listens on `localhost`, without exposing it. |
| **Reverse** | Open a port on a server that forwards to a service elsewhere (e.g. your laptop). The public port lives on the source server. |
| **Server‑to‑server** | Forward a port from one server directly to a service on another, privately over the agents' channel (loopback on the source). No public exposure. |

## Plan limits

| Plan | Tunnels |
| --- | --- |
| Free | None |
| Starter | Local forwarding, up to 3 concurrent |
| Pro | All types (reverse and server‑to‑server), unlimited |

## From the CLI

```bash
# Local forward to a service on a server
auranode tunnel open <name|id>

# Expose a local service
auranode tunnel expose <name|id> [--to host:port]

# Reverse tunnel: open a public port on the source server → your service
auranode tunnel create --reverse --vps-port <N> --to host:port [--bind]
```

:::warning Reverse tunnels open a public port
A reverse tunnel opens a listening port on the **source server**. Using `0.0.0.0`
(`--bind`) exposes it to the internet — configure that server's firewall accordingly.
By default the bind stays on loopback (private).
:::

You can also create and manage tunnels from the panel under **Tunnels**.
