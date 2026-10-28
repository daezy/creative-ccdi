# CCDI visitor experience improvements

| Before | After | Why |
| --- | --- | --- |
| Mobile navigation exposes every child link at once | One expandable section at a time, with the current section open and page highlighted | Reduces scanning and shows visitors where they are |
| Training and contact sit inside a large navigation list | Direct Find training and Get in touch shortcuts | Shortens common visitor journeys |
| About subpages do not highlight the About navigation group | Current group and current page are shown across desktop and mobile | Consistent wayfinding |
| A photo must be closed before another can be opened | Previous/next controls, arrow keys, an image counter, Escape, and focus restoration | Enables continuous browsing while preserving keyboard access |
| Collection filters reset on refresh | Collection selection is reflected in a shareable query parameter and restored on refresh/back navigation | Visitors can return to or share a specific collection |
| Gallery header and mobile tags consume substantial vertical space | More compact gallery introduction and a horizontally scrollable mobile tag row | Gets visitors to the photography sooner |
| Enquiry requires an email even though the reply channel is Facebook | Name and message are required; email and phone are optional | Removes an unnecessary step |
| Enquiry preparation and sending can feel like one action | Write/copy/send steps and a direct Facebook option | Clarifies when a message is actually sent |
| Copy confirmation can remain after editing the enquiry | Editing clears the previous draft and copy confirmation | Prevents stale feedback |
| Long pages lack a return shortcut | Back to collections and Back to top links | Reduces repeated scrolling |

All supplied content, 223 images, 12 videos, menu groups and dropdown links are retained.

Validation: production build, TypeScript, and static-export checks passed (28 content pages and 879 internal links). Browser checks covered mobile disclosure behaviour, current-page highlighting, training shortcut, no horizontal overflow at 390px, gallery filters and refresh restoration, previous/next and arrow-key photo navigation, Escape and restored thumbnail focus, and the optional-email enquiry requirements. No test enquiry was sent.
