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
  Menu,
  MoveRight,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

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

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Audit", href: "#audit" },
];

const buildCards = [
  {
    title: "Prep Like a Pro",
    description:
      "We inspect every page the way a detail-obsessed contractor walks a site before paint. We mark weak headlines, thin trust, awkward spacing, and missed calls to action before anything goes live.",
    icon: ScanSearch,
  },
  {
    title: "100% Human Content",
    description:
      "Your positioning is written for real customers in real service areas, with copy that sounds clear, capable, and local. No vague filler, no generic agency language, and no bloated page structure.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Turnaround",
    description:
      "We move like a focused punch-list, not an endless committee. Once the direction is approved, we tighten the details, refine the site, and launch with the speed serious operators expect.",
    icon: Clock3,
  },
];

const testimonials = [
  {
    name: "Marcus Rivera",
    company: "Rivera Plumbing & Drain",
    quote:
      "I’ve been a plumber 18 years, and most website people talk in circles. Blue Tape Sites showed me exactly what was off, why customers were missing the point, and how to fix it without making the whole thing feel complicated.",
  },
  {
    name: "Elena Torres",
    company: "Torres Cleaning Services",
    quote:
      "My old website looked like something I threw together between jobs. They cleaned up the message, made the layout feel premium, and gave me something I’m actually proud to send to property managers and recurring clients.",
  },
  {
    name: "Paul Henderson",
    company: "Henderson Custom Cabinets",
    quote:
      "I told them I wanted a site that felt like a clean job site—organized, sharp, and obviously done right. That’s exactly what they delivered. The difference in clarity was immediate.",
  },
  {
    name: "Sarah Kline",
    company: "Kline Electrical Contractors",
    quote:
      "As an electrician I appreciate precision, and this process felt precise. Nothing flashy for the sake of it. Just thoughtful structure, better trust signals, and a much stronger first impression.",
  },
];

const caseStudies = [
  {
    name: "Affinity24",
    category: "Emergency plumbing brand refresh",
    beforeLabel: "Before: hard to trust, hard to scan",
    afterLabel: "After: sharper trust, faster decisions",
    statA: "38%",
    statALabel: "More quote requests",
    statB: "1.9s",
    statBLabel: "Mobile load time",
    beforePalette: "from-stone-300 via-stone-200 to-stone-100",
    afterPalette: "from-blue-600 via-blue-500 to-cyan-400",
    initial: 58,
  },
  {
    name: "Service Squad",
    category: "Multi-trade home-service landing page",
    beforeLabel: "Before: generic layout, weak offers",
    afterLabel: "After: clearer hierarchy, stronger CTA path",
    statA: "26%",
    statALabel: "Higher booking clicks",
    statB: "4.8★",
    statBLabel: "Review-led trust framing",
    beforePalette: "from-zinc-300 via-zinc-200 to-zinc-100",
    afterPalette: "from-sky-700 via-blue-600 to-blue-400",
    initial: 64,
  },
];

const corePackages = [
  {
    name: "Blueprint",
    price: "$995",
    tag: "Starter clarity",
    popular: false,
    features: [
      "Single high-conviction landing page",
      "Message cleanup and trust-section rewrite",
      "Mobile-first layout tuned for local service traffic",
      "Fast launch for owner-operators who need a credible web presence now",
    ],
  },
  {
    name: "Framing",
    price: "$2,495",
    tag: "Most Popular",
    popular: true,
    features: [
      "Multi-section lead-generation homepage",
      "Positioning, offer structure, and content hierarchy overhaul",
      "Testimonials, FAQ, and service proof sections built in",
      "Designed to feel established without unnecessary complexity",
    ],
  },
  {
    name: "Turnkey",
    price: "$4,995",
    tag: "Highest touch",
    popular: false,
    features: [
      "Full premium website system with multiple core pages",
      "Service-specific messaging and stronger conversion architecture",
      "Custom case-study presentation and sales-forward proof layout",
      "Built for companies ready to look as dialed-in as they operate",
    ],
  },
];

const redesignPackages = [
  {
    name: "Patch & Paint",
    price: "$795",
    tag: "Quick repair",
    popular: false,
    features: [
      "Refine the sections already closest to working",
      "Tighten copy, hierarchy, and CTA placement",
      "Best when the structure exists but the trust is thin",
    ],
  },
  {
    name: "Remodel",
    price: "$2,195",
    tag: "Most Popular",
    popular: true,
    features: [
      "Strategic redesign of the core lead path",
      "Improved storytelling, proof order, and mobile flow",
      "Ideal when the business is strong but the website undersells it",
    ],
  },
  {
    name: "Full Renovation",
    price: "$4,495",
    tag: "Comprehensive rebuild",
    popular: false,
    features: [
      "Rebuilt visual system and messaging architecture",
      "Premium presentation across homepage and supporting pages",
      "For established companies ready to replace a dated web presence entirely",
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

const faqs = [
  {
    question: "Why Blue Tape Sites?",
    answer:
      "Because most websites fail in small, fixable ways: weak hierarchy, thin trust, unclear offers, and clumsy mobile spacing. We treat those issues like a punch-list and resolve them before launch.",
  },
  {
    question: "Do you work only with plumbers?",
    answer:
      "No. Blue Tape Sites is built for detail-minded home-service owners, including electricians, cleaners, remodelers, cabinet shops, and other companies that depend on credibility and clarity to win work.",
  },
  {
    question: "Can you rebuild my current site instead of starting over?",
    answer:
      "Yes. If the bones are workable, we can repair and strengthen what is already there. If the structure is fighting the business, we recommend a cleaner rebuild path.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "That depends on scope, but the process is intentionally tight. We aim for decisive feedback, clean approvals, and a launch rhythm that respects how busy owners actually operate.",
  },
  {
    question: "What happens in the free audit?",
    answer:
      "We review your current website like a job-site walkthrough, identify the most visible conversion issues, and show you where clarity, trust, and layout improvements can make the biggest difference.",
  },
];

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
      <span className="h-px w-12 bg-blue-600" />
      {children}
    </div>
  );
}

function BeforeAfterCard({
  name,
  category,
  beforeLabel,
  afterLabel,
  statA,
  statALabel,
  statB,
  statBLabel,
  beforePalette,
  afterPalette,
  initial,
}: (typeof caseStudies)[number]) {
  const [position, setPosition] = useState(initial);

  return (
    <Card className="group overflow-hidden rounded-[2rem] border border-black/6 bg-white shadow-[0_24px_80px_rgba(17,17,17,0.08)]">
      <CardContent className="p-0">
        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">{category}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-3xl">{name}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-[1.25rem] border border-black/6 bg-[#FAFAFA] px-4 py-3">
                <div className="text-xl font-semibold tracking-[-0.05em] text-[#111111]">{statA}</div>
                <div className="mt-1 text-sm text-slate-500">{statALabel}</div>
              </div>
              <div className="rounded-[1.25rem] border border-black/6 bg-[#FAFAFA] px-4 py-3">
                <div className="text-xl font-semibold tracking-[-0.05em] text-[#111111]">{statB}</div>
                <div className="mt-1 text-sm text-slate-500">{statBLabel}</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-black/6 bg-[#F2F2F2] p-3 sm:p-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] bg-white">
              <div className={`absolute inset-0 bg-gradient-to-br ${beforePalette}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_45%)]" />
              <div className="absolute inset-0 p-4 sm:p-6">
                <div className="flex h-full flex-col rounded-[1.2rem] border border-black/8 bg-white/80 p-4 shadow-inner backdrop-blur-[2px]">
                  <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">
                    <span>Before</span>
                    <X className="size-4 text-slate-500" />
                  </div>
                  <div className="mt-5 grid gap-3">
                    <div className="h-5 w-2/3 rounded-full bg-slate-300" />
                    <div className="h-3 w-11/12 rounded-full bg-slate-200" />
                    <div className="h-3 w-10/12 rounded-full bg-slate-200" />
                  </div>
                  <div className="mt-5 grid flex-1 grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-200/90" />
                    <div className="rounded-2xl bg-slate-200/90" />
                    <div className="col-span-2 rounded-[1.4rem] bg-slate-300/80" />
                  </div>
                  <div className="mt-4 rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700">
                    {beforeLabel}
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${position}%` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${afterPalette}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_40%)]" />
                <div className="absolute inset-0 p-4 sm:p-6">
                  <div className="flex h-full flex-col rounded-[1.2rem] border border-white/30 bg-[#111111]/16 p-4 text-white shadow-[0_30px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                    <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-white/75">
                      <span>After</span>
                      <Check className="size-4 text-white/90" />
                    </div>
                    <div className="mt-5 grid gap-3">
                      <div className="h-5 w-1/2 rounded-full bg-white/95" />
                      <div className="h-3 w-4/5 rounded-full bg-white/70" />
                      <div className="h-3 w-3/5 rounded-full bg-white/70" />
                    </div>
                    <div className="mt-5 grid flex-1 grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/25 bg-white/18" />
                      <div className="rounded-2xl border border-white/25 bg-white/18" />
                      <div className="col-span-2 rounded-[1.4rem] border border-white/25 bg-white/15" />
                    </div>
                    <div className="mt-4 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm text-slate-900 shadow-sm">
                      {afterLabel}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-y-0 z-20 w-px bg-white shadow-[0_0_0_1px_rgba(17,17,17,0.06)]"
                style={{ left: `${position}%` }}
              >
                <div className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white text-[#111111] shadow-[0_10px_25px_rgba(17,17,17,0.18)]">
                  <MoveRight className="size-4" />
                </div>
              </div>
            </div>

            <div className="mt-5 px-1">
              <input
                aria-label={`${name} before and after slider`}
                className="before-after-slider h-2 w-full appearance-none rounded-full bg-slate-200"
                type="range"
                min={15}
                max={85}
                value={position}
                onChange={(event) => setPosition(Number(event.target.value))}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PricingColumn({
  title,
  subtitle,
  packages,
}: {
  title: string;
  subtitle: string;
  packages: { name: string; price: string; tag: string; popular: boolean; features: string[] }[];
}) {
  return (
    <div className="space-y-5 rounded-[2rem] border border-black/6 bg-white p-6 shadow-[0_24px_80px_rgba(17,17,17,0.08)] sm:p-8">
      <div className="border-b border-[#E5E5E5] pb-5">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">{title}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#111111]">{subtitle}</h3>
      </div>

      <div className="grid gap-5">
        {packages.map((item) => (
          <div
            key={item.name}
            className={`rounded-[1.6rem] border p-5 transition-transform duration-300 hover:-translate-y-1 ${
              item.popular
                ? "border-blue-600 bg-[linear-gradient(180deg,rgba(0,102,255,0.06),rgba(255,255,255,1))] shadow-[0_20px_50px_rgba(0,102,255,0.12)]"
                : "border-black/6 bg-[#FAFAFA]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xl font-semibold tracking-[-0.04em] text-[#111111]">{item.name}</h4>
                <p className="mt-1 text-sm text-slate-500">{item.tag}</p>
              </div>
              {item.popular ? (
                <Badge className="rounded-full bg-blue-600 px-3 py-1 text-white hover:bg-blue-600">Most Popular</Badge>
              ) : null}
            </div>
            <div className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-[#111111]">{item.price}</div>
            <div className="mt-5 space-y-3">
              {item.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-blue-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button className="mt-6 h-11 w-full rounded-full bg-blue-600 text-white hover:bg-blue-700">
              Request an Audit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroStats = useMemo(
    () => [
      { value: "100%", label: "Human-written positioning" },
      { value: "Fast", label: "Tight launch windows" },
      { value: "Sharp", label: "Built for trust at a glance" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] selection:bg-blue-600 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-black/6 bg-white/85 backdrop-blur-xl">
        <div className="container flex h-18 items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-3">
            <div className="relative size-11 overflow-hidden rounded-2xl bg-blue-600 shadow-[0_12px_30px_rgba(0,102,255,0.24)]">
              <span className="absolute left-1/2 top-1/2 h-3.5 w-7 -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] rounded-full bg-white/95" />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-sm border border-white/80 bg-white/20" />
            </div>
            <div className="leading-none">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-400">Blue Tape Sites</div>
              <div className="mt-1 text-base font-semibold tracking-[-0.04em] text-[#111111]">Precision web design</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
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
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu className="size-5" />
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-black/6 bg-white lg:hidden">
            <div className="container flex flex-col gap-4 py-5">
              {navItems.map((item) => (
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
          <div className="container relative grid min-h-[calc(100vh-4.5rem)] items-center gap-12 py-14 sm:py-18 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.26em] text-blue-700 hover:bg-blue-50">
                  Precision websites for serious contractors
                </Badge>
                <h1 className="mt-6 max-w-[13ch] text-[3rem] font-semibold leading-[0.92] tracking-[-0.08em] text-[#111111] sm:text-[4.4rem] lg:text-[5.5rem]">
                  See the tape. Fix the flaws. Launch with confidence.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                  Blue Tape Sites builds premium, detail-first websites for plumbers, electricians, cleaners,
                  and home-service teams that want every weak spot marked, resolved, and ready to sell.
                </p>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Button asChild className="h-13 rounded-full bg-blue-600 px-7 text-base text-white hover:bg-blue-700">
                    <a href="#audit">Request Your Free Audit</a>
                  </Button>
                  <Button asChild variant="outline" className="h-13 rounded-full border-black/10 bg-white px-7 text-base text-[#111111] hover:bg-[#F3F6FB]">
                    <a href="#portfolio">See the Tape Line in Action</a>
                  </Button>
                </div>
                <p className="mt-7 max-w-xl text-sm leading-7 text-slate-500">
                  Precision websites for Southern California plumbers, electricians, cleaners &amp; detail-obsessed home-service owners.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 grid gap-4 sm:grid-cols-3"
              >
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-black/6 bg-white/80 px-5 py-5 shadow-[0_18px_50px_rgba(17,17,17,0.06)] backdrop-blur-sm">
                    <div className="text-2xl font-semibold tracking-[-0.05em] text-[#111111]">{stat.value}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:justify-self-end"
            >
              <div className="absolute -left-8 top-8 hidden h-28 w-28 rounded-full bg-blue-600/12 blur-3xl sm:block" />
              <div className="absolute -right-5 bottom-10 hidden h-32 w-32 rounded-full bg-slate-300/30 blur-3xl sm:block" />
              <div className="hero-card relative overflow-hidden rounded-[2rem] border border-black/7 bg-white p-3 shadow-[0_35px_120px_rgba(17,17,17,0.14)] sm:p-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-hero-wall-DrVe684rwH2xQagD6SAZ7A.webp"
                  alt="Blue painter's tape unrolling into a polished contractor website mockup"
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
                <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/88 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500 backdrop-blur sm:left-7 sm:top-7">
                  Shape landing hero concept
                </div>
                <div className="absolute bottom-5 right-5 max-w-[14rem] rounded-[1.4rem] border border-white/60 bg-white/90 p-4 shadow-[0_18px_50px_rgba(17,17,17,0.08)] backdrop-blur sm:bottom-7 sm:right-7">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Punch-list logic</div>
                  <div className="mt-2 text-base font-semibold tracking-[-0.04em] text-[#111111]">Marked, improved, and launch-ready.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionEyebrow>We Build With the Tape On</SectionEyebrow>
              <h2 className="max-w-[10ch] text-4xl font-semibold leading-tight tracking-[-0.06em] text-[#111111] sm:text-5xl">
                The website process, inspected from the start.
              </h2>
            </div>
            <div>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                Blue Tape Sites is built around the idea that strong websites are rarely fixed by adding more.
                They improve when someone notices what is off, marks what matters, and resolves the details with care.
                That is how we structure strategy, copy, layout, and launch.
              </p>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {buildCards.map((item) => {
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
                        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.05em] text-[#111111]">{item.title}</h3>
                        <p className="mt-4 text-base leading-8 text-slate-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E5E5E5] bg-white py-24 sm:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <SectionEyebrow>We Work With Hands-On Business Owners</SectionEyebrow>
              <h2 className="max-w-[10ch] text-4xl font-semibold leading-tight tracking-[-0.06em] text-[#111111] sm:text-5xl">
                Trusted by owners who notice the details.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                Our best clients already run tight operations. They simply want a website that matches the standard they bring to every job, estimate, walkthrough, and final handoff.
              </p>
            </div>

            <div className="relative overflow-visible px-0 md:px-10">
              <Carousel opts={{ align: "start", loop: true }} className="overflow-visible">
                <CarouselContent className="overflow-visible">
                  {testimonials.map((item) => (
                    <CarouselItem key={item.name} className="md:basis-1/2">
                      <Card className="h-full rounded-[2rem] border border-black/6 bg-[#FAFAFA] shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
                        <CardContent className="flex h-full flex-col p-6 sm:p-8">
                          <div className="flex items-center gap-1 text-blue-600">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star key={index} className="size-4 fill-current" />
                            ))}
                          </div>
                          <p className="mt-6 text-lg leading-8 text-slate-700">“{item.quote}”</p>
                          <div className="mt-auto pt-8">
                            <div className="text-lg font-semibold tracking-[-0.04em] text-[#111111]">{item.name}</div>
                            <div className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-400">{item.company}</div>
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

        <section id="portfolio" className="container py-24 sm:py-32">
          <div className="max-w-3xl">
            <SectionEyebrow>See the Tape Line in Action</SectionEyebrow>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.06em] text-[#111111] sm:text-5xl">
              Before and after, with the weak spots made obvious.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              These interactive comparisons show the kind of lift that happens when layout, message discipline,
              and trust framing are treated like part of the work—not decorative extras.
            </p>
          </div>

          <div className="mt-12 grid gap-8">
            {caseStudies.map((study) => (
              <BeforeAfterCard key={study.name} {...study} />
            ))}
          </div>
        </section>

        <section id="pricing" className="relative overflow-hidden border-y border-[#E5E5E5] bg-white py-24 sm:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.08),transparent_28%)]" />
          <div className="container relative">
            <div className="max-w-3xl">
              <SectionEyebrow>Pricing Packages</SectionEyebrow>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.06em] text-[#111111] sm:text-5xl">
                Premium structure without the agency fog.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Choose a clean build, a focused redesign, or ongoing monthly refinement. Each package is designed to remove confusion, strengthen trust, and get a stronger version of your business online.
              </p>
            </div>

            <div className="mt-12 grid gap-8 xl:grid-cols-2">
              <PricingColumn title="New build packages" subtitle="For businesses starting fresh" packages={corePackages} />
              <PricingColumn title="Redesign packages" subtitle="For websites that need sharper bones" packages={redesignPackages} />
            </div>

            <div className="mt-8 rounded-[2rem] border border-black/6 bg-[#FAFAFA] p-6 shadow-[0_24px_80px_rgba(17,17,17,0.06)] sm:p-8">
              <div className="flex flex-col gap-4 border-b border-[#E5E5E5] pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">Ongoing retainers</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#111111]">Keep the tape on after launch.</h3>
                </div>
                <p className="max-w-lg text-sm leading-7 text-slate-500">
                  Monthly refinement for teams who want a website that keeps improving as offers, seasons, and service priorities change.
                </p>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {retainers.map((retainer) => (
                  <div key={retainer.name} className="rounded-[1.6rem] border border-black/6 bg-white p-5">
                    <div className="text-xl font-semibold tracking-[-0.04em] text-[#111111]">{retainer.name}</div>
                    <div className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-[#111111]">{retainer.price}</div>
                    <div className="mt-5 space-y-3">
                      {retainer.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                          <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-6 h-11 w-full rounded-full bg-[#111111] text-white hover:bg-slate-800">
                      Request an Audit
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="audit" className="container py-24 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <div>
              <SectionEyebrow>Free Blue Tape Audit</SectionEyebrow>
              <h2 className="max-w-[10ch] text-4xl font-semibold leading-tight tracking-[-0.06em] text-[#111111] sm:text-5xl">
                Let us mark up the misses before you spend more on traffic.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Send your current site, your service area, and what you are trying to improve. We will show you where the page loses trust, where the message gets muddy, and where the conversion path needs tightening.
              </p>
              <div className="mt-10 overflow-hidden rounded-[2rem] border border-black/6 bg-white p-4 shadow-[0_30px_90px_rgba(17,17,17,0.08)] sm:p-5">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-audit-board-V6yoJbGViP874uyi6wKV9P.webp"
                  alt="Website audit board with blue tape callouts and markup notes"
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>

            <Card className="rounded-[2rem] border border-black/6 bg-white shadow-[0_30px_90px_rgba(17,17,17,0.08)]">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                  <Sparkles className="size-4 text-blue-600" />
                  Audit request form
                </div>
                <form className="mt-8 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Your name
                      <input className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600" placeholder="Owner or project lead" />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Company name
                      <input className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600" placeholder="Blue Tape-worthy business" />
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Email address
                      <input className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600" placeholder="you@company.com" type="email" />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Phone number
                      <input className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600" placeholder="(555) 000-0000" type="tel" />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Website URL
                    <input className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600" placeholder="https://yourwebsite.com" type="url" />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Primary trade
                      <input className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600" placeholder="Plumbing, electrical, cleaning..." />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                      Service area
                      <input className="h-12 rounded-2xl border border-black/8 bg-[#FAFAFA] px-4 outline-none transition focus:border-blue-600" placeholder="City or region served" />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm font-medium text-slate-700">
                    What feels off right now?
                    <textarea className="min-h-34 rounded-[1.4rem] border border-black/8 bg-[#FAFAFA] px-4 py-3 outline-none transition focus:border-blue-600" placeholder="Tell us where the site feels weak: trust, messaging, design, mobile flow, slow load, or something else." />
                  </label>
                  <div className="rounded-[1.5rem] border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-7 text-slate-600">
                    We review your site like a pre-paint walkthrough: what to keep, what to fix, and what is costing trust right now.
                  </div>
                  <Button className="h-13 rounded-full bg-blue-600 text-base text-white hover:bg-blue-700">
                    Request Your Free Audit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t border-[#E5E5E5] bg-white py-24 sm:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <SectionEyebrow>Cut the Tape on Confusion</SectionEyebrow>
              <h2 className="max-w-[10ch] text-4xl font-semibold leading-tight tracking-[-0.06em] text-[#111111] sm:text-5xl">
                Straight answers for owners who value clarity.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                We keep the process direct, the decisions visible, and the site focused on what actually helps you win better work.
              </p>
            </div>
            <div className="rounded-[2rem] border border-black/6 bg-[#FAFAFA] p-6 shadow-[0_24px_80px_rgba(17,17,17,0.06)] sm:p-8">
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
        <div className="container grid gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-18">
          <div>
            <div className="inline-flex items-center gap-3">
              <div className="relative size-11 overflow-hidden rounded-2xl bg-blue-600">
                <span className="absolute left-1/2 top-1/2 h-3.5 w-7 -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] rounded-full bg-white/95" />
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-sm border border-white/80 bg-white/20" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Blue Tape Sites</div>
                <div className="text-xl font-semibold tracking-[-0.05em]">Precision web design</div>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
              Premium web design for plumbers, electricians, cleaners, and other home-service businesses that want every flaw found, every detail tightened, and every page ready to convert.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">Navigate</div>
              <div className="mt-4 grid gap-3 text-white/72">
                {navItems.map((item) => (
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
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/70">
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
