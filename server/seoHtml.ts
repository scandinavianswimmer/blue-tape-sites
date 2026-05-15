import { allSeoPages, getSeoPageByPath, SITE_URL, SOCIAL_IMAGE_URL, type SeoPage } from "@shared/seoPages";
import { BUSINESS, trustStripItems } from "@shared/business";
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
  answer:
    `Blue Tape Sites is a Southern California contractor web design studio that builds phone-first websites for plumbers, electricians, cleaners, and home-service teams. Business owners can request a free 5-minute video audit with a 48-hour turnaround or call ${BUSINESS.phoneDisplay} for same-day reply.`,
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

const testimonialReviews = [
  {
    name: "Rick Mendez",
    company: "Mendez Plumbing & Rooter",
    quote:
      "I get most of my work from people needing help right now, so the site has to make sense in a hurry. They cleaned up the offer, made the phone CTA obvious, and the whole thing finally feels like it belongs to a real plumbing outfit instead of some cookie-cutter template.",
  },
  {
    name: "Shawn Keller",
    company: "Keller Electric Co.",
    quote:
      "What I liked was they didn't try to sell me on fancy nonsense. They looked at the page, pointed out where trust was leaking, and fixed the order of things. Better headline, better proof, better mobile layout. Straightforward and worth doing.",
  },
  {
    name: "Tina Alvarez",
    company: "Alvarez Cleaning Crew",
    quote:
      "Most people in my business just need a site that looks clean, answers fast, and doesn't make the company look small-time. That's what this did. It reads better, books better, and I don't feel weird sending customers to it anymore.",
  },
  {
    name: "Derek Holcomb",
    company: "Holcomb Garage Door Service",
    quote:
      "I've dealt with marketing people before and half the time they're hard to pin down. This felt straightforward. They showed me what was off, tightened it up, and left me with a page that's a lot easier for customers to trust.",
  },
];

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
    answer:
      `The Blue Tape Sites blog answers contractor website, local SEO, and AI-search questions for Southern California service businesses that need more calls. Start with a free 5-minute audit or call ${BUSINESS.phoneDisplay}.`,
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
    answer: `${post.title} answers a practical website or local SEO question for contractors who need more trust, more calls, and clearer online proof. Blue Tape Sites serves Southern California contractors and can be reached at ${BUSINESS.phoneDisplay}.`,
    sections: [],
    type: "core" as const,
  })),
];

const caseStudySeoPages: SeoPage[] = [
  {
    path: "/case-studies/marias-family-cleaning",
    title: "How Maria's Family Cleaning Books 200+ OC Homes Monthly | Blue Tape Sites Case Study",
    description:
      "How we rebuilt Maria's Family Cleaning into a bilingual, trust-first house cleaning site that books 247+ OC families and earned a 5.0 rating across 127+ reviews.",
    image: `${SITE_URL}/case-studies/marias-family-cleaning/desktop-home.webp`,
    h1: "How Maria's Family Cleaning books 200+ OC homes monthly",
    eyebrow: "Case study",
    summary:
      "A bilingual cleaning company in Orange County needed a website that felt as warm as a referral from your neighbor and as serious as a $150 deep clean.",
    answer:
      "Maria's Family Cleaning is a Blue Tape Sites case study showing how a bilingual, trust-first cleaning website can turn reviews, pricing, service area, and quote flow into a stronger booking engine for Orange County homeowners.",
    sections: [
      {
        title: "The cleaning industry sells on trust, not features",
        paragraphs: [
          "Most cleaning company websites read like a list of services and a phone number. In 2026, a homeowner deciding who's getting access to their house wants to see a real team, real reviews, real pricing, and a real way to book without picking up the phone.",
          "Maria's brand was strong across Irvine, Costa Mesa, Newport Beach, and beyond. The rebuild surfaced trust above the fold, made pricing transparent, exposed the service area, captured quotes without friction, and let the cultural identity show through.",
        ],
      },
      {
        title: "Five decisions that turned the site into a booking engine",
        bullets: [
          "Bilingual identity that treats Spanish as a first-class brand language.",
          "Trust signals stacked above the fold: 247+ families served, 5.0 rating, 127+ reviews, bonded and insured, and same-day availability.",
          "A 60-second quote calculator that gives buyers pricing before a call.",
          "Public pricing for standard cleaning, deep cleaning, move-out cleaning, and add-ons.",
          "Service-area copy for 12 Orange County cities that works as proof, not just SEO.",
        ],
      },
      {
        title: "What the rebuild moved",
        body:
          "247+ families served. 127+ five-star reviews. 12 cities covered. The numbers Maria publishes speak for themselves, and they are the numbers the site was built to make possible.",
      },
      {
        title: "Want the same treatment for your trade?",
        body:
          "Blue Tape Sites builds trust-first websites for cleaners, plumbers, electricians, HVAC, remodelers, and other Southern California service businesses. Request a free audit or call for same-day reply.",
      },
    ],
    type: "core",
    breadcrumbLabel: "Maria's Family Cleaning",
  },
];

export const seoPagesForSitemap = [homePage, ...allSeoPages, ...caseStudySeoPages, ...blogSeoPages];

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
  const isCaseStudy = page.path.startsWith("/case-studies/");
  const graph: Record<string, unknown>[] = [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#professional-service`,
      name: "Blue Tape Sites",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      image: SOCIAL_IMAGE_URL,
      description: homePage.summary,
      telephone: BUSINESS.telephone,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: BUSINESS.telephone,
        contactType: "customer service",
        areaServed: "US-CA",
        availableLanguage: ["English"],
      },
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
      review: page.path === "/" ? testimonialReviews.map(item => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: item.name,
        },
        itemReviewed: {
          "@id": `${SITE_URL}/#professional-service`,
        },
        reviewBody: item.quote,
        name: item.company,
      })) : undefined,
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
      serviceType: page.serviceType ?? page.eyebrow,
      provider: {
        "@id": `${SITE_URL}/#professional-service`,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Southern California",
      },
    });
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${canonicalUrl}#local-business`,
      name: "Blue Tape Sites",
      url: canonicalUrl,
      telephone: BUSINESS.telephone,
      areaServed: [
        "Anaheim",
        "Irvine",
        "Huntington Beach",
        "Santa Ana",
        "Long Beach",
        "Torrance",
        "Santa Monica",
        "Pasadena",
        "Riverside",
        "Ontario",
        "Rancho Cucamonga",
        "Oceanside",
        "Escondido",
        "Chula Vista",
      ],
    });
  }

  if (page.type === "city" || page.path === "/service-area" || page.path === "/") {
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${canonicalUrl}#local-business`,
      name: "Blue Tape Sites",
      url: canonicalUrl,
      telephone: BUSINESS.telephone,
      areaServed: {
        "@type": page.cityName ? "City" : "AdministrativeArea",
        name: page.cityName ?? "Southern California",
      },
    });
  }

  const breadcrumbItems = page.type === "industry"
    ? ["Home", "Services", page.breadcrumbLabel ?? page.h1]
    : isCaseStudy
      ? ["Home", "Examples", "Case Studies", page.breadcrumbLabel ?? page.h1]
      : ["Home", page.type === "city" ? "Cities" : page.breadcrumbLabel ?? page.h1];

  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: index === 0
        ? SITE_URL
        : index === breadcrumbItems.length - 1
          ? canonicalUrl
          : isCaseStudy && name === "Examples"
            ? `${SITE_URL}/examples`
            : isCaseStudy && name === "Case Studies"
              ? `${SITE_URL}/case-studies`
              : `${SITE_URL}${page.type === "city" ? "/service-area" : "/services"}`,
    })),
  });

  if (isCaseStudy) {
    graph.push({
      "@type": "Article",
      headline: page.h1,
      description: page.description,
      image: page.image ?? SOCIAL_IMAGE_URL,
      datePublished: "2026-05-15T12:00:00Z",
      dateModified: "2026-05-15T12:00:00Z",
      mainEntityOfPage: canonicalUrl,
      author: {
        "@type": "Organization",
        name: "Blue Tape Sites",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Blue Tape Sites",
        url: SITE_URL,
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
  const renderSection = (section: SeoPage["sections"][number]) => `<section>
    <h2>${escapeHtml(section.title)}</h2>
    ${section.body ? `<p>${escapeHtml(section.body)}</p>` : ""}
    ${section.paragraphs?.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("\n") ?? ""}
    ${section.bullets?.length ? `<ul>${section.bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : ""}
    ${section.links?.length ? `<ul>${section.links.map(link => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>${link.description ? ` - ${escapeHtml(link.description)}` : ""}</li>`).join("")}</ul>` : ""}
  </section>`;

  return `<main id="seo-snapshot" data-seo-snapshot="true">
  <p>${escapeHtml(page.eyebrow)}</p>
  <h1>${escapeHtml(page.h1)}</h1>
  <p>${escapeHtml(page.answer)}</p>
  <p>${escapeHtml(page.summary)}</p>
  <section>
    <h2>Fast contact and trust details</h2>
    <ul>${trustStripItems.map(item => `<li>${item.href ? `<a href="${item.href}">${escapeHtml(item.value)}</a>` : escapeHtml(item.value)}</li>`).join("")}</ul>
  </section>
  ${page.sections
    .map(renderSection)
    .join("\n")}
  ${
    page.faq?.length
      ? `<section>
    <h2>Frequently asked questions</h2>
    ${page.faq.map(item => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`).join("\n")}
  </section>`
      : ""
  }
  <section>
    <h2>Request a free audit</h2>
    <p>${escapeHtml(BUSINESS.sameDayReply)} <a href="${BUSINESS.phoneHref}">${escapeHtml(BUSINESS.phoneDisplay)}</a></p>
  </section>
</main>`;
}

export function buildLlmsTxt() {
  const groups = [
    ["Services", seoPagesForSitemap.filter(page => page.type === "core" && page.path !== "/" && !page.path.startsWith("/blog") && !page.path.startsWith("/case-studies"))],
    ["Industries", seoPagesForSitemap.filter(page => page.type === "industry")],
    ["Cities", seoPagesForSitemap.filter(page => page.type === "city")],
    ["Case Studies", seoPagesForSitemap.filter(page => page.path.startsWith("/case-studies"))],
    ["Blog", seoPagesForSitemap.filter(page => page.path.startsWith("/blog"))],
  ] as const;

  return [
    "# Blue Tape Sites",
    `> ${BUSINESS.tagline} for contractors and home-service businesses across ${BUSINESS.serviceAreaDetail}. Call ${BUSINESS.phoneDisplay}.`,
    "",
    ...groups.flatMap(([group, pages]) => [
      `## ${group}`,
      ...pages.map(page => `${SITE_URL}${page.path === "/" ? "/" : page.path} — ${page.description}`),
      "",
    ]),
  ].join("\n");
}

export function renderSeoHtml(template: string, requestUrl: string) {
  const path = normalizePath(requestUrl);
  const page = path === "/" ? homePage : getSeoPageByPath(path) ?? caseStudySeoPages.find(item => item.path === path) ?? blogSeoPages.find(item => item.path === path);

  if (!page) {
    return template;
  }

  const canonicalUrl = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  const image = page.image ?? SOCIAL_IMAGE_URL;
  const ogType = page.path.startsWith("/case-studies/") ? "article" : "website";
  const head = `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${image}" />
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
