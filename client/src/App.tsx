import { Suspense, lazy } from "react";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PlumberLanding = lazy(() => import("./pages/PlumberLanding"));
const RemodelerLanding = lazy(() => import("./pages/RemodelerLanding"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
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
        <Route path={"/web-design-for-plumbers"} component={PlumberLanding} />
        <Route path={"/web-design-for-remodelers"} component={RemodelerLanding} />
        <Route path={"/unsubscribe"} component={Unsubscribe} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
