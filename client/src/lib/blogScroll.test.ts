import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  BLOG_ARCHIVE_SCROLL_KEY,
  readAndClearBlogArchiveScroll,
  saveBlogArchiveScroll,
} from "@/lib/blogScroll";

type StorageMap = Map<string, string>;

const createWindowStub = (initialScroll = 0) => {
  const store: StorageMap = new Map();

  return {
    scrollY: initialScroll,
    sessionStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    },
    __store: store,
  };
};

describe("blog scroll helpers", () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    const windowStub = createWindowStub(482);
    vi.stubGlobal("window", windowStub as unknown as Window & typeof globalThis);
  });

  afterEach(() => {
    vi.unstubAllGlobals();

    if (originalWindow) {
      vi.stubGlobal("window", originalWindow);
    }
  });

  it("saves the current archive scroll position when no explicit value is provided", () => {
    saveBlogArchiveScroll();

    expect(window.sessionStorage.getItem(BLOG_ARCHIVE_SCROLL_KEY)).toBe("482");
  });

  it("prefers an explicit scroll value and rounds it for storage", () => {
    saveBlogArchiveScroll(219.6);

    expect(window.sessionStorage.getItem(BLOG_ARCHIVE_SCROLL_KEY)).toBe("220");
  });

  it("reads and clears a saved archive scroll position", () => {
    saveBlogArchiveScroll(340);

    expect(readAndClearBlogArchiveScroll()).toBe(340);
    expect(window.sessionStorage.getItem(BLOG_ARCHIVE_SCROLL_KEY)).toBeNull();
  });

  it("returns null when no saved archive scroll position exists", () => {
    expect(readAndClearBlogArchiveScroll()).toBeNull();
  });
});
