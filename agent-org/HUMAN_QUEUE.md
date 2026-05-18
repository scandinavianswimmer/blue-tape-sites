# Human Queue

The single interface between LTRLA pieces and the human player. Anything a piece cannot or must not decide on its own lands here.

**Triage cadence:** daily, ~10 minutes. Any entry older than 48h must get a forcing decision (approve, reject, or punt with a deadline).

## Rules

- Pieces append entries; the human resolves them.
- One entry per blocked action. Don't batch.
- A piece that escalates must **stop cleanly** for that action — no retries, no improvisation, no markdown brief as a substitute.
- When you resolve an entry, move it to the `## Resolved` section at the bottom with the resolution and timestamp. Don't delete — the history is signal for tightening scope-of-authority later.

## Entry format

```
### [YYYY-MM-DD HH:MM] piece-name — short title
- Piece: <piece-name> (run id / commit if applicable)
- Why blocked: <one of: credentials | brand-voice | irreversible | wide-blast | ambiguity>
- What I need from you: <one sentence, actionable>
- Context: <links, IDs, file paths — no prose>
- What happens after you act: <what the piece will do next, automatically or on next run>
- Deadline / decay: <when this stops being worth doing>
```

---

## Open

<!-- New entries go here. Newest at top. -->

_(empty)_

---

## Resolved

<!-- Move entries here with a resolution line: `> Resolved YYYY-MM-DD HH:MM — <decision>`. -->

_(empty)_
