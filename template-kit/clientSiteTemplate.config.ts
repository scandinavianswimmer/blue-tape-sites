export type ClientSiteTemplateData = {
  company: {
    name: string;
    trade: string;
    serviceArea: string;
    phone: string;
    email?: string;
    logoUrl: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    supportingCopy: string;
    trustPoints: string[];
    heroImageUrl: string;
    heroImageAlt: string;
  };
  services: Array<{
    name: string;
    summary: string;
    bullets: string[];
  }>;
  proof: {
    stats: Array<{
      label: string;
      value: string;
    }>;
    testimonials: Array<{
      quote: string;
      name: string;
      company?: string;
    }>;
  };
  differentiators: Array<{
    title: string;
    description: string;
  }>;
  process: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  serviceArea: {
    title: string;
    description: string;
    locations: string[];
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  finalCta: {
    headline: string;
    supportingCopy: string;
  };
};

export const demoClientSiteTemplateData: ClientSiteTemplateData = {
  company: {
    name: "Harbor Plumbing Co.",
    trade: "Plumbing",
    serviceArea: "Orange County and nearby Southern California cities",
    phone: "(714) 555-0123",
    email: "office@harborplumbingco.com",
    logoUrl: "https://example.com/logo.png",
    primaryCtaLabel: "Call for Service",
    primaryCtaHref: "tel:+17145550123",
    secondaryCtaLabel: "Request an Estimate",
    secondaryCtaHref: "#contact",
  },
  hero: {
    eyebrow: "Trusted plumbing across Orange County",
    headline: "Plumbing help that feels easier to trust from the first click.",
    supportingCopy:
      "Make the service, service area, and next step obvious fast so homeowners stop hesitating and start calling.",
    trustPoints: [
      "Licensed and insured",
      "Fast response for urgent calls",
      "Clear estimates and cleaner communication",
    ],
    heroImageUrl: "https://example.com/plumber-truck-and-tech.jpg",
    heroImageAlt: "Plumbing technician standing beside a branded service truck",
  },
  services: [
    {
      name: "Emergency plumbing",
      summary: "Lead with speed, clarity, and a phone-first path for urgent homeowners.",
      bullets: ["Burst pipes", "Drain backups", "Leak isolation"],
    },
    {
      name: "Water heater service",
      summary: "Frame repair versus replacement clearly so customers know what to do next.",
      bullets: ["Repairs", "Replacements", "Tankless upgrades"],
    },
    {
      name: "Whole-home plumbing",
      summary: "Show the company can handle the everyday work as well as the emergency jobs.",
      bullets: ["Fixture installs", "Repipes", "Pressure issues"],
    },
  ],
  proof: {
    stats: [
      { label: "Years serving local homeowners", value: "18+" },
      { label: "Average review rating", value: "4.9★" },
      { label: "Primary service region", value: "Orange County" },
    ],
    testimonials: [
      {
        quote:
          "They answered fast, told us what to expect, and the site finally looks like the quality of work they actually do.",
        name: "Sara M.",
      },
      {
        quote:
          "The message is clearer, the call button is obvious, and it feels much easier to trust them at a glance.",
        name: "Daniel R.",
      },
    ],
  },
  differentiators: [
    {
      title: "Clearer trust at first glance",
      description: "Use proof, service language, and CTA hierarchy that reduce hesitation immediately.",
    },
    {
      title: "Better local relevance",
      description: "Make service area coverage feel specific instead of vague or keyword-stuffed.",
    },
    {
      title: "Stronger mobile conversion",
      description: "Prioritize thumb-friendly CTA access and simpler scanning for visitors on the move.",
    },
  ],
  process: [
    {
      step: "01",
      title: "You reach out",
      description: "The customer sees a clear call path or estimate request right away.",
    },
    {
      step: "02",
      title: "You get a straight answer",
      description: "Set expectations clearly about timing, service fit, and next steps.",
    },
    {
      step: "03",
      title: "The work feels handled",
      description: "Use proof and follow-through language that reinforces professionalism.",
    },
  ],
  serviceArea: {
    title: "Built for how local service decisions actually happen",
    description:
      "Customers should know quickly whether you work in their area and whether they can trust you to show up ready.",
    locations: ["Anaheim", "Fullerton", "Orange", "Costa Mesa", "Irvine"],
  },
  faq: [
    {
      question: "Do you handle emergency calls?",
      answer: "Yes. If emergency service is part of the business, put that answer high on the page and make the phone CTA obvious.",
    },
    {
      question: "Do you only serve Orange County?",
      answer: "List the real service area clearly and only expand when the company truly serves those markets.",
    },
  ],
  finalCta: {
    headline: "Make it easier for the right customer to call with confidence.",
    supportingCopy:
      "Close with one direct action, one simple fallback, and enough trust for the next step to feel low-friction.",
  },
};
