/*
Design reminder for this page: Swiss editorial minimalism for a premium home-service web agency.
Use disciplined hierarchy, asymmetrical composition, refined tape-blue accents, restrained motion,
and generous whitespace. Every section should feel inspected, marked, and intentionally resolved.
*/

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Clock3,
  Loader2,
  MapPin,
  Menu,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  { label: "Audit", href: "#audit" },
];

const buildCards = [
  {
    title: "Prep Like a Pro",
    description:
      "We review your page the way a solid foreman walks a job before signoff: what looks weak, what reads soft, what slows the customer down, and what needs fixing before you send traffic to it.",
    icon: ScanSearch,
  },
  {
    title: "Trade-Straight Messaging",
    description:
      "The copy is written to sound clear, capable, and local. No agency fluff, no padded language, and no vague promises that make the business feel less trustworthy.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Turnaround",
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
    <div className="mb-4 inline-flex max-w-full flex-wrap items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:mb-5 sm:text-[0.7rem] sm:tracking-[0.28em]">
      <span className="h-px w-12 bg-blue-600" />
      {children}
    </div>
  );
}

function scrollToAudit() {
  document.querySelector("#audit")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PackageCard({ item, darkButton = false }: { item: PricingPackage | (typeof retainers)[number] & { category?: string; tag?: string; popular?: boolean }; darkButton?: boolean }) {
  const isPopular = "popular" in item && Boolean(item.popular);
  const tag = "tag" in item ? item.tag : undefined;
  const category = "category" in item ? item.category : undefined;

  return (
    <div
      className={`h-full rounded-[1.6rem] border p-5 transition-transform duration-300 hover:-translate-y-1 flex flex-col ${
        isPopular
          ? "border-blue-600 bg-[linear-gradient(180deg,rgba(0,102,255,0.06),rgba(255,255,255,1))] shadow-[0_20px_50px_rgba(0,102,255,0.12)]"
          : "border-black/6 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {category ? <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{category}</p> : null}
          <h4 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#111111]">{item.name}</h4>
          {tag ? <p className="mt-1 text-sm text-slate-500">{tag}</p> : null}
        </div>
        {isPopular ? (
          <Badge className="rounded-full bg-blue-600 px-3 py-1 text-white hover:bg-blue-600">Most Popular</Badge>
        ) : null}
      </div>
      <div className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-[#111111]">{item.price}</div>
      <div className="mt-5 space-y-3 flex-1">
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
        className={`mt-6 h-11 w-full rounded-full ${darkButton ? "bg-[#111111] text-white hover:bg-slate-800" : "bg-blue-600 text-white hover:bg-blue-700"}`}
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

  const heroStats = useMemo(
    () => [
      { value: "Local", label: "Feels grounded in a real service area instead of reading like a generic agency site" },
      { value: "Flexible", label: "Keeps the positioning broad enough to support outreach in additional markets" },
      { value: "Fast", label: "Built around a punch-list process that respects how owner-operators actually work" },
    ],
    []
  );

  const auditMutation = trpc.leads.submitAudit.useMutation({
    onSuccess: result => {
      setSubmissionMessage(
        result.notifiedOwner
          ? "Audit request received. Your details landed correctly and a notification has already been sent through."
          : "Audit request received. Your details landed correctly and are stored for follow-up."
      );
      setFormData(initialFormState);
      toast.success("Your audit request landed successfully.");
    },
    onError: error => {
      setSubmissionMessage(error.message);
      toast.error(error.message || "There was a problem submitting the audit request.");
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

    auditMutation.mutate({
      ...formData,
      sourcePath: typeof window !== "undefined" ? window.location.pathname : "/",
    });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FAFAFA] text-[#111111] selection:bg-blue-600 selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <header className="sticky top-0 z-50 border-b border-black/6 bg-white/85 backdrop-blur-xl">
        <div className="container flex h-18 items-center justify-between gap-3 sm:gap-6">
          <a href="#home" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="relative size-11 overflow-hidden rounded-2xl bg-blue-600 shadow-[0_12px_30px_rgba(0,102,255,0.24)]">
              <span className="absolute left-1/2 top-1/2 h-3.5 w-7 -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] rounded-full bg-white/95" />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-sm border border-white/80 bg-white/20" />
            </div>
            <div className="min-w-0 leading-none">
              <div className="truncate text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-[0.7rem] sm:tracking-[0.3em]">Blue Tape Sites</div>
              <div className="mt-1 text-sm font-semibold tracking-[-0.04em] text-[#111111] sm:text-base">Precision web design</div>
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
            <Button asChild className="h-12 rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700">
              <a href="#audit">Request Your Free Audit</a>
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex size-11 items-center justify-center rounded-full border border-black/8 bg-white lg:hidden"
            onClick={() => setMobileMenuOpen(open => !open)}
          >
            <Menu className="size-5" />
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-black/6 bg-white lg:hidden">
            <div className="container flex flex-col gap-4 py-5">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-2 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <a href="#audit" onClick={() => setMobileMenuOpen(false)}>
                  Request Your Free Audit
                </a>
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-section-texture-2xTfvKichRrVCNPAF7frNP.webp')] bg-cover bg-center opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,250,0.72),rgba(250,250,250,0.95)_34%,rgba(250,250,250,1))]" />
          <div className="container relative grid gap-8 py-8 sm:gap-12 sm:py-18 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 min-w-0 max-w-none"
            >
              <div className="inline-flex max-w-[19.5rem] rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-center text-[0.64rem] font-semibold uppercase leading-5 tracking-[0.14em] text-blue-700 sm:max-w-full sm:px-4 sm:text-[0.74rem] sm:tracking-[0.26em]">
                Southern California web design for serious contractors
              </div>
              <h1 className="mt-6 max-w-[10.5ch] text-[3.05rem] font-semibold leading-[0.92] tracking-[-0.08em] text-[#111111] sm:max-w-[13ch] sm:text-[4.4rem] lg:text-[5.5rem]">
                See the tape. Fix the flaws. Launch with confidence.
              </h1>
              <p className="mt-5 max-w-[32rem] text-[1.02rem] leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8">
                Blue Tape Sites builds premium, detail-first websites for Southern California plumbers,
                electricians, cleaners, and home-service teams that want every weak spot marked,
                resolved, and ready to sell.
              </p>
              <div className="mt-6 rounded-[1.45rem] border border-black/6 bg-white/90 p-4 shadow-[0_20px_55px_rgba(17,17,17,0.06)] sm:hidden">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Punch-list logic</div>
                <div className="mt-2 text-lg font-semibold tracking-[-0.04em] text-[#111111]">Clear offer. Tighter proof. Better local trust.</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">The mobile version now leads with the message first and keeps the visual treatment lighter so the page breathes better on phones.</p>
              </div>
              <div className="mt-8 grid gap-3 sm:mt-9 sm:max-w-xl sm:grid-cols-2 sm:gap-4">
                <Button asChild className="h-auto min-h-14 w-full rounded-[1.25rem] bg-blue-600 px-6 py-4 text-base whitespace-normal text-white shadow-[0_18px_40px_rgba(0,102,255,0.16)] hover:bg-blue-700 sm:rounded-full sm:shadow-none">
                  <a href="#audit">Request Your Free Audit</a>
                </Button>
                <Button asChild variant="outline" className="h-auto min-h-14 w-full rounded-[1.25rem] border-black/10 bg-white px-6 py-4 text-base whitespace-normal text-[#111111] shadow-[0_18px_40px_rgba(17,17,17,0.05)] hover:bg-[#F3F6FB] sm:rounded-full sm:shadow-none">
                  <a href="#pricing">See Pricing Packages</a>
                </Button>
              </div>
              <p className="mt-6 max-w-[32rem] text-sm leading-7 text-slate-500 sm:mt-7">
                Built to feel local in Southern California while staying flexible enough for broader outreach and future market expansion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative mx-auto hidden w-full max-w-[30rem] sm:block lg:mx-0 lg:justify-self-end"
            >
              <div className="absolute -left-8 top-8 hidden h-28 w-28 rounded-full bg-blue-600/12 blur-3xl sm:block" />
              <div className="absolute -right-5 bottom-10 hidden h-32 w-32 rounded-full bg-slate-300/30 blur-3xl sm:block" />
              <div className="hero-card relative overflow-hidden rounded-[1.7rem] border border-black/7 bg-white p-2.5 shadow-[0_35px_120px_rgba(17,17,17,0.14)] sm:rounded-[2rem] sm:p-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-hero-wall-DrVe684rwH2xQagD6SAZ7A.webp"
                  alt="Blue painter's tape unrolling into a polished contractor website mockup"
                  className="h-full w-full rounded-[1.45rem] object-cover"
                />
                <div className="absolute left-4 top-4 hidden rounded-full border border-white/70 bg-white/88 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500 backdrop-blur sm:left-7 sm:top-7 sm:block">
                  Southern California launch concept
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-[1.2rem] border border-white/60 bg-white/90 p-4 shadow-[0_18px_50px_rgba(17,17,17,0.08)] backdrop-blur sm:inset-x-auto sm:bottom-7 sm:right-7 sm:max-w-[15rem] sm:rounded-[1.4rem] sm:p-4">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Punch-list logic</div>
                  <div className="mt-2 text-base font-semibold tracking-[-0.04em] text-[#111111]">Clear offer, tighter proof, stronger local trust.</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="order-3 grid gap-3 sm:gap-4 lg:col-span-2 lg:grid-cols-3"
            >
              {heroStats.map(stat => (
                <div key={stat.label} className="rounded-[1.45rem] border border-black/6 bg-white/85 px-5 py-5 shadow-[0_18px_50px_rgba(17,17,17,0.06)] backdrop-blur-sm sm:rounded-[1.5rem]">
                  <div className="text-[1.75rem] font-semibold tracking-[-0.06em] text-[#111111]">{stat.value}</div>
                  <p className="mt-2 max-w-[28rem] text-sm leading-6 text-slate-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="container py-18 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionEyebrow>We Build With the Tape On</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.35rem] font-semibold leading-[1] tracking-[-0.06em] text-[#111111] sm:text-5xl lg:max-w-[10ch]">
                The website process, inspected from the start.
              </h2>
            </div>
            <div>
              <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Blue Tape Sites is built around the idea that strong websites rarely get better by adding more.
                They get better when someone notices what is off, marks what matters, and resolves the details
                with care. That is how we approach strategy, copy, layout, and launch.
              </p>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {buildCards.map(item => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={item.title}
                      className="group rounded-[1.8rem] border border-black/6 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.06)] transition-transform duration-300 hover:-translate-y-1"
                    >
                      <CardContent className="p-6 sm:p-7">
                        <div className="flex size-13 items-center justify-center rounded-[1.15rem] bg-blue-50 text-blue-600">
                          <Icon className="size-6" />
                        </div>
                        <h3 className="mt-5 text-[1.65rem] font-semibold tracking-[-0.05em] text-[#111111] sm:mt-6 sm:text-2xl">{item.title}</h3>
                        <p className="mt-4 text-[0.98rem] leading-7 text-slate-600 sm:text-base sm:leading-8">{item.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E5E5E5] bg-white py-18 sm:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <SectionEyebrow>We Work With Hands-On Business Owners</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.35rem] font-semibold leading-[1] tracking-[-0.06em] text-[#111111] sm:text-5xl lg:max-w-[10ch]">
                Trusted by people who work with their hands and notice the details.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                Our best clients already run tight operations. They simply want a website that matches the standard
                they bring to estimates, callouts, walkthroughs, and final handoff.
              </p>
            </div>

            <div className="grid gap-4 md:hidden">
              {testimonials.map(item => (
                <Card key={item.name} className="rounded-[1.55rem] border border-black/6 bg-[#FAFAFA] shadow-[0_20px_55px_rgba(17,17,17,0.06)]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 text-blue-600">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-5 text-base leading-7 text-slate-700">“{item.quote}”</p>
                    <div className="mt-6 border-t border-black/6 pt-5">
                      <div className="text-lg font-semibold tracking-[-0.04em] text-[#111111]">{item.name}</div>
                      <div className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-slate-400">{item.company}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="relative hidden overflow-visible px-10 md:block">
              <Carousel opts={{ align: "start", loop: true }} className="overflow-visible">
                <CarouselContent className="overflow-visible">
                  {testimonials.map(item => (
                    <CarouselItem key={item.name} className="md:basis-1/2">
                      <Card className="h-full rounded-[1.6rem] border border-black/6 bg-[#FAFAFA] shadow-[0_24px_60px_rgba(17,17,17,0.06)] sm:rounded-[2rem]">
                        <CardContent className="flex h-full flex-col p-6 sm:p-8">
                          <div className="flex items-center gap-1 text-blue-600">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star key={index} className="size-4 fill-current" />
                            ))}
                          </div>
                          <p className="mt-5 text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-8">“{item.quote}”</p>
                          <div className="mt-auto pt-8">
                            <div className="text-lg font-semibold tracking-[-0.04em] text-[#111111]">{item.name}</div>
                            <div className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-slate-400 sm:text-sm sm:tracking-[0.18em]">{item.company}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-auto right-16 top-auto bottom-[-4.5rem] hidden rounded-full border-black/10 bg-white text-[#111111] md:inline-flex" />
                <CarouselNext className="right-0 top-auto bottom-[-4.5rem] hidden rounded-full border-black/10 bg-white text-[#111111] md:inline-flex" />
              </Carousel>
            </div>
          </div>
        </section>

        <section id="service-area" className="container py-20 sm:py-32">
          <div className="max-w-3xl">
            <SectionEyebrow>Service Area Positioning</SectionEyebrow>
            <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.06em] text-[#111111] sm:text-5xl">
              Local enough to feel trusted, broad enough to grow past one county.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              The homepage should feel rooted in a real market, but it should not trap the brand inside one zip code. This structure gives you strong Southern California trust signals now while keeping the business usable for state-wide and national outreach.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-[1.4rem] border border-black/6 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(17,17,17,0.04)]">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Trust layer</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">Lead with Southern California language, proof, and service-business cues so the brand feels grounded and believable.</p>
            </div>
            <div className="rounded-[1.4rem] border border-black/6 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(17,17,17,0.04)]">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Reach layer</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">Keep the positioning broad enough that outreach into new cities or states does not feel disconnected from the homepage.</p>
            </div>
            <div className="rounded-[1.4rem] border border-black/6 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(17,17,17,0.04)]">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Growth layer</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">When you pick priority markets, add unique city pages so search relevance grows market by market instead of forcing everything into one page.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {serviceAreas.map(area => (
              <Card key={area.title} className="rounded-[1.7rem] border border-black/6 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.05)]">
                <CardContent className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <MapPin className="size-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#111111]">{area.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{area.copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="relative overflow-hidden border-y border-[#E5E5E5] bg-white py-18 sm:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.08),transparent_28%)]" />
          <div className="container relative">
            <div className="max-w-3xl">
              <SectionEyebrow>Pricing Packages</SectionEyebrow>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.06em] text-[#111111] sm:text-5xl">
                Premium structure without the agency fog.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                Choose a clean build, a focused redesign, or ongoing monthly refinement. Every package below keeps the CTA anchored at the same level so comparisons are easier to scan.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
              {projectPackages.map(item => (
                <PackageCard key={item.name} item={item} />
              ))}
            </div>

              <div className="mt-8 rounded-[1.8rem] border border-black/6 bg-[#FAFAFA] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.06)] sm:rounded-[2rem] sm:p-8">

              <div className="flex flex-col gap-4 border-b border-[#E5E5E5] pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">Ongoing retainers</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#111111]">Keep the tape on after launch.</h3>
                </div>
                <p className="max-w-lg text-sm leading-7 text-slate-500">
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

        <section id="audit" className="container py-20 sm:py-32">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <SectionEyebrow>Free Blue Tape Audit</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.35rem] font-semibold leading-[1] tracking-[-0.06em] text-[#111111] sm:text-5xl lg:max-w-[10ch]">
                Let us mark up the misses before you spend more on traffic.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Send your current site, service area, and what feels off. The form below now submits properly and stores the lead,
                so your request does not disappear into a dead-end mockup.
              </p>
              <div className="mt-10 overflow-hidden rounded-[2rem] border border-black/6 bg-white p-4 shadow-[0_30px_90px_rgba(17,17,17,0.08)] sm:p-5">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-audit-board-V6yoJbGViP874uyi6wKV9P.webp"
                  alt="Website audit board with blue tape callouts and markup notes"
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>

            <Card className="order-1 rounded-[1.8rem] border border-black/6 bg-white shadow-[0_30px_90px_rgba(17,17,17,0.08)] sm:rounded-[2rem] lg:order-2">
              <CardContent className="p-5 sm:p-8">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                  <Sparkles className="size-4 text-blue-600" />
                  Audit request form
                </div>

                {submissionMessage ? (
                  <div className="mt-6 rounded-[1.25rem] border border-blue-100 bg-blue-50 px-4 py-4 text-sm leading-6 text-slate-700 sm:rounded-[1.4rem] sm:px-5 sm:leading-7">
                    {submissionMessage}
                  </div>
                ) : null}

                <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Your name
                      <input
                        required
                        value={formData.name}
                        onChange={event => handleFieldChange("name", event.target.value)}
                        className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600"
                        placeholder="Owner or project lead"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Company name
                      <input
                        required
                        value={formData.companyName}
                        onChange={event => handleFieldChange("companyName", event.target.value)}
                        className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600"
                        placeholder="Blue Tape-worthy business"
                      />
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Email address
                      <input
                        required
                        value={formData.email}
                        onChange={event => handleFieldChange("email", event.target.value)}
                        className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600"
                        placeholder="you@company.com"
                        type="email"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Phone number
                      <input
                        value={formData.phone}
                        onChange={event => handleFieldChange("phone", event.target.value)}
                        className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600"
                        placeholder="(555) 000-0000"
                        type="tel"
                      />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Website URL
                    <input
                      value={formData.websiteUrl}
                      onChange={event => handleFieldChange("websiteUrl", event.target.value)}
                      className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600"
                      placeholder="https://yourwebsite.com"
                      type="url"
                    />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Primary trade
                      <input
                        required
                        value={formData.primaryTrade}
                        onChange={event => handleFieldChange("primaryTrade", event.target.value)}
                        className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600"
                        placeholder="Plumbing, electrical, cleaning..."
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Service area
                      <input
                        required
                        value={formData.serviceArea}
                        onChange={event => handleFieldChange("serviceArea", event.target.value)}
                        className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600"
                        placeholder="Orange County, Inland Empire, SoCal..."
                      />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    What feels off right now?
                    <textarea
                      required
                      minLength={20}
                      value={formData.projectDetails}
                      onChange={event => handleFieldChange("projectDetails", event.target.value)}
                      className="min-h-34 rounded-[1.4rem] border border-black/8 bg-[#FAFAFA] px-4 py-3 outline-none transition focus:border-blue-600"
                      placeholder="Tell us where the site feels weak: trust, messaging, design, mobile flow, slow load, or something else."
                    />
                  </label>
                  <div className="rounded-[1.5rem] border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-7 text-slate-600">
                    We review your site like a pre-paint walkthrough: what to keep, what to fix, and what is costing trust right now.
                  </div>
                  <Button disabled={auditMutation.isPending} className="h-auto min-h-13 rounded-full bg-blue-600 px-6 py-4 text-base whitespace-normal text-white hover:bg-blue-700 disabled:opacity-80 sm:h-13 sm:py-0">
                    {auditMutation.isPending ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        Submitting audit request...
                      </span>
                    ) : (
                      "Request Your Free Audit"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t border-[#E5E5E5] bg-white py-18 sm:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <SectionEyebrow>Cut the Tape on Confusion</SectionEyebrow>
              <h2 className="max-w-[12ch] text-[2.35rem] font-semibold leading-[1] tracking-[-0.06em] text-[#111111] sm:text-5xl lg:max-w-[10ch]">
                Straight answers for owners who value clarity.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                We keep the process direct, the decisions visible, and the site focused on what actually helps you win better work.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-black/6 bg-[#FAFAFA] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.06)] sm:rounded-[2rem] sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index}`} className="border-[#E5E5E5]">
                    <AccordionTrigger className="py-6 text-left text-lg font-semibold tracking-[-0.03em] text-[#111111] hover:no-underline">
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

      <footer className="bg-[#111111] text-white">
        <div className="container grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-18">
          <div>
            <div className="inline-flex flex-wrap items-center gap-3">
              <div className="relative size-11 overflow-hidden rounded-2xl bg-blue-600">
                <span className="absolute left-1/2 top-1/2 h-3.5 w-7 -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] rounded-full bg-white/95" />
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-sm border border-white/80 bg-white/20" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Blue Tape Sites</div>
                <div className="text-xl font-semibold tracking-[-0.05em]">Precision web design</div>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">
              Premium web design for Southern California plumbers, electricians, cleaners, and other home-service businesses that want every flaw found, every detail tightened, and every page ready to convert.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">Navigate</div>
              <div className="mt-4 grid gap-3 text-white/72">
                {navItems.map(item => (
                  <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">Next step</div>
              <a href="#audit" className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-blue-300">
                Request Your Free Audit
                <ArrowRight className="size-4" />
              </a>
              <div className="mt-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm leading-6 text-white/70 sm:rounded-full sm:py-2">
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
