import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BadgeCheck, Clock3, MapPin, PhoneCall, TimerReset } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { applyPageSeo } from "@/lib/seo";
import type { SeoPage } from "@shared/seoPages";
import { SITE_URL } from "@shared/seoPages";
import { BUSINESS, trustStripItems } from "@shared/business";

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
      <span className="h-px w-11 bg-blue-600" />
      {children}
    </div>
  );
}

function buildStructuredData(page: SeoPage) {
  const canonicalUrl = `${SITE_URL}${page.path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        name: page.title,
        url: canonicalUrl,
        description: page.description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
      },
      page.type === "industry"
        ? {
            "@type": "Service",
            "@id": `${canonicalUrl}#service`,
            name: page.h1,
            serviceType: page.eyebrow,
            description: page.description,
            provider: {
              "@id": `${SITE_URL}/#professional-service`,
            },
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Southern California",
            },
          }
        : {
            "@type": "LocalBusiness",
            "@id": `${canonicalUrl}#local-business`,
            name: "Blue Tape Sites",
            url: canonicalUrl,
            description: page.description,
            areaServed: {
              "@type": "AdministrativeArea",
              name: page.type === "city" ? page.eyebrow : "Southern California",
            },
          },
      page.faq?.length
        ? {
            "@type": "FAQPage",
            mainEntity: page.faq.map(item => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }
        : undefined,
    ].filter(Boolean),
  };
}

function TrustStrip() {
  const icons = [PhoneCall, Clock3, TimerReset, MapPin];

  return (
    <section className="border-y border-black/8 bg-white">
      <div className="container grid gap-px bg-black/8 sm:grid-cols-2 lg:grid-cols-4">
        {trustStripItems.map((item, index) => {
          const Icon = icons[index] ?? BadgeCheck;
          const content = (
            <div className="flex h-full items-center gap-3 bg-white px-5 py-4">
              <Icon className="size-4 shrink-0 text-blue-700" />
              <div>
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
                <div className="mt-1 text-sm font-semibold text-[#111111]">{item.value}</div>
              </div>
            </div>
          );

          return item.href ? (
            <a key={item.value} href={item.href} className="block transition-colors hover:bg-slate-50">
              {content}
            </a>
          ) : (
            <div key={item.value}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}

export default function SeoLandingPage({ page }: { page: SeoPage }) {
  useEffect(() => {
    applyPageSeo({
      title: page.title,
      description: page.description,
      canonicalUrl: `${SITE_URL}${page.path}`,
      structuredData: buildStructuredData(page),
    });
  }, [page]);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f5f1] text-[#111111] selection:bg-blue-600 selection:text-white">
      <SiteHeader />

      <main>
        <section className="container grid gap-12 pb-18 pt-12 sm:pb-24 sm:pt-16 lg:grid-cols-[0.98fr_1.02fr] lg:items-start lg:gap-16">
          <div>
            <SectionEyebrow>{page.eyebrow}</SectionEyebrow>
            <h1 className="mt-6 max-w-[13ch] text-[2.7rem] font-semibold leading-[0.95] tracking-[-0.07em] text-[#111111] sm:text-[4.5rem]">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-[43rem] text-[1.03rem] leading-8 text-slate-600 sm:text-[1.14rem]">{page.summary}</p>
            <p className="mt-5 max-w-[43rem] border-l-2 border-blue-600 pl-4 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{page.answer}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-13 rounded-none border border-[#111111] bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800 sm:w-auto">
                <Link href="/audit">Get your free audit</Link>
              </Button>
              {page.path === "/web-design-for-cleaners" ? (
                <Button asChild variant="outline" className="h-13 rounded-none border-[#111111] bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-white sm:w-auto">
                  <Link href="/case-studies/marias-family-cleaning">See cleaning case study</Link>
                </Button>
              ) : null}
              <Button asChild variant="outline" className="h-13 rounded-none border-[#111111] bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-white sm:w-auto">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Or call <a className="font-semibold text-[#111111] underline decoration-blue-600/40 underline-offset-4" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> - same-day reply.
            </p>
          </div>

          <div className="border border-black/10 bg-white p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)] sm:p-7">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-700 via-cyan-500 to-slate-300" />
            <div className="mt-6 grid gap-px border border-black/8 bg-black/8">
              {[
                ["Free audit", `${BUSINESS.leadMagnet}, ${BUSINESS.auditTurnaround}.`],
                ["Phone-first", `Call ${BUSINESS.phoneDisplay} from any page.`],
                ["Local scope", BUSINESS.serviceAreaDetail],
              ].map(([title, body]) => (
                <article key={title} className="bg-[#faf8f4] p-5">
                  <div className="flex items-start gap-3">
                    {page.type === "city" ? <MapPin className="mt-1 size-4 text-blue-700" /> : <BadgeCheck className="mt-1 size-4 text-blue-700" />}
                    <div>
                      <div className="text-[1.15rem] font-semibold tracking-[-0.04em] text-[#111111]">{title}</div>
                      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <TrustStrip />

        {page.sections.length ? (
          <section className="container py-18 sm:py-24">
            <div className="grid gap-px border border-black/8 bg-black/8">
              {page.sections.map(section => (
                <article key={section.title} className="bg-white p-6 sm:p-7">
                  <h2 className="text-[1.6rem] font-semibold tracking-[-0.05em] text-[#111111]">{section.title}</h2>
                  {section.body ? <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{section.body}</p> : null}
                  {section.paragraphs?.map(paragraph => (
                    <p key={paragraph} className="mt-4 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{paragraph}</p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map(bullet => (
                        <li key={bullet} className="border border-black/8 bg-[#faf8f4] p-4 text-sm leading-7 text-slate-600">{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.links?.length ? (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {section.links.map(link => (
                        <Link key={link.href} href={link.href} className="border border-black/8 bg-[#faf8f4] p-4 transition-colors hover:border-blue-600">
                          <span className="text-sm font-semibold text-[#111111]">{link.label}</span>
                          {link.description ? <span className="mt-2 block text-xs leading-5 text-slate-500">{link.description}</span> : null}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {page.faq?.length ? (
          <section className="border-y border-black/8 bg-white py-18 sm:py-24">
            <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <SectionEyebrow>FAQ</SectionEyebrow>
                <h2 className="mt-5 text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] sm:text-[3.2rem]">
                  Common questions before the next step.
                </h2>
              </div>
              <div className="grid gap-px border border-black/8 bg-black/8">
                {page.faq.map(item => (
                  <article key={item.question} className="bg-[#faf8f4] p-6">
                    <h3 className="text-[1.15rem] font-semibold tracking-[-0.04em] text-[#111111]">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="container py-18 sm:py-24">
          <div className="border border-black/10 bg-[#111111] p-6 text-white sm:p-8">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/45">Next step</div>
            <h2 className="mt-3 max-w-2xl text-[2rem] font-semibold leading-tight tracking-[-0.05em] sm:text-[2.6rem]">
              Want to know what is holding your current site back?
            </h2>
            <Link href="/audit" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white">
              Request your free website audit
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-3 text-sm text-white/65">
              Or call <a href={BUSINESS.phoneHref} className="font-semibold text-white underline decoration-blue-300/60 underline-offset-4">{BUSINESS.phoneDisplay}</a> - same-day reply.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
