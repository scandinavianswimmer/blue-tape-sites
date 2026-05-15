/*
Design reminder for this page: professional editorial restraint for a premium home-service web studio.
Favor clarity over spectacle, reduce generated-looking UI tropes, and make every section feel deliberate,
credible, and businesslike. Keep the blue tape motif precise and sparing.
*/

import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  ClipboardList,
  Clock3,
  MapPin,
  Menu,
  PhoneCall,
  ScanSearch,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { applyHomeSeo, SITE_URL, SOCIAL_IMAGE_URL } from "@/lib/seo";
import { trpc } from "@/lib/trpc";
import { BUSINESS, trustStripItems } from "@shared/business";

type AuditFormState = {
  websiteUrl: string;
  primaryTrade: string;
  contactInfo: string;
};

type PricingPackage = {
  name: string;
  category: string;
  price: string;
  tag: string;
  popular: boolean;
  audienceFit?: string;
  features: string[];
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Service Area", href: "/service-area" },
  { label: "Pricing", href: "/pricing" },
  { label: "Examples", href: "/examples" },
  { label: "Case Studies", href: "/case-studies/marias-family-cleaning" },
  { label: "Blog", href: "/blog" },
  { label: "Audit", href: "/audit" },
];

const buildCards = [
  {
    title: "Inspect first",
    description:
      "We show you exactly what is making the page look weak, what is slowing customers down, and what should be fixed before you spend another dollar sending traffic to it.",
    icon: ScanSearch,
  },
  {
    title: "Write it straight",
    description:
      "Your offer gets easier to understand, the business sounds more established, and customers can trust what you do faster without sorting through agency fluff.",
    icon: ShieldCheck,
  },
  {
    title: "Launch without drift",
    description:
      "You get a tighter revision process, fewer delays, and a site that is ready to start pulling its weight sooner instead of dragging through endless back-and-forth.",
    icon: Clock3,
  },
];

const testimonials = [
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

const exampleSites = [
  {
    name: "Real client: Maria's Family Cleaning ->",
    niche: "Case Study",
    direction: "Bilingual residential cleaning site",
    result: "Built to turn trust into quote requests.",
    summary: "A live Orange County cleaning company site with bilingual identity, visible reviews, transparent pricing, and a quote flow built for busy homeowners.",
    proof: "247+ OC families served, 5.0 rating, 127+ reviews, bonded and insured, and same-day availability above the fold.",
    layout: "Warm family-run positioning paired with a conversion-focused booking path and city-level service-area proof.",
    eyebrow: "Live client",
    cardClass: "bg-[#eefaf4]",
    frameClass: "border-emerald-200/80",
    accentClass: "from-emerald-700 via-teal-500 to-sky-300",
    titleClass: "font-[\"Space_Grotesk\"] tracking-[-0.04em]",
    href: "/case-studies/marias-family-cleaning",
    image: "/case-studies/marias-family-cleaning/desktop-home.webp",
  },
  {
    name: "Emergency Plumber: Harbor Plumbing Co.",
    niche: "Plumbing",
    direction: "Emergency-first residential homepage",
    result: "Designed to prioritize calls and local trust.",
    summary: "A high-trust plumbing homepage with faster call decisions, strong neighborhood proof, and a cleaner service breakdown for urgent homeowners.",
    proof: "After-hours phone CTA, financing note, and review-led trust bar.",
    layout: "Strong left-to-right urgency layout with stacked service proof and a brighter call-first accent system.",
    eyebrow: "Call-first direction",
    cardClass: "bg-[#eef7ff]",
    frameClass: "border-sky-200/80",
    accentClass: "from-sky-600 via-cyan-500 to-cyan-300",
    titleClass: "font-[\"Space_Grotesk\"]",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-mockup-plumbing-kDb4zgAXztNV984DxggUhy.webp",
  },
  {
    name: "Commercial Electrician: Northline Electric",
    niche: "Electrical",
    direction: "Commercial-leaning contractor homepage",
    result: "Designed to prioritize calls and local trust.",
    summary: "A firmer, more technical homepage for an electrical contractor that needs sharper hierarchy, cleaner credential framing, and a more engineered tone.",
    proof: "License framing, project-category tiles, and a denser spec-sheet style content rhythm.",
    layout: "Structured grid with darker surfaces, stricter spacing, and stronger contrast for a more code-conscious feel.",
    eyebrow: "Spec-driven direction",
    cardClass: "bg-[#f3f2ef]",
    frameClass: "border-slate-300/80",
    accentClass: "from-slate-900 via-slate-700 to-amber-400",
    titleClass: "font-sans uppercase tracking-[0.02em]",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-mockup-electrical-6mTRizFnD8CQC45i4RhudC.webp",
  },
  {
    name: "Recurring Cleaning Service: Greyline Cleaning",
    niche: "Cleaning",
    direction: "Hospitality-grade recurring-service homepage",
    result: "Designed to prioritize calls and local trust.",
    summary: "A cleaner, warmer homepage that still feels premium, with lighter touchpoints, recurring-service trust cues, and polished proof.",
    proof: "Crew consistency message, recurring-plan framing, and polished before-and-after confidence cues.",
    layout: "Airier editorial layout with softer neutrals, more breathing room, and a hospitality-style presentation system.",
    eyebrow: "Recurring-service direction",
    cardClass: "bg-[#f6f2ee]",
    frameClass: "border-stone-200/80",
    accentClass: "from-stone-700 via-zinc-500 to-emerald-300",
    titleClass: "font-[\"Space_Grotesk\"] tracking-[-0.04em]",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-mockup-cleaning-eCsrUsVc8wRXy8xwfTxK76.webp",
  },
];

const projectPackages: PricingPackage[] = [
  {
    name: "Blueprint",
    category: "New build",
    price: "$995",
    tag: "Starter clarity",
    popular: false,
    audienceFit: "Best for owner-operators who need a credible presence fast.",
    features: [
      "Single landing page built to make the business look credible fast",
      "Fixes confusing messaging so customers trust the business sooner",
      "Mobile-first layout that makes it easier for local visitors to call",
      "Fast launch for owner-operators who need a stronger web presence now",
    ],
  },
  {
    name: "Framing",
    category: "New build",
    price: "$2,495",
    tag: "Most Popular",
    popular: true,
    audienceFit: "Most popular. For growing teams ready to convert more visitors into calls.",
    features: [
      "Multi-section homepage built to guide visitors toward the call or form",
      "Restructures the offer so customers understand what you do faster",
      "Adds the proof, FAQ, and service details that reduce hesitation",
      "Makes the company feel established without piling on clutter",
    ],
  },
  {
    name: "Turnkey",
    category: "New build",
    price: "$4,995",
    tag: "Highest touch",
    popular: false,
    audienceFit: "For established companies replacing a site that undersells them.",
    features: [
      "Full premium website system with the core pages needed to sell better",
      "Service-specific messaging that helps each offer feel easier to trust",
      "Proof placement and page flow designed to turn more visits into calls",
      "Built for companies ready to look as dialed-in online as they are in the field",
    ],
  },
  {
    name: "Patch & Paint",
    category: "Redesign",
    price: "$795",
    tag: "Quick repair",
    popular: false,
    audienceFit: "Best when the structure exists but the page still feels hard to trust.",
    features: [
      "Refines the parts of the site that are closest to pulling their weight",
      "Tightens copy, hierarchy, and CTA placement so customers act faster",
      "Best when the structure exists but the page still feels hard to trust",
      "Good fit for cleaning up the biggest leaks before a larger rebuild",
    ],
  },
  {
    name: "Remodel",
    category: "Redesign",
    price: "$2,195",
    tag: "Most Popular",
    popular: true,
    audienceFit: "For strong businesses with websites that do not match their reputation.",
    features: [
      "Strategic redesign of the core lead path from first visit to inquiry",
      "Improves proof order and mobile flow so visitors lose less confidence",
      "Ideal when the business is strong but the website still undersells it",
      "Designed to get more calls and more value from the traffic you already have",
    ],
  },
  {
    name: "Full Renovation",
    category: "Redesign",
    price: "$4,495",
    tag: "Comprehensive rebuild",
    popular: false,
    audienceFit: "For replacing a dated site that is dragging down perception.",
    features: [
      "Rebuilds the visual system and messaging so the business feels stronger at first glance",
      "Premium presentation across the homepage and the pages customers actually check",
      "Cleaner structure for offers, proof, and service pages so decisions happen faster",
      "For established companies replacing a dated site that is dragging down perception",
    ],
  },
];

const retainers = [
  {
    name: "Blue Tape Retainer",
    price: "$295/mo",
    features: [
      "Monthly site checkup, priority text edits, and light cleanup work",
      "Seasonal offer swaps and homepage tune-ups without surprise add-on bills",
      "Best for small teams that want the site kept sharp without chasing a developer",
    ],
  },
  {
    name: "Crew Lead Retainer",
    price: "$595/mo",
    features: [
      "Conversion review, content refinements, and support for new landing pages",
      "Ongoing speed, trust, and proof improvements as offers and service areas expand",
      "Best for growing operators who need the site to keep up with the business",
    ],
  },
  {
    name: "Jobsite Priority Retainer",
    price: "$995/mo",
    features: [
      "Higher-touch optimization across the pages that drive the most revenue",
      "Campaign updates, design refinements, and offer changes handled quickly",
      "Built for companies that want a responsive web partner without getting the runaround",
    ],
  },
];

const serviceAreas = [
  {
    title: "Orange County",
    copy: "Anaheim, Irvine, Huntington Beach, Santa Ana",
  },
  {
    title: "Los Angeles County",
    copy: "Long Beach, Torrance, Santa Monica, Pasadena",
  },
  {
    title: "Inland Empire",
    copy: "Riverside, Ontario, Rancho Cucamonga",
  },
  {
    title: "San Diego County",
    copy: "Oceanside, Escondido, Chula Vista",
  },
];

const faqs = [
  {
    question: "Why Blue Tape Sites?",
    answer:
      "Because most home-service websites do not fail from one giant mistake. They lose work through smaller misses: weak hierarchy, thin trust, generic language, and clumsy mobile flow. We fix those like a punch-list.",
  },
  {
    question: "Do you only work with plumbers?",
    answer:
      "No. We work with plumbers, electricians, cleaning companies, garage door teams, HVAC businesses, and other home-service operators that need a sharper, more trustworthy web presence.",
  },
  {
    question: "How does the local SEO part fit in?",
    answer:
      "We structure the site so your service area is obvious in the metadata, headings, proof, and conversion language. For Southern California growth, the next step after launch is building strong city-specific pages instead of thin keyword-stuffed copies.",
  },
  {
    question: "Can you rebuild my current site instead of starting over?",
    answer:
      "Yes. If the bones are workable, we can tighten the message and rebuild the lead path without starting from zero. If the site fights the business, we will usually recommend a cleaner rebuild.",
  },
  {
    question: "What happens after I request the audit?",
    answer:
      "Your request comes through as a real lead, we review the site for the biggest trust and clarity problems, and you get a direct recommendation on what should be fixed first without a bunch of agency fog.",
  },
];

const initialFormState: AuditFormState = {
  websiteUrl: "",
  primaryTrade: "",
  contactInfo: "",
};

const howItWorksSteps = [
  {
    title: "Send Your Site",
    timing: "Day 1",
    copy: "We review your current site and mark what is broken.",
    icon: ClipboardList,
  },
  {
    title: "We Rebuild the Core Pages",
    timing: "Days 3-7",
    copy: "You review. We revise. No endless back-and-forth.",
    icon: Wrench,
  },
  {
    title: "Launch and Start Getting Calls",
    timing: "Day 8-10",
    copy: "Your site goes live. You stop losing customers to confusion.",
    icon: PhoneCall,
  },
];

function normalizeWebsiteUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function deriveCompanyNameFromWebsite(value: string) {
  try {
    const hostname = new URL(value).hostname.replace(/^www\./i, "");
    const primaryLabel = hostname.split(".")[0] || hostname;
    const cleaned = primaryLabel.replace(/[-_]+/g, " ").trim();

    if (!cleaned) {
      return "Blue Tape Sites audit lead";
    }

    return cleaned.replace(/\b\w/g, character => character.toUpperCase());
  } catch {
    return "Blue Tape Sites audit lead";
  }
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:mb-5 sm:text-[0.74rem]">
      <span className="h-px w-10 bg-blue-600" />
      {children}
    </div>
  );
}

function scrollToAudit() {
  window.location.href = "/audit";
}

function PackageCard({
  item,
  darkButton = false,
}: {
  item: PricingPackage | ((typeof retainers)[number] & { category?: string; tag?: string; popular?: boolean; audienceFit?: string });
  darkButton?: boolean;
}) {
  const isPopular = "popular" in item && Boolean(item.popular);
  const tag = "tag" in item ? item.tag : undefined;
  const category = "category" in item ? item.category : undefined;
  const audienceFit = "audienceFit" in item ? item.audienceFit : undefined;

  return (
    <div
      className={`flex h-full flex-col border border-black/8 bg-white p-5 sm:p-6 ${
        isPopular ? "package-card package-card--featured" : "package-card"
      }`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-black/6 pb-4">
        <div>
          {category ? <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{category}</p> : null}
          <h4 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.05em] text-[#111111]">{item.name}</h4>
          {tag ? <p className="mt-1 text-sm text-slate-500">{tag}</p> : null}
        </div>
        {isPopular ? <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">Popular</div> : null}
      </div>

      <div className="mt-5 text-[2.35rem] font-semibold tracking-[-0.06em] text-[#111111]">{item.price}</div>
      {audienceFit ? <p className="mt-3 text-sm leading-6 text-slate-500">{audienceFit}</p> : null}
      <div className="mt-5 flex-1 space-y-3">
        {item.features.map(feature => (
          <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            {darkButton ? <Check className="mt-0.5 size-4 shrink-0 text-blue-600" /> : <BadgeCheck className="mt-0.5 size-4 shrink-0 text-blue-600" />}
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={scrollToAudit}
        className={`mt-8 h-12 w-full rounded-none border px-5 text-sm font-semibold uppercase tracking-[0.08em] ${
          darkButton
            ? "border-[#111111] bg-[#111111] text-white hover:bg-slate-800"
            : "border-[#111111] bg-white text-[#111111] hover:bg-[#111111] hover:text-white"
        }`}
      >
        Request an Audit
      </Button>
    </div>
  );
}

const featuredSearchGuides = [
  {
    href: "/blog/local-seo-for-contractors-what-actually-brings-calls",
    title: "Local SEO for contractors: what actually brings calls",
    description: "Use this if you want the clearest explanation of what helps a service business rank locally and what just adds noise.",
  },
  {
    href: "/blog/the-service-page-formula-for-home-service-businesses",
    title: "The service page formula for home-service businesses",
    description: "Use this when a visitor lands on the wrong page, gets confused, or cannot tell what you actually offer fast enough.",
  },
  {
    href: "/blog/how-to-write-a-homepage-for-a-plumbing-company",
    title: "How to write a homepage for a plumbing company",
    description: "Use this when you need sharper homepage messaging, better trust framing, and a clearer reason to call.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<AuditFormState>(initialFormState);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [submissionTone, setSubmissionTone] = useState<"success" | "error" | null>(null);

  const heroStats = useMemo(
    () => [
      {
        value: "Stop Losing Customers to Bad First Impressions",
        label:
          "Your site loads fast, looks credible on mobile, and makes your business look as established as the work you do.",
      },
      {
        value: "Turn Visitors Into Callers",
        label:
          "Phone number, form, and scheduling CTA placed where customers actually look. No hunting. No confusion.",
      },
      {
        value: "Grow Into New Cities Without Rebuilding",
        label:
          "Expand service areas, add pages, and update offers without starting from scratch every time.",
      },
    ],
    []
  );

  useEffect(() => {
    applyHomeSeo();
  }, []);

  const auditMutation = trpc.leads.submitAudit.useMutation({
    onSuccess: result => {
      const message = result.notifiedOwner
        ? "Audit request received. Your details landed correctly and are already moving into review."
        : "Audit request received. Your details landed correctly and are queued for follow-up.";

      setSubmissionTone("success");
      setSubmissionMessage(message);
      setFormData(initialFormState);
      toast.success("Audit request received", {
        id: "audit-submit",
        description: result.notifiedOwner
          ? "Everything landed correctly and the lead was forwarded for follow-up."
          : "Everything landed correctly and is stored for follow-up.",
      });
    },
    onError: error => {
      const message = error.message || "There was a problem submitting the audit request.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.error("Audit request not sent", {
        id: "audit-submit",
        description: message,
      });
    },
  });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
    "@id": `${SITE_URL}/#professional-service`,
    name: "Blue Tape Sites",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    image: SOCIAL_IMAGE_URL,
    description:
      "Blue Tape Sites builds premium, lead-focused websites for plumbers, electricians, cleaners, and home-service businesses that need more trust and more qualified calls.",
    telephone: BUSINESS.telephone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.telephone,
      contactType: "customer service",
      areaServed: "US-CA",
      availableLanguage: ["English"],
    },
    knowsAbout: [
      "home-service web design",
      "contractor web design",
      "local SEO for service businesses",
      "website conversion improvement",
    ],
    areaServed: serviceAreas.map(area => ({ "@type": "AdministrativeArea", name: area.title })),
    serviceType: [
      "Web design for plumbers",
      "Web design for electricians",
      "Web design for cleaning companies",
      "Contractor website redesign",
      "Local SEO-friendly service business websites",
    ],
    review: testimonials.map(item => ({
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
    })),
  };

  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    name: "Blue Tape Sites | Web Design for Service Businesses",
    url: SITE_URL,
    description:
      "Blue Tape Sites helps plumbers, electricians, cleaners, and contractors build more trust, stronger local visibility, and more qualified calls.",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#professional-service`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: SOCIAL_IMAGE_URL,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const handleFieldChange = (field: keyof AuditFormState, value: string) => {
    setFormData(current => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionMessage(null);
    setSubmissionTone(null);

    const formPayload = new FormData(event.currentTarget);
    const honeypot = formPayload.get("company_website")?.toString() || "";
    const normalizedWebsite = normalizeWebsiteUrl(formData.websiteUrl);
    const contactValue = formData.contactInfo.trim();
    const looksLikeEmail = contactValue.includes("@");
    const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigitCount = contactValue.replace(/\D/g, "").length;

    if (!normalizedWebsite) {
      const message = "Add your website URL so we know what to review.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.warning("Website URL needed", {
        id: "audit-submit",
        description: message,
      });
      return;
    }

    try {
      new URL(normalizedWebsite);
    } catch {
      const message = "Use a valid website URL so the audit points to the right page.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.warning("Valid website URL needed", {
        id: "audit-submit",
        description: message,
      });
      return;
    }

    if (!contactValue) {
      const message = "Add an email address or phone number so we know where to send the audit.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.warning("Contact info needed", {
        id: "audit-submit",
        description: message,
      });
      return;
    }

    if (looksLikeEmail && !validEmailPattern.test(contactValue)) {
      const message = "Use a valid email address or enter a phone number instead.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.warning("Valid contact needed", {
        id: "audit-submit",
        description: message,
      });
      return;
    }

    if (!looksLikeEmail && phoneDigitCount < 7) {
      const message = "Use a full phone number so we can send or follow up on the audit correctly.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.warning("Valid contact needed", {
        id: "audit-submit",
        description: message,
      });
      return;
    }

    const tradeLabel = formData.primaryTrade || "Other";

    toast.loading("Sending audit request", {
      id: "audit-submit",
      description: "Submitting your website details for review now.",
    });

    auditMutation.mutate({
      name: "Blue Tape audit request",
      companyName: deriveCompanyNameFromWebsite(normalizedWebsite),
      email: looksLikeEmail ? contactValue : "",
      phone: looksLikeEmail ? "" : contactValue,
      websiteUrl: normalizedWebsite,
      primaryTrade: tradeLabel,
      serviceArea: "Southern California",
      projectDetails: `Simplified homepage audit request for a ${tradeLabel} business submitted through the homepage form.`,
      honeypot,
      sourcePath: typeof window !== "undefined" ? window.location.pathname : "/",
    });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f5f1] text-[#111111] selection:bg-blue-600 selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="sticky top-0 z-50 border-b border-black/8 bg-[rgba(247,245,241,0.92)] backdrop-blur-lg">
        <div className="container flex h-18 items-center justify-between gap-4">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <div className="relative flex size-10 items-center justify-center border border-black/10 bg-white">
              <span className="h-1.5 w-6 rotate-[-28deg] bg-blue-600" />
            </div>
            <div className="min-w-0 leading-none">
              <div className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Blue Tape Sites</div>
              <div className="mt-1 text-sm font-semibold tracking-[-0.03em] text-[#111111] sm:text-base">Precision web design</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map(item => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-[#111111]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={BUSINESS.phoneHref} className="inline-flex h-11 items-center gap-2 border border-black/10 bg-white px-4 text-sm font-semibold text-[#111111] transition-colors hover:border-blue-600">
              <PhoneCall className="size-4 text-blue-700" />
              Call {BUSINESS.phoneDisplay}
            </a>
            <Button asChild className="h-11 rounded-none border border-[#111111] bg-[#111111] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800">
              <Link href="/audit">Request Your Free Audit</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href={BUSINESS.phoneHref} aria-label={`Call ${BUSINESS.phoneDisplay}`} className="inline-flex size-11 items-center justify-center border border-black/10 bg-white">
              <PhoneCall className="size-5" />
            </a>
            <button
              type="button"
              aria-label="Toggle navigation"
              className="inline-flex size-11 items-center justify-center border border-black/10 bg-white"
              onClick={() => setMobileMenuOpen(open => !open)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-black/8 bg-[#f7f5f1] lg:hidden">
            <div className="container flex flex-col gap-3 py-5">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-b border-black/6 py-2 text-base font-medium text-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-2 h-12 rounded-none border border-[#111111] bg-[#111111] text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800">
                <a href="/audit" onClick={() => setMobileMenuOpen(false)}>
                  Request Your Free Audit
                </a>
              </Button>
              <a href={BUSINESS.phoneHref} className="inline-flex h-12 items-center justify-center gap-2 border border-black/10 bg-white text-sm font-semibold uppercase tracking-[0.08em] text-[#111111]" onClick={() => setMobileMenuOpen(false)}>
                <PhoneCall className="size-4" />
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section id="home" className="border-b border-black/8">
          <div className="container grid gap-10 py-10 sm:py-16 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex border border-black/10 bg-white px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-600 sm:px-4">
                Southern California web design for serious contractors
              </div>
              <h1 className="mt-6 max-w-[12ch] text-[3rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#111111] sm:max-w-[12ch] sm:text-[4.6rem] lg:text-[5.15rem] lg:leading-[0.94] lg:tracking-[-0.065em]">
                Web Design for Contractors Who Need More Calls, Not More Complexity
              </h1>
              <p className="mt-6 max-w-[42rem] text-[1.02rem] leading-7 text-slate-600 sm:text-[1.15rem] sm:leading-8">
                Blue Tape Sites builds phone-first contractor websites for Southern California service businesses so buyers can understand what you do, see proof, and call without hunting. Get a free 5-minute video audit with a 48-hour turnaround, or call {BUSINESS.phoneDisplay}.
              </p>
              <p className="mt-4 max-w-[34rem] text-sm leading-7 text-slate-500 sm:text-[0.98rem]">
                If you are growing into new cities, adding service areas, or trying to win better jobs, you should not have to guess what the website costs, what needs fixing, or what happens next.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-13 rounded-none border border-[#111111] bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800 sm:w-auto">
                  <Link href="/audit">Get Your Free Site Audit</Link>
                </Button>
                <Button asChild variant="outline" className="h-13 rounded-none border-[#111111] bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-white sm:w-auto">
                  <Link href="/examples">See Example Sites</Link>
                </Button>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-600">
                Or call <a href={BUSINESS.phoneHref} className="font-semibold text-[#111111] underline decoration-blue-600/40 underline-offset-4">{BUSINESS.phoneDisplay}</a> - same-day reply.
              </p>
            </div>

            <div className="grid gap-4 self-end">
              <div className="border border-black/10 bg-white p-5 sm:p-6">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">What you get</div>
                <div className="mt-3 border-l-2 border-blue-600 pl-4 text-lg font-semibold tracking-[-0.04em] text-[#111111] sm:text-xl">
                  Clear offer. Clear pricing. No agency runaround.
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  You get a straight answer on what it will take, what the pricing looks like, and what the next step is without chasing someone down for basic answers.
                </p>
              </div>

              <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-3">
                {heroStats.map(stat => (
                  <div key={stat.value} className="bg-[#f7f5f1] p-5">
                    <div className="text-lg font-semibold leading-tight tracking-[-0.04em] text-[#111111]">{stat.value}</div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/8 bg-white">
          <div className="container grid gap-px bg-black/8 sm:grid-cols-2 lg:grid-cols-4">
            {trustStripItems.map(item => (
              item.href ? (
                <a key={item.value} href={item.href} className="flex items-center gap-3 bg-white px-5 py-4 transition-colors hover:bg-slate-50">
                  <PhoneCall className="size-4 shrink-0 text-blue-700" />
                  <span>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                    <span className="mt-1 block text-sm font-semibold text-[#111111]">{item.value}</span>
                  </span>
                </a>
              ) : (
                <div key={item.value} className="flex items-center gap-3 bg-white px-5 py-4">
                  <BadgeCheck className="size-4 shrink-0 text-blue-700" />
                  <span>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                    <span className="mt-1 block text-sm font-semibold text-[#111111]">{item.value}</span>
                  </span>
                </div>
              )
            ))}
          </div>
        </section>

        <section id="audit" className="container py-18 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionEyebrow>Free Blue Tape Audit</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem] lg:max-w-[10ch]">
                Let us mark up the misses before you spend more on traffic.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Send the site, tell us the trade, and give us one place to send the review. We will show you what is making the page look weak, what is hurting trust, and what should be fixed first.
              </p>

              <div className="mt-8 border border-black/10 bg-white p-4 sm:p-5">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-audit-board-V6yoJbGViP874uyi6wKV9P.webp"
                  alt="Website audit board with blue tape callouts and markup notes"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Audit request form</div>

              <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Your website URL
                  <input
                    className="h-12 border border-black/10 bg-[#faf8f4] px-4 text-base outline-none transition focus:border-blue-600"
                    placeholder="yourwebsite.com"
                    type="text"
                    name="website"
                    value={formData.websiteUrl}
                    onChange={event => handleFieldChange("websiteUrl", event.target.value)}
                    required
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  What do you do?
                  <select
                    className="h-12 border border-black/10 bg-[#faf8f4] px-4 text-base outline-none transition focus:border-blue-600"
                    name="trade"
                    value={formData.primaryTrade}
                    onChange={event => handleFieldChange("primaryTrade", event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select your trade
                    </option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Garage Doors">Garage Doors</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Email or phone
                  <input
                    className="h-12 border border-black/10 bg-[#faf8f4] px-4 text-base outline-none transition focus:border-blue-600"
                    placeholder="you@company.com or (555) 000-0000"
                    type="text"
                    name="contact"
                    value={formData.contactInfo}
                    onChange={event => handleFieldChange("contactInfo", event.target.value)}
                    required
                  />
                </label>

                <div className="hidden" aria-hidden="true">
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Company website helper
                    <input
                      className="h-12 border border-black/10 bg-[#faf8f4] px-4 outline-none"
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="border-l-2 border-blue-600 bg-[#faf8f4] px-4 py-4 text-sm leading-7 text-slate-600">
                  We send a 5-minute video audit within 48 hours. No call required unless you want one.
                </div>

                {submissionMessage ? (
                  <div
                    className={`px-4 py-4 text-sm leading-7 ${
                      submissionTone === "success"
                        ? "border-l-2 border-blue-600 bg-[#f3f6ff] text-slate-700"
                        : "border-l-2 border-red-600 bg-[#fff6f6] text-slate-700"
                    }`}
                  >
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {submissionTone === "success" ? "Submission status" : "Needs attention"}
                    </div>
                    <div className="mt-2">{submissionMessage}</div>
                  </div>
                ) : null}

                <Button
                  type="submit"
                  disabled={auditMutation.isPending}
                  className="h-13 rounded-none border border-[#111111] bg-[#111111] text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800"
                >
                  {auditMutation.isPending ? "Sending Audit Request..." : "Get Your Free Site Audit"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="container py-18 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-16">
            <div>
              <SectionEyebrow>What Gets Better</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem] lg:max-w-[10ch]">
                Fix what is costing trust, confusion, and calls.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                If your website is costing you trust, it is usually not because of one giant mistake. It is usually a handful of smaller misses: weak headlines, thin proof, confusing offers, and a layout that makes people hesitate. We fix those issues so people understand what you do faster, trust the business sooner, and feel more ready to call.
              </p>

              <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
                {buildCards.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="bg-[#f7f5f1] p-6 sm:p-7">
                      <div className="flex items-center gap-3 text-blue-600">
                        <Icon className="size-5" />
                        <div className="h-px flex-1 bg-black/8" />
                      </div>
                      <h3 className="mt-5 text-[1.55rem] font-semibold tracking-[-0.05em] text-[#111111]">{item.title}</h3>
                      <p className="mt-4 text-[0.98rem] leading-7 text-slate-600">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/8 bg-white py-18 sm:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <SectionEyebrow>How It Works</SectionEyebrow>
              <h2 className="text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem]">
                A clear timeline from first review to launch.
              </h2>
            </div>

            <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
              {howItWorksSteps.map(step => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="bg-[#f7f5f1] p-6 sm:p-7">
                    <div className="flex items-center gap-3 text-blue-600">
                      <Icon className="size-5" />
                      <div className="h-px flex-1 bg-black/8" />
                    </div>
                    <div className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{step.timing}</div>
                    <h3 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.05em] text-[#111111]">{step.title}</h3>
                    <p className="mt-4 text-[0.98rem] leading-7 text-slate-600">{step.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-white py-18 sm:py-28">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionEyebrow>We Work With Hands-On Business Owners</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem] lg:max-w-[10ch]">
                Trusted by people who work with their hands and notice the details.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                You already know how to run the work well. What you need is a website that matches the standard you bring to estimates, callouts, walkthroughs, and final handoff.
              </p>
            </div>

            <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
              {testimonials.map(item => (
                <div key={item.name} className="bg-white p-6 sm:p-7">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Client perspective</div>
                  <p className="mt-5 text-[1.03rem] leading-7 text-slate-700 sm:text-[1.08rem] sm:leading-8">“{item.quote}”</p>
                  <div className="mt-6 border-t border-black/8 pt-4">
                    <div className="text-base font-semibold tracking-[-0.03em] text-[#111111]">{item.name}</div>
                    <div className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-slate-500">{item.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="border-y border-black/8 bg-white py-18 sm:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <SectionEyebrow>Built for Your Trade</SectionEyebrow>
              <h2 className="text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem]">
                Example directions for the kinds of contractor sites that need to ring the phone.
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Your business should not look like every other contractor site in the county. These examples show how the right visual system, tone, and proof can make your company feel more established, more specific, and easier to trust.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-none border border-[#111111] bg-[#111111] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800">
                  <Link href="/web-design-for-plumbers">See the plumber page</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-none border-[#111111] bg-transparent px-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-white">
                  <Link href="/web-design-for-remodelers">See the remodeler page</Link>
                </Button>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {exampleSites.map(site => (
                <article
                  key={site.name}
                  className={`group overflow-hidden border border-black/10 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1 ${site.cardClass}`}
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${site.accentClass}`} />
                  <div className="border-b border-black/8 px-5 py-4 sm:px-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">{site.niche}</div>
                      <div className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-400">{site.eyebrow}</div>
                    </div>
                    <h3 className={`mt-3 text-[1.45rem] font-semibold text-[#111111] ${site.titleClass}`}>
                      {"href" in site && site.href ? (
                        <Link href={site.href} className="transition-colors hover:text-blue-700">{site.name}</Link>
                      ) : (
                        site.name
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{site.direction}</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-700">Result: {site.result}</p>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className={`overflow-hidden border bg-white ${site.frameClass}`}>
                      <img
                        src={site.image}
                        alt={`${site.name} homepage visual`}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-[0.98rem]">{site.summary}</p>

                    <div className="mt-5 grid gap-px border border-black/8 bg-black/8">
                      <div className="bg-white px-4 py-3">
                        <p className="text-sm leading-6 text-slate-600">{site.proof}</p>
                      </div>
                      <div className="bg-white px-4 py-3">
                        <p className="text-sm leading-6 text-slate-600">{site.layout}</p>
                      </div>
                    </div>
                    {"href" in site && site.href ? (
                      <Link href={site.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-blue-700">
                        Read case study
                        <ArrowRight className="size-4" />
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="service-area" className="container py-18 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <SectionEyebrow>Service Area Coverage</SectionEyebrow>
              <h2 className="text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem]">
                Make it easy for customers to see that you work where they live.
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                The first job is making it obvious where you work today. The second job is showing where the business is going next.
              </p>
            </div>

            <div>
              <div className="grid gap-px border border-black/10 bg-black/10">
                {serviceAreas.map(area => (
                  <div key={area.title} className="grid gap-4 bg-[#f7f5f1] p-5 sm:grid-cols-[14rem_1fr] sm:items-start sm:p-6">
                    <div className="flex items-center gap-3 text-[#111111]">
                      <MapPin className="size-4 text-blue-600" />
                      <h3 className="text-[1.15rem] font-semibold tracking-[-0.04em]">{area.title}</h3>
                    </div>
                    <p className="text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{area.copy}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-500">Expanding into Ventura and Bakersfield in 2026.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-y border-black/8 bg-white py-18 sm:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <SectionEyebrow>Pricing Packages</SectionEyebrow>
              <h2 className="text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem]">
                Premium structure without the agency fog.
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Whether you need a new site, a sharper redesign, or steady monthly support, you should be able to see the ballpark first and decide what fits your business without making you book a call just to get a straight ballpark.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
              {projectPackages.map(item => (
                <PackageCard key={item.name} item={item} />
              ))}
            </div>

            <div className="mt-8 border border-black/10 bg-[#f7f5f1] p-5 sm:p-7">
              <div className="flex flex-col gap-4 border-b border-black/8 pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Ongoing retainers</p>
                  <h3 className="mt-2 text-[1.9rem] font-semibold tracking-[-0.05em] text-[#111111] sm:text-[2.1rem]">
                    Keep the tape on after launch, without the mystery bills.
                  </h3>
                </div>
                <p className="max-w-lg text-sm leading-7 text-slate-600">
                  If you want help after launch, you should know exactly what monthly support covers: updates, seasonal swaps, speed tune-ups, trust improvements, and ongoing refinements without vague retainers or surprise extras.
                </p>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-3 auto-rows-fr">
                {retainers.map(retainer => (
                  <PackageCard key={retainer.name} item={retainer} darkButton />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/8 bg-[#f3f0ea] py-18 sm:py-24">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionEyebrow>Who This Is Not For</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.25rem]">
                We are not chasing design awards. We are building contractor sites that make the phone ring.
              </h2>
            </div>

            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <p className="text-base leading-8 text-slate-700 sm:text-lg">
                We do not build sites for e-commerce stores, restaurants, law firms, or anyone chasing design awards. We build for contractors who want the phone to ring. If that is not you, we are not your team.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-black/8 bg-[#f3f0ea] py-18 sm:py-24">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionEyebrow>Helpful Reading</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.25rem]">
                Start with the question your prospects are already searching.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Google says links help users and search engines understand what a page is about. These are the three articles to start with if you want more local visibility, better service pages, and a homepage that earns the call.
              </p>
            </div>

            <div className="grid gap-4">
              {featuredSearchGuides.map(guide => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group border border-black/10 bg-white p-6 transition-colors hover:bg-[#f7f5f1]"
                >
                  <div className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Read next</div>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#111111]">
                    {guide.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{guide.description}</p>
                  <div className="mt-5 inline-flex items-center text-sm font-semibold uppercase tracking-[0.08em] text-[#111111]">
                    Open article
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-black/8 bg-white py-18 sm:py-28">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionEyebrow>Cut the Tape on Confusion</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem] lg:max-w-[10ch]">
                Straight answers for owners who value clarity.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                We keep the process direct, the decisions visible, and the buying experience free of the usual agency runaround.
              </p>
            </div>

            <div className="border border-black/10 bg-[#f7f5f1] p-5 sm:p-7">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index}`} className="border-black/10">
                    <AccordionTrigger className="py-6 text-left text-[1.02rem] font-semibold tracking-[-0.03em] text-[#111111] hover:no-underline sm:text-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-8 text-slate-600">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/8 bg-[#111111] text-white">
        <div className="container grid gap-10 py-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <div className="inline-flex items-center gap-3">
              <div className="flex size-10 items-center justify-center border border-white/15 bg-white/6">
                <span className="h-1.5 w-6 rotate-[-28deg] bg-blue-400" />
              </div>
              <div>
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/45">Blue Tape Sites</div>
                <div className="mt-1 text-lg font-semibold tracking-[-0.04em] text-white">Precision web design</div>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
              Premium web design for plumbers, electricians, cleaners, and other home-service businesses that want every flaw found, every detail tightened, and every page ready to convert.
            </p>
            <p className="mt-3 text-sm text-white/55">{BUSINESS.hoursDisplay}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/40">Navigate</div>
              <div className="mt-4 grid gap-3 text-white/72">
                {navItems.map(item => (
                  <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/40">Next step</div>
              <a href="/audit" className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-blue-300">
                Request Your Free Audit
                <ArrowRight className="size-4" />
              </a>
              <a href={BUSINESS.phoneHref} className="mt-4 flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-blue-300">
                <PhoneCall className="size-4" />
                Call {BUSINESS.phoneDisplay}
              </a>
              <p className="mt-2 text-sm text-white/55">{BUSINESS.sameDayReply}</p>
              <div className="mt-6 inline-flex items-center gap-2 border border-white/12 px-4 py-3 text-sm text-white/70">
                <CircleHelp className="size-4 text-blue-300" />
                Built for detail-obsessed owners who want less confusion and more confidence.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
