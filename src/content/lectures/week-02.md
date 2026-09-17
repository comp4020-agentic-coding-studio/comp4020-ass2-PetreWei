---
title: A non-idempotent retry is a hidden bug
description: "Why a timeout cannot tell a client whether the write already happened, and what an idempotency key actually guarantees."
week: 2
date: 2027-03-01
teachers:
  - idris-fenn
slides: /decks/week-02/
related:
  - sessions/02-charging-twice-on-purpose
image: ./week-02.avif
imageAlt: A rubber stamp striking the same receipt twice, the second impression landing just off the first
---

A timeout tells you that no response arrived. It does not tell you whether the server committed the write and lost the reply, and there is no field to check for that, because there is no response. An idempotency key moves the question to the server: the client generates one key per logical operation, the server stores it alongside the charge in the same transaction, and a second request carrying the same key returns the first result instead of charging again. The guarantee is exactly one effect per key, and nothing more. The timeout still happens, effects outside your database are not covered, and the whole thing depends on the client reusing the key on the retry rather than generating a fresh one.

## Outline

- why a timeout does not tell you whether the write happened
- idempotency keys, and what they actually guarantee
- the first review: bring the double charge and the fix
