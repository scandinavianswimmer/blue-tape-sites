# Piece: `lead-responder`

**Status:** drafted, awaiting scope-of-authority approval from the player.
**Venture:** Blue Tape Sites (first instantiation).
**One-line purpose:** When a lead submits the audit form, get them to a booked call or a qualified-out decision within 30 minutes, with proof.

---

## Why this is the first piece

- **Compounding cost of inaction.** Every hour a lead sits is decayed conversion. Nothing else in the queue costs us money by the hour like this.
- **Clearest trigger.** Audit form submission. No ambiguity about when this piece runs.
- **Smallest blast radius per move.** One prospect at a time. We can QA the first ten moves before widening authority.
- **Existing rails.** The audit form already submits and is wired to Resend with the `X-Bluetape-Source` and `X-Bluetape-Sig` headers, and submissions are logged. We are not building a new pipeline; we are adding the *agent* that acts on it.
- **It exposes the whole new stack in miniature** — trigger, autonomous action, credentialed side-effect, escalation when judgment is needed, logged result.

---

## Trigger

Form submission to the audit intake endpoint (`/api/...`, see `server/` for the current handler).

The piece runs on each new submission with a unique lead ID. It does not run on its own schedule.

## Input contract

The piece refuses to start unless all of these are present in the lead record:

- `lead_id` (string, unique)
- `contact.name` (string)
- One of `contact.email` or `contact.phone` (we accept phone-only per recent intake changes)
- `submitted_at` (timestamp)
- `source_path` (the page the form was submitted from)

If anything else expected from the form (trade, city, current site URL) is present, it's used. If it's missing, the piece does not block — it asks for it in the first reply.

## Output contract — proof of effect

Exactly one of the following must be true at end-of-run, and recorded in the lead's row:

1. **Booked.** A calendar event exists with the prospect for a specific time. Record: `outcome=booked`, `calendar_event_id`, `scheduled_for`, `first_reply_at`.
2. **Qualified out.** The prospect was determined not to be ICP per the qualification rubric, with a recorded reason. A polite decline reply was sent. Record: `outcome=disqualified`, `reason`, `reply_message_id`.
3. **Awaiting prospect.** First reply was sent; prospect has not responded yet. Record: `outcome=awaiting_prospect`, `reply_message_id`, `follow_up_due_at`. The piece re-activates on follow-up due, up to the cadence cap (see Authority).
4. **Escalated.** An entry was appended to `HUMAN_QUEUE.md` and the lead is marked `outcome=escalated` with a reference to the queue entry.

Anything else — including "drafted a reply" — is a failure of this piece, not a success.

## Scope of authority

The piece **may**, without asking:

- Send a first reply within 30 minutes of submission, using the approved first-reply templates (located in `agent-org/pieces/lead-responder/templates/` — to be added in the first implementation pass).
- Send up to two follow-ups: one at 24h and one at 72h after the previous outbound, if no response. After that, mark `awaiting_prospect` with `follow_up_due_at = null` and stop.
- Use the calendar booking link in replies and accept a confirmed time from the prospect.
- Qualify out a lead that clearly does not match ICP (outside service area beyond planned 2026 expansion list, not a home-service contractor, agency/competitor, spam) using a polite decline template.
- Write structured logs and update the lead's row in the database.

The piece **must escalate** (append to `HUMAN_QUEUE.md`):

- Any lead that explicitly mentions a budget over **$10,000**, a multi-site deal, or any non-template engagement.
- Any lead where the prospect proposes a phone call rather than picking a time — phone calls go to the player.
- Any lead asking pricing or scope questions not covered by the standard templates.
- Any lead from a referral partner (detected via `source_path` matching `/partners/*` or a `?ref=` parameter) — partner relationships are CEO-touch.
- Anything that smells like press, legal, or PR.
- Any technical failure of the send pipeline (Resend error, missing creds, hash mismatch).

The piece **must never**:

- Promise a deliverable, timeline, or price not in the templates.
- Modify the production website.
- Send to more than one recipient per outbound action.
- Disable or skip the existing `X-Bluetape-Sig` signing.
- Continue after escalation has been triggered for the same lead.

## Failure modes (loud, not silent)

- **Missing input contract field:** record `outcome=blocked_input`, log the missing field, do not retry on the same lead, do not produce a brief.
- **Send pipeline failure:** record `outcome=blocked_pipeline`, escalate with the error, stop.
- **Ambiguity the templates do not cover:** escalate. Do not improvise reply copy.

There is no "drafted a response for review" outcome. Drafting is internal to a run, not an output.

## Observability

Per run, append a structured log entry with:

- `lead_id`, `run_started_at`, `run_ended_at`
- `outcome` (one of the four above, plus the two failure modes)
- `actions_taken[]` (each with type, target, message_id or event_id, timestamp)
- `escalation_ref` if applicable

Weekly review reads this log, not the markdown.

## Open questions for the player (before first run)

1. Confirm the **$10,000** escalation threshold or set a different one.
2. Confirm the **two-follow-up cap** (24h, 72h) or set a different cadence.
3. Approve the **first-reply, follow-up, and polite-decline template families** before the piece is allowed to send a single message. These will be drafted in `agent-org/pieces/lead-responder/templates/` in the next pass and require explicit sign-off.
4. Decide whether the **first 10 runs** are gated (the piece composes the action and queues it for one-click human approval) or live (it sends). Recommendation: **gate the first 10**, then go live.

When these four are answered, the piece is ready to instantiate as either a Claude Code subagent, a Manus agent, or a small cron worker — the spec above is intentionally framework-agnostic so we can pick the host without rewriting the contract.
