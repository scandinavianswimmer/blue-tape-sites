# Blog metadata validation notes

Preview route checked:
`/blog/why-most-contractor-websites-lose-trust-before-the-quote`

Observed page-head values in the running preview:

- Title: `Why Most Contractor Websites Lose Trust Before the Quote | Blue Tape Sites`
- Canonical: `https://bluetapesites.com/blog/why-most-contractor-websites-lose-trust-before-the-quote`
- Open Graph type: `article`
- Open Graph URL: `https://bluetapesites.com/blog/why-most-contractor-websites-lose-trust-before-the-quote`
- Article published time: `2025-05-05T12:00:00Z`
- Article modified time: `2025-05-05T12:00:00Z`
- Schema type: `BlogPosting`
- Schema datePublished: `2025-05-05T12:00:00Z`
- Schema dateModified: `2025-05-05T12:00:00Z`

Focused Vitest validation also passed for both the first archive post (`2025-05-05`) and the last archive post (`2026-04-20`), confirming the generated blog metadata uses each post's represented historical date rather than a current timestamp.
