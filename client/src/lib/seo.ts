export const SITE_NAME = "Blue Tape Sites";
export const SITE_URL = "https://bluetapesites.com";
export const SOCIAL_IMAGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-sites-social-preview_50192a08.png";

export const HOME_SEO_TITLE = "Blue Tape Sites | Home-Service Web Design";
export const HOME_SEO_DESCRIPTION =
  "Premium web design for plumbers, electricians, cleaners, and contractors that need stronger trust and more leads.";

type PageSeo = {
  title: string;
  description: string;
  image?: string;
};

const upsertMetaTag = (selector: string, attributes: Record<string, string>) => {
  if (typeof document === "undefined") {
    return;
  }

  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
};

export const applyPageSeo = ({ title, description, image = SOCIAL_IMAGE_URL }: PageSeo) => {
  if (typeof document === "undefined") {
    return;
  }

  document.title = title;

  upsertMetaTag('meta[name="description"]', {
    name: "description",
    content: description,
  });

  upsertMetaTag('meta[property="og:title"]', {
    property: "og:title",
    content: title,
  });

  upsertMetaTag('meta[property="og:description"]', {
    property: "og:description",
    content: description,
  });

  upsertMetaTag('meta[property="og:image"]', {
    property: "og:image",
    content: image,
  });

  upsertMetaTag('meta[name="twitter:title"]', {
    name: "twitter:title",
    content: title,
  });

  upsertMetaTag('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: description,
  });

  upsertMetaTag('meta[name="twitter:image"]', {
    name: "twitter:image",
    content: image,
  });
};

export const applyHomeSeo = () => {
  applyPageSeo({
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
  });
};
