export const SITE_URL = "https://bluetapesites.com";

export const SOCIAL_IMAGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-sites-social-preview_50192a08.png";

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  summary: string;
  sections: { title: string; body: string }[];
  faq?: { question: string; answer: string }[];
  type: "core" | "industry" | "city";
};

export const coreSeoPages: SeoPage[] = [
  {
    path: "/pricing",
    title: "Contractor Web Design Pricing | Blue Tape Sites",
    description: "Clear web design pricing for contractors and home-service businesses. New builds, redesigns, and monthly support without agency fog.",
    h1: "Contractor web design pricing without the agency fog.",
    eyebrow: "Pricing",
    summary:
      "Blue Tape Sites publishes clear pricing so plumbers, electricians, cleaners, remodelers, and contractors can see the likely investment before booking a call.",
    sections: [
      {
        title: "New website builds",
        body: "Packages start with a focused landing page and scale into full premium website systems for businesses that need stronger proof, service structure, and conversion flow.",
      },
      {
        title: "Website redesigns",
        body: "Redesign packages are built for companies with a real business and a website that no longer matches the quality of the work, the pricing, or the market.",
      },
      {
        title: "Ongoing support",
        body: "Monthly retainers cover site updates, seasonal offer changes, speed checks, trust improvements, and practical optimization after launch.",
      },
    ],
    faq: [
      {
        question: "How much does a contractor website cost?",
        answer: "Blue Tape Sites projects currently range from quick repair packages to full website systems, with published package pricing on the pricing page.",
      },
      {
        question: "Can you redesign an existing site?",
        answer: "Yes. If the existing site has usable structure, the work can focus on messaging, hierarchy, proof, and the lead path instead of starting from nothing.",
      },
    ],
    type: "core",
  },
  {
    path: "/service-area",
    title: "Southern California Web Design Service Area | Blue Tape Sites",
    description: "Blue Tape Sites serves contractors and home-service businesses across Orange County, Los Angeles, the Inland Empire, and San Diego County.",
    h1: "Southern California web design for contractors who need local trust.",
    eyebrow: "Service Area",
    summary:
      "Blue Tape Sites works with home-service businesses across Southern California, with dedicated pages for the cities and trades where local search demand is strongest.",
    sections: [
      {
        title: "Orange County",
        body: "Anaheim, Irvine, Huntington Beach, and Santa Ana pages help contractor websites connect trade-specific offers with city-level search intent.",
      },
      {
        title: "Los Angeles County",
        body: "Long Beach, Torrance, Santa Monica, and Pasadena pages give local operators clearer landing pages for buyers who want a nearby web partner.",
      },
      {
        title: "Inland Empire and San Diego County",
        body: "Riverside, Ontario, Rancho Cucamonga, Oceanside, Escondido, and Chula Vista pages support regional expansion without stuffing the homepage.",
      },
    ],
    type: "core",
  },
  {
    path: "/audit",
    title: "Free Website Audit for Contractors | Blue Tape Sites",
    description: "Get a free 5-minute contractor website audit showing what hurts trust, conversions, mobile clarity, and local search visibility.",
    h1: "Free website audit for contractors and home-service businesses.",
    eyebrow: "Audit",
    summary:
      "Send the site, share the trade, and Blue Tape Sites will mark up the issues that make visitors hesitate before they call.",
    sections: [
      {
        title: "What the audit checks",
        body: "The review looks at first-screen trust, mobile calls to action, service clarity, proof placement, speed perception, and local relevance.",
      },
      {
        title: "What you get back",
        body: "You get a short video-style review or written summary with the highest-priority fixes, starting with the misses closest to the lead path.",
      },
      {
        title: "Who it is for",
        body: "The audit is built for plumbers, HVAC companies, electricians, cleaners, garage door companies, remodelers, and other service operators.",
      },
    ],
    faq: [
      {
        question: "Is the website audit actually free?",
        answer: "Yes. The audit is a practical first look at the website, with no required sales call before the review.",
      },
    ],
    type: "core",
  },
  {
    path: "/process",
    title: "Website Design Process for Contractors | Blue Tape Sites",
    description: "A clear contractor website design process from audit to launch: inspect, rewrite, rebuild, revise, and launch without drift.",
    h1: "A clear website design process from first review to launch.",
    eyebrow: "Process",
    summary:
      "Blue Tape Sites keeps the work direct: inspect the current page, rewrite the offer, rebuild the lead path, revise tightly, and launch.",
    sections: [
      {
        title: "Inspect first",
        body: "The process starts by identifying what makes the current website feel weak, confusing, generic, or hard to trust.",
      },
      {
        title: "Build the lead path",
        body: "The new page structure is built around what the buyer needs to understand before calling: trade fit, service area, proof, process, and next step.",
      },
      {
        title: "Launch without drift",
        body: "A tight review process keeps revisions clear and avoids the vague back-and-forth that slows small business website projects down.",
      },
    ],
    type: "core",
  },
  {
    path: "/examples",
    title: "Contractor Website Examples | Blue Tape Sites",
    description: "See example website directions for plumbers, electricians, cleaners, remodelers, and other contractors that need more calls.",
    h1: "Contractor website examples built around trust and calls.",
    eyebrow: "Examples",
    summary:
      "The best contractor websites do not all look the same. They make the trade, proof, service area, and next step obvious in a way that matches the buyer's urgency.",
    sections: [
      {
        title: "Plumbing examples",
        body: "Plumbing pages should make emergency trust, service clarity, service area, and tap-to-call actions obvious fast.",
      },
      {
        title: "Electrical examples",
        body: "Electrician pages need stronger credential framing, service versus commercial paths, and a more technical hierarchy.",
      },
      {
        title: "Cleaning examples",
        body: "Cleaning company pages sell trust, recurring service confidence, crew consistency, and polished proof.",
      },
    ],
    type: "core",
  },
  {
    path: "/about",
    title: "About Blue Tape Sites | Contractor Web Design",
    description: "Blue Tape Sites is a Southern California web design studio for contractors and home-service businesses that need more trust and calls.",
    h1: "About Blue Tape Sites.",
    eyebrow: "About",
    summary:
      "Blue Tape Sites exists for hands-on business owners who need their website to match the quality and seriousness of the work they already do.",
    sections: [
      {
        title: "Built for service businesses",
        body: "The studio focuses on plumbers, electricians, cleaners, remodelers, garage door companies, HVAC teams, and other operators where trust moves the sale.",
      },
      {
        title: "Direct by design",
        body: "The tone, process, and pricing are deliberately plainspoken so business owners can make decisions without translating agency language.",
      },
    ],
    type: "core",
  },
  {
    path: "/contact",
    title: "Contact Blue Tape Sites | Contractor Web Design",
    description: "Contact Blue Tape Sites for contractor web design, website redesigns, monthly support, and free website audits.",
    h1: "Contact Blue Tape Sites.",
    eyebrow: "Contact",
    summary:
      "The fastest way to start is to request a free audit and send the current website, trade, and best contact information.",
    sections: [
      {
        title: "Start with an audit",
        body: "The audit gives both sides a practical view of what is broken, what matters most, and whether a repair or rebuild makes sense.",
      },
      {
        title: "Good-fit projects",
        body: "Blue Tape Sites is best for service businesses that want clearer messaging, stronger proof, better mobile flow, and a more credible online presence.",
      },
    ],
    type: "core",
  },
];

export const citySeoPages: SeoPage[] = [
  ["anaheim", "Anaheim", "Orange County", "plumbers, HVAC teams, electricians, and local contractors"],
  ["irvine", "Irvine", "Orange County", "premium home-service brands and owner-led contractors"],
  ["huntington-beach", "Huntington Beach", "Orange County", "coastal service businesses and contractors"],
  ["santa-ana", "Santa Ana", "Orange County", "contractors, cleaners, and trade businesses"],
  ["long-beach", "Long Beach", "Los Angeles County", "plumbers, electricians, remodelers, and service teams"],
  ["torrance", "Torrance", "Los Angeles County", "South Bay contractors and home-service operators"],
  ["santa-monica", "Santa Monica", "Los Angeles County", "high-trust local service businesses"],
  ["pasadena", "Pasadena", "Los Angeles County", "remodelers, electricians, and home-service companies"],
  ["riverside", "Riverside", "Inland Empire", "contractors and growing service teams"],
  ["ontario", "Ontario", "Inland Empire", "service businesses and trade operators"],
  ["rancho-cucamonga", "Rancho Cucamonga", "Inland Empire", "contractors, HVAC teams, and local service companies"],
  ["oceanside", "Oceanside", "San Diego County", "coastal contractors and home-service businesses"],
  ["escondido", "Escondido", "San Diego County", "contractors, remodelers, and service operators"],
  ["chula-vista", "Chula Vista", "San Diego County", "South Bay service businesses and contractors"],
].map(([slug, city, region, audience]) => ({
  path: `/web-design/${slug}`,
  title: `${city} Contractor Web Design | Blue Tape Sites`,
  description: `Contractor web design in ${city} for ${audience}. Stronger trust, clearer service pages, and better mobile calls.`,
  h1: `${city} contractor web design for service businesses that need more calls.`,
  eyebrow: `${region} web design`,
  summary: `Blue Tape Sites builds lead-focused websites for ${audience} in ${city}, with clearer service-area signals, stronger proof, and a cleaner path to the call.`,
  sections: [
    {
      title: `Why ${city} pages need specificity`,
      body: `${city} landing pages should do more than mention the city. They should explain the trade, the service area, the buyer's concern, and the proof that makes the business feel local and legitimate.`,
    },
    {
      title: "What gets tightened",
      body: "The page structure improves the first screen, mobile call path, service breakdown, review placement, FAQ coverage, and internal links to trade-specific pages.",
    },
    {
      title: "Best-fit businesses",
      body: `This page is built for ${audience} that want a stronger website before spending more on ads, SEO, or lead buying.`,
    },
  ],
  faq: [
    {
      question: `Do you build websites for ${city} contractors?`,
      answer: `Yes. Blue Tape Sites builds and redesigns websites for contractors and home-service businesses serving ${city} and nearby Southern California markets.`,
    },
  ],
  type: "city" as const,
}));

export const industrySeoPages: SeoPage[] = [
  {
    path: "/web-design-for-plumbers",
    title: "Web Design for Plumbers | Blue Tape Sites",
    description: "Blue Tape Sites builds plumbing websites that turn urgency into clearer trust, stronger mobile calls, and more confident service requests.",
    h1: "Your plumbing website should turn urgency into booked calls.",
    eyebrow: "Web design for plumbing companies",
    summary:
      "Blue Tape Sites helps plumbing businesses tighten the trust signals, service framing, and mobile clarity that affect whether someone calls now or keeps shopping.",
    sections: [
      { title: "Emergency-call clarity", body: "The page needs to make service area, urgent help, reviews, and tap-to-call actions obvious on mobile." },
      { title: "Trust near the phone", body: "Licensing cues, guarantees, response framing, and recognizable plumbing services should support the call action." },
      { title: "Service-specific structure", body: "Drain cleaning, water heaters, leak repair, fixture work, and emergency calls should feel distinct instead of generic." },
    ],
    type: "industry",
  },
  {
    path: "/web-design-for-remodelers",
    title: "Web Design for Remodelers | Blue Tape Sites",
    description: "Blue Tape Sites designs remodeler websites that pre-sell craftsmanship, strengthen project presentation, and attract better-fit renovation inquiries.",
    h1: "Your website should pre-sell the quality of your work before the first consultation.",
    eyebrow: "Web design for remodelers",
    summary:
      "Blue Tape Sites helps remodelers present their work with sharper credibility, stronger project storytelling, and clearer qualification cues.",
    sections: [
      { title: "Premium project presentation", body: "Project pages should sell taste, standards, process, and finished quality instead of acting like a plain gallery." },
      { title: "Process clarity", body: "Higher-value buyers want to understand discovery, planning, communication, and execution before they commit time." },
      { title: "Better lead qualification", body: "The website can answer common questions earlier so weak-fit inquiries self-filter and stronger-fit leads move forward." },
    ],
    type: "industry",
  },
  {
    path: "/web-design-for-hvac",
    title: "HVAC Website Design for Service Calls | Blue Tape Sites",
    description: "HVAC website design built for service calls, installs, seasonal demand, financing clarity, and stronger mobile trust.",
    h1: "HVAC website design that books service calls and installs.",
    eyebrow: "Web design for HVAC companies",
    summary:
      "HVAC buyers move between urgent repair and higher-consideration replacement decisions. A stronger website needs to support both without burying trust or financing details.",
    sections: [
      { title: "Service and install paths", body: "Separate urgent service calls from replacement and install interest so visitors can choose the right path quickly." },
      { title: "Seasonal offers", body: "Keep tune-ups, financing, emergency response, and maintenance plans visible near the call action." },
      { title: "Trust cues", body: "Certification, warranty, review, and service-area signals should appear before the visitor has to search for them." },
    ],
    type: "industry",
  },
  {
    path: "/web-design-for-electricians",
    title: "Electrician Website Design | Blue Tape Sites",
    description: "Electrician website design with sharper credential framing, residential and commercial paths, and cleaner service hierarchy.",
    h1: "Electrician website design with the hierarchy a spec-driven buyer expects.",
    eyebrow: "Web design for electricians",
    summary:
      "Electrician websites need to feel credible, organized, and technically clear, especially when the company handles both residential service and commercial work.",
    sections: [
      { title: "License-forward trust", body: "License, bonding, insurance, and service-area cues should be easy to find near primary calls to action." },
      { title: "Residential and commercial clarity", body: "Visitors should know whether the company handles their kind of job before they start comparing competitors." },
      { title: "Project-category structure", body: "Service calls, panel upgrades, lighting, tenant improvements, and commercial work need clean navigation." },
    ],
    type: "industry",
  },
  {
    path: "/web-design-for-cleaners",
    title: "Cleaning Company Website Design | Blue Tape Sites",
    description: "Cleaning company website design for recurring clients, crew trust, polished proof, and clearer quote requests.",
    h1: "Cleaning company website design that wins recurring clients.",
    eyebrow: "Web design for cleaning companies",
    summary:
      "Cleaning is sold on trust. The website has to make the crew, consistency, insurance, service fit, and recurring plan feel safe before someone requests a quote.",
    sections: [
      { title: "Recurring-service framing", body: "Make one-time, recurring, residential, and commercial cleaning paths clear instead of blending them together." },
      { title: "Crew confidence", body: "Team standards, background checks, insured status, and client proof should support the quote action." },
      { title: "Polished proof", body: "The page should feel clean and premium without sounding generic or overproduced." },
    ],
    type: "industry",
  },
  {
    path: "/web-design-for-roofers",
    title: "Roofing Website Design for Big Jobs | Blue Tape Sites",
    description: "Roofing website design for storm-season demand, financing, warranty trust, insurance claim help, and high-ticket jobs.",
    h1: "Roofing website design built for storm season and big jobs.",
    eyebrow: "Web design for roofers",
    summary:
      "Roofing pages need to handle urgency, trust, financing, warranty questions, and project proof without making homeowners work to find the next step.",
    sections: [
      { title: "High-ticket trust", body: "Warranties, manufacturer certifications, insurance help, and project proof need to be close to the decision point." },
      { title: "Storm response", body: "Storm and repair messaging should be visible without turning the whole page into panic copy." },
      { title: "Gallery structure", body: "Project imagery works harder when it is paired with context, roof type, challenge, and result." },
    ],
    type: "industry",
  },
  {
    path: "/web-design-for-landscapers",
    title: "Landscaping Website Design | Blue Tape Sites",
    description: "Landscaping website design for design-build, maintenance, editorial project galleries, and better consultation requests.",
    h1: "Landscaping website design that looks like the work.",
    eyebrow: "Web design for landscapers",
    summary:
      "Landscape buyers buy with their eyes, but they also need service clarity, process confidence, and a clear consultation path.",
    sections: [
      { title: "Design-build and maintenance", body: "Separate premium design-build work from recurring maintenance so buyers land on the right offer." },
      { title: "Editorial galleries", body: "Project photos should feel intentional, spacious, and tied to the kind of work the company wants more of." },
      { title: "Consultation clarity", body: "The page should make scope, process, and next steps clear enough to reduce weak-fit inquiries." },
    ],
    type: "industry",
  },
  {
    path: "/web-design-for-contractors",
    title: "Contractor Website Design | Blue Tape Sites",
    description: "Contractor website design built for trust, mobile clarity, service-area relevance, and more qualified calls.",
    h1: "Contractor website design built for trust, mobile, and the call.",
    eyebrow: "Web design for contractors",
    summary:
      "General contractor and home-service websites need a steady structure that makes the business look credible, specific, and easy to contact.",
    sections: [
      { title: "Niche clarity", body: "The page should show what kind of work the contractor wants more of instead of trying to sound like every trade at once." },
      { title: "Proof order", body: "Reviews, project proof, service areas, process, and credentials should appear in the order buyers need them." },
      { title: "Mobile lead path", body: "The strongest contractor websites make the phone, form, and qualification cues easy on a small screen." },
    ],
    type: "industry",
  },
  {
    path: "/web-design-for-garage-door",
    title: "Garage Door Website Design | Blue Tape Sites",
    description: "Garage door website design for repair urgency, installation consideration, brand clarity, and cleaner service requests.",
    h1: "Garage door company website design that captures urgent calls.",
    eyebrow: "Web design for garage door companies",
    summary:
      "Garage door websites need to support urgent repair calls and more considered replacement or installation decisions without muddying the path.",
    sections: [
      { title: "Emergency-first clarity", body: "Broken springs, stuck doors, opener failures, and urgent repairs need a fast path to the phone." },
      { title: "Repair and install split", body: "Repair visitors and install shoppers need different proof, service details, and calls to action." },
      { title: "Brand and warranty proof", body: "Door brands, opener brands, warranties, and reviews help the company feel safer to call." },
    ],
    type: "industry",
  },
];

export const allSeoPages = [...coreSeoPages, ...industrySeoPages, ...citySeoPages];

export const getSeoPageByPath = (path: string) =>
  allSeoPages.find(page => page.path === path.replace(/\/$/, "") || (page.path === "/" && path === "/"));
