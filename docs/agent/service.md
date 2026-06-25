---
slug: /agent/service
title: The systemd service
sidebar_label: Service & files
---

# The systemd service

The agent runs as a hardened `systemd` service named `auranode-agent`.

## Managing the service

```bash
systemctl status auranode-agent      # current state
systemctl restart auranode-agent     # restart
systemctl stop auranode-agent        # stop
journalctl -u auranode-agent -f      # follow logs
```

## The unit

The installer writes `/etc/systemd/system/auranode-agent.service` roughly like this:

```ini
[Unit]
Description=AuraNode Agent
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=auranode
Group=auranode
EnvironmentFile=/etc/auranode/agent.env
ExecStart=/usr/local/bin/auranode-agent
Restart=on-failure
RestartSec=10s

# Read-only journal access for log collection (no privilege escalation)
SupplementaryGroups=systemd-journal

# Hardening
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ReadWritePaths=/var/lib/auranode /var/log/auranode
ProtectHome=yes
CapabilityBoundingSet=
AmbientCapabilities=

# Resources
MemoryMax=256M
CPUQuota=20%

[Install]
WantedBy=multi-user.target
```

Key points:

- **Unprivileged user.** The agent runs as `auranode`, never as root.
- **Read‑only system.** `ProtectSystem=strict` makes the whole filesystem read‑only except
  the explicit `ReadWritePaths` (its data and log directories).
- **No new privileges / no capabilities.** It cannot escalate.
- **Journal read access** is granted via the `systemd-journal` group so it can collect
  system logs — this grants read only, never root.

## Configuration file

`/etc/auranode/agent.env` (mode `600`, owner `root:auranode`):

```bash
AURANODE_TOKEN=ant_xxx
AURANODE_BACKEND_URL=wss://api.auranode.app/ws/agent
AURANODE_DB_PATH=/var/lib/auranode/buffer.db
```

The token is readable by root and the `auranode` group only. You normally never edit this
file by hand — the installer manages it, and reuses the stored token on updates.
