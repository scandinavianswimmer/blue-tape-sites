# LTRLA Agent Operating Model

How AI agents at LTRLA are organized so the company actually *moves*, not just *plans*.

This document is LTRLA-wide. Blue Tape Sites is the first venture it's being applied to; the model is intended to be lifted to any future LTRLA business with minimal change.

---

## The problem we are correcting

Today our agents are *consultants*. They produce excellent research, briefs, strategy memos, and "handoff packages." But almost nothing ships. The repo has 40+ research and brief documents and a `todo.md` where most open items are still "produce a ranked list," "prepare submission-ready copy," "research real named contacts" — more preparation.

The board never moves because every move is mistaken for a deliverable when it is only a description of a move.

We are also doing the opposite of what we want at the human interface:
- Agents *should* do the things that don't need the CEO — and most do not.
- Agents *should* route only the things that genuinely need the CEO into a clean queue.
- Right now the inversion is true: agents stall and produce more briefs whenever they could just *act*, and meanwhile real CEO-only work is buried inside markdown files no one reviews on a schedule.

## The chess frame

- A **piece** has known movement rules. You don't write a brief about whether the rook *could* move; you say "rook to e4" and the rook goes.
- A **player** (board member / CEO) chooses which piece to move and when. The player does not move pawns by hand.
- A **square** is a verifiable outcome — a real, observable position on the board.

The new system: define pieces, move them, verify squares.

---

## Pieces, not roles

Stop organizing by job title ("the SEO agent," "the marketing agent"). Organize by **verb + boundary**. Each piece is a unit of capability with:

1. **A trigger.** A specific, unambiguous "go" signal: a form submission, a calendar time, a queue entry, an explicit human command. If it's not obvious *when* this piece should activate, it isn't a piece yet.
2. **An input contract.** Exactly what data the piece needs to start. Refusable if the contract isn't met.
3. **An output contract — proof of effect.** A message ID, a URL, a database row, a screenshot, a confirmation code. Not a markdown summary of what was done. If the only artifact is a `.md` file, the piece did not move.
4. **A scope of authority.** What this piece is allowed to do without asking. What it must escalate. What it must never do.
5. **A failure mode.** How it fails *loudly* when blocked. The default failure mode today is "produce a brief instead" — that is now banned.

A piece definition template lives at `agent-org/pieces/_template.md` once we extract it from the first piece.

---

## The escalation contract

Anything that meets *any* of these criteria must escalate to the human queue, not stall and not improvise:

- Requires credentials, login, or 2FA we have not given the piece.
- Requires brand-voice judgment on first-of-its-kind copy (a new offer, a new audience).
- Is irreversible above a threshold (a public commitment, a sent batch >5 recipients, a billing change, a domain change).
- Has an expected blast radius wider than one entity (one prospect, one profile, one page).
- Has run into ambiguity the piece could not resolve from its inputs.

Escalation = appending an entry to `agent-org/HUMAN_QUEUE.md` in the format defined there, then stopping cleanly. Not retrying. Not producing a brief instead.

The CEO/board member triages `HUMAN_QUEUE.md` on a daily cadence. That queue *is* the interface between the player and the pieces.

---

## Result, not checkpoint

The recent commit log is full of "Checkpoint: added a complete package…" — a deliverable mistaken for an outcome. The new bar for a piece reporting success is:

> An effect in the world that someone outside this repo could verify.

Examples of acceptable proof:
- "Sent 15 emails. Message IDs: …"
- "Claimed GBP profile. Verification code requested via postcard. Screenshot: …"
- "Published `/plumbers-orange-county` at <url>. First crawl ping at HH:MM."
- "Replied to lead `abc123` within 14 minutes. Booked call for Thu 2pm. Calendar event ID: …"

Examples that no longer count as "done":
- "Drafted partner outreach templates."
- "Produced ranked traffic-recovery action list."
- "Prepared submission-ready profile claim copy."

These can still be intermediate work *inside* a piece's run, but they are not the piece's output. The output is the action taken using them.

---

## The piece library (LTRLA)

Pieces are reusable across LTRLA ventures. Each is defined once in `agent-org/pieces/` and parameterized per venture.

Initial roadmap, in order:

| # | Piece              | Status   | Why this order                                    |
|---|--------------------|----------|---------------------------------------------------|
| 1 | `lead-responder`   | drafted  | Highest compounding cost of inaction; smallest blast radius per move; existing pipeline. |
| 2 | `outreach-sender`  | next     | Real, queued work waiting (15 partner targets); proven escalation contract from #1. |
| 3 | `profile-claimer`  | next     | Tests the human-queue interface under load (most steps escalate). |
| 4 | `page-publisher`   | later    | Already partially automated via Manus; formalize the contract. |
| 5 | `rank-monitor`     | later    | Closes the loop — observes whether the moves are working. |

Each new piece must ship with its definition file *before* it starts operating.

---

## Player cadence (the board member's job)

The board member's job is now explicit and small:

1. **Daily (10 min):** Triage `HUMAN_QUEUE.md`. Approve, reject, or answer. Anything older than 48h gets a forcing decision.
2. **Weekly (30 min):** Review what each piece *did* (output contracts, not briefs). Decide whether to widen or narrow its scope of authority.
3. **Per new piece:** Read the definition file. Approve the scope-of-authority section before the piece runs once.

Everything else is the pieces.

---

## File layout

```
agent-org/
  README.md                  # this file
  HUMAN_QUEUE.md             # the escalation queue (the player's inbox)
  pieces/
    lead-responder.md        # first piece spec
    _template.md             # piece definition template (added with piece #2)
```

The Blue Tape Sites repo is the first home for this. When LTRLA spins up a second venture, this folder gets lifted into an `ltrla-agent-org` repo and each venture references it.
