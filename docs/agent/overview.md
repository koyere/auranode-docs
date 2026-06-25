---
slug: /agent
title: How the agent works
sidebar_label: Overview
---

# How the agent works

The AuraNode agent is a single, statically‑linked Go binary. It is the only thing you
install on your servers.

## Connection model

- The agent opens **one outbound WebSocket** to `wss://api.auranode.app/ws/agent` and keeps
  it alive with heartbeats. All traffic (metrics, logs, command results, terminal, tunnels)
  is multiplexed over that one encrypted connection.
- Nothing connects **to** your server. There are no inbound ports, and you never expose
  your IP directly — AuraNode sits behind Cloudflare.
- Identity is the **agent token** (`ant_…`). One token maps to one server; the backend
  accepts a single live connection per agent and closes any stale one.

There is **no SSH** anywhere in the flow — the agent does not use SSH inbound or outbound.

## Platforms

The agent runs on **Linux** only, for these architectures:

| Architecture | `uname -m` | Release asset |
| --- | --- | --- |
| x86‑64 | `x86_64` | `..._linux_amd64.tar.gz` |
| ARM64 | `aarch64` / `arm64` | `..._linux_arm64.tar.gz` |
| ARMv7 | `armv7l` | `..._linux_armv7.tar.gz` |

There is currently no agent for Windows or macOS.

## What it does

- **Metrics** — CPU, RAM, disk, load, network, sampled and streamed in real time.
  Pseudo‑filesystems (squashfs/snap, tmpfs, overlay, `/proc`, `/sys`…) are excluded so a
  read‑only snap mount never shows up as "disk full".
- **Logs** — collected from the systemd journal (read‑only access only). The agent's own
  units are filtered out so they don't show up as incidents.
- **Remote exec** — runs commands as the agent's **unprivileged** user (not root).
- **Web terminal** — an interactive PTY as the agent user (see [Web terminal](/guides/web-terminal)).
- **Tunnels & migrations** — see [Tunnels](/guides/tunnels) and [Migrations](/guides/migrations).
- **Local buffering** — metrics/logs are buffered to a small embedded database so nothing
  is lost across brief disconnects.

## Hardening

The systemd unit ships locked down by default:

- `User=auranode` (dedicated system user, `nologin` shell)
- `NoNewPrivileges=yes`, `ProtectSystem=strict`, `ProtectHome=yes`, `PrivateTmp=yes`
- Empty `CapabilityBoundingSet` / `AmbientCapabilities`
- Resource caps (`MemoryMax`, `CPUQuota`)
- Read‑only journal access via `SupplementaryGroups=systemd-journal`

See [the systemd service](/agent/service) for the full unit and file layout.
