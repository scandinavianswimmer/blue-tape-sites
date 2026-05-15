import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f5f1] text-[#111111] selection:bg-blue-600 selection:text-white">
      <SiteHeader />
      <main className="border-b border-black/8">
        <section className="container grid min-h-[62vh] gap-10 py-18 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <div>
            <div className="inline-flex border border-black/10 bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Page not found
            </div>
            <h1 className="mt-6 max-w-[10ch] text-[3.2rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#111111] sm:text-[5rem]">
              This page missed the mark.
            </h1>
          </div>

          <div className="border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(17,17,17,0.05)] sm:p-8">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">404</div>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              The page you are looking for may have moved, or the URL might be off by a few characters. Start from the homepage and you can get back to pricing, examples, case studies, and the free audit.
            </p>
            <Button asChild className="mt-7 h-13 rounded-none border border-[#111111] bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800">
              <Link href="/">
                Go home
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
