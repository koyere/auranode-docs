---
slug: /guides/migrations
title: Server-to-server migrations
sidebar_label: Migrations
---

# Server-to-server migrations

Move data and services from one server to another. The transfer runs over the agents'
encrypted channel; nothing transits a public network and you don't expose SSH or rsync.

## Migration types

| Type | Scope |
| --- | --- |
| **Type A — Full system** | Migrate the whole system to a freshly provisioned target. |
| **Type B — Directory** | Migrate a specific directory tree (relay mode). |
| **Type C — Continuous sync** | Keep a directory continuously in sync (delta transfers) — useful for a staged cutover. |

## How it runs

1. **Pre‑checks** — AuraNode verifies both agents are connected, estimates the size on the
   source, and confirms the target has enough free space (with headroom).
2. **Transfer** — data streams source → backend → target over the existing channel, tracked
   by a migration id with a state machine and progress reporting.
3. **Resilience** — if either side drops, the migration moves to an interrupted state and
   can be resumed.

## Plan limits

| Plan | Concurrent migrations |
| --- | --- |
| Free | — |
| Starter | 1 |
| Pro | 3 |

Start a migration from the panel under **Migrations**: pick a source and target, choose the
type and scope, and watch progress live.
