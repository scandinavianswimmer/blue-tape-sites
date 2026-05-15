import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarClock,
  MapPin,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { applyPageSeo, SITE_URL } from "@/lib/seo";
import { BUSINESS } from "@shared/business";

const CASE_PATH = "/case-studies/marias-family-cleaning";
const CASE_URL = `${SITE_URL}${CASE_PATH}`;
const HERO_IMAGE = `${SITE_URL}/case-studies/marias-family-cleaning/desktop-home.webp`;
const ASSET_BASE = "/case-studies/marias-family-cleaning";
const PUBLISHED_DATE = "2026-05-15T12:00:00Z";

const stats = ["247+ OC families served", "5.0 rating - 127+ reviews"];

const snapshotItems = [
  { icon: Sparkles, label: "Trade", value: "Residential cleaning" },
  { icon: MapPin, label: "Market", value: "Orange County, CA (12 cities)" },
  { icon: CalendarClock, label: "Type", value: "Lead-focused homepage + booking flow" },
];

const buildDecisions = [
  {
    title: "Bilingual identity that doesn't feel translated",
    body:
      "Most bilingual sites read like a translation tool ran through them. We treated Spanish as a first-class brand language: 'Nuestros Servicios,' 'Bienvenidos! Trusted by 247+ OC familias,' and 'We clean your home like it's Abuela's.' The result is a site that feels native to its audience and signals cultural trust to homeowners who want to support family-run businesses.",
    image: `${ASSET_BASE}/desktop-home.webp`,
    alt: "Maria's Family Cleaning homepage with bilingual Spanish and English hero copy",
    position: "object-top",
  },
  {
    title: "Trust signals stacked above the fold",
    body:
      "Five trust elements live above the scroll: 247+ families served, 5.0 star rating, 127+ reviews, bonded and insured, and same-day availability. By the time a visitor's thumb gets to the 'Get Free Quote in 60s' button, they have already absorbed why they should click.",
    image: `${ASSET_BASE}/desktop-home.webp`,
    alt: "Trust badge row on Maria's Family Cleaning homepage",
    position: "object-top",
  },
  {
    title: "60-second quote calculator that doesn't ask for a call",
    body:
      "House cleaning buyers want pricing before they talk to a human. We built an interactive quote tool that asks five things: zip, square footage, bedrooms, bathrooms, and service type. Then it returns a real estimate. No 'we'll get back to you with pricing.' No appointment-just-to-quote runaround.",
    image: `${ASSET_BASE}/full-page.webp`,
    alt: "Quote calculator interface on Maria's Family Cleaning site",
    position: "object-[center_36%]",
  },
  {
    title: "Pricing transparency on every service",
    body:
      "Standard cleaning starts at $75. Deep cleaning $120. Move-out $150. Add-ons are listed publicly: $5 pet fee, $30 oven, and $40 windows. Most cleaning competitors hide pricing behind a phone call. Maria's wins the comparison because the price is right there, with no surprises.",
    image: `${ASSET_BASE}/full-page.webp`,
    alt: "Pricing tier table on Maria's Family Cleaning site",
    position: "object-[center_55%]",
  },
  {
    title: "Service area as proof, not just SEO",
    body:
      "We listed all 12 cities Maria serves: Irvine, Costa Mesa, Newport Beach, Huntington Beach, Tustin, Orange, Santa Ana, Fullerton, Lake Forest, Mission Viejo, Laguna Beach, and Aliso Viejo. Each city becomes a trust signal to local searchers and a real targeting hook for Google's local pack.",
    image: `${ASSET_BASE}/full-page.webp`,
    alt: "Orange County service area section on Maria's Family Cleaning site",
    position: "object-[center_73%]",
  },
];

const relatedLinks = [
  { href: "/web-design-for-cleaners", label: "Web design for cleaners" },
  { href: "/examples", label: "Examples" },
  { href: "/blog/the-service-page-formula-for-home-service-businesses", label: "The service page formula" },
];

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="container pt-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        <li><Link href="/" className="hover:text-[#111111]">Home</Link></li>
        <li>/</li>
        <li><Link href="/examples" className="hover:text-[#111111]">Examples</Link></li>
        <li>/</li>
        <li><Link href={CASE_PATH} className="hover:text-[#111111]">Case Studies</Link></li>
        <li>/</li>
        <li className="text-[#111111]">Maria's Family Cleaning</li>
      </ol>
    </nav>
  );
}

function VisualFrame({
  src,
  alt,
  className,
  imgClassName = "object-top",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`overflow-hidden border border-black/10 bg-white shadow-[0_22px_70px_rgba(17,17,17,0.09)] ${className ?? ""}`}>
      <img src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} loading="lazy" decoding="async" />
    </div>
  );
}

function PhoneFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.65rem] border-[8px] border-[#111111] bg-[#111111] shadow-[0_22px_70px_rgba(17,17,17,0.16)] ${className ?? ""}`}>
      <div className="h-full w-full overflow-hidden rounded-[1.05rem] bg-white">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

export default function MariasFamilyCleaningCaseStudy() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Maria's Family Cleaning books 200+ OC homes monthly",
    description:
      "How we rebuilt Maria's Family Cleaning into a bilingual, trust-first house cleaning site that books 247+ OC families and earned a 5.0 rating across 127+ reviews.",
    image: HERO_IMAGE,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    mainEntityOfPage: CASE_URL,
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
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Examples", item: `${SITE_URL}/examples` },
      { "@type": "ListItem", position: 3, name: "Case Studies", item: `${SITE_URL}/case-studies` },
      { "@type": "ListItem", position: 4, name: "Maria's Family Cleaning", item: CASE_URL },
    ],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    applyPageSeo({
      title: "How Maria's Family Cleaning Books 200+ OC Homes Monthly | Blue Tape Sites Case Study",
      description:
        "How we rebuilt Maria's Family Cleaning into a bilingual, trust-first house cleaning site that books 247+ OC families and earned a 5.0 rating across 127+ reviews.",
      canonicalUrl: CASE_URL,
      image: HERO_IMAGE,
      ogType: "article",
      publishedTime: PUBLISHED_DATE,
      modifiedTime: PUBLISHED_DATE,
      structuredData: articleSchema,
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f5f1] text-[#111111] selection:bg-blue-600 selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteHeader />
      <Breadcrumbs />

      <main>
        <section className="container grid overflow-hidden gap-12 pb-16 pt-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-24 lg:pt-12">
          <div className="min-w-0">
            <div className="inline-flex border border-black/10 bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Case study
            </div>
            <h1 className="mt-6 max-w-full text-[3.1rem] font-semibold leading-[0.93] tracking-[-0.07em] text-[#111111] sm:max-w-[12ch] sm:text-[4.6rem]">
              How Maria's Family Cleaning books 200+ OC homes monthly
            </h1>
            <p className="mt-6 max-w-full text-base leading-8 text-slate-600 sm:max-w-2xl sm:text-lg sm:leading-9">
              A bilingual cleaning company in Orange County needed a website that felt as warm as a referral from your neighbor - and as serious as a $150 deep clean. Here's how we built it.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {stats.map(item => (
                <div key={item} className="border border-black/10 bg-white px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Star className="size-4 fill-blue-600 text-blue-600" />
                    <span className="text-sm font-semibold text-[#111111]">{item}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8 h-auto min-h-13 w-full justify-between rounded-none border border-[#111111] bg-[#111111] px-4 py-4 text-left text-sm font-semibold uppercase leading-5 tracking-[0.08em] text-white hover:bg-slate-800 sm:w-auto sm:px-6 sm:whitespace-nowrap">
              <Link href="/audit">
                <span className="sm:hidden">Request your free audit</span>
                <span className="hidden sm:inline">Get the same treatment - Request your free audit</span>
                <ArrowRight className="ml-3 size-4 shrink-0" />
              </Link>
            </Button>
          </div>

          <div className="relative grid gap-4 overflow-hidden lg:min-h-[34rem]">
            <VisualFrame
              src={`${ASSET_BASE}/desktop-home.webp`}
              alt="Desktop screenshot of Maria's Family Cleaning homepage"
              className="h-[18rem] w-full rounded-sm sm:h-[24rem] lg:absolute lg:left-0 lg:top-4 lg:h-[25rem] lg:w-[88%]"
            />
            <PhoneFrame
              src={`${ASSET_BASE}/mobile-home-clean.webp`}
              alt="Mobile screenshot of Maria's Family Cleaning homepage"
              className="mx-auto aspect-[390/844] w-[46%] min-w-[10.5rem] max-w-[13.5rem] sm:w-[30%] lg:absolute lg:bottom-0 lg:right-2 lg:mx-0 lg:w-[13.25rem] lg:max-w-none"
            />
          </div>
        </section>

        <section className="border-y border-black/8 bg-white py-8">
          <div className="container grid gap-px border border-black/8 bg-black/8 md:grid-cols-3">
            {snapshotItems.map(item => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="bg-white p-6">
                  <Icon className="size-5 text-blue-700" />
                  <div className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{item.label}</div>
                  <div className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#111111]">{item.value}</div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="container grid gap-10 py-18 lg:grid-cols-[0.72fr_1.28fr] lg:py-24">
          <div>
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">The problem</div>
            <h2 className="mt-5 max-w-[12ch] text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[3.4rem]">
              The cleaning industry sells on trust, not features
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            <p>
              Most cleaning company websites read like a list of services and a phone number. That works in 2010. In 2026, a homeowner deciding who's getting access to their house wants to see: a real team, real reviews, real pricing, and a real way to book without picking up the phone.
            </p>
            <p>
              Maria's brand was strong. She had built a reputation among Orange County families across Irvine, Costa Mesa, Newport Beach, and beyond. But the website was not matching the brand. We rebuilt it to do five things every cleaning company site should do: surface trust above the fold, make pricing transparent, expose the service area, capture quotes without friction, and let the cultural identity show through instead of hiding it.
            </p>
          </div>
        </section>

        <section className="border-y border-black/8 bg-white py-18 sm:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">What we built</div>
              <h2 className="mt-5 text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[3.4rem]">
                Five decisions that turned the site into a booking engine
              </h2>
            </div>

            <div className="mt-12 grid gap-px border border-black/8 bg-black/8">
              {buildDecisions.map((item, index) => (
                <article key={item.title} className="grid gap-0 bg-white lg:grid-cols-[0.86fr_1.14fr]">
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-blue-700">Decision {index + 1}</div>
                    <h3 className="mt-4 text-[1.65rem] font-semibold tracking-[-0.05em] text-[#111111] sm:text-[2rem]">{item.title}</h3>
                    <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{item.body}</p>
                  </div>
                  <div className="bg-[#f7f5f1] p-4 sm:p-6">
                    <VisualFrame src={item.image} alt={item.alt} className="h-[22rem]" imgClassName={item.position} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-18 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">The numbers</div>
              <h2 className="mt-5 text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[3.4rem]">
                What the rebuild moved
              </h2>
              <p className="mt-5 text-sm italic leading-7 text-slate-500">Metrics updating monthly</p>
            </div>
            <div className="grid gap-px border border-black/8 bg-black/8 sm:grid-cols-3">
              {[
                ["247+", "families served"],
                ["127+", "five-star reviews"],
                ["12", "cities covered"],
              ].map(([value, label]) => (
                <div key={label} className="bg-white p-6">
                  <div className="text-[3rem] font-semibold tracking-[-0.07em] text-[#111111]">{value}</div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</div>
                </div>
              ))}
              <div className="bg-white p-6 sm:col-span-3">
                <p className="max-w-3xl text-base leading-8 text-slate-600">
                  247+ families served. 127+ five-star reviews. 12 cities covered. The numbers Maria publishes speak for themselves - and they are the numbers we built the site to make possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#111111] py-18 text-white sm:py-24">
          <div className="container max-w-5xl">
            <blockquote className="text-[2rem] font-semibold leading-tight tracking-[-0.05em] sm:text-[3.1rem]">
              "Quick booking and great communication. Everything was spotless and they were so professional."
            </blockquote>
            <div className="mt-8 flex items-center gap-3 border-t border-white/12 pt-6 text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
              <Users className="size-4" />
              Sarah M., Irvine
            </div>
            <p className="mt-3 text-sm text-white/45">Real customer review from mariasfamilycleaning.com.</p>
          </div>
        </section>

        <section className="container py-18 sm:py-24">
          <div className="border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(17,17,17,0.06)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">For your business</div>
                <h2 className="mt-5 text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[3.4rem]">
                  Want the same treatment for your trade?
                </h2>
              </div>
              <div>
                <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                  Maria's was a cleaning company. We have also built sites for plumbers, electricians, HVAC, remodelers, and other Southern California service businesses. Same approach: surface trust above the fold, make pricing transparent, let the brand voice show through, and turn the site into a booking engine. Send us your URL and your trade - we will send back a 5-minute video audit within 48 hours.
                </p>
                <Button asChild className="mt-7 h-13 rounded-none border border-[#111111] bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800">
                  <Link href="/audit">
                    Request your free audit
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <p className="mt-3 text-sm font-medium text-slate-600">
                  Or call <a href={BUSINESS.phoneHref} className="font-semibold text-[#111111] underline decoration-blue-600/40 underline-offset-4">{BUSINESS.phoneDisplay}</a> - same-day reply.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/8 bg-white py-12">
          <div className="container">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Related links</div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map(link => (
                <Link key={link.href} href={link.href} className="group flex items-center justify-between border border-black/10 bg-[#f7f5f1] p-5 text-sm font-semibold text-[#111111] transition-colors hover:border-blue-600">
                  {link.label}
                  <ArrowRight className="size-4 text-blue-700 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
