---
slug: /agent/privileged
title: Bounded privileged mode
sidebar_label: Privileged mode
---

# Bounded privileged mode

By default the agent runs **unprivileged** — it cannot install packages, restart services,
or write outside its own directories. That's deliberate.

For teams that want to run a few administrative tasks from the panel, the agent ships an
**optional, opt‑in privileged helper**. It is **not** unrestricted root: it only runs a
fixed whitelist of actions with validated arguments and no shell, and every action is
audited.

:::warning Opt‑in and reversible
Privileged mode is off until you explicitly enable it on the server **and** the account
owner activates it in the panel. You can disable it at any time.
:::

## What it can do

When enabled, the helper allows exactly these actions (nothing else):

- Refresh package indexes — `apt update`
- Upgrade packages — `apt upgrade`
- Install package(s) — `apt install <pkg>`
- Remove orphaned packages — `apt autoremove`
- Service status / start / stop / reload / restart — `systemctl …`

### Guards

- It **cannot manage the agent itself** or stop critical services (`ssh`, `dbus`,
  networking, `journald`, …).
- Arguments are validated; there is no shell, no arbitrary command execution.
- Every action is recorded for audit.

## Enable it

Run the installer with the `--enable-privileged` flag on the server:

```bash
curl -fsSL https://get.auranode.app/agent | sudo bash -s -- --enable-privileged
```

This installs a small root helper as a separate `systemd` unit
(`auranode-agent-helper`) and restarts the agent so it reports "available" to the panel.

**Last step:** in the panel, the account **owner** must *activate* privileged mode for that
server (with a confirmation dialog). Until then, the helper is installed but inactive.

:::note Requires a recent agent
The helper requires an agent that advertises `privileged-capable` (v1.5.0+). If your agent
is older, update it first ([Updating the agent](/agent/updates)).
:::

## Disable it

```bash
curl -fsSL https://get.auranode.app/agent | sudo bash -s -- --disable-privileged
```

This stops and removes the root helper unit and restarts the agent.
