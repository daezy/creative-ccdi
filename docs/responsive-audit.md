# Responsive layout audit

Checked in Chrome with browser viewport emulation on 28 October 2026. This is a browser audit, not a claim of testing every physical device or browser engine.

## Coverage

All 28 content routes were checked at 320px, 390px, 768px, 1024px, 1440px and 1920px widths. Checks compared document and viewport widths, inspected text overflow, and reviewed the distinct homepage, organisation, programme, initiative, media, form, policy and article layouts. Intentionally cropped photography and horizontally scrollable collection/section navigation were treated separately from page overflow.

## Changes

- Slideshow selectors now have 44 × 44px hit areas; their active indicators fit inside them.
- On screens up to 420px, slideshow controls use two compact rows so larger buttons fit without horizontal overflow.
- Mobile slideshow arrow and play/pause controls use 44px hit areas.
- Enquiry inputs and textareas use 16px text on phone and tablet layouts. Browser zoom remains enabled.
- Mobile navigation trigger/close controls use 44px hit areas, and the drawer padding respects device safe areas.
- Gallery dialogs account for viewport height and safe-area insets while retaining internal scrolling on short screens.

## Interaction checks

- Mobile menu opens, expands an About submenu and closes with Escape at 320 × 568.
- Gallery viewer opens with the keyboard and advances to the next image at 390 × 844.
- At 844 × 390, the gallery dialog stays within the viewport and its remaining content is scrollable.
- Existing page copy, gallery content and navigation destinations are preserved.

The production build, exported links and SEO checks are run before publication. cPanel deployment remains deferred at the owner's request.
