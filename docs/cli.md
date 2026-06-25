---
slug: /cli
title: Command-line interface (CLI)
sidebar_label: CLI
---

# Command-line interface (CLI)

The `auranode` CLI drives your fleet from a terminal — list servers, run commands, open
tunnels, and script AuraNode into CI/CD. It is open source:
[koyere/auranode-cli](https://github.com/koyere/auranode-cli).

## Install

```bash
# Verifies the binary's SHA-256 and installs the latest release
curl -fsSL https://raw.githubusercontent.com/koyere/auranode-cli/main/install.sh | bash
```

Or with Go:

```bash
go install github.com/koyere/auranode-cli@latest
```

## Authenticate

```bash
auranode auth login        # interactive (prompts for credentials; --totp for 2FA)
auranode auth status       # show the current session / profile
auranode auth token        # print the access token
auranode auth logout
```

:::note Non-interactive / CI
`auth login` needs a TTY. In CI or scripts, set a token in the environment instead:

```bash
export AURANODE_TOKEN=...
auranode servers list
```
:::

## Common commands

```bash
# Servers
auranode servers list
auranode servers show <name|id>

# Run a command on a server
auranode exec <name|id> "systemctl status nginx"

# Live status overview
auranode status
```

## Tunnels

```bash
auranode tunnel list
auranode tunnel open <name|id>                       # local forward (Type 1)
auranode tunnel expose <name|id> [--to host:port]    # expose a local service
auranode tunnel create --reverse --vps-port <N> --to host:port
auranode tunnel rm <name|id>
```

See [Tunnels](/guides/tunnels) for the full model (local, reverse, server‑to‑server).

## Configuration

The CLI reads configuration from environment variables and a local profile:

| Variable | Purpose |
| --- | --- |
| `AURANODE_TOKEN` | Access token for non‑interactive use (CI). |
| `AURANODE_API_URL` | Override the API base URL (defaults to `https://api.auranode.app`). |

```bash
auranode config set api-url https://api.auranode.app
auranode config set format json     # machine-readable output
auranode version
```
