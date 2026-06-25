---
slug: /guides/web-terminal
title: Web terminal
sidebar_label: Web terminal
---

# Web terminal

The web terminal gives you an interactive shell on a server, straight from the panel — over
the agent's encrypted channel, with no SSH and no inbound ports.

## How it works

- The browser opens a WebSocket to the backend, which relays stdin/stdout to the agent. The
  agent runs a **PTY** (`bash`) as its **unprivileged** user — the same hardened identity as
  the rest of the agent, with no escalation.
- Sessions are bounded: an idle timeout, a maximum duration, and **one session per server**
  at a time.
- The full session is **recorded** for audit; you can review transcripts in the panel.

## Access

- Requires the **Pro** plan.
- Available to the server **owner** and to team members with the `owner`, `admin` or
  `developer` role.
- For a [shared server](/guides/sharing), a guest with **operator** permission can open the
  terminal; the recording stays with the owner's account.

Open it from a server's page in the panel, or from **Terminal**. Because the shell runs as
the unprivileged agent user, privileged actions (package installs, service restarts) are not
available here — use [bounded privileged mode](/agent/privileged) for those.
