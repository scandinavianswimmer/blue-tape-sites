Current inspection findings for the mockup differentiation and performance pass:

1. The three example-site cards on the homepage use the same card framing, same warm-neutral surrounding UI, and similarly styled generated mockup images, which makes the concepts feel too similar even though the niches differ.
2. The live homepage visual system is globally anchored to a single editorial palette in client/src/index.css with Space Grotesk + Manrope and warm neutral surfaces, so the examples inherit the same atmosphere by default.
3. App.tsx statically imports Home, Blog, and BlogPost. Because BlogPost imports Streamdown, the heavy markdown-rendering path is likely being shipped to the main marketing experience instead of being route-split.
4. Build output earlier showed a very large main client bundle, consistent with insufficient route-level code splitting.
5. Confirmed safe cleanup candidates include legacy .before-after-slider styles in client/src/index.css and the unreferenced client/src/pages/ComponentShowcase.tsx demo page.
6. Confirmed likely inactive template-only components include DashboardLayout, DashboardLayoutSkeleton, AIChatBox, and Map, but these need dependency-aware cleanup rather than blind deletion.
7. The homepage already feels visually disciplined, but the example-site section needs more variation in palette, typography cues, framing, and layout storytelling to feel like real different client directions.
