import type { BlogPost } from "@/content/blogPosts";

export const SITE_URL = "https://bluetapesites.com";
export const SOCIAL_IMAGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032234167/TpcXhRqminM236HC9RQjNi/blue-tape-sites-social-preview_50192a08.png";

export const HOME_SEO_TITLE = "Web Design for Service Businesses | Blue Tape Sites";
export const HOME_SEO_DESCRIPTION =
  "Blue Tape Sites builds lead-focused websites for plumbers, electricians, cleaners, and contractors that need more trust, better local visibility and more leads.";

const BLOG_POST_SCHEMA_ID = "blue-tape-sites-blog-post-schema";

type StructuredData = Record<string, unknown>;

type PageSeo = {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: StructuredData;
};

type BlogPostSeoInput = Pick<BlogPost, "slug" | "title" | "summary" | "publishDate">;

const removeHeadTag = (selector: string) => {
  if (typeof document === "undefined") {
    return;
  }

  document.head.querySelector(selector)?.remove();
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

const upsertLinkTag = (selector: string, attributes: Record<string, string>) => {
  if (typeof document === "undefined") {
    return;
  }

  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("link");
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
};

const upsertJsonLd = (id: string, data: StructuredData) => {
  if (typeof document === "undefined") {
    return;
  }

  let script = document.head.querySelector(`#${id}`);

  if (!script) {
    script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("id", id);
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
};

export const toMetadataDateTime = (date: string) => `${date}T12:00:00Z`;

export const buildBlogPostSeo = (post: BlogPostSeoInput): PageSeo => {
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const publishedTime = toMetadataDateTime(post.publishDate);

  return {
    title: `${post.title} | Blue Tape Sites`,
    description: post.summary,
    canonicalUrl,
    ogType: "article",
    publishedTime,
    modifiedTime: publishedTime,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      datePublished: publishedTime,
      dateModified: publishedTime,
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
      image: SOCIAL_IMAGE_URL,
      author: {
        "@type": "Organization",
        name: "Blue Tape Sites",
      },
      publisher: {
        "@type": "Organization",
        name: "Blue Tape Sites",
        url: SITE_URL,
      },
    },
  };
};

export const applyPageSeo = ({
  title,
  description,
  image = SOCIAL_IMAGE_URL,
  canonicalUrl = SITE_URL,
  ogType = "website",
  publishedTime,
  modifiedTime,
  structuredData,
}: PageSeo) => {
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

  upsertMetaTag('meta[property="og:url"]', {
    property: "og:url",
    content: canonicalUrl,
  });

  upsertMetaTag('meta[property="og:type"]', {
    property: "og:type",
    content: ogType,
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

  upsertLinkTag('link[rel="canonical"]', {
    rel: "canonical",
    href: canonicalUrl,
  });

  if (publishedTime) {
    upsertMetaTag('meta[property="article:published_time"]', {
      property: "article:published_time",
      content: publishedTime,
    });
  } else {
    removeHeadTag('meta[property="article:published_time"]');
  }

  if (modifiedTime) {
    upsertMetaTag('meta[property="article:modified_time"]', {
      property: "article:modified_time",
      content: modifiedTime,
    });
  } else {
    removeHeadTag('meta[property="article:modified_time"]');
  }

  if (structuredData) {
    upsertJsonLd(BLOG_POST_SCHEMA_ID, structuredData);
  } else {
    removeHeadTag(`#${BLOG_POST_SCHEMA_ID}`);
  }
};

export const applyHomeSeo = () => {
  applyPageSeo({
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
    canonicalUrl: SITE_URL,
  });
};
