const PAGEVIEW_SESSION_STORAGE_KEY = "blue-tape-sites-pageview-session-id";

let inMemorySessionId: string | null = null;

export type PageViewPayload = {
  path: string;
  referrer: string | null;
  userAgent: string | null;
  sessionId: string;
};

function createSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getPageViewSessionId(): string {
  if (inMemorySessionId) {
    return inMemorySessionId;
  }

  if (typeof window === "undefined") {
    inMemorySessionId = createSessionId();
    return inMemorySessionId;
  }

  try {
    const existingSessionId = window.sessionStorage.getItem(PAGEVIEW_SESSION_STORAGE_KEY);
    if (existingSessionId) {
      inMemorySessionId = existingSessionId;
      return existingSessionId;
    }

    const nextSessionId = createSessionId();
    window.sessionStorage.setItem(PAGEVIEW_SESSION_STORAGE_KEY, nextSessionId);
    inMemorySessionId = nextSessionId;
    return nextSessionId;
  } catch {
    inMemorySessionId = createSessionId();
    return inMemorySessionId;
  }
}

export function buildPageViewPayload(path?: string): PageViewPayload {
  const resolvedPath =
    path ??
    (typeof window !== "undefined"
      ? `${window.location.pathname}${window.location.search}`
      : "/");

  return {
    path: resolvedPath,
    referrer: typeof document !== "undefined" ? document.referrer || null : null,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent || null : null,
    sessionId: getPageViewSessionId(),
  };
}

export async function trackPageView(payload: PageViewPayload): Promise<boolean> {
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const sent = navigator.sendBeacon(
      "/api/pageview",
      new Blob([body], { type: "application/json" })
    );

    if (sent) {
      return true;
    }
  }

  if (typeof fetch !== "function") {
    return false;
  }

  try {
    const response = await fetch("/api/pageview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      keepalive: true,
    });

    return response.ok;
  } catch (error) {
    console.error("[Tracking] Failed to send pageview:", error);
    return false;
  }
}
