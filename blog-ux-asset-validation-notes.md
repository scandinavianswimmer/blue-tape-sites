Interim browser validation notes:

- The live blog archive loads with the expected blog title and structure at /blog.
- After scrolling one viewport down the archive, the page is positioned around the March 2026 entries, which provides a good test point for return-position restoration.
- The next live checks should confirm that opening a post lands at the top of the article and that returning to /blog restores this approximate mid-archive position instead of resetting to the top.
- The favicon and social preview image have been wired in code, but the running page still needs explicit DOM verification for the favicon link and preview-image meta tags.
Additional browser validation notes:

- Opening the March 16, 2026 article lands at the top of the blog post, with the title and opening summary visible immediately in the viewport.
- Returning to the archive restores the reader to the prior mid-archive position around the March 2026 entries instead of resetting to the top of /blog.
- The scroll-restoration behavior therefore matches the requested reading flow: posts open at the top, and the archive preserves context on return.
