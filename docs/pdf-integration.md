# Supplied PDF forms and documents

All four source PDFs were read in full, all 12 pages were rendered and visually reviewed, and unchanged copies are included under `public/documents/`. First-page WebP thumbnails are generated separately; no PDF content was edited.

| Source | Website file | Placement |
| --- | --- | --- |
| `images/STUDENT REGISTRATION FORM.pdf` | `/documents/student-registration.pdf` | Forms & Resources; Skills Training; Capacity Development |
| `images/MEMBERSHIP FORM.pdf` | `/documents/membership.pdf` | Forms & Resources; Volunteer |
| `images/MEMBERSHIP-WPS Office.pdf` | `/documents/membership-conduct.pdf` | Forms & Resources; guidance for prospective members |
| `images/CCDI_Privacy_Safeguarding_Framework.pdf` | `/documents/privacy-safeguarding.pdf` | Forms & Resources; Privacy; Child Protection |

The framework's photo/video consent form is on page 7 and is directly linked with `#page=7`. Its child safeguarding section starts on page 5. Its effective date and designated contact fields are blank in the supplied copy; these have not been filled in or represented as confirmed. The membership form has a blank second page, preserved in the downloadable original.

The PDF files are printable documents rather than interactive AcroForms. Website guidance directs visitors to download, print, complete, sign where applicable, and contact CCDI to confirm the return method. The website does not receive or store completed forms.

The registration and membership document headers provide the organisation address and phone numbers: No. 9, Sanusi Adeyemo Street, Satellite Town, Lagos, Nigeria; 07061252687; 08026264133. The original PDFs contain info@creativecdi.org, but the website now uses the subsequently confirmed email creativecraft_dt@yahoo.com. The source PDFs are preserved unchanged. These are general organisation contacts, not an identified safeguarding or data-protection focal person's details.

The website's technical privacy explanation is retained alongside a link to the full supplied framework. No analytics, newsletter, application-submission or payment feature is added merely because it is described in the PDF.

Validation: SHA-256 / byte equality checks passed between each original PDF, its public copy, its static-export copy, and the body served by the local preview. All four URLs returned HTTP 200 with application/pdf content type. Production build, TypeScript and static link checks passed. PDF view/download links, previews, metadata and consent-page link were inspected in the browser.

## Content integrated into page copy

The PDFs now supplement the existing organisation and programme text rather than serving only as downloads. `src/components/document-content.tsx` contains source-based, server-rendered sections:

- Skills Training and Capacity Development: registration areas, personal/contact and next-of-kin information to prepare, declaration, applicant signature, official-use fields and return guidance.
- Volunteer: membership categories, sign-up roles, contribution frequency choices, responsibilities, voluntary/non-employment status, termination/withdrawal provisions, application guidance and the conduct code grouped into accessible disclosures.
- Partners: membership and contribution options, shared responsibilities, confidentiality and voluntary participation, followed by the membership form.
- Privacy: organisational scope, data categories, processing principles and bases, storage/access provisions, retention, sharing, individual rights and breach reporting. These describe what the supplied policy requires, rather than asserting implementation has been independently verified. The separate explanation of the actual static website remains.
- Child Protection: under-18 definition, equal protection, staff/volunteer conduct, recruitment and training, disclosure response, escalation, media protection and review. The Benevolent & Childcare page links these standards to its existing programme text.
- Gallery, Videos and Child Protection: photo/video consent choices, guardian involvement, written withdrawal and limitations concerning previously printed materials. These explain the supplied consent form without asserting that consent records for individual assets have been audited.

Blank focal-person/effective-date fields remain unfilled. General contact routes ask CCDI for the appropriate designated contact. No online collection of completed applications, sensitive next-of-kin details or safeguarding disclosures has been introduced.
