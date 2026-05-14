export const BUSINESS = {
  brand: "Blue Tape Sites",
  tagline: "Precision web design",
  phoneDisplay: "(714) 515-6909",
  phoneRaw: "714-515-6909",
  phoneHref: "tel:+17145156909",
  telephone: "+17145156909",
  serviceArea: "Southern California",
  serviceAreaDetail: "Orange County, Los Angeles County, the Inland Empire, and San Diego County",
  leadMagnet: "free 5-minute video audit",
  auditTurnaround: "48-hour audit turnaround",
  replyPromise: "Reply within 4 business hours",
  hoursDisplay: "Mon-Fri, 8am-6pm PT. We reply within 4 business hours.",
  sameDayReply: "Or call (714) 515-6909 - same-day reply.",
} as const;

export type TrustStripItem = {
  label: string;
  value: string;
  href?: string;
};

export const trustStripItems: TrustStripItem[] = [
  { label: "Call", value: BUSINESS.phoneDisplay, href: BUSINESS.phoneHref },
  { label: "Response", value: BUSINESS.replyPromise },
  { label: "Audit", value: BUSINESS.auditTurnaround },
  { label: "Area", value: BUSINESS.serviceArea },
] as const;
