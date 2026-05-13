import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BadgeCheck, CheckCircle2, ChevronRight } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { TradeLandingPageData } from "@/content/tradeLandingPages";
import { applyPageSeo, SITE_URL, SOCIAL_IMAGE_URL } from "@/lib/seo";

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
      <span className="h-px w-11 bg-blue-600" />
      {children}
    </div>
  );
}

function buildStructuredData(page: TradeLandingPageData) {
  const canonicalUrl = `${SITE_URL}${page.path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        name: page.seoTitle,
        url: canonicalUrl,
        description: page.seoDescription,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${canonicalUrl}#service`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: SOCIAL_IMAGE_URL,
        },
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: page.structuredDataName,
        serviceType: page.structuredDataName,
        url: canonicalUrl,
        description: page.seoDescription,
        provider: {
          "@type": "Organization",
          name: "Blue Tape Sites",
          url: SITE_URL,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "California",
        },
        audience: {
          "@type": "Audience",
          audienceType: page.audienceType,
        },
      },
    ],
  };
}

export default function TradeLandingPage({ page }: { page: TradeLandingPageData }) {
  useEffect(() => {
    applyPageSeo({
      title: page.seoTitle,
      description: page.seoDescription,
      canonicalUrl: `${SITE_URL}${page.path}`,
      structuredData: buildStructuredData(page),
    });
  }, [page]);

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#111111]">
      <header className="border-b border-black/8 bg-[#faf8f4]/95 backdrop-blur supports-[backdrop-filter]:bg-[#faf8f4]/88">
        <div className="container flex min-h-[5.2rem] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-[#111111]">
            <span className="inline-flex h-9 w-9 items-center justify-center border border-blue-600 bg-blue-600/10 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-blue-700">
              BTS
            </span>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#111111]">Blue Tape Sites</div>
              <div className="text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">Trade-specific website direction</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link href="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-[#111111]">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-slate-600 transition-colors hover:text-[#111111]">
              Blog
            </Link>
            <a href="/pricing" className="text-sm font-medium text-slate-600 transition-colors hover:text-[#111111]">
              Pricing
            </a>
            <a href="/audit" className="text-sm font-medium text-slate-600 transition-colors hover:text-[#111111]">
              Audit
            </a>
          </nav>

          <Button asChild className="h-11 rounded-none border border-[#111111] bg-[#111111] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800">
            <a href="/audit">Request audit</a>
          </Button>
        </div>
      </header>

      <main>
        <section className="container grid gap-12 pb-18 pt-12 sm:pb-24 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-16">
          <div>
            <SectionEyebrow>{page.eyebrow}</SectionEyebrow>
            <h1 className="mt-6 max-w-[13ch] text-[2.7rem] font-semibold leading-[0.95] tracking-[-0.07em] text-[#111111] sm:text-[4.5rem]">
              {page.heroTitle}
            </h1>
            <p className="mt-6 max-w-[41rem] text-[1.03rem] leading-8 text-slate-650 sm:text-[1.14rem]">{page.heroSummary}</p>
            <p className="mt-4 max-w-[38rem] text-sm leading-7 text-slate-500 sm:text-[0.98rem]">{page.heroDetail}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-13 rounded-none border border-[#111111] bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800 sm:w-auto">
                <a href="/audit">{page.primaryCtaLabel}</a>
              </Button>
              <Button asChild variant="outline" className="h-13 rounded-none border-[#111111] bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-white sm:w-auto">
                <a href="/pricing">{page.secondaryCtaLabel}</a>
              </Button>
            </div>

            <div className="mt-10 border-t border-black/8 pt-6">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Who this page is for</div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{page.audienceLabel}</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{page.promise}</p>
            </div>
          </div>

          <div className={`border border-black/10 ${page.accentSurfaceClass} p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)] sm:p-7`}>
            <div className={`h-1.5 w-full bg-gradient-to-r ${page.accentClass}`} />
            <div className="mt-6 grid gap-5">
              <div className="border border-black/8 bg-white p-5">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Core promise</div>
                <p className="mt-3 text-[1.4rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-[1.75rem]">
                  {page.promise}
                </p>
              </div>
              <div className="grid gap-px border border-black/8 bg-black/8">
                {page.spotlightPoints.map(point => (
                  <div key={point.title} className="bg-white p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 text-blue-700" />
                      <div>
                        <h2 className="text-base font-semibold tracking-[-0.03em] text-[#111111]">{point.title}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{point.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href={page.relatedArticleHref} className="group inline-flex items-center justify-between border border-black/8 bg-white px-5 py-4 text-sm font-medium text-[#111111] transition-colors hover:bg-slate-50">
                <span>{page.relatedArticleTitle}</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-white py-18 sm:py-24">
          <div className="container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <SectionEyebrow>Where the page usually leaks trust</SectionEyebrow>
              <h2 className="mt-5 text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.2rem]">
                {page.problemTitle}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{page.problemIntro}</p>
            </div>
            <div className="grid gap-px border border-black/8 bg-black/8">
              {page.painPoints.map(point => (
                <div key={point.title} className="bg-[#faf8f4] p-6 sm:p-7">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Common issue</div>
                  <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.05em] text-[#111111]">{point.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-18 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionEyebrow>What the stronger version does</SectionEyebrow>
              <h2 className="mt-5 text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.2rem]">
                {page.outcomesTitle}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{page.outcomesIntro}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {page.outcomes.map(point => (
                <div key={point.title} className="border border-black/8 bg-white p-5 sm:p-6">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${page.accentClass}`} />
                  <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.04em] text-[#111111]">{point.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#f3f1ec] py-18 sm:py-24">
          <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
            <div>
              <SectionEyebrow>How the page should feel</SectionEyebrow>
              <h2 className="mt-5 text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.1rem]">
                {page.spotlightTitle}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{page.spotlightIntro}</p>

              <div className="mt-8 grid gap-5">
                {page.proofCards.map(card => (
                  <div key={card.title} className="border border-black/8 bg-white p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 size-4 text-blue-700" />
                      <div>
                        <h3 className="text-[1.08rem] font-semibold tracking-[-0.03em] text-[#111111]">{card.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/10 bg-white p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)] sm:p-7">
              <div className="flex items-center justify-between gap-3 border-b border-black/8 pb-4">
                <div>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Page direction</div>
                  <div className="mt-2 text-[1.15rem] font-semibold tracking-[-0.04em] text-[#111111]">{page.proofTitle}</div>
                </div>
                <div className={`h-10 w-10 bg-gradient-to-br ${page.accentClass}`} />
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{page.proofIntro}</p>

              <div className="mt-6 grid gap-4">
                {page.spotlightPoints.map((point, index) => (
                  <div key={point.title} className="grid gap-4 border border-black/8 bg-[#faf8f4] p-4 sm:grid-cols-[4.2rem_1fr] sm:items-start">
                    <div className="border border-black/8 bg-white px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-[1.02rem] font-semibold tracking-[-0.03em] text-[#111111]">{point.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container py-18 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div>
              <SectionEyebrow>Questions before the next step</SectionEyebrow>
              <h2 className="mt-5 text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3rem]">{page.faqTitle}</h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">{page.auditBody}</p>
            </div>
            <div className="border border-black/8 bg-white p-5 sm:p-7">
              <Accordion type="single" collapsible className="w-full">
                {page.faqs.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-[1.02rem] font-semibold tracking-[-0.02em] text-[#111111]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-slate-600">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#111111] py-18 text-white sm:py-22">
        <div className="container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/45">Blue Tape Sites</div>
            <h2 className="mt-5 max-w-[14ch] text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[3.3rem]">
              {page.auditTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{page.auditBody}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Button asChild className="h-13 rounded-none border border-white bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-slate-200">
              <a href="/audit">{page.primaryCtaLabel}</a>
            </Button>
            <Button asChild variant="outline" className="h-13 rounded-none border-white/35 bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10">
              <Link href={page.relatedArticleHref}>
                <span className="inline-flex items-center gap-2">
                  Read the related article
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
