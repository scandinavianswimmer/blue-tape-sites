import { ArrowRight, BadgeCheck, CheckCircle2, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ClientSiteTemplateData } from "./clientSiteTemplate.config";

type ClientSiteTemplateProps = {
  data: ClientSiteTemplateData;
};

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:mb-5 sm:text-[0.74rem]">
      <span className="h-px w-10 bg-blue-600" />
      {children}
    </div>
  );
}

export function ClientSiteTemplate({ data }: ClientSiteTemplateProps) {
  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#111111]">
      <header className="border-b border-black/8 bg-[#faf8f4]/95 backdrop-blur">
        <div className="container flex items-center justify-between gap-6 py-5">
          <a href="/" className="flex items-center gap-3 text-[#111111] no-underline">
            <img src={data.company.logoUrl} alt={`${data.company.name} logo`} className="h-10 w-auto object-contain" />
            <div>
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {data.company.trade}
              </div>
              <div className="text-sm font-medium text-[#111111]">{data.company.name}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-slate-500 lg:flex">
            <a href="#services" className="transition-colors hover:text-[#111111]">
              Services
            </a>
            <a href="#proof" className="transition-colors hover:text-[#111111]">
              Proof
            </a>
            <a href="#service-area" className="transition-colors hover:text-[#111111]">
              Service Area
            </a>
            <a href="#faq" className="transition-colors hover:text-[#111111]">
              FAQ
            </a>
          </nav>

          <Button
            asChild
            className="hidden h-11 rounded-none border border-[#111111] bg-[#111111] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800 sm:inline-flex"
          >
            <a href={data.company.primaryCtaHref}>{data.company.primaryCtaLabel}</a>
          </Button>
        </div>
      </header>

      <main>
        <section className="border-b border-black/8">
          <div className="container grid gap-10 py-14 sm:py-18 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16 lg:py-24">
            <div>
              <SectionEyebrow>{data.hero.eyebrow}</SectionEyebrow>
              <h1 className="max-w-[12ch] text-[3rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#111111] sm:text-[4.8rem] lg:text-[5.6rem]">
                {data.hero.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {data.hero.supportingCopy}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-none border border-[#111111] bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800"
                >
                  <a href={data.company.primaryCtaHref}>
                    {data.company.primaryCtaLabel}
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>

                {data.company.secondaryCtaLabel && data.company.secondaryCtaHref ? (
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-none border border-[#111111] bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-[#111111] hover:text-white"
                  >
                    <a href={data.company.secondaryCtaHref}>{data.company.secondaryCtaLabel}</a>
                  </Button>
                ) : null}
              </div>

              <div className="mt-10 grid gap-3 sm:max-w-xl">
                {data.hero.trustPoints.map(point => (
                  <div key={point} className="flex items-start gap-3 border-t border-black/8 py-3 text-sm leading-7 text-slate-600">
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-blue-600" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/10 bg-white p-3 sm:p-4">
              <img
                src={data.hero.heroImageUrl}
                alt={data.hero.heroImageAlt}
                className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-black/8 bg-white">
          <div className="container grid gap-px border-x border-black/8 bg-black/8 lg:grid-cols-3">
            {data.proof.stats.map(stat => (
              <div key={stat.label} className="bg-white px-6 py-6 sm:px-8 sm:py-7">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">{stat.label}</div>
                <div className="mt-3 text-[2.1rem] font-semibold tracking-[-0.06em] text-[#111111]">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="border-b border-black/8 bg-[#faf8f4]">
          <div className="container py-14 sm:py-18 lg:py-24">
            <SectionEyebrow>Core services</SectionEyebrow>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div>
                <h2 className="max-w-[10ch] text-[2.4rem] font-semibold leading-[0.95] tracking-[-0.06em] text-[#111111] sm:text-[3.7rem]">
                  Build the offer so customers understand it faster.
                </h2>
              </div>
              <div className="grid gap-px border border-black/10 bg-black/10">
                {data.services.map(service => (
                  <article key={service.name} className="bg-white p-5 sm:p-6">
                    <h3 className="text-[1.45rem] font-semibold tracking-[-0.05em] text-[#111111]">{service.name}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[0.98rem]">
                      {service.summary}
                    </p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                      {service.bullets.map(item => (
                        <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="border-b border-black/8 bg-white">
          <div className="container py-14 sm:py-18 lg:py-24">
            <SectionEyebrow>Proof</SectionEyebrow>
            <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-2">
              {data.proof.testimonials.map(testimonial => (
                <article key={`${testimonial.name}-${testimonial.quote.slice(0, 24)}`} className="bg-white p-6 sm:p-8">
                  <p className="text-lg leading-8 tracking-[-0.02em] text-[#111111]">“{testimonial.quote}”</p>
                  <div className="mt-6 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {testimonial.name}
                    {testimonial.company ? ` · ${testimonial.company}` : ""}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/8 bg-[#faf8f4]">
          <div className="container py-14 sm:py-18 lg:py-24">
            <SectionEyebrow>Why choose us</SectionEyebrow>
            <div className="grid gap-8 lg:grid-cols-3">
              {data.differentiators.map(item => (
                <article key={item.title} className="border-t-2 border-blue-600 pt-5">
                  <h3 className="text-[1.45rem] font-semibold tracking-[-0.05em] text-[#111111]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/8 bg-white">
          <div className="container py-14 sm:py-18 lg:py-24">
            <SectionEyebrow>What it feels like to work with this company</SectionEyebrow>
            <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-3">
              {data.process.map(item => (
                <article key={item.step} className="bg-white p-6 sm:p-8">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.step}</div>
                  <h3 className="mt-4 text-[1.45rem] font-semibold tracking-[-0.05em] text-[#111111]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="service-area" className="border-b border-black/8 bg-[#faf8f4]">
          <div className="container py-14 sm:py-18 lg:py-24">
            <SectionEyebrow>Service area</SectionEyebrow>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <h2 className="max-w-[12ch] text-[2.3rem] font-semibold leading-[0.96] tracking-[-0.06em] text-[#111111] sm:text-[3.5rem]">
                  {data.serviceArea.title}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-[0.98rem] sm:leading-8">
                  {data.serviceArea.description}
                </p>
              </div>
              <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
                {data.serviceArea.locations.map(location => (
                  <div key={location} className="flex items-center gap-3 bg-white px-5 py-5 text-sm font-medium text-slate-700">
                    <MapPin className="size-4 text-blue-600" />
                    <span>{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="border-b border-black/8 bg-white">
          <div className="container py-14 sm:py-18 lg:py-24">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <div className="grid gap-px border border-black/10 bg-black/10">
              {data.faq.map(item => (
                <article key={item.question} className="bg-white px-6 py-6 sm:px-8">
                  <h3 className="text-[1.2rem] font-semibold tracking-[-0.04em] text-[#111111]">{item.question}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[0.98rem]">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#111111] text-white">
          <div className="container py-14 sm:py-18 lg:py-22">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/60">Ready to act</div>
                <h2 className="mt-4 max-w-[13ch] text-[2.5rem] font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-[3.8rem]">
                  {data.finalCta.headline}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-[0.98rem] sm:leading-8">
                  {data.finalCta.supportingCopy}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  asChild
                  className="h-12 rounded-none border border-white bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-slate-200"
                >
                  <a href={data.company.primaryCtaHref}>{data.company.primaryCtaLabel}</a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-none border border-white/30 bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white hover:text-[#111111]"
                >
                  <a href={`tel:${data.company.phone.replace(/[^\d+]/g, "")}`}>
                    <Phone className="mr-2 size-4" />
                    {data.company.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
