# Interior page presentation

The homepage's visual direction is extended to all 27 other content routes: 20 general pages, four initiative pages and three journal articles. Existing supplied copy modules, programme data, metrics, testimonials, PDF files, full media library and navigation definitions are unchanged.

## Presentation by purpose

| Pages | Presentation |
| --- | --- |
| About, Vision & Mission, Core Values | Organisation photography, structured reading links, a prominent vision statement, editorial values and governance portraits |
| Projects overview | Existing four-arm names/descriptions presented as photographic chapters |
| Skills Training, Programmes, Services | Activity photography, clear programme anchors, larger training images, alternating programme chapters and service examples |
| Four initiative pages | Relevant lead photograph beside the existing introduction, direct section links, complete functions/purposes, outcomes and supplied community testimony |
| Impact | Dark green photographic introduction, four confirmed metrics, existing achievements and plans, supplied personal testimony |
| Volunteer, Partners, Donate | Participation photography, role/opportunity sections, existing membership/form/conduct guidance and support controls |
| Testimonials | Community portraits and existing complete personal stories and leadership reflections |
| Gallery, Videos | Archive typography and section access; all existing photos, filters, viewer controls and films remain available |
| Journal and three articles | A featured journal entry, photographic article presentation and navigation using each article's existing section headings |
| Documents | Clear form/publication paths, PDF previews beside existing descriptions and view/download actions |
| Contact | Clear separation between contact information and the existing enquiry preparation form |
| Privacy, Child Protection, Financial Transparency | Restrained document presentation, section anchors and readable full policy/accountability text |

Added community testimony panels reuse the existing supplied quotes, attribution, portraits and links to the complete stories. Programme and service photography is illustrative of CCDI's work; it is not presented as a dated impact result or as a photographic record of a named individual's journey.

## Validation

- Production build and TypeScript pass.
- Static export check: 28 total content pages, one h1 each, unique metadata/canonical links and 954 internal links.
- Before/after rendered-text comparison: 963 existing heading, paragraph and list blocks checked with whitespace normalized; zero missing blocks. No organisation/programme/testimonial content source files were rewritten.
- All 27 interior routes checked at a 390px browser viewport for horizontal fit and a single h1. The programme photo frame's positioning was corrected after this check found an 11px overflow; the corrected page is 390px wide.
- Desktop visual review includes programme, project, forms, testimonial and article layouts. Existing reduced-motion handling, gallery controls, form behaviour and downloads are preserved.

## Section alignment correction

The article masthead previously capped its container at 1040px while its photograph used the shared 1328px container. Removed that conflicting width and made nested containers inherit the outer section's gutters. Article title line length remains capped separately from the outer container. Removed the photograph's negative top margin and overlapping margin rules in favour of explicit desktop/mobile section gaps. Text is unchanged.

Browser measurements on all three article routes at a 1488px viewport: navigation, masthead, photo and content share left/right edges of 80px and 1408px. At a 390px viewport, the same elements align at 20px and 370px with no horizontal overflow. Homepage nested sections share the same outer edges.
