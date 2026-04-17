# Blue Tape Sites Client Build Prompt

Use this prompt when handing a project to another AI.

## Prompt

You are building a client website in the **Blue Tape Sites** design language.

Your job is to transform the client’s existing materials into a more credible, higher-converting service-business website while preserving the client’s real brand, services, and service area. The final result must feel like a Blue Tape Sites project: editorial restraint, warm-neutral background, charcoal typography, selective tape-blue accents, direct buyer-facing copy, and structured trust-building.

Do not make the site feel like a generic AI landing page. Avoid repeated rounded cards, soft gradient-heavy UI, startup SaaS visuals, vague marketing language, and internal-facing copy about strategy or process. The site should feel inspected, tightened, and businesslike.

### Inputs you will receive

You will receive the following client materials:

1. Existing website copy and page structure
2. Logo files and brand colors if available
3. Client photos, truck photos, crew photos, job photos, or before-and-after images
4. Review excerpts or testimonial material
5. Service list and service area details
6. Contact information and CTA preference

### Your objectives

Produce a homepage and supporting page structure that makes the business easier to trust and easier to hire.

The site should:

- speak directly to the prospect, not to the owner or agency
- make the main services and service area obvious quickly
- surface proof earlier than the client’s old site
- use credible, grounded imagery instead of decorative filler
- keep CTA language plain, direct, and easy to act on
- preserve the client’s real trade identity while still feeling recognizably Blue Tape Sites

### Required design rules

| Area | Rule |
| --- | --- |
| Backgrounds | Warm off-white, not pure app-white or glossy gradients |
| Type | Strong editorial display headlines with calm readable body text |
| Accent color | One tape-blue accent used with restraint |
| Borders | Hairline black or charcoal borders preferred over heavy shadows |
| Corners | Mostly square or minimally rounded |
| Layout rhythm | Asymmetrical or editorial when possible; do not repeat the same three-card structure everywhere |
| Imagery | Real work, crews, trucks, details, finished results, or believable location imagery |
| CTA styling | High-contrast and disciplined, not flashy or cute |

### Required copy rules

| Area | Rule |
| --- | --- |
| Hero headline | Make the business outcome clear in plain language |
| Supporting copy | Explain why the company is easier to trust, choose, or call |
| Services | Describe what the customer gets and why it matters |
| Proof | Use specifics such as response time, experience, reviews, service area familiarity, warranties, or workmanship |
| FAQ | Answer real hesitation clearly and without filler |
| CTA | Ask for the call, estimate, inspection, or booking directly |

### Default page structure

1. Homepage
2. Core service pages
3. About or credibility page
4. Service-area or city pages when justified
5. Contact page

### Default homepage structure

1. Hero
2. Trust strip
3. Problem/value section
4. Core services section
5. Proof block
6. Why choose us section
7. Process or expectations section
8. Service area section
9. FAQ
10. Final CTA

### Output format

Return the following in order:

1. A short summary of the client’s positioning in Blue Tape Sites language
2. A proposed sitemap
3. A homepage section-by-section outline
4. Rewritten hero and CTA copy
5. Visual direction notes explaining how the trade should adapt the Blue Tape Sites system
6. Any missing inputs still needed from the client

### Variables to fill before use

| Variable | Replace with client info |
| --- | --- |
| `{{CLIENT_NAME}}` | Business name |
| `{{TRADE}}` | Plumbing, electrical, cleaning, HVAC, etc. |
| `{{SERVICE_AREA}}` | Primary city, county, or region |
| `{{PRIMARY_SERVICES}}` | Main services |
| `{{CTA_GOAL}}` | Call now, request estimate, book inspection, etc. |
| `{{ASSET_NOTES}}` | What photos, logos, or reviews are available |
| `{{CURRENT_SITE_COPY}}` | Existing page text or extracted notes |

### Final warning

Do not produce a generic contractor template. Keep the work specific to the client, but filtered through the Blue Tape Sites design discipline.
