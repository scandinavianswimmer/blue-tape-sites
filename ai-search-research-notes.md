# AI Search Research Notes

## Official source findings

### Google Search Central: AI features and your website
- Google states that the same foundational SEO practices apply to AI features such as AI Overviews and AI Mode.
- There are no extra technical requirements beyond being indexed and eligible to appear in Google Search with a snippet.
- Google recommends allowing crawling, improving internal linking, maintaining strong page experience, keeping important content in text form, using supportive images and video, and ensuring structured data matches visible content.
- Google also points site owners to Search Console, Merchant Center, and Business Profile as supporting systems for visibility and measurement.
- Google says content controls such as `nosnippet`, `data-nosnippet`, `max-snippet`, and `noindex` still govern how content can appear in AI search experiences.

### OpenAI: Overview of OpenAI Crawlers
- OpenAI distinguishes between several bots with different purposes.
- `OAI-SearchBot` is the crawler relevant to appearing in ChatGPT search results.
- OpenAI explicitly says sites opted out of `OAI-SearchBot` will not be shown in ChatGPT search answers, though they may still appear as navigational links.
- OpenAI separately distinguishes `GPTBot` for model training and `ChatGPT-User` for user-triggered retrieval, meaning search visibility and training permission are separate controls.
- OpenAI recommends allowing `OAI-SearchBot` in `robots.txt` and allowing published IP ranges if a site wants to appear in ChatGPT search.

## Early implications for Blue Tape Sites
- AI visibility is not a separate magic channel; it sits on top of crawlability, indexability, textual clarity, and authority.
- Blue Tape Sites should not block the relevant search bots if the goal is discoverability in AI-assisted answers.
- A machine-readable brand file may help some systems understand the site more efficiently, but it should support clear public evidence rather than replace it.
- The strongest strategy is likely to combine standard SEO, strong service-area structure, explicit proof, and controlled crawler access rather than trying to game model behavior.

### Google Search Central Blog: succeeding in AI search
- Google says success in AI experiences still comes from unique, valuable, people-first content rather than AI-specific tricks.
- Google emphasizes strong page experience, technical accessibility, structured data that matches visible content, and multimodal support through images and video.
- Google says site owners should evaluate value from conversions and engagement, not just clicks, because AI-search visits may be higher quality.

### Anthropic: Claude crawler controls
- Anthropic separates `ClaudeBot` for training, `Claude-User` for user-directed retrieval, and `Claude-SearchBot` for search optimization.
- Anthropic says disabling `Claude-SearchBot` can reduce a site's visibility in user search results, and disabling `Claude-User` can reduce visibility for user-directed retrieval.
- Anthropic honors `robots.txt` directives and also supports `Crawl-delay`.

## Additional implications
- Blue Tape Sites should think of AI visibility across at least three access modes: training, search indexing, and live user retrieval.
- It may be possible to allow search/retrieval bots while still disallowing training bots, depending on platform and business preference.
- Any machine-readable brand pitch should be grounded in public, verifiable visible content so that AI systems have evidence to cite rather than unsupported claims.

### llms.txt proposal
- `llms.txt` is proposed as a root-level machine-readable Markdown file meant to give LLMs a concise overview of a site and curated links to deeper resources.
- The proposal frames `llms.txt` as complementary to `robots.txt` and `sitemap.xml`, with more emphasis on helping models at inference time understand a site efficiently.
- The proposal is most naturally suited to concise, verifiable summaries and curated source links rather than hidden persuasion or unsupported claims.

## Strategic interpretation
- For Blue Tape Sites, a public `llms.txt` file could be useful as a concise brand brief for AI systems, especially if it points to visible proof pages, service-area pages, case studies, FAQs, and contact information.
- However, it should not be treated as a guaranteed ranking mechanism. It is better understood as an accessibility and interpretation aid for AI systems than as a direct search ranking lever.
- The safest implementation is to make the machine-readable file consistent with visible on-page claims, structured data, and linked evidence so that models have aligned signals across the site.
