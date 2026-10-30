# Closing invitation and footer

The shared closing invitation uses the existing headline, eyebrow and volunteer/partner action labels in a contained dark-green panel beside the supplied volunteer group photograph (`outreach-volunteers.webp`). The generic heart/plus decoration is removed.

The footer now displays the approved transparent CCDI cube logo from `public/images/ccdi-logo-transparent.png`; the final “I” on the cube is corrected to the golden yellow in the supplied wordmark reference. The company's existing full name sits beside it. The original motto, Facebook link, navigation labels, copyright and policy/back-to-top links remain. A compact contact strip reuses the confirmed business address, both phone numbers and email from `src/lib/content.ts`.

Navigation groups use labeled nav elements. Mobile presents the closing panel and photograph vertically, with the footer links in two columns and contacts below. Browser checks at desktop and 390px confirm the actual logo asset is rendered, controls fit, and there is no horizontal overflow. Production build, TypeScript and the 28-page/954-link static export check pass.
