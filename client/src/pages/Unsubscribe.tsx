import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { applyPageSeo, SITE_URL } from "@/lib/seo";
import { trpc } from "@/lib/trpc";

type UnsubscribeFormState = {
  email: string;
  reason: string;
};

const OUTBOUND_SENDER_EMAIL = "hello@trybluetape.com";

const initialFormState: UnsubscribeFormState = {
  email: "",
  reason: "",
};

export default function Unsubscribe() {
  const [formData, setFormData] = useState<UnsubscribeFormState>(initialFormState);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [submissionTone, setSubmissionTone] = useState<"success" | "error" | null>(null);

  const prefilledEmail = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return new URLSearchParams(window.location.search).get("email")?.trim() || "";
  }, []);

  useEffect(() => {
    applyPageSeo({
      title: "Unsubscribe | Blue Tape Sites",
      description: "Request removal from outreach emails sent from hello@trybluetape.com.",
      canonicalUrl: `${SITE_URL}/unsubscribe`,
    });
  }, []);

  useEffect(() => {
    if (!prefilledEmail) {
      return;
    }

    setFormData(current => (current.email ? current : { ...current, email: prefilledEmail }));
  }, [prefilledEmail]);

  const unsubscribeMutation = trpc.leads.submitUnsubscribeRequest.useMutation({
    onSuccess: result => {
      const message = result.notifiedOwner
        ? "Your request is in and has already been forwarded for follow-up removal from future outreach."
        : "Your request is in. We recorded it even though the internal alert did not go through.";

      setSubmissionTone("success");
      setSubmissionMessage(message);
      setFormData(initialFormState);
      toast.success("Unsubscribe request received", {
        id: "unsubscribe-submit",
        description: message,
      });
    },
    onError: error => {
      const message = error.message || "There was a problem sending your unsubscribe request.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.error("Unsubscribe request not sent", {
        id: "unsubscribe-submit",
        description: message,
      });
    },
  });

  const handleFieldChange = (field: keyof UnsubscribeFormState, value: string) => {
    setFormData(current => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = formData.email.trim();
    const trimmedReason = formData.reason.trim();

    if (!trimmedEmail) {
      const message = "Enter the email address that should stop receiving outreach.";
      setSubmissionTone("error");
      setSubmissionMessage(message);
      toast.warning("Email address needed", {
        id: "unsubscribe-submit",
        description: message,
      });
      return;
    }

    toast.loading("Sending unsubscribe request", {
      id: "unsubscribe-submit",
      description: "Recording your email address for removal now.",
    });

    unsubscribeMutation.mutate({
      email: trimmedEmail,
      reason: trimmedReason,
      senderEmail: OUTBOUND_SENDER_EMAIL,
      sourcePath: typeof window !== "undefined" ? window.location.pathname : "/unsubscribe",
      sourceOrigin: typeof window !== "undefined" ? window.location.origin : SITE_URL,
    });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f5f1] text-[#111111] selection:bg-blue-600 selection:text-white">
      <SiteHeader />
      <main className="container py-10 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <section>
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Email preferences
            </div>
            <h1 className="mt-5 max-w-[12ch] text-[2.8rem] font-semibold leading-[0.94] tracking-[-0.065em] text-[#111111] sm:text-[4.8rem]">
              Stop outreach to this address.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              This page is for emails sent from <span className="font-medium text-[#111111]">{OUTBOUND_SENDER_EMAIL}</span>.
              If that is the address reaching you, enter the email that should be removed and we will route the request right away.
            </p>

            <div className="mt-8 grid gap-px border border-black/10 bg-black/10">
              <div className="bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3 text-blue-600">
                  <Mail className="size-5" />
                  <div className="h-px flex-1 bg-black/8" />
                </div>
                <h2 className="mt-4 text-[1.4rem] font-semibold tracking-[-0.05em] text-[#111111]">
                  If your email was prefilled, just confirm it.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">
                  The unsubscribe link can pass your address into this page automatically, so most people should only need one short confirmation.
                </p>
              </div>
              <div className="bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3 text-blue-600">
                  <ShieldCheck className="size-5" />
                  <div className="h-px flex-1 bg-black/8" />
                </div>
                <h2 className="mt-4 text-[1.4rem] font-semibold tracking-[-0.05em] text-[#111111]">
                  Need a manual fallback?
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">
                  You can also reply directly to <span className="font-medium text-[#111111]">{OUTBOUND_SENDER_EMAIL}</span> and ask to be removed. This form simply keeps the request cleaner and easier to route.
                </p>
              </div>
            </div>
          </section>

          <section className="border border-black/10 bg-white p-6 sm:p-8">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Unsubscribe request
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Email address to remove
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
                Optional note
                <textarea
                  className="min-h-32 border border-black/10 bg-[#faf8f4] px-4 py-3 outline-none transition focus:border-blue-600"
                  placeholder="If there is anything useful to know, you can add it here."
                  value={formData.reason}
                  onChange={event => handleFieldChange("reason", event.target.value)}
                />
              </label>

              <div className="border-l-2 border-blue-600 bg-[#faf8f4] px-4 py-4 text-sm leading-7 text-slate-600">
                We built this page for outreach from {OUTBOUND_SENDER_EMAIL}, so the request goes to the right place without making you hunt for who to contact.
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
                    {submissionTone === "success" ? "Request status" : "Needs attention"}
                  </div>
                  <div className="mt-2">{submissionMessage}</div>
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={unsubscribeMutation.isPending}
                className="h-13 rounded-none border border-[#111111] bg-[#111111] text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-slate-800"
              >
                {unsubscribeMutation.isPending ? "Sending Request..." : "Submit Unsubscribe Request"}
              </Button>
            </form>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
