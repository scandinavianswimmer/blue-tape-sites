import { allSeoPages, getSeoPageByPath, SITE_URL, SOCIAL_IMAGE_URL, type SeoPage } from "@shared/seoPages";
import { blogPosts } from "../client/src/content/blogPosts";

const homePage: SeoPage = {
  path: "/",
  title: "SoCal Web Design for Service Businesses | Blue Tape Sites",
  description:
    "Lead-focused websites for plumbers, electricians, cleaners, and contractors that need local visibility, trust, and more leads.",
  h1: "Web Design for Contractors Who Need More Calls, Not More Complexity",
  eyebrow: "Southern California web design for serious contractors",
  summary:
    "Blue Tape Sites builds lead-focused websites for plumbers, electricians, cleaners, and home-service teams that need stronger trust, better local visibility, and more qualified calls.",
  sections: [
    {
      title: "Free Blue Tape Audit",
      body: "Send the site, tell us the trade, and get a practical review of what is hurting trust, mobile clarity, conversions, and local search visibility.",
    },
    {
      title: "Pricing, examples, process, and service area",
      body: "The site now exposes separate crawlable pages for pricing, service area, examples, process, about, contact, trade pages, and city pages.",
    },
  ],
  type: "core",
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const normalizePath = (url: string) => {
  try {
    const parsed = new URL(url, SITE_URL);
    const path = parsed.pathname.replace(/\/$/, "") || "/";
    return path;
  } catch {
    return "/";
  }
};

const blogSeoPages: SeoPage[] = [
  {
    path: "/blog",
    title: "Contractor Website Blog | Blue Tape Sites",
    description: "Practical website, SEO, and conversion advice for contractors and home-service businesses.",
    h1: "Contractor website articles for better trust, local visibility, and calls.",
    eyebrow: "Blog",
    summary: "Blue Tape Sites publishes practical articles for contractors and service businesses that want better websites and stronger local search visibility.",
    sections: [],
    type: "core",
  },
  ...blogPosts.map(post => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | Blue Tape Sites`,
    description: post.summary,
    h1: post.title,
    eyebrow: "Blog article",
    summary: post.summary,
    sections: [],
    type: "core" as const,
  })),
];

export const seoPagesForSitemap = [homePage, ...allSeoPages, ...blogSeoPages];

export function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = seoPagesForSitemap
    .map(page => {
      const priority = page.path === "/" ? "1.0" : page.type === "industry" ? "0.9" : page.type === "city" ? "0.8" : "0.85";
      return `  <url>
    <loc>${SITE_URL}${page.path === "/" ? "/" : page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function buildRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /dashboard
Disallow: /api
Disallow: /private
Disallow: /tmp

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: SemrushBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function buildJsonLd(page: SeoPage) {
  const canonicalUrl = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#professional-service`,
      name: "Blue Tape Sites",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      image: SOCIAL_IMAGE_URL,
      description: homePage.summary,
      areaServed: [
        { "@type": "AdministrativeArea", name: "Southern California" },
        { "@type": "Country", name: "United States" },
      ],
      knowsAbout: [
        "contractor web design",
        "home-service web design",
        "local SEO for service businesses",
        "website conversion improvement",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Blue Tape Sites",
      url: SITE_URL,
      publisher: {
        "@id": `${SITE_URL}/#professional-service`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      name: page.title,
      url: canonicalUrl,
      description: page.description,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
    },
  ];

  if (page.type === "industry") {
    graph.push({
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      name: page.h1,
      serviceType: page.eyebrow,
      provider: {
        "@id": `${SITE_URL}/#professional-service`,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Southern California",
      },
    });
  }

  if (page.type === "city") {
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${canonicalUrl}#local-business`,
      name: "Blue Tape Sites",
      url: canonicalUrl,
      areaServed: {
        "@type": "City",
        name: page.h1.split(" contractor web design")[0],
      },
    });
  }

  if (page.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function buildBodySnapshot(page: SeoPage) {
  return `<main id="seo-snapshot" data-seo-snapshot="true">
  <p>${escapeHtml(page.eyebrow)}</p>
  <h1>${escapeHtml(page.h1)}</h1>
  <p>${escapeHtml(page.summary)}</p>
  ${page.sections
    .map(
      section => `<section>
    <h2>${escapeHtml(section.title)}</h2>
    <p>${escapeHtml(section.body)}</p>
  </section>`
    )
    .join("\n")}
  ${
    page.faq?.length
      ? `<section>
    <h2>Frequently asked questions</h2>
    ${page.faq.map(item => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`).join("\n")}
  </section>`
      : ""
  }
</main>`;
}

export function renderSeoHtml(template: string, requestUrl: string) {
  const path = normalizePath(requestUrl);
  const page = path === "/" ? homePage : getSeoPageByPath(path);

  if (!page) {
    return template;
  }

  const canonicalUrl = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  const head = `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${SOCIAL_IMAGE_URL}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${SOCIAL_IMAGE_URL}" />
    <script type="application/ld+json">${buildJsonLd(page)}</script>`;

  return template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?\/>\s*/g, "")
    .replace(/<meta\s+property="og:[\s\S]*?\/>\s*/g, "")
    .replace(/<meta\s+name="twitter:[\s\S]*?\/>\s*/g, "")
    .replace("</head>", `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${buildBodySnapshot(page)}</div>`);
}
