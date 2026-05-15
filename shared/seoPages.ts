import { BUSINESS } from "./business";

export const SITE_URL = "https://bluetapesites.com";

export const SOCIAL_IMAGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-sites-social-preview_50192a08.png";

export type SeoLink = {
  label: string;
  href: string;
  description?: string;
};

export type SeoSection = {
  title: string;
  body?: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: SeoLink[];
};

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  summary: string;
  answer: string;
  sections: SeoSection[];
  faq?: { question: string; answer: string }[];
  type: "core" | "industry" | "city";
  cityName?: string;
  regionName?: string;
  serviceType?: string;
  breadcrumbLabel?: string;
};

const phoneLine = `${BUSINESS.sameDayReply} ${BUSINESS.hoursDisplay}`;

const cityLinks: SeoLink[] = [
  ["Anaheim", "/web-design/anaheim"],
  ["Irvine", "/web-design/irvine"],
  ["Huntington Beach", "/web-design/huntington-beach"],
  ["Santa Ana", "/web-design/santa-ana"],
  ["Long Beach", "/web-design/long-beach"],
  ["Torrance", "/web-design/torrance"],
  ["Santa Monica", "/web-design/santa-monica"],
  ["Pasadena", "/web-design/pasadena"],
  ["Riverside", "/web-design/riverside"],
  ["Ontario", "/web-design/ontario"],
  ["Rancho Cucamonga", "/web-design/rancho-cucamonga"],
  ["Oceanside", "/web-design/oceanside"],
  ["Escondido", "/web-design/escondido"],
  ["Chula Vista", "/web-design/chula-vista"],
].map(([label, href]) => ({ label, href }));

const industryLinks: Record<string, SeoLink> = {
  plumbers: { label: "Plumbers", href: "/web-design-for-plumbers", description: "Emergency calls, repipes, water heaters, and drain cleaning." },
  remodelers: { label: "Remodelers", href: "/web-design-for-remodelers", description: "Premium project presentation and better-fit renovation leads." },
  hvac: { label: "HVAC", href: "/web-design-for-hvac", description: "AC repair, installs, maintenance plans, and seasonal offers." },
  electricians: { label: "Electricians", href: "/web-design-for-electricians", description: "Panel upgrades, EV chargers, smart-home work, and commercial calls." },
  cleaners: { label: "Cleaners", href: "/web-design-for-cleaners", description: "Recurring service trust, crew proof, and clearer quote paths." },
  roofers: { label: "Roofers", href: "/web-design-for-roofers", description: "Roof repair, replacement, warranty proof, and storm-season work." },
  landscapers: { label: "Landscapers", href: "/web-design-for-landscapers", description: "Design-build presentation, maintenance plans, and consultation flow." },
  contractors: { label: "Contractors", href: "/web-design-for-contractors", description: "General contractor proof, service focus, and local trust." },
  garageDoor: { label: "Garage Door", href: "/web-design-for-garage-door", description: "Broken spring repair, opener work, installs, and urgent calls." },
};

const corePage = (page: Omit<SeoPage, "type" | "answer"> & { answer?: string }): SeoPage => ({
  ...page,
  answer:
    page.answer ??
    `${page.h1} Blue Tape Sites builds contractor websites for ${BUSINESS.serviceAreaDetail}, with a ${BUSINESS.leadMagnet}, ${BUSINESS.auditTurnaround}, and phone support at ${BUSINESS.phoneDisplay}.`,
  type: "core",
});

export const coreSeoPages: SeoPage[] = [
  corePage({
    path: "/pricing",
    title: "Contractor Web Design Pricing | Blue Tape Sites",
    description: "Clear web design pricing for contractors and home-service businesses. New builds, redesigns, and monthly support without agency fog.",
    h1: "Contractor web design pricing without the agency fog.",
    eyebrow: "Pricing",
    summary:
      "Blue Tape Sites publishes clear pricing so plumbers, electricians, cleaners, remodelers, and contractors can see the likely investment before booking a call.",
    sections: [
      { title: "New website builds", body: "Packages start with a focused landing page and scale into full premium website systems for businesses that need stronger proof, service structure, and conversion flow." },
      { title: "Website redesigns", body: "Redesign packages are built for companies with a real business and a website that no longer matches the quality of the work, the pricing, or the market." },
      { title: "Ongoing support", body: "Monthly retainers cover site updates, seasonal offer changes, speed checks, trust improvements, and practical optimization after launch." },
    ],
    faq: [
      { question: "How much does a contractor website cost?", answer: "Blue Tape Sites projects currently range from focused repair packages to full website systems, with published package pricing on the pricing page." },
      { question: "Can you redesign an existing site?", answer: "Yes. If the existing site has usable structure, the work can focus on messaging, hierarchy, proof, and the lead path instead of starting from nothing." },
    ],
  }),
  corePage({
    path: "/service-area",
    title: "Southern California Web Design Service Area | Blue Tape Sites",
    description: "Blue Tape Sites serves contractors and home-service businesses across Orange County, Los Angeles, the Inland Empire, and San Diego County.",
    h1: "Southern California web design for contractors who need local trust.",
    eyebrow: "Service Area",
    summary:
      "Blue Tape Sites works with home-service businesses across Southern California, with dedicated pages for the cities and trades where local search demand is strongest.",
    sections: [
      { title: "Orange County", body: "Anaheim, Irvine, Huntington Beach, and Santa Ana pages connect trade-specific offers with local search intent, from repipe demand to HOA-heavy remodel work." },
      { title: "Los Angeles County", body: "Long Beach, Torrance, Santa Monica, and Pasadena pages help operators speak to older housing stock, preservation concerns, premium expectations, and dense neighborhood demand." },
      { title: "Inland Empire and San Diego County", body: "Riverside, Ontario, Rancho Cucamonga, Oceanside, Escondido, and Chula Vista pages support growing service teams without stuffing the homepage." },
      { title: "City pages", links: cityLinks },
    ],
    breadcrumbLabel: "Service Area",
  }),
  corePage({
    path: "/audit",
    title: "Free Website Audit for Contractors | Blue Tape Sites",
    description: "Get a free 5-minute contractor website audit showing what hurts trust, conversions, mobile clarity, and local search visibility.",
    h1: "Free website audit for contractors and home-service businesses.",
    eyebrow: "Audit",
    summary:
      "Send the site, share the trade, and Blue Tape Sites will mark up the issues that make visitors hesitate before they call.",
    answer: `A Blue Tape Sites audit is a free 5-minute video review of your contractor website. You get a direct look at trust gaps, mobile call friction, weak local signals, and the first fixes most likely to improve calls within a ${BUSINESS.auditTurnaround}.`,
    sections: [
      { title: "What the audit checks", body: "The review looks at first-screen trust, mobile calls to action, service clarity, proof placement, speed perception, local relevance, and whether the phone path is obvious." },
      { title: "What you get back", body: "You get a short video-style review or written summary with the highest-priority fixes, starting with the misses closest to the lead path." },
      { title: "Who it is for", body: "The audit is built for plumbers, HVAC companies, electricians, cleaners, garage door companies, remodelers, roofers, landscapers, and other service operators." },
    ],
    faq: [{ question: "Is the website audit actually free?", answer: "Yes. The audit is a practical first look at the website, with no required sales call before the review." }],
  }),
  corePage({
    path: "/process",
    title: "Website Design Process for Contractors | Blue Tape Sites",
    description: "A clear contractor website design process from audit to launch: inspect, rewrite, rebuild, revise, and launch without drift.",
    h1: "A clear website design process from first review to launch.",
    eyebrow: "Process",
    summary: "Blue Tape Sites keeps the work direct: inspect the current page, rewrite the offer, rebuild the lead path, revise tightly, and launch.",
    sections: [
      { title: "Day 1: inspect first", body: "The process starts by identifying what makes the current website feel weak, confusing, generic, or hard to trust." },
      { title: "Days 3-7: build the lead path", body: "The new structure is built around what the buyer needs to understand before calling: trade fit, service area, proof, process, and next step." },
      { title: "Day 8-10: launch without drift", body: "A tight review process keeps revisions clear and avoids the vague back-and-forth that slows small business website projects down." },
    ],
  }),
  corePage({
    path: "/examples",
    title: "Contractor Website Examples | Blue Tape Sites",
    description: "See example website directions for plumbers, electricians, cleaners, remodelers, and other contractors that need more calls.",
    h1: "Contractor website examples built around trust and calls.",
    eyebrow: "Examples",
    summary:
      "The best contractor websites do not all look the same. They make the trade, proof, service area, and next step obvious in a way that matches the buyer's urgency.",
    sections: [
      { title: "Plumbing examples", body: "Plumbing pages should make emergency trust, service area, and tap-to-call actions obvious fast." },
      { title: "Electrical examples", body: "Electrician pages need stronger credential framing, service versus commercial paths, and a more technical hierarchy." },
      { title: "Cleaning examples", body: "Cleaning company pages sell trust, recurring service confidence, crew consistency, and polished proof." },
    ],
  }),
  corePage({
    path: "/about",
    title: "About Blue Tape Sites | Contractor Web Design",
    description: "Blue Tape Sites is a Southern California web design studio for contractors and home-service businesses that need more trust and calls.",
    h1: "About Blue Tape Sites.",
    eyebrow: "About",
    summary:
      "Blue Tape Sites exists for hands-on business owners who need their website to match the quality and seriousness of the work they already do.",
    sections: [
      { title: "Built for service businesses", body: "The studio focuses on plumbers, electricians, cleaners, remodelers, garage door companies, HVAC teams, and other operators where trust moves the sale." },
      { title: "Direct by design", body: "The tone, process, and pricing are deliberately plainspoken so business owners can make decisions without translating agency language." },
    ],
  }),
  corePage({
    path: "/contact",
    title: "Contact Blue Tape Sites | Contractor Web Design",
    description: "Contact Blue Tape Sites for contractor web design, website redesigns, monthly support, and free website audits.",
    h1: "Contact Blue Tape Sites.",
    eyebrow: "Contact",
    summary:
      `The fastest way to start is to request a free audit or call ${BUSINESS.phoneDisplay}. ${BUSINESS.hoursDisplay}`,
    sections: [
      { title: "Start with an audit", body: "The audit gives both sides a practical view of what is broken, what matters most, and whether a repair or rebuild makes sense." },
      { title: "Call directly", body: `${BUSINESS.brand} answers contractor website questions by phone at ${BUSINESS.phoneDisplay}. ${phoneLine}` },
    ],
  }),
];

type CitySeed = {
  slug: string;
  city: string;
  region: string;
  audience: string;
  neighborhoods: string[];
  nuance: string;
  trades: (keyof typeof industryLinks)[];
  strongestTrade: keyof typeof industryLinks;
  seasonal: string;
};

const citySeeds: CitySeed[] = [
  { slug: "anaheim", city: "Anaheim", region: "Orange County", audience: "plumbers, HVAC teams, electricians, garage door companies, and remodelers", neighborhoods: ["Anaheim Hills", "West Anaheim", "Downtown Anaheim", "Platinum Triangle", "The Colony Historic District", "Anaheim Resort District"], nuance: "Anaheim mixes 1950s tract housing in Anaheim Colony with new mixed-use growth around Platinum Triangle, which creates very different buyer expectations inside one city. Older homes create demand for plumbing repipes, HVAC retrofits, electrical updates, and garage door repair, while newer mixed-use areas reward contractors who look organized, fast, and credible online.", trades: ["plumbers", "hvac", "electricians", "garageDoor", "remodelers"], strongestTrade: "plumbers", seasonal: "older-home repipe and summer cooling demand" },
  { slug: "irvine", city: "Irvine", region: "Orange County", audience: "premium home-service brands, remodelers, landscapers, electricians, and owner-led contractors", neighborhoods: ["Woodbridge", "Northwood", "Turtle Rock", "Quail Hill", "University Park", "Westpark", "Great Park Neighborhoods"], nuance: "Irvine is master-planned and HOA-heavy, so homeowners expect premium-tier presentation before they trust a contractor in their home. Demand skews toward remodel work, landscape design-build, and smart-home electrical projects where clear process, polished proof, and careful brand language matter.", trades: ["remodelers", "landscapers", "electricians", "contractors", "hvac"], strongestTrade: "remodelers", seasonal: "HOA review cycles and planned upgrade windows" },
  { slug: "huntington-beach", city: "Huntington Beach", region: "Orange County", audience: "coastal plumbers, HVAC teams, landscapers, remodelers, and garage door companies", neighborhoods: ["Downtown HB", "Huntington Harbour", "Bolsa Chica", "Sea Cliff", "Edinger Corridor"], nuance: "Huntington Beach contractors sell into a coastal market where corrosion, salt air, and curb appeal shape buying decisions. Coastal corrosion drives repipe and HVAC replacement, while beachfront aesthetics matter for premium landscapers and remodelers who need the website to look as considered as the finished work.", trades: ["plumbers", "hvac", "landscapers", "remodelers", "garageDoor"], strongestTrade: "hvac", seasonal: "coastal corrosion and summer comfort demand" },
  { slug: "santa-ana", city: "Santa Ana", region: "Orange County", audience: "contractors, cleaners, plumbers, electricians, and HVAC service businesses", neighborhoods: ["Downtown Santa Ana", "Floral Park", "French Park", "South Coast Metro"], nuance: "Santa Ana has a large rental property segment, which means high-turnover repair work sits alongside historic-home and commercial service demand. Spanish-language audience overlap matters, and plumbing, electrical, and HVAC companies need pages that help both property managers and homeowners act quickly.", trades: ["plumbers", "electricians", "hvac", "cleaners", "contractors"], strongestTrade: "electricians", seasonal: "rental turnover repair cycles" },
  { slug: "long-beach", city: "Long Beach", region: "Los Angeles County", audience: "plumbers, electricians, remodelers, roofers, and service teams", neighborhoods: ["Belmont Shore", "Bixby Knolls", "Naples", "Downtown Long Beach", "Cambodia Town"], nuance: "Long Beach combines dense urban blocks with suburban-feeling neighborhoods, and many homes from the 1920s through 1940s need repipes, electrical panel upgrades, foundation work, and careful restoration. A contractor website has to speak to old-home complexity without sounding too broad.", trades: ["plumbers", "electricians", "remodelers", "roofers", "contractors"], strongestTrade: "electricians", seasonal: "older-home upgrade and inspection demand" },
  { slug: "torrance", city: "Torrance", region: "Los Angeles County", audience: "South Bay roofers, remodelers, plumbers, landscapers, and home-service operators", neighborhoods: ["Old Torrance", "South Torrance", "Hollywood Riviera", "Walteria"], nuance: "Torrance has hillside drainage and roofing demand, plus close-knit referral patterns in neighborhoods where reputation carries weight. The large Japanese-American community and South Bay word-of-mouth culture make clarity, restraint, and credibility more useful than loud marketing.", trades: ["roofers", "landscapers", "plumbers", "remodelers", "contractors"], strongestTrade: "roofers", seasonal: "winter drainage and roof leak demand" },
  { slug: "santa-monica", city: "Santa Monica", region: "Los Angeles County", audience: "premium electricians, remodelers, landscapers, HVAC teams, and local service businesses", neighborhoods: ["Ocean Park", "Mid-City Santa Monica", "Pico", "Sunset Park", "Wilshire-Montana"], nuance: "Santa Monica buyers often accept premium pricing when the presentation supports it. Sustainability and electrification are real sales angles for solar, EV, and HVAC work, while older rent-control stock means landlord-side repairs need a practical conversion path too.", trades: ["electricians", "remodelers", "landscapers", "hvac", "contractors"], strongestTrade: "electricians", seasonal: "electrification, EV, and landlord-side maintenance demand" },
  { slug: "pasadena", city: "Pasadena", region: "Los Angeles County", audience: "remodelers, electricians, roofers, plumbers, and home-service companies", neighborhoods: ["Old Pasadena", "Bungalow Heaven", "South Lake", "Hastings Ranch", "Madison Heights"], nuance: "Pasadena's historic Craftsman homes create demand for specialized plumbing, electrical, and roof restoration, while preservation sensitivity changes how contractors should present themselves. The website has to communicate care, credentials, and process before pushing for the lead.", trades: ["remodelers", "electricians", "roofers", "plumbers", "contractors"], strongestTrade: "remodelers", seasonal: "historic-home restoration and preservation review demand" },
  { slug: "riverside", city: "Riverside", region: "Inland Empire", audience: "HVAC teams, contractors, roofers, plumbers, and growing service companies", neighborhoods: ["Wood Streets", "Canyon Crest", "Arlington", "Downtown Riverside", "La Sierra"], nuance: "Riverside's hot summers create heavy HVAC demand, while eastern Riverside growth adds new-construction and remodel opportunities. Compared with Orange County, buyers can be more price-sensitive, so a website has to show value, response time, and proof without feeling inflated.", trades: ["hvac", "roofers", "plumbers", "contractors", "electricians"], strongestTrade: "hvac", seasonal: "hot summer AC repair and replacement demand" },
  { slug: "ontario", city: "Ontario", region: "Inland Empire", audience: "commercial electricians, HVAC companies, plumbers, contractors, and trade operators", neighborhoods: ["Downtown Ontario", "Ontario Ranch", "Park Lane", "College Heights"], nuance: "Ontario has fast-growing master-planned communities in Ontario Ranch and logistics/warehouse adjacency that drives commercial electrical and HVAC work. Contractor pages need to separate residential warranty-period work from commercial service credibility.", trades: ["electricians", "hvac", "plumbers", "contractors", "garageDoor"], strongestTrade: "electricians", seasonal: "warehouse-adjacent commercial electrical and HVAC demand" },
  { slug: "rancho-cucamonga", city: "Rancho Cucamonga", region: "Inland Empire", audience: "HVAC teams, garage door companies, remodelers, landscapers, and local service companies", neighborhoods: ["Alta Loma", "Etiwanda", "Terra Vista", "Victoria"], nuance: "Rancho Cucamonga is master-planned and HOA-heavy like Irvine, but hot summers and wind make HVAC and garage door demand especially practical. Family-suburban tone wins when it feels polished, local, and easy to act on.", trades: ["hvac", "garageDoor", "remodelers", "landscapers", "contractors"], strongestTrade: "hvac", seasonal: "hot summers, wind, and garage door wear" },
  { slug: "oceanside", city: "Oceanside", region: "San Diego County", audience: "coastal plumbers, HVAC teams, garage door companies, remodelers, and contractors", neighborhoods: ["South Oceanside", "Fire Mountain", "Loma Alta", "San Luis Rey", "Rancho Del Oro"], nuance: "Oceanside mixes military housing turnover near Camp Pendleton, coastal corrosion, older surfer cottages, and newer tract housing. Contractor websites need to handle fast turnover repair work and higher-consideration coastal upgrades without sounding generic.", trades: ["plumbers", "hvac", "garageDoor", "remodelers", "contractors"], strongestTrade: "plumbers", seasonal: "military housing turnover and coastal corrosion demand" },
  { slug: "escondido", city: "Escondido", region: "San Diego County", audience: "plumbers, remodelers, roofers, landscapers, and service operators", neighborhoods: ["Old Escondido", "Felicita", "Country Club", "North Broadway"], nuance: "Escondido sits where avocado and citrus ranches edge into suburbia, so some clients deal with well water, septic, and older Spanish revival housing stock. The best contractor pages make rural-edge complexity feel familiar while still converting suburban homeowners.", trades: ["plumbers", "remodelers", "roofers", "landscapers", "contractors"], strongestTrade: "plumbers", seasonal: "well water, septic, and older housing-stock repair demand" },
  { slug: "chula-vista", city: "Chula Vista", region: "San Diego County", audience: "bilingual contractors, HVAC teams, electricians, remodelers, and cleaners", neighborhoods: ["Eastlake", "Otay Ranch", "Rolling Hills Ranch", "Bayfront", "Castle Park"], nuance: "Chula Vista includes some of San Diego County's newest master-planned tract housing in Otay Ranch, a bilingual market, and warranty-period work on newer homes. Contractor websites need to feel polished enough for newer communities and clear enough for fast service calls.", trades: ["hvac", "electricians", "remodelers", "cleaners", "contractors"], strongestTrade: "hvac", seasonal: "newer-home warranty-period work and bilingual service demand" },
];

const neighborhoodSentence = (city: CitySeed, neighborhood: string) =>
  `${neighborhood}: contractors here need pages that connect ${city.nuance.toLowerCase().split(".")[0]} to a fast call path, proof, and service-area clarity.`;

const cityPage = (seed: CitySeed): SeoPage => {
  const trade = industryLinks[seed.strongestTrade];
  return {
    path: `/web-design/${seed.slug}`,
    title: `${seed.city} Contractor Web Design | Blue Tape Sites`,
    description: `Contractor web design in ${seed.city} for ${seed.audience}. Stronger trust, clearer service pages, and better mobile calls.`,
    h1: `${seed.city} contractor web design for service businesses that need more calls.`,
    eyebrow: `${seed.region} web design`,
    summary: `Blue Tape Sites builds lead-focused websites for ${seed.audience} in ${seed.city}, with clearer local signals, stronger proof, phone-first CTAs, and a free 5-minute audit.`,
    answer: `${seed.city} contractor web design should explain the local work mix, make the phone number visible immediately, and prove the business is credible before a homeowner compares three more tabs. Blue Tape Sites builds these pages for ${seed.city} service businesses with ${BUSINESS.auditTurnaround} and direct phone support at ${BUSINESS.phoneDisplay}.`,
    cityName: seed.city,
    regionName: seed.region,
    breadcrumbLabel: seed.city,
    sections: [
      {
        title: `Why ${seed.city} contractors need a different kind of website`,
        paragraphs: [
          seed.nuance,
          `That means a ${seed.city} contractor website cannot be a city-name swap on a generic service page. It has to show the buyer that the company understands the local housing stock, local call patterns, and local expectations before asking for the lead. The first screen should answer what you do, where you work, why you are safe to call, and how fast someone can reach you. For ${seed.city}, the site should also help Google and AI search systems connect the business to real neighborhood-level service demand instead of thin location text.`,
        ],
      },
      {
        title: `Neighborhoods we serve in ${seed.city}`,
        bullets: seed.neighborhoods.map(neighborhood => neighborhoodSentence(seed, neighborhood)),
      },
      {
        title: `Trades we work with in ${seed.city}`,
        body: `These are the trade pages most relevant to ${seed.city} demand. Each one links to a real service page with trade-specific conversion guidance.`,
        links: seed.trades.map(key => industryLinks[key]),
      },
      {
        title: `What a ${seed.city} ${trade.label.toLowerCase()} website should do differently`,
        paragraphs: [
          `${trade.label} in ${seed.city} need a website that reflects ${seed.seasonal}. The page should lead with the specific job type, make the call button impossible to miss on mobile, and place reviews, response time, license or insured cues, and neighborhood coverage close to the CTA.`,
          `For this market, the strongest conversion pattern is not more decoration. It is a clear opening answer, a service-area proof block, a realistic explanation of the common local jobs, and a short audit path for owners who want to see what is leaking trust before buying a rebuild.`,
        ],
      },
      {
        title: "Request a local website audit",
        body: `${BUSINESS.brand} will review your current site for ${seed.city} relevance, trade clarity, mobile phone friction, proof placement, schema, and whether the first 100 words answer what buyers and AI search systems need. ${phoneLine}`,
      },
    ],
    faq: [
      { question: `Do you work with contractors in ${seed.neighborhoods[0]}?`, answer: `Yes. Blue Tape Sites works with contractors serving ${seed.neighborhoods[0]} and the rest of ${seed.city}, with page structure that supports neighborhood proof without stuffing keywords.` },
      { question: `Will my ${seed.city} business show up on Google Maps after the rebuild?`, answer: `A website rebuild alone does not guarantee Google Maps rankings, but it supports Maps performance by making services, service area, phone, proof, and location relevance clearer around the business profile.` },
      { question: `How does ${seed.city}'s ${seed.seasonal} affect website strategy?`, answer: `The page should name the local demand pattern, connect it to the strongest service offers, and keep response time, phone, and proof close to the first CTA.` },
      { question: `Can you build pages for more than one ${seed.region} city?`, answer: `Yes. The site can expand into multiple city pages as long as each page has real local nuance, trade relevance, and unique proof instead of copied text.` },
    ],
    type: "city",
  };
};

export const citySeoPages: SeoPage[] = citySeeds.map(cityPage);

type IndustrySeed = {
  slug: string;
  label: string;
  plural: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  serviceType: string;
  answer: string;
  loseCalls: string[];
  changes: string[];
  trust: string[];
  faqs: { question: string; answer: string }[];
  cities: string[];
};

const cityHref = (city: string) => cityLinks.find(link => link.label === city)?.href ?? "/service-area";

const industrySeeds: IndustrySeed[] = [
  { slug: "plumbers", label: "plumber", plural: "plumbers", title: "Web Design for Plumbers | Blue Tape Sites", description: "Blue Tape Sites builds plumbing websites that turn urgency into clearer trust, stronger mobile calls, and more confident service requests.", h1: "Your plumbing website should turn urgency into booked calls.", eyebrow: "Web design for plumbing companies", serviceType: "Plumbing company website design", answer: `Plumber website design is a rebuild of your homepage and service pages so emergency homeowners can find your phone number, see real proof, and call within 30 seconds of landing. Blue Tape Sites builds these for Southern California plumbers, with a free 5-minute audit and ${BUSINESS.auditTurnaround}.`, loseCalls: ["The emergency phone CTA is hidden below generic copy.", "Drain cleaning, repipe, water heater, and leak repair pages all sound the same.", "License, insured, warranty, and review cues appear too late.", "The page does not separate after-hours urgency from planned plumbing work."], changes: ["Put tap-to-call, service area, and response framing high on mobile.", "Build distinct service paths for repipe, drains, water heaters, leaks, and emergency calls.", "Move reviews and trust proof near every major call action.", "Write direct answers for homeowners comparing plumbers fast."], trust: ["License number and insured status near the CTA.", "Emergency response time and service-area clarity.", "Recent reviews tied to real plumbing job types.", "Guarantee, warranty, and cleanup expectations."], cities: ["Anaheim", "Huntington Beach", "Santa Ana", "Long Beach", "Oceanside", "Escondido", "Pasadena"], faqs: [
    { question: "How do you handle after-hours emergency calls?", answer: "We make the phone path, urgent-service language, and trust proof visible immediately so emergency visitors can call without sorting through the whole site." },
    { question: "Can you migrate my existing reviews?", answer: "Yes. Reviews can be carried into the new layout as visible proof, with links back to the original profiles where possible." },
    { question: "Do you build separate pages for repipe vs drain cleaning?", answer: "Yes. Plumbing services convert better when high-intent jobs have their own page, proof, FAQ, and call path." },
    { question: "Will my site rank for plumber near me?", answer: "No rebuild can promise a specific ranking, but stronger service pages, local signals, schema, internal links, and Google Business Profile alignment help support that goal." },
    { question: "Can I get same-day quote response on the site?", answer: "Yes. We can frame same-day reply language, phone CTAs, and short forms so urgent visitors understand what happens next." },
  ] },
  { slug: "remodelers", label: "remodeler", plural: "remodelers", title: "Web Design for Remodelers | Blue Tape Sites", description: "Blue Tape Sites designs remodeler websites that pre-sell craftsmanship, strengthen project presentation, and attract better-fit renovation inquiries.", h1: "Your website should pre-sell the quality of your work before the first consultation.", eyebrow: "Web design for remodelers", serviceType: "Remodeling contractor website design", answer: `Remodeler website design is the process of making your craftsmanship, project standards, consultation process, and proof feel premium before a homeowner books a call. Blue Tape Sites builds remodeler websites for Southern California firms that need better-fit leads, stronger galleries, and clearer qualification cues.`, loseCalls: ["Project galleries show photos without context.", "The site does not explain process, budget fit, or communication style.", "Premium work is presented with ordinary template design.", "Weak qualification creates too many poor-fit inquiries."], changes: ["Turn galleries into project stories with challenge, approach, and result.", "Explain consultation, planning, and communication before the form.", "Use restrained premium design that supports the work.", "Add qualification cues so better prospects self-select."], trust: ["Project photos with context and location type.", "Process, timeline, and communication standards.", "Licensing, insured status, and review proof.", "Before-after detail that supports premium pricing."], cities: ["Irvine", "Huntington Beach", "Santa Monica", "Pasadena", "Long Beach", "Chula Vista", "Escondido"], faqs: [
    { question: "Can you make our project gallery sell better?", answer: "Yes. We add structure around project type, challenge, design decisions, and finished result so the work carries more sales weight." },
    { question: "Should remodelers show pricing on the site?", answer: "Often, at least with ranges or fit language. It helps weak-fit leads self-filter and serious buyers understand the level of work." },
    { question: "Can you write copy for kitchen and bath pages separately?", answer: "Yes. Kitchen, bath, whole-home, and ADU work should each have distinct proof, FAQs, and conversion paths." },
    { question: "Do you design for design-build firms?", answer: "Yes. Design-build pages need stronger process explanation and project storytelling than general contractor pages." },
    { question: "Can the site support higher-end leads?", answer: "Yes. The visual system, proof order, and qualification copy can all raise perceived value before the first consultation." },
  ] },
  { slug: "hvac", label: "HVAC", plural: "HVAC companies", title: "HVAC Website Design for Service Calls | Blue Tape Sites", description: "HVAC website design built for service calls, installs, seasonal demand, financing clarity, and stronger mobile trust.", h1: "HVAC website design that books service calls and installs.", eyebrow: "Web design for HVAC companies", serviceType: "HVAC company website design", answer: `HVAC website design is a call-focused rebuild for AC repair, heating repair, tune-ups, installs, financing, and maintenance plans. Blue Tape Sites builds HVAC sites for Southern California companies that need seasonal offers, emergency trust, and clear mobile CTAs.`, loseCalls: ["AC repair and replacement visitors get the same path.", "Seasonal offers disappear below generic brand copy.", "Financing, warranties, and maintenance plans are hard to find.", "Commercial HVAC work is mixed with residential service without clarity."], changes: ["Split urgent repair, replacement, maintenance, and commercial paths.", "Put seasonal tune-ups, financing, and emergency response near CTAs.", "Add trust proof around certifications, warranties, and reviews.", "Make phone and scheduling actions persistent on mobile."], trust: ["License number, insured status, and technician credentials.", "Response time and emergency availability.", "Financing, maintenance plan, and warranty details.", "Reviews tied to AC repair, installs, and tune-ups."], cities: ["Riverside", "Rancho Cucamonga", "Anaheim", "Huntington Beach", "Ontario", "Chula Vista", "Oceanside"], faqs: [
    { question: "Will my HVAC site show up for AC repair near me?", answer: "A rebuild cannot guarantee a ranking, but it gives Google clearer service pages, city relevance, schema, internal links, and mobile usability signals." },
    { question: "How do you handle seasonal offers?", answer: "We build flexible offer areas for AC tune-ups, furnace checks, heat waves, financing, and maintenance plans so the page can change with demand." },
    { question: "Can you integrate with my service-call scheduling tool?", answer: "Yes. We can link or embed compatible scheduling, dispatch, or CRM intake tools while keeping phone calls prominent." },
    { question: "Do you do financing CTAs?", answer: "Yes. Financing belongs near install and replacement content, not hidden in a footer or separate PDF." },
    { question: "What about commercial HVAC work?", answer: "Commercial HVAC should have its own pathway with different proof, response expectations, and facility-focused language." },
  ] },
  { slug: "electricians", label: "electrician", plural: "electricians", title: "Electrician Website Design | Blue Tape Sites", description: "Electrician website design with sharper credential framing, residential and commercial paths, and cleaner service hierarchy.", h1: "Electrician website design with the hierarchy a spec-driven buyer expects.", eyebrow: "Web design for electricians", serviceType: "Electrician website design", answer: `Electrician website design organizes residential service, commercial electrical work, panel upgrades, EV chargers, lighting, and smart-home projects so buyers can verify credentials and call quickly. Blue Tape Sites builds these pages for Southern California electricians with schema, phone-first CTAs, and stronger proof.`, loseCalls: ["License and insured proof are not near the decision point.", "Residential and commercial visitors are forced through the same copy.", "Panel upgrades, EV chargers, lighting, and repair work are buried.", "The page feels less technical than the buyer expects."], changes: ["Lead with license-forward credibility and service fit.", "Separate residential, commercial, EV, panel, and lighting paths.", "Use clean hierarchy for technical buyers and property managers.", "Add city links where electrical demand is strongest."], trust: ["License number, bonded and insured language.", "Residential and commercial job categories.", "Reviews tied to specific electrical services.", "Response time and inspection-ready process cues."], cities: ["Irvine", "Santa Ana", "Long Beach", "Santa Monica", "Pasadena", "Ontario", "Chula Vista"], faqs: [
    { question: "Can you separate residential and commercial electrical leads?", answer: "Yes. The site can route homeowners, property managers, and commercial buyers into different proof and CTA paths." },
    { question: "Should EV charger installs have their own page?", answer: "Usually yes. EV charger buyers have different questions about panels, permits, load, and scheduling." },
    { question: "Where should license information appear?", answer: "License, bonded, insured, and safety cues should appear near the phone CTA and in trust sections, not only in the footer." },
    { question: "Can you write for panel upgrades and rewires?", answer: "Yes. Those services deserve plain-language pages that explain safety, age of homes, inspection concerns, and next steps." },
    { question: "Do electrician sites need commercial project proof?", answer: "If commercial work matters to the business, yes. Tenant improvements and facility work need different proof than residential service." },
  ] },
  { slug: "cleaners", label: "cleaning company", plural: "cleaning companies", title: "Cleaning Company Website Design | Blue Tape Sites", description: "Cleaning company website design for recurring clients, crew trust, polished proof, and clearer quote requests.", h1: "Cleaning company website design that wins recurring clients.", eyebrow: "Web design for cleaning companies", serviceType: "Cleaning company website design", answer: `Cleaning company website design builds trust around the crew, consistency, insurance, recurring service, and quote path. Blue Tape Sites designs cleaning websites for Southern California companies that need to look safer, more polished, and easier to hire.`, loseCalls: ["Residential, commercial, one-time, and recurring cleaning are blended together.", "Crew trust, background checks, and insured status appear too late.", "The quote form asks too much before trust is built.", "The site looks less clean and reliable than the service promise."], changes: ["Separate recurring, one-time, move-out, and commercial cleaning paths.", "Place crew standards, insured status, and review proof near CTAs.", "Shorten the quote path and explain what happens next.", "Use polished, quiet design that reinforces cleanliness."], trust: ["Insured status and crew standards.", "Recurring-plan clarity and scheduling expectations.", "Reviews from homes, offices, and property managers.", "Before-after proof without overloading the page."], cities: ["Santa Ana", "Irvine", "Chula Vista", "Long Beach", "Pasadena", "Anaheim"], faqs: [
    { question: "Can you build separate pages for recurring and one-time cleaning?", answer: "Yes. Recurring, deep clean, move-out, office, and post-construction cleaning should not all share one generic page." },
    { question: "How do you make a cleaning company feel trustworthy?", answer: "We place insured status, crew standards, recurring process, reviews, and clear quote steps close to the top of the page." },
    { question: "Can quote forms ask about bedrooms, bathrooms, and frequency?", answer: "Yes. We can keep the first form lightweight or route visitors into a more detailed quote flow when useful." },
    { question: "Do you support Spanish-language cleaning audiences?", answer: "We can structure pages to support bilingual markets, especially where the business already serves those customers." },
    { question: "Can the site help win commercial cleaning leads?", answer: "Yes. Commercial cleaning needs separate proof around reliability, insurance, scope, and recurring scheduling." },
  ] },
  { slug: "roofers", label: "roofing company", plural: "roofers", title: "Roofing Website Design for Big Jobs | Blue Tape Sites", description: "Roofing website design for storm-season demand, financing, warranty trust, insurance claim help, and high-ticket jobs.", h1: "Roofing website design built for storm season and big jobs.", eyebrow: "Web design for roofers", serviceType: "Roofing company website design", answer: `Roofing website design helps homeowners trust a contractor for repairs, leaks, replacements, warranties, financing, and storm-season decisions. Blue Tape Sites builds roofing pages that make high-ticket proof visible before the estimate request.`, loseCalls: ["Warranty, manufacturer, and insurance proof is buried.", "Leak repair and replacement visitors get the same message.", "Project photos lack roof type, challenge, or result context.", "Storm response language feels either too vague or too aggressive."], changes: ["Separate repair, replacement, inspection, and insurance-help paths.", "Move warranties, certifications, and proof close to the CTA.", "Turn galleries into specific project examples.", "Write direct copy for high-ticket trust and urgent leak concerns."], trust: ["License, insured, and manufacturer certification cues.", "Warranty, financing, and inspection process.", "Roof type examples and before-after context.", "Reviews tied to leaks, repairs, and replacements."], cities: ["Torrance", "Pasadena", "Riverside", "Long Beach", "Escondido", "Anaheim"], faqs: [
    { question: "Should roof repair and roof replacement be separate pages?", answer: "Yes. Leak repair visitors need speed and trust, while replacement buyers need warranty, financing, and project proof." },
    { question: "Can you show financing without making the site feel cheap?", answer: "Yes. Financing can be framed as a practical option near replacement content without overpowering premium trust." },
    { question: "How do you handle storm-season pages?", answer: "We keep storm and leak messaging visible but grounded, with clear response steps and proof rather than panic copy." },
    { question: "Do project galleries help roofing SEO?", answer: "They can, especially when each project includes roof type, city context, problem, solution, and outcome." },
    { question: "Can you include insurance claim help?", answer: "Yes, if the company offers it. The page should explain what you can and cannot help with clearly." },
  ] },
  { slug: "landscapers", label: "landscaper", plural: "landscapers", title: "Landscaping Website Design | Blue Tape Sites", description: "Landscaping website design for design-build, maintenance, editorial project galleries, and better consultation requests.", h1: "Landscaping website design that looks like the work.", eyebrow: "Web design for landscapers", serviceType: "Landscaping company website design", answer: `Landscaping website design turns design-build work, maintenance plans, project photos, outdoor living services, and consultation requests into a clearer sales path. Blue Tape Sites builds landscaper websites for Southern California companies that need the site to look as considered as the finished yard.`, loseCalls: ["Design-build and maintenance offers are mixed together.", "Photos are pretty but do not explain scope or value.", "The consultation step is vague.", "The site does not show the type of properties the company wants more of."], changes: ["Split design-build, outdoor living, irrigation, and maintenance paths.", "Pair project photos with scope, property type, and result context.", "Clarify consultation, estimate, and design steps.", "Use visual pacing that feels premium without getting decorative."], trust: ["Project galleries with location and scope context.", "Maintenance plan and design-build distinction.", "Reviews from homeowners and property managers.", "Insured status, process, and consultation expectations."], cities: ["Irvine", "Huntington Beach", "Santa Monica", "Torrance", "Rancho Cucamonga", "Escondido"], faqs: [
    { question: "Should design-build and maintenance be separate?", answer: "Yes. They attract different buyers with different budgets, proof needs, and conversion paths." },
    { question: "Can you make project photos more useful?", answer: "Yes. We add captions, scope, neighborhood context, and outcome language so images do more than decorate." },
    { question: "Do landscapers need service-area pages?", answer: "Usually yes, especially when the company works across premium neighborhoods or multiple counties." },
    { question: "Can the website qualify consultation requests?", answer: "Yes. Scope, budget-fit language, timeline expectations, and project type fields can reduce weak-fit inquiries." },
    { question: "Do you write irrigation and outdoor living content?", answer: "Yes. Those services should have specific pages or sections instead of being buried in a generic landscaping list." },
  ] },
  { slug: "contractors", label: "contractor", plural: "contractors", title: "Contractor Website Design | Blue Tape Sites", description: "Contractor website design built for trust, mobile clarity, service-area relevance, and more qualified calls.", h1: "Contractor website design built for trust, mobile, and the call.", eyebrow: "Web design for contractors", serviceType: "Contractor website design", answer: `Contractor website design makes a trade business easier to trust, easier to understand, and easier to contact on mobile. Blue Tape Sites builds Southern California contractor websites with service-area relevance, clear proof, schema, and phone-first conversion structure.`, loseCalls: ["The company sounds like every trade at once.", "Proof is present but in the wrong order.", "Service areas are mentioned without real local context.", "Mobile visitors have to work too hard to call or request an audit."], changes: ["Focus the homepage around the work the contractor wants more of.", "Order proof, process, service areas, and FAQs around buyer hesitation.", "Add city and trade links that support search without keyword stuffing.", "Make phone and form actions simple on every major section."], trust: ["License or registration cues when applicable.", "Insured status and response time.", "Reviews, project proof, and service-area clarity.", "Simple process from audit to launch."], cities: ["Anaheim", "Irvine", "Long Beach", "Pasadena", "Riverside", "Ontario", "Chula Vista", "Oceanside"], faqs: [
    { question: "Can you work with a contractor who does multiple services?", answer: "Yes. The site should still prioritize the most valuable or urgent services instead of treating every offer equally." },
    { question: "Do general contractors need city pages?", answer: "City pages help when each page has real local nuance, project fit, and proof rather than copied location text." },
    { question: "Can you improve my current site without a rebuild?", answer: "Sometimes. The audit shows whether copy, hierarchy, and CTA fixes are enough or whether the structure needs rebuilding." },
    { question: "What trust signals matter most?", answer: "Licensing, insured status, reviews, response time, service-area clarity, project proof, and a simple next step." },
    { question: "Can the site support paid ads later?", answer: "Yes. A clear contractor website gives ads a better landing experience and helps avoid paying for confused visitors." },
  ] },
  { slug: "garage-door", label: "garage door company", plural: "garage door companies", title: "Garage Door Website Design | Blue Tape Sites", description: "Garage door website design for repair urgency, installation consideration, brand clarity, and cleaner service requests.", h1: "Garage door company website design that captures urgent calls.", eyebrow: "Web design for garage door companies", serviceType: "Garage door company website design", answer: `Garage door website design helps urgent repair visitors and planned installation shoppers reach the right next step quickly. Blue Tape Sites builds garage door sites for Southern California companies that need broken-spring calls, opener repair, replacement proof, and brand trust.`, loseCalls: ["Broken spring and opener repair visitors cannot find the phone fast enough.", "Repair and install shoppers see the same proof.", "Door brands, opener brands, and warranties are missing.", "Emergency language is generic and unsupported by reviews."], changes: ["Lead urgent repair pages with phone, response time, and service area.", "Split repair, opener, spring, installation, and replacement content.", "Show brands, warranties, and recent reviews near the CTA.", "Use simple mobile flow for homeowners dealing with stuck doors."], trust: ["Phone-first repair CTAs and response framing.", "Door and opener brand experience.", "Warranty, insured status, and review proof.", "Service-area clarity for urgent dispatch."], cities: ["Anaheim", "Huntington Beach", "Rancho Cucamonga", "Oceanside", "Ontario", "Irvine"], faqs: [
    { question: "Do garage door repair pages need emergency CTAs?", answer: "Yes. Broken springs, stuck doors, and opener failures are urgent, so the phone path should be visible immediately." },
    { question: "Should installs and repairs be separate?", answer: "Yes. Repair visitors need speed and trust; install shoppers need brands, options, warranty, and proof." },
    { question: "Can you show garage door brands?", answer: "Yes. Brand familiarity helps replacement shoppers feel safer, especially when paired with warranty language." },
    { question: "Can the website support same-day service language?", answer: "Yes, if the business offers it. We place that near phone CTAs and local service-area proof." },
    { question: "Do garage door companies need city pages?", answer: "They often help because urgent repair searches are local, especially when pages include real neighborhood and service-area context." },
  ] },
];

const industryPage = (seed: IndustrySeed): SeoPage => ({
  path: `/web-design-for-${seed.slug}`,
  title: seed.title,
  description: seed.description,
  h1: seed.h1,
  eyebrow: seed.eyebrow,
  summary: seed.answer,
  answer: seed.answer,
  serviceType: seed.serviceType,
  breadcrumbLabel: seed.label.replace(/^\w/, char => char.toUpperCase()),
  sections: [
    { title: `The 4 reasons ${seed.label} websites lose calls`, bullets: seed.loseCalls },
    { title: "What we change", bullets: seed.changes },
    { title: "How it works", bullets: ["Day 1: send the site and get the highest-priority trust, mobile, and local search issues identified.", "Days 3-7: rebuild the core page flow, rewrite the offer, place proof, and tighten phone and form CTAs.", "Day 8-10: revise, launch, submit the sitemap, and make sure crawlable HTML contains the H1, FAQ, schema, and phone number."] },
    { title: `Trust signals on ${seed.label} sites`, bullets: seed.trust },
    { title: "Where we work", links: seed.cities.map(city => ({ label: city, href: cityHref(city), description: `Local contractor web design page for ${city}.` })) },
    { title: "Request a trade-specific audit", body: `${BUSINESS.brand} will review your ${seed.label} website for call clarity, local relevance, proof order, schema, and whether the first 100 words answer the buyer's question. ${phoneLine}` },
  ],
  faq: seed.faqs,
  type: "industry",
});

export const industrySeoPages: SeoPage[] = industrySeeds.map(industryPage);

export const allSeoPages = [...coreSeoPages, ...industrySeoPages, ...citySeoPages];

export const getSeoPageByPath = (path: string) =>
  allSeoPages.find(page => page.path === path.replace(/\/$/, "") || (page.path === "/" && path === "/"));
