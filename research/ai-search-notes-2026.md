# AI Search Research Notes

## Current findings

### Google Search Central: AI features and your website
- Google states that the best practices for SEO remain relevant for AI features in Google Search, including AI Overviews and AI Mode.
- Google indicates there are no additional requirements to appear in AI Overviews or AI Mode beyond standard eligibility and technical compliance.
- The page highlights core areas to review: helpful people-first content, internal links, page experience, images, videos, structured data, Merchant Center or Business Profile where relevant, and Search Console measurement.
- The page also points to preview controls, performance measurement, and standard search technical requirements rather than special AI-only markup.

### Growth Memo article access note
- The Growth Memo article was partially paywalled, so only limited visible framing was available.
- The visible framing reinforces the shift from ranked lists to definitive answers and emphasizes retrieval, citation, and trust factors as major themes for AI visibility in 2026.

## Implications for Blue Tape Sites
- Prioritize strong entity clarity, crawlability, structured data, internal linking, and highly extractable answer-first content instead of gimmicky AI-only tactics.
- Treat AI search optimization as an extension of strong technical SEO plus stronger citation, authority, and content formatting for retrieval.

### llms.txt proposal
- llms.txt is proposed as a root-path Markdown file that provides concise background, guidance, and curated links for LLM use at inference time.
- The recommended structure is an H1 title, a short blockquote summary, optional explanatory paragraphs, and H2 sections containing curated Markdown link lists.
- The proposal treats llms.txt as complementary to robots.txt and sitemap.xml rather than a replacement.
- The guidance emphasizes concise language, descriptive link annotations, and optional sections for lower-priority material.

### OpenAI crawler documentation
- OpenAI documents separate crawlers and states that OAI-SearchBot and GPTBot are managed independently via robots.txt.
- OpenAI indicates that a site can allow OAI-SearchBot for search visibility while disallowing GPTBot for training-related crawling, because the settings are independent.
- The OpenAI documentation frames OAI-SearchBot as the crawler relevant to appearing in ChatGPT search results.

## Updated implementation implication
- Keep core search crawling open, explicitly allow search-oriented AI bots where desired, and make any training-bot decision separately.
- Use llms.txt as a curated discovery aid for inference-time understanding, but do not rely on it as a substitute for indexable HTML, internal links, or structured data.

### Anthropic crawler documentation
Anthropic states that it uses different bots for different purposes and lets site owners control them through robots.txt. The official Privacy Center page names three bots: **ClaudeBot** for model-related crawling, **Claude-User** for user-requested retrieval, and **Claude-SearchBot** for search-related access. The page frames robots.txt as the control mechanism for allowing or restricting each bot independently.

### IndexNow documentation
The official IndexNow documentation positions the protocol as a way for sites to notify participating search engines when URLs are added, updated, or deleted. The documentation shows both single-URL and batch submission formats and makes IndexNow relevant as a faster discovery/update signal rather than a replacement for sitemaps or crawl accessibility.

### Updated package implication
The packaged robots.txt can keep Anthropic-specific directives, but those directives should use the official bot names exactly as documented. The broader strategy should explicitly recommend IndexNow for faster URL discovery after publishing or updating high-intent pages, especially trade, city, and proof pages.
