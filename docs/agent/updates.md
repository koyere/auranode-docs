---
slug: /agent/updates
title: Updating the agent
sidebar_label: Updates
---

# Updating the agent

## Update an installed agent

Re‑run the installer. If no token is provided, it **reuses the token already stored** on
the machine, so you don't need it again:

```bash
curl -fsSL https://get.auranode.app/agent | sudo bash
```

The installer downloads the latest release, verifies its checksum, installs the new binary
and runs `systemctl restart auranode-agent` so the new version is loaded immediately. If
the [privileged helper](/agent/privileged) is installed, it is restarted too.

## Auto‑update policy

The fleet uses a **check‑and‑notify** model: agents detect when a newer release is
available and surface it in the panel, but they **do not auto‑update themselves**. You
stay in control of when binaries change — re‑run the installer to apply an update.

## Releases & integrity

- Releases are published on GitHub at
  [koyere/auranode-agent](https://github.com/koyere/auranode-agent/releases) with
  `linux_amd64` / `arm64` / `armv7` tarballs and a `checksums.txt`.
- The installer always verifies the binary's **SHA‑256** against `checksums.txt` before
  installing. A mismatch aborts the install.
- A Docker image is also published to GHCR for containerized hosts.
