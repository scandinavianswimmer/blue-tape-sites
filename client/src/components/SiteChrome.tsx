import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CircleHelp, Menu, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUSINESS } from "@shared/business";

export const siteNavItems = [
  { label: "Home", href: "/" },
  { label: "Service Area", href: "/service-area" },
  { label: "Pricing", href: "/pricing" },
  { label: "Examples", href: "/examples" },
  { label: "Case Studies", href: "/case-studies/marias-family-cleaning" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[rgba(247,245,241,0.92)] backdrop-blur-lg">
      <div className="container flex h-18 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="relative flex size-10 items-center justify-center border border-black/10 bg-white">
            <span className="h-1.5 w-6 rotate-[-28deg] bg-blue-600" />
          </div>
          <div className="min-w-0 leading-none">
            <div className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Blue Tape Sites</div>
            <div className="mt-1 whitespace-nowrap text-sm font-semibold tracking-[-0.03em] text-[#111111] sm:text-base">Precision web design</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {siteNavItems.map(item => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-[#111111]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={BUSINESS.phoneHref} className="inline-flex h-11 items-center gap-2 whitespace-nowrap border border-black/10 bg-white px-4 text-sm font-semibold text-[#111111] transition-colors hover:border-blue-600">
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
            {siteNavItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-black/6 py-2 text-base font-medium text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 h-12 rounded-none border border-[#111111] bg-[#111111] text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800">
              <Link href="/audit" onClick={() => setMobileMenuOpen(false)}>
                Request Your Free Audit
              </Link>
            </Button>
            <a href={BUSINESS.phoneHref} className="inline-flex h-12 items-center justify-center gap-2 border border-black/10 bg-white text-sm font-semibold uppercase tracking-[0.08em] text-[#111111]" onClick={() => setMobileMenuOpen(false)}>
              <PhoneCall className="size-4" />
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
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
              {siteNavItems.map(item => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/40">Next step</div>
            <Link href="/audit" className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-blue-300">
              Request Your Free Audit
              <ArrowRight className="size-4" />
            </Link>
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
  );
}
