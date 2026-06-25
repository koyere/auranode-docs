---
slug: /agent/install
title: Install the agent
sidebar_label: Install
---

# Install the agent

You need a server token. In the panel, go to **Servers → Add server**; you'll get a
one‑time token that looks like `ant_…`.

## One‑line install

Run this on the server, as root:

```bash
curl -fsSL https://get.auranode.app/agent | AURANODE_TOKEN=ant_xxx sudo -E bash
```

The installer:

1. Detects your architecture (`amd64` / `arm64` / `armv7`).
2. Resolves the **latest** release and downloads the matching tarball from GitHub.
3. **Verifies the binary's SHA‑256** against the release's `checksums.txt` (the install
   aborts if it doesn't match).
4. Creates the `auranode` system user, the config/data/log directories, and a hardened
   `systemd` service.
5. Enables and starts the service.

The server should appear in your panel within a few seconds.

:::note Why `sudo -E`
`-E` preserves the `AURANODE_TOKEN` environment variable through `sudo`. Without it the
installer can't read the token.
:::

## What gets installed

| Path | Purpose |
| --- | --- |
| `/usr/local/bin/auranode-agent` | The agent binary |
| `/etc/auranode/agent.env` | Token + backend URL (mode `600`, owner `root:auranode`) |
| `/var/lib/auranode/` | Local buffer database |
| `/var/log/auranode/` | Agent logs |
| `/etc/systemd/system/auranode-agent.service` | The service unit |

## Pinning a version

By default the installer picks the latest release. To install a specific version:

```bash
curl -fsSL https://get.auranode.app/agent | \
  AURANODE_TOKEN=ant_xxx AURANODE_AGENT_VERSION=v1.8.0 sudo -E bash
```

## Verify it's running

```bash
systemctl status auranode-agent
journalctl -u auranode-agent -f
```

## Uninstall

```bash
sudo systemctl disable --now auranode-agent
sudo rm -f /usr/local/bin/auranode-agent /etc/systemd/system/auranode-agent.service
sudo rm -rf /etc/auranode /var/lib/auranode /var/log/auranode
sudo userdel auranode
```

Then remove the server from your panel.

## Next

- [Updating the agent](/agent/updates)
- [The systemd service](/agent/service)
- [Bounded privileged mode](/agent/privileged)
