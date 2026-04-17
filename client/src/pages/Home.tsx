/*
Design reminder for this page: professional editorial restraint for a premium home-service web studio.
Favor clarity over spectacle, reduce generated-looking UI tropes, and make every section feel deliberate,
credible, and businesslike. Keep the blue tape motif precise and sparing.
*/

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Clock3,
  MapPin,
  Menu,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { applyHomeSeo } from "@/lib/seo";
import { trpc } from "@/lib/trpc";

type AuditFormState = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  primaryTrade: string;
  serviceArea: string;
  projectDetails: string;
};

type PricingPackage = {
  name: string;
  category: string;
  price: string;
  tag: string;
  popular: boolean;
  features: string[];
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Service Area", href: "#service-area" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Audit", href: "#audit" },
];

const buildCards = [
  {
    title: "Inspect first",
    description:
      "We review your page the way a solid foreman walks a job before signoff: what looks weak, what reads soft, what slows the customer down, and what needs fixing before you send traffic to it.",
    icon: ScanSearch,
  },
  {
    title: "Write it straight",
    description:
      "The copy is written to sound clear, capable, and local. No agency fluff, no padded language, and no vague promises that make the business feel less trustworthy.",
    icon: ShieldCheck,
  },
  {
    title: "Launch without drift",
    description:
      "Once the direction is set, we move like a tight punch-list. Clean approvals, focused revisions, and a launch path that respects how busy owner-operators actually work.",
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
      "I've dealt with marketing people before and half the time they're hard to pin down. This felt more like working through a real scope. They showed me what was off, tightened it up, and left me with a page that's a lot easier for customers to trust.",
  },
];

const exampleSites = [
  {
    name: "Harbor Plumbing Co.",
    niche: "Plumbing",
    direction: "Emergency-first residential lead page",
    summary: "Built like a high-trust plumbing brand: faster call decisions, strong neighborhood proof, and a cleaner service breakdown for urgent homeowners.",
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
    name: "Northline Electric",
    niche: "Electrical",
    direction: "Commercial-leaning contractor presence",
    summary: "A firmer, more technical direction for an electrical contractor that needs sharper hierarchy, cleaner credential framing, and a more engineered tone.",
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
    name: "Greyline Cleaning",
    niche: "Cleaning",
    direction: "Hospitality-grade recurring-service pitch",
    summary: "A cleaner, warmer direction that still feels premium: lighter touchpoints, recurring-service trust cues, and polished proof without soft generic tropes.",
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
    features: [
      "Single high-conviction landing page",
      "Message cleanup and trust-section rewrite",
      "Mobile-first layout tuned for local service traffic",
      "Fast launch for owner-operators who need a credible presence now",
    ],
  },
  {
    name: "Framing",
    category: "New build",
    price: "$2,495",
    tag: "Most Popular",
    popular: true,
    features: [
      "Multi-section lead-generation homepage",
      "Offer structure and content hierarchy overhaul",
      "Testimonials, FAQ, and service proof built in",
      "Designed to feel established without extra clutter",
    ],
  },
  {
    name: "Turnkey",
    category: "New build",
    price: "$4,995",
    tag: "Highest touch",
    popular: false,
    features: [
      "Full premium website system with multiple core pages",
      "Service-specific messaging and stronger conversion flow",
      "Premium proof layout and stronger sales architecture",
      "Built for companies ready to look as dialed-in as they operate",
    ],
  },
  {
    name: "Patch & Paint",
    category: "Redesign",
    price: "$795",
    tag: "Quick repair",
    popular: false,
    features: [
      "Refine the sections already closest to working",
      "Tighten copy, hierarchy, and CTA placement",
      "Best when the structure exists but the trust is thin",
      "Good fit for small fixes before a bigger rebuild",
    ],
  },
  {
    name: "Remodel",
    category: "Redesign",
    price: "$2,195",
    tag: "Most Popular",
    popular: true,
    features: [
      "Strategic redesign of the core lead path",
      "Improved storytelling, proof order, and mobile flow",
      "Ideal when the business is strong but the website undersells it",
      "Designed to get more value from the traffic you already have",
    ],
  },
  {
    name: "Full Renovation",
    category: "Redesign",
    price: "$4,495",
    tag: "Comprehensive rebuild",
    popular: false,
    features: [
      "Rebuilt visual system and messaging architecture",
      "Premium presentation across homepage and supporting pages",
      "Cleaner structure for offers, proof, and future SEO pages",
      "For established companies replacing a dated web presence entirely",
    ],
  },
];

const retainers = [
  {
    name: "Blue Tape Retainer",
    price: "$295/mo",
    features: [
      "Monthly site checkup and priority text edits",
      "Seasonal offer swaps and homepage tune-ups",
      "Best for small teams who want steady upkeep",
    ],
  },
  {
    name: "Crew Lead Retainer",
    price: "$595/mo",
    features: [
      "Conversion review, content refinements, and landing-page support",
      "Ongoing testing recommendations and trust-proof improvements",
      "Best for growing operators adding offers and service areas",
    ],
  },
  {
    name: "Jobsite Priority Retainer",
    price: "$995/mo",
    features: [
      "Higher-touch monthly optimization across key pages",
      "Campaign updates, design refinements, and offer iteration",
      "Built for companies that want a responsive design partner on call",
    ],
  },
];

const serviceAreas = [
  {
    title: "Southern California Core",
    copy: "Lead with local trust across Orange County, Los Angeles, Inland Empire, and San Diego while keeping the brand grounded in real service-business language.",
  },
  {
    title: "California Expansion",
    copy: "Support broader state-level outreach with stronger structure, cleaner proof, and location-aware messaging that does not feel fake or overstuffed.",
  },
  {
    title: "Nationwide Outreach Ready",
    copy: "Keep the brand usable for cold outreach outside your home region by positioning the company as premium, credible, and adaptable across multiple markets.",
  },
  {
    title: "City-Page Growth Path",
    copy: "Add unique service-area pages over time so local relevance gets stronger market by market instead of forcing one homepage to do every job at once.",
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
      "Your request is submitted, stored, and sent through as a real lead. We review the page, note where trust or clarity is leaking, and follow up with a practical next-step recommendation.",
  },
];

const initialFormState: AuditFormState = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  primaryTrade: "",
  serviceArea: "Southern California",
  projectDetails: "",
};

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:mb-5 sm:text-[0.74rem]">
      <span className="h-px w-10 bg-blue-600" />
      {children}
    </div>
  );
}

function scrollToAudit() {
  document.querySelector("#audit")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PackageCard({
  item,
  darkButton = false,
}: {
  item: PricingPackage | ((typeof retainers)[number] & { category?: string; tag?: string; popular?: boolean });
  darkButton?: boolean;
}) {
  const isPopular = "popular" in item && Boolean(item.popular);
  const tag = "tag" in item ? item.tag : undefined;
  const category = "category" in item ? item.category : undefined;

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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<AuditFormState>(initialFormState);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [submissionTone, setSubmissionTone] = useState<"success" | "error" | null>(null);

  const heroStats = useMemo(
    () => [
      { value: "Local", label: "Grounded in a real service market instead of reading like a generic agency website." },
      { value: "Clear", label: "Written for owners who need the offer, proof, and next step to make sense fast." },
      { value: "Built", label: "Structured to support both Southern California trust and future market expansion." },
    ],
    []
  );

  useEffect(() => {
    applyHomeSeo();
  }, []);

  const auditMutation = trpc.leads.submitAudit.useMutation({
    onSuccess: result => {
      const message = result.notifiedOwner
        ? "Audit request received. Your details landed correctly and a notification has already been sent through."
        : "Audit request received. Your details landed correctly and are stored for follow-up.";

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
    "@type": "ProfessionalService",
    name: "Blue Tape Sites",
    description:
      "Blue Tape Sites builds premium websites for plumbers, electricians, cleaners, and home-service businesses across Southern California.",
    areaServed: serviceAreas.map(area => ({ "@type": "AdministrativeArea", name: area.title })),
    serviceType: [
      "Web design for plumbers",
      "Web design for electricians",
      "Web design for cleaning companies",
      "Local SEO-friendly service business websites",
    ],
    url: typeof window !== "undefined" ? window.location.origin : "https://www.bluetapesites.com",
  };

  const handleFieldChange = (field: keyof AuditFormState, value: string) => {
    setFormData(current => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionMessage(null);
    setSubmissionTone(null);

    if (formData.projectDetails.trim().length < 20) {
      const message = "Add a little more detail so the audit has enough context to be useful.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.warning("More detail helps the audit", {
        id: "audit-submit",
        description: message,
      });
      return;
    }

    toast.loading("Sending audit request", {
      id: "audit-submit",
      description: "Submitting your website details for review now.",
    });

    auditMutation.mutate({
      ...formData,
      sourcePath: typeof window !== "undefined" ? window.location.pathname : "/",
    });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f5f1] text-[#111111] selection:bg-blue-600 selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

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

          <div className="hidden lg:block">
            <Button asChild className="h-11 rounded-none border border-[#111111] bg-[#111111] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800">
              <a href="#audit">Request Your Free Audit</a>
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex size-11 items-center justify-center border border-black/10 bg-white lg:hidden"
            onClick={() => setMobileMenuOpen(open => !open)}
          >
            <Menu className="size-5" />
          </button>
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
                <a href="#audit" onClick={() => setMobileMenuOpen(false)}>
                  Request Your Free Audit
                </a>
              </Button>
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
              <h1 className="mt-6 max-w-[10.3ch] text-[3rem] font-semibold leading-[0.9] tracking-[-0.08em] text-[#111111] sm:max-w-[11.5ch] sm:text-[4.6rem] lg:text-[5.35rem]">
                See the tape. Fix the flaws. Launch with confidence.
              </h1>
              <p className="mt-6 max-w-[36rem] text-[1.02rem] leading-7 text-slate-600 sm:text-[1.15rem] sm:leading-8">
                Blue Tape Sites builds premium, detail-first websites for plumbers, electricians, cleaners,
                and home-service teams that want every weak spot marked, resolved, and ready to sell.
              </p>
              <p className="mt-4 max-w-[34rem] text-sm leading-7 text-slate-500 sm:text-[0.98rem]">
                Built to feel local in Southern California while staying flexible enough for broader outreach and future market expansion.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-13 rounded-none border border-[#111111] bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800 sm:w-auto">
                  <a href="#audit">Request Your Free Audit</a>
                </Button>
                <Button asChild variant="outline" className="h-13 rounded-none border-[#111111] bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-white sm:w-auto">
                  <a href="#pricing">See Pricing Packages</a>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 self-end">
              <div className="border border-black/10 bg-white p-5 sm:p-6">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Blue Tape standard</div>
                <div className="mt-3 border-l-2 border-blue-600 pl-4 text-lg font-semibold tracking-[-0.04em] text-[#111111] sm:text-xl">
                  Clear offer. Tighter proof. Better local trust.
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  The site now leads with message discipline, cleaner hierarchy, and more businesslike presentation instead of glossy mockup energy.
                </p>
              </div>

              <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-3">
                {heroStats.map(stat => (
                  <div key={stat.value} className="bg-[#f7f5f1] p-5">
                    <div className="text-[1.45rem] font-semibold tracking-[-0.06em] text-[#111111]">{stat.value}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container py-18 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-16">
            <div>
              <SectionEyebrow>We Build With the Tape On</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem] lg:max-w-[10ch]">
                The website process, inspected from the start.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Blue Tape Sites is built around the idea that strong websites rarely get better by adding more.
                They get better when someone notices what is off, marks what matters, and resolves the details with care.
                That is how we approach strategy, copy, layout, and launch.
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

        <section className="border-y border-black/8 bg-white py-18 sm:py-28">
          <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionEyebrow>We Work With Hands-On Business Owners</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem] lg:max-w-[10ch]">
                Trusted by people who work with their hands and notice the details.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Our best clients already run tight operations. They simply want a website that matches the standard they bring to estimates, callouts, walkthroughs, and final handoff.
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

        <section className="border-y border-black/8 bg-white py-18 sm:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <SectionEyebrow>Example Website Directions</SectionEyebrow>
              <h2 className="text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem]">
                Three sample hero directions in the same Blue Tape language.
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                These are concept directions, not presented as live client case studies. They show how the same design discipline can translate across different trades while keeping the same level of clarity, restraint, and local-trust framing.
              </p>
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
                    <h3 className={`mt-3 text-[1.45rem] font-semibold text-[#111111] ${site.titleClass}`}>{site.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{site.direction}</p>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className={`overflow-hidden border bg-white ${site.frameClass}`}>
                      <img
                        src={site.image}
                        alt={`${site.name} sample homepage concept`}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-[0.98rem]">{site.summary}</p>

                    <div className="mt-5 grid gap-px border border-black/8 bg-black/8">
                      <div className="bg-white px-4 py-3">
                        <div className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Proof move</div>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{site.proof}</p>
                      </div>
                      <div className="bg-white px-4 py-3">
                        <div className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Layout note</div>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{site.layout}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="service-area" className="container py-18 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <SectionEyebrow>Service Area Positioning</SectionEyebrow>
              <h2 className="text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem]">
                Local enough to feel trusted, broad enough to grow past one county.
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                The homepage should feel rooted in a real market, but it should not trap the brand inside one zip code. This structure gives you strong Southern California trust signals now while keeping the business usable for statewide and national outreach.
              </p>
            </div>

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
                Choose a clean build, a focused redesign, or ongoing monthly refinement. The comparison is kept flat and readable so the decision feels clearer and less like a sales page performance.
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
                    Keep the tape on after launch.
                  </h3>
                </div>
                <p className="max-w-lg text-sm leading-7 text-slate-600">
                  Monthly refinement for teams that want a website that keeps improving as offers, seasons, and service priorities change.
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

        <section id="audit" className="container py-18 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionEyebrow>Free Blue Tape Audit</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.4rem] lg:max-w-[10ch]">
                Let us mark up the misses before you spend more on traffic.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Send your current site, your service area, and what you are trying to improve. We will show you where the page loses trust, where the message gets muddy, and where the conversion path needs tightening.
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

              <div className="mt-5 border-l-2 border-blue-600 pl-4 text-sm leading-7 text-slate-600">
                We review your site like a pre-paint walkthrough: what to keep, what to fix, and what is costing trust right now.
              </div>
            </div>

            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Audit request form</div>

              <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Your name
                    <input
                      className="h-12 border border-black/10 bg-[#faf8f4] px-4 outline-none transition focus:border-blue-600"
                      placeholder="Owner or project lead"
                      value={formData.name}
                      onChange={event => handleFieldChange("name", event.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Company name
                    <input
                      className="h-12 border border-black/10 bg-[#faf8f4] px-4 outline-none transition focus:border-blue-600"
                      placeholder="Blue Tape-worthy business"
                      value={formData.companyName}
                      onChange={event => handleFieldChange("companyName", event.target.value)}
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Email address
                    <input
                      className="h-12 border border-black/10 bg-[#faf8f4] px-4 outline-none transition focus:border-blue-600"
                      placeholder="you@company.com"
                      type="email"
                      value={formData.email}
                      onChange={event => handleFieldChange("email", event.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Phone number
                    <input
                      className="h-12 border border-black/10 bg-[#faf8f4] px-4 outline-none transition focus:border-blue-600"
                      placeholder="(555) 000-0000"
                      type="tel"
                      value={formData.phone}
                      onChange={event => handleFieldChange("phone", event.target.value)}
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Website URL
                  <input
                    className="h-12 border border-black/10 bg-[#faf8f4] px-4 outline-none transition focus:border-blue-600"
                    placeholder="https://yourwebsite.com"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={event => handleFieldChange("websiteUrl", event.target.value)}
                    required
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Primary trade
                    <input
                      className="h-12 border border-black/10 bg-[#faf8f4] px-4 outline-none transition focus:border-blue-600"
                      placeholder="Plumbing, electrical, cleaning..."
                      value={formData.primaryTrade}
                      onChange={event => handleFieldChange("primaryTrade", event.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Service area
                    <input
                      className="h-12 border border-black/10 bg-[#faf8f4] px-4 outline-none transition focus:border-blue-600"
                      placeholder="Orange County, Inland Empire, SoCal..."
                      value={formData.serviceArea}
                      onChange={event => handleFieldChange("serviceArea", event.target.value)}
                      required
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  What feels off right now?
                  <textarea
                    className="min-h-34 border border-black/10 bg-[#faf8f4] px-4 py-3 outline-none transition focus:border-blue-600"
                    placeholder="Tell us where the site feels weak: trust, messaging, design, mobile flow, slow load, or something else."
                    value={formData.projectDetails}
                    onChange={event => handleFieldChange("projectDetails", event.target.value)}
                    required
                  />
                </label>

                <div className="border-l-2 border-blue-600 bg-[#faf8f4] px-4 py-4 text-sm leading-7 text-slate-600">
                  We review your page the way a good operator reviews a job before signoff: what earns trust, what muddies the offer, and what should be fixed first.
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
                  {auditMutation.isPending ? "Sending Audit Request..." : "Request Your Free Audit"}
                </Button>
              </form>
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
                We keep the process direct, the decisions visible, and the site focused on what actually helps you win better work.
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
              <a href="#audit" className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-blue-300">
                Request Your Free Audit
                <ArrowRight className="size-4" />
              </a>
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
