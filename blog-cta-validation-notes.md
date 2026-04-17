# Blog CTA validation notes

## Representative website-strategy post

Preview URL checked:
`/blog/why-most-contractor-websites-lose-trust-before-the-quote`

Observed CTA block text:

> Relevant service
> Turn trust leaks into a stronger homepage and conversion path.
> If this article sounds familiar, Blue Tape Sites can audit the weak spots, tighten the offer, and rebuild the page structure so better leads feel confident faster.

Observed CTA links:

- `Request your free audit` → `/#audit`
- `See pricing packages` → `/#pricing`

## Representative pricing-strategy post

Preview URL checked:
`/blog/should-plumbers-put-pricing-on-their-website`

Observed CTA block text:

> Relevant service
> Make your pricing presentation clearer without turning the page into guesswork.
> Blue Tape Sites helps service businesses structure pricing, package framing, and estimate language so buyers understand the next step sooner.

Observed CTA links:

- `See pricing packages` → `/#pricing`
- `Request your free audit` → `/#audit`

## Layout validation on pricing-strategy post

A DOM layout check on `/blog/should-plumbers-put-pricing-on-their-website` confirmed that:

- the CTA block renders with two links;
- the CTA block has nonzero rendered dimensions (`896px` wide by about `345px` tall in the preview viewport);
- the CTA block appears immediately after the article element; and
- the next sibling after the CTA block is the existing newer-or-older post navigation grid.

That confirms the CTA is inserted into the intended position without displacing the surrounding article and archive-navigation structure.
