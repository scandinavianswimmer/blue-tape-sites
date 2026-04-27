export type TradeLandingPageKey = "plumber" | "remodeler";

export type TradeLandingPoint = {
  title: string;
  description: string;
};

export type TradeLandingFaq = {
  question: string;
  answer: string;
};

export type TradeLandingPageData = {
  key: TradeLandingPageKey;
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroSummary: string;
  heroDetail: string;
  audienceLabel: string;
  promise: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  problemTitle: string;
  problemIntro: string;
  painPoints: TradeLandingPoint[];
  outcomesTitle: string;
  outcomesIntro: string;
  outcomes: TradeLandingPoint[];
  spotlightTitle: string;
  spotlightIntro: string;
  spotlightPoints: TradeLandingPoint[];
  proofTitle: string;
  proofIntro: string;
  proofCards: TradeLandingPoint[];
  faqTitle: string;
  faqs: TradeLandingFaq[];
  auditTitle: string;
  auditBody: string;
  relatedArticleTitle: string;
  relatedArticleHref: string;
  accentClass: string;
  accentSurfaceClass: string;
  structuredDataName: string;
  audienceType: string;
};

export const tradeLandingPages: Record<TradeLandingPageKey, TradeLandingPageData> = {
  plumber: {
    key: "plumber",
    path: "/web-design-for-plumbers",
    seoTitle: "Web Design for Plumbers | Blue Tape Sites",
    seoDescription:
      "Blue Tape Sites builds plumbing websites that turn urgency into clearer trust, stronger mobile calls, and more confident service requests.",
    eyebrow: "Web design for plumbing companies",
    heroTitle: "Your plumbing website should turn urgency into booked calls.",
    heroSummary:
      "When a homeowner needs a plumber, the website has to make the company feel credible in seconds. Blue Tape Sites helps plumbing businesses tighten the trust signals, service framing, and mobile clarity that affect whether someone calls now or keeps shopping.",
    heroDetail:
      "This is not generic contractor marketing. It is website design for plumbing companies that need to look dependable fast, explain the work clearly, and make the next step obvious on a phone.",
    audienceLabel: "Built for plumbers, rooter teams, drain specialists, and emergency service operators.",
    promise: "Turn urgent searches and referral follow-ups into more confident calls.",
    primaryCtaLabel: "Request your plumbing audit",
    secondaryCtaLabel: "See pricing and scope",
    problemTitle: "Why many plumbing sites lose the call before the phone rings",
    problemIntro:
      "A plumbing website usually fails in practical ways, not dramatic ones. The page loads, but the homeowner still hesitates because the trust is thin, the service fit feels vague, or the phone action gets buried in clutter.",
    painPoints: [
      {
        title: "Mobile urgency gets buried",
        description:
          "When someone is on a wet floor or trying to stop a leak, they should not have to hunt for the service area, emergency framing, or tap-to-call action.",
      },
      {
        title: "The proof shows up too late",
        description:
          "Reviews, guarantees, licensing cues, and team credibility often appear after the visitor has already decided the company feels risky or generic.",
      },
      {
        title: "The services sound broad instead of specific",
        description:
          "If drain cleaning, water heaters, leak repair, and emergency response all blur together, the customer has less confidence that the company handles their exact problem.",
      },
    ],
    outcomesTitle: "What a better plumbing website does",
    outcomesIntro:
      "The right plumbing page does not just look cleaner. It reduces hesitation, frames the work more clearly, and makes homeowners feel safer choosing the business quickly.",
    outcomes: [
      {
        title: "Builds trust at speed",
        description:
          "The first screen makes the company feel real, local, and ready to help instead of anonymous or template-driven.",
      },
      {
        title: "Makes services easier to act on",
        description:
          "Visitors can tell right away whether the company handles the exact issue, where the team works, and how to get in touch.",
      },
      {
        title: "Turns referral traffic colder less often",
        description:
          "When someone hears about the business through a friend or a listing, the site reinforces that trust instead of draining it.",
      },
    ],
    spotlightTitle: "What plumbing visitors need to see fast",
    spotlightIntro:
      "A stronger plumbing page makes a few things unmistakable immediately: the company solves urgent problems, the service area is clear, and the next step is easy without a sales maze.",
    spotlightPoints: [
      {
        title: "A strong first-line offer",
        description:
          "The page should say what kind of plumbing work you handle and why someone should trust you before they ever scroll to the details.",
      },
      {
        title: "Proof near the call action",
        description:
          "Ratings, guarantees, licensing signals, and recognizable service promises belong near the place where the customer decides to call.",
      },
      {
        title: "Service and service-area clarity",
        description:
          "Water heaters, drain issues, leak repairs, fixture work, and emergency calls should feel distinct instead of buried in one generic contractor paragraph.",
      },
    ],
    proofTitle: "What Blue Tape Sites tightens for plumbers",
    proofIntro:
      "The goal is not decoration. The goal is to make the site feel fast, specific, and dependable enough that homeowners stop second-guessing the company.",
    proofCards: [
      {
        title: "Sharper CTA hierarchy",
        description:
          "The phone action, form path, and urgent next step become easier to find on desktop and mobile without turning the page into noise.",
      },
      {
        title: "Better trust sequencing",
        description:
          "Reviews, response framing, credentials, and service proof land in the order that helps a cautious homeowner feel more certain faster.",
      },
      {
        title: "More specific service-page direction",
        description:
          "The plumbing site structure becomes easier to expand into targeted service pages and local search pages without sounding repetitive.",
      },
    ],
    faqTitle: "Questions plumbers usually ask before they rebuild the site",
    faqs: [
      {
        question: "Do plumbing companies always need a full rebuild?",
        answer:
          "No. Some plumbing sites need a stronger homepage, clearer service structure, and better trust placement more than they need a total rebuild. The audit is meant to show which path makes the most sense.",
      },
      {
        question: "Can a better website actually help with emergency-call work?",
        answer:
          "Yes, especially when the page makes the service fit, phone action, and trust signals easier to recognize immediately on mobile.",
      },
      {
        question: "What if we already get referrals?",
        answer:
          "That usually makes the website more important, not less. Referral traffic still checks the site before calling, and the site can either reinforce the recommendation or weaken it.",
      },
    ],
    auditTitle: "Request a plumbing-specific website audit",
    auditBody:
      "Blue Tape Sites can review the first-screen trust, mobile CTA path, service clarity, and proof sequence that affect whether a plumbing visitor calls with confidence or leaves unsure.",
    relatedArticleTitle: "How to write a homepage for a plumbing company",
    relatedArticleHref: "/blog/how-to-write-a-homepage-for-a-plumbing-company",
    accentClass: "from-sky-600 via-cyan-500 to-blue-300",
    accentSurfaceClass: "bg-[#eef7ff]",
    structuredDataName: "Web design for plumbing companies",
    audienceType: "Plumbing companies",
  },
  remodeler: {
    key: "remodeler",
    path: "/web-design-for-remodelers",
    seoTitle: "Web Design for Remodelers | Blue Tape Sites",
    seoDescription:
      "Blue Tape Sites designs remodeler websites that pre-sell craftsmanship, strengthen project presentation, and attract better-fit renovation inquiries.",
    eyebrow: "Web design for remodelers",
    heroTitle: "Your website should pre-sell the quality of your work before the first consultation.",
    heroSummary:
      "Remodeling buyers are not just hiring a contractor. They are judging taste, process, trust, and whether the company feels expensive in the right way. Blue Tape Sites helps remodelers present their work with sharper credibility, stronger project storytelling, and clearer qualification cues.",
    heroDetail:
      "The goal is a site that makes strong craftsmanship feel established online instead of ordinary. Better presentation does not just improve aesthetics. It helps better-fit leads arrive with more confidence and fewer doubts.",
    audienceLabel: "Built for design-build firms, kitchen and bath remodelers, renovation companies, and higher-consideration home-improvement brands.",
    promise: "Raise perceived quality, filter for better-fit leads, and make your work feel more valuable before the consultation starts.",
    primaryCtaLabel: "Request your remodeler audit",
    secondaryCtaLabel: "Review pricing and fit",
    problemTitle: "Why many remodeler sites undersell strong work",
    problemIntro:
      "A remodeler website usually misses because it sounds broad, shows projects weakly, or fails to explain the process in a way that builds confidence. The work may be excellent, but the presentation still feels flat.",
    painPoints: [
      {
        title: "The site looks generic next to premium work",
        description:
          "When the typography, layout, and hierarchy feel ordinary, the business loses the chance to signal craftsmanship before the first meeting.",
      },
      {
        title: "Project pages do not carry enough sales weight",
        description:
          "If galleries lack context, process, and story, visitors see pictures without understanding the standards behind the finished result.",
      },
      {
        title: "The process stays vague",
        description:
          "Higher-value buyers want to understand how the company communicates, scopes, and delivers the work. Thin process framing makes a premium business feel less established.",
      },
    ],
    outcomesTitle: "What a stronger remodeler website does",
    outcomesIntro:
      "A better remodeler site helps the company look more considered, makes the work feel more valuable, and improves how prospects self-qualify before they ever book a call.",
    outcomes: [
      {
        title: "Raises perceived quality",
        description:
          "The overall presentation signals that the business is careful, organized, and worth a closer look before the first consultation starts.",
      },
      {
        title: "Improves project storytelling",
        description:
          "Instead of a simple gallery dump, the site can show the thought process, standards, and finish that make the work worth the price.",
      },
      {
        title: "Filters for better-fit leads",
        description:
          "The right prospects arrive more informed about process, scope, and expectations, which reduces wasted conversations and weak inquiries.",
      },
    ],
    spotlightTitle: "What remodeler buyers need to feel before they reach out",
    spotlightIntro:
      "A remodeler site has to do more than show pretty photos. It has to suggest discipline, taste, communication, and a process that serious homeowners can trust.",
    spotlightPoints: [
      {
        title: "Project pages that sell more than visuals",
        description:
          "The strongest project presentation explains the challenge, the approach, and the finished result so the craftsmanship feels intentional and premium.",
      },
      {
        title: "Clear process framing",
        description:
          "Buyers want to understand how discovery, planning, communication, and execution are handled before they commit time to a consultation.",
      },
      {
        title: "Proof that supports a premium position",
        description:
          "Testimonials, founder credibility, project detail, and quality cues should reinforce why the company is worth shortlisting at a higher level.",
      },
    ],
    proofTitle: "What Blue Tape Sites tightens for remodelers",
    proofIntro:
      "The site should make the company feel more established without sliding into vague luxury language or generic design-agency tropes.",
    proofCards: [
      {
        title: "Stronger project architecture",
        description:
          "Project pages become easier to navigate, more convincing to read, and more useful for selling standards, taste, and process.",
      },
      {
        title: "Sharper premium positioning",
        description:
          "The copy and hierarchy help the business feel more deliberate, more credible, and more aligned with the level of work it actually delivers.",
      },
      {
        title: "Better lead qualification",
        description:
          "The website can answer common questions earlier so weaker-fit inquiries self-filter and stronger-fit leads move forward with more confidence.",
      },
    ],
    faqTitle: "Questions remodelers usually ask before they change the site",
    faqs: [
      {
        question: "Do remodelers always need a new website to look more premium?",
        answer:
          "Not always. Some remodeler sites need a clearer project structure, stronger process framing, and better proof placement more than they need a full rebuild.",
      },
      {
        question: "Can a website really influence lead quality for remodeling work?",
        answer:
          "Yes. When the site makes pricing posture, process, and project standards easier to understand, more of the wrong-fit leads fall away before the consultation.",
      },
      {
        question: "What if the work is excellent but we do not have polished case studies yet?",
        answer:
          "The site can still frame the work better with sharper project organization, cleaner captions, stronger process notes, and more deliberate proof until a fuller case-study library is ready.",
      },
    ],
    auditTitle: "Request a remodeler-specific website audit",
    auditBody:
      "Blue Tape Sites can review how your project presentation, trust cues, process framing, and lead-qualification path are helping or hurting the kind of inquiries your website attracts.",
    relatedArticleTitle: "Why your website needs real proof to stand out in search",
    relatedArticleHref: "/blog/why-your-website-needs-real-proof-to-stand-out-in-search",
    accentClass: "from-slate-900 via-zinc-700 to-amber-400",
    accentSurfaceClass: "bg-[#f3f2ef]",
    structuredDataName: "Web design for remodelers",
    audienceType: "Remodeling companies",
  },
};
