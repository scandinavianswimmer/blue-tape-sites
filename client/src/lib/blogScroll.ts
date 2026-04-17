export const BLOG_ARCHIVE_SCROLL_KEY = "blue-tape-blog-archive-scroll-y";

export const saveBlogArchiveScroll = (scrollY?: number) => {
  if (typeof window === "undefined") {
    return;
  }

  const nextValue = typeof scrollY === "number" ? scrollY : window.scrollY;
  window.sessionStorage.setItem(BLOG_ARCHIVE_SCROLL_KEY, String(Math.max(0, Math.round(nextValue))));
};

export const readAndClearBlogArchiveScroll = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(BLOG_ARCHIVE_SCROLL_KEY);

  if (!rawValue) {
    return null;
  }

  window.sessionStorage.removeItem(BLOG_ARCHIVE_SCROLL_KEY);

  const parsed = Number(rawValue);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};
