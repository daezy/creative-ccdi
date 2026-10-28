# Scroll-linked photography

Purpose: spatial consistency and visual depth on the presentation pages. Parallax is confined to the homepage backdrop and larger editorial photos: About, Community, split content, project lead photography, programme detail and journal articles. Text, links, forms, gallery items, logos and contained images remain steady.

Native CSS view timelines drive transform-only motion directly from scroll progress, linearly, with no time-based easing or duration, scroll handlers, JavaScript library or changes to static rendering. Timeline subjects are the stationary photo frames or hero section rather than animated children. Image overscan prevents exposed edges. Hero scroll movement is on the backdrop wrapper so existing slide crossfades and image transforms remain independent.

Motion runs only with `prefers-reduced-motion: no-preference` and feature support. Narrow screens use half the travel and less image enlargement. Unsupported browsers retain the original static image composition.
