---
slug: /guides/ai
title: AI insights
sidebar_label: AI
---

# AI insights

AuraNode includes an AI layer that reasons over **your servers' real context** — metrics,
logs and recent events — rather than generic answers.

## Capabilities

- **Contextual chat** — ask about a specific server; the assistant sees its live metrics and
  recent logs.
- **Diagnostics** — point the AI at a server (and optionally a service) for a focused
  analysis of what's wrong.
- **Daily summary** — an automatic, scheduled summary of your fleet, delivered in the panel
  and by email.
- **Anomaly detection** — statistical baselines flag unusual behavior; the AI explains the
  likely cause, and high‑severity anomalies trigger an email.

## Provider‑agnostic

The AI gateway is provider‑agnostic. You configure your own provider and API key, so you
stay in control of cost and data:

- **OpenAI**
- **DeepSeek**
- **Anthropic**
- **Custom / OpenAI‑compatible** endpoints (e.g. self‑hosted, Groq, Ollama)

Configure the provider, model and key in the panel under **AI → Settings**. The system
prompt is owned by AuraNode; your key is stored encrypted and configuration changes are
audited.

## Plan limits

AI usage is metered per plan (chat messages per month, diagnostics per day, summaries per
day). Free includes a small allowance; Starter raises the limits; Pro is effectively
unlimited. See the current limits on the [pricing page](https://auranode.app/en/pricing).
