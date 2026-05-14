import { Suspense, lazy, useEffect, useRef } from "react";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { allSeoPages } from "@shared/seoPages";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SeoLandingPage from "./pages/SeoLandingPage";
import { buildPageViewPayload, trackPageView } from "./lib/pageviewTracking";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));

function PageViewTracker() {
  const [location] = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const path = `${window.location.pathname}${window.location.search}`;

    if (lastTrackedPath.current === path) {
      return;
    }

    lastTrackedPath.current = path;
    void trackPageView(buildPageViewPayload(path));
  }, [location]);

  return null;
}

function Router() {

  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <PageViewTracker />
      <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f4] text-[#111111]">
          <div className="container flex min-h-screen items-center justify-center">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Loading page…</div>
          </div>
        </div>
      }
    >
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={BlogPost} />
        {allSeoPages.map(page => (
          <Route key={page.path} path={page.path}>
            <SeoLandingPage page={page} />
          </Route>
        ))}
        <Route path={"/unsubscribe"} component={Unsubscribe} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
