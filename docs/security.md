---
slug: /security
title: Security model
sidebar_label: Security
---

# Security model

AuraNode is designed around a simple principle: **there is nothing central to steal, and the
agent runs with the least privilege possible.**

## Agent‑first, no stored credentials

- AuraNode never asks for, stores, or uses your **SSH keys**. There is no SSH in the flow at
  all.
- The agent connects **outbound** from each server, so there are no inbound ports and your
  server IP is never exposed directly (Cloudflare sits at the edge).
- Identity is a rotatable **agent token**; the backend accepts a single live connection per
  agent.

## Least privilege on the host

- The agent runs as a dedicated **unprivileged** system user with `NoNewPrivileges`,
  `ProtectSystem=strict`, an empty capability set, and a read‑only filesystem except its own
  data/log directories.
- Remote exec and the web terminal run as that same unprivileged user — no escalation.
- [Privileged mode](/agent/privileged) is opt‑in, bounded to a validated whitelist (no
  shell), and audited. It is never unrestricted root.

## Tenant isolation

- The backend enforces strict per‑tenant isolation with PostgreSQL **row‑level security**,
  **fail‑closed**: access is denied by default unless explicitly granted.

## In transit & at the edge

- All traffic between agents, backend and panel runs over **TLS / encrypted WebSocket**.
- Cloudflare provides DDoS protection (L3/L4/L7) at the edge.

## Auditability

- Terminal sessions are recorded and key actions are logged for traceability.
- The **agent and CLI are open source** — you can read every line before installing:
  [auranode-agent](https://github.com/koyere/auranode-agent) ·
  [auranode-cli](https://github.com/koyere/auranode-cli).

## Responsible disclosure

Found a vulnerability? We welcome responsible disclosure and operate a safe‑harbor policy for
good‑faith research. Email **security@auranode.app**.
