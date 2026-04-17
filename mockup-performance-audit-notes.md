Current inspection findings for the mockup differentiation and performance pass:

1. The three example-site cards on the homepage use the same card framing, same warm-neutral surrounding UI, and similarly styled generated mockup images, which makes the concepts feel too similar even though the niches differ.
2. The live homepage visual system is globally anchored to a single editorial palette in client/src/index.css with Space Grotesk + Manrope and warm neutral surfaces, so the examples inherit the same atmosphere by default.
3. App.tsx statically imports Home, Blog, and BlogPost. Because BlogPost imports Streamdown, the heavy markdown-rendering path is likely being shipped to the main marketing experience instead of being route-split.
4. Build output earlier showed a very large main client bundle, consistent with insufficient route-level code splitting.
5. Confirmed safe cleanup candidates include legacy .before-after-slider styles in client/src/index.css and the unreferenced client/src/pages/ComponentShowcase.tsx demo page.
6. Confirmed likely inactive template-only components include DashboardLayout, DashboardLayoutSkeleton, AIChatBox, and Map, but these need dependency-aware cleanup rather than blind deletion.
7. The homepage already feels visually disciplined, but the example-site section needs more variation in palette, typography cues, framing, and layout storytelling to feel like real different client directions.

## Live validation update

The Example Website Directions section now renders three visibly different cards in the running preview. The plumbing card reads brighter and more urgent with a sky-to-cyan accent, the electrical card reads darker and more technical, and the cleaning card feels warmer and more hospitality-oriented. The cards also now include separate direction, proof move, and layout note blocks, which makes them read more like believable project concepts instead of the earlier near-duplicates.

Perceived-speed improvements currently in place include lazy-loaded below-the-fold mockup imagery, lazy-loaded audit imagery, and route-level lazy loading for the blog pages so the main homepage bundle no longer carries the full markdown-rendering path up front. Confirmed dead CSS for the removed before/after slider was also deleted, and unused template-only client files were moved out of the live source tree into `archived/template-client-src/` to keep them available without leaving them in the active app surface.

## Build measurement update

After replacing the heavy blog markdown renderer with a lightweight in-house article renderer, the dedicated blog post chunk dropped to about 11 kB minified instead of roughly 922 kB. The blog index chunk remains small, and the large markdown-rendering dependency is no longer shipping as part of the blog route.

The remaining performance concern is the still-large main `index` bundle at roughly 713 kB minified, so the open performance task should stay focused on the marketing homepage bundle rather than the blog article renderer. The cleanup pass has therefore meaningfully reduced one major bottleneck, but one more optimization round is still warranted before the next checkpoint.
