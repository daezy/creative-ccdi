import { Eyebrow, TextLink } from "./ui";

function Points({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function RegistrationContent() {
  return (
    <section
      className="document-content content-section"
      id="registration-guidance"
    >
      <Eyebrow>Joining a programme</Eyebrow>
      <h2>Find your area of interest. Prepare your registration.</h2>
      <p>
        The student registration form covers entrepreneurship, vocational
        training, craft development, catering and decoration, relationship and
        marriage programmes, security skills, and healthy living skills. There
        is also space to describe another area of interest. Contact CCDI to
        confirm which programmes are available and the next steps for your
        chosen area.
      </p>
      <div className="document-content-columns">
        <div>
          <h3>What to prepare</h3>
          <Points
            items={[
              "Your full name, gender, date of birth and nationality.",
              "Your home address, phone number, WhatsApp number and email address.",
              "Your preferred skills or area of interest and why you want to join CCDI.",
              "Your next of kin’s name, relationship, phone number and address.",
            ]}
          />
        </div>
        <div>
          <h3>Before you return the form</h3>
          <p>
            Read the declaration confirming that your information is accurate
            and truthful and that you agree to abide by CCDI’s rules and values.
            Sign and date the applicant section. Leave the membership ID,
            approval and other official-use fields for CCDI to complete.
          </p>
          <p>
            Contact CCDI to confirm how to return your completed form. Keep
            personal and next-of-kin details out of the general website enquiry.
          </p>
        </div>
      </div>
    </section>
  );
}

export function MembershipContent({ partner = false }: { partner?: boolean }) {
  return (
    <section
      className="document-content content-section"
      id="membership-guidance"
    >
      <Eyebrow>
        {partner ? "Ways to participate" : "Membership & service"}
      </Eyebrow>
      <h2>
        {partner
          ? "Choose how you can contribute."
          : "A place for your skills and commitment."}
      </h2>
      <p>
        CCDI’s membership form welcomes regular workers, passionate volunteers,
        ambassadors and donors, partners and supporters, and training
        facilitators. It also offers sign-up roles for facilitators, patrons,
        matrons, financial partners and coaches.
      </p>
      <p>
        For people choosing to contribute, the form provides weekly, monthly,
        quarterly and yearly frequency options. Tell CCDI why you want to join
        and discuss the role and contribution that fit your capacity.
      </p>
      <div className="document-content-columns">
        <div>
          <h3>What membership involves</h3>
          <Points
            items={[
              "Represent CCDI positively in public and private, and promote its programmes, campaigns and outreach.",
              "Support mobilization, advocacy, fundraising and awareness activities.",
              "Identify community needs, share feedback and encourage partnerships, volunteers and community involvement.",
              "Participate in events, meetings, training and capacity building, and maintain communication with management.",
            ]}
          />
        </div>
        <div>
          <h3>A shared commitment</h3>
          <p>
            The membership agreement calls for integrity, transparency,
            professionalism, respect and confidentiality, including protection
            of beneficiary data and internal matters.
          </p>
          <p>
            Membership is voluntary and does not constitute employment or carry
            a salary unless there is a separate contract. CCDI may suspend or
            terminate membership for policy violations or reputational harm; a
            member may withdraw by written notice.
          </p>
          <p>
            The membership agreement includes acceptance and signature sections
            for both the member and CCDI.
          </p>
        </div>
      </div>
      <h3>Preparing your application</h3>
      <p>
        Provide your personal and contact details, chosen membership and sign-up
        roles, reason for joining, and next-of-kin details. Read the
        declaration, sign and date the form, and leave official approval fields
        for CCDI. Read the roles and code of conduct alongside your application.
      </p>
      <TextLink href="/documents/membership-conduct.pdf">
        Read the membership roles & code of conduct
      </TextLink>
    </section>
  );
}

export function MemberConduct() {
  return (
    <section className="document-content content-section" id="member-conduct">
      <Eyebrow>Working together responsibly</Eyebrow>
      <h2>Our membership code of conduct</h2>
      <p>
        The supplied code sets out the standards expected when representing CCDI
        and working with its communities.
      </p>
      <div className="document-topics">
        <details>
          <summary>Integrity, respect and accountability</summary>
          <Points
            items={[
              "Act honestly and professionally, treating everyone with dignity and respect.",
              "Show compassion and fairness to beneficiaries, without discrimination based on gender, religion, ethnicity or socioeconomic status; protect their confidentiality.",
              "Carry out assigned duties reliably, attend meetings and training, and provide accurate reports.",
            ]}
          />
        </details>
        <details>
          <summary>Communication and representation</summary>
          <Points
            items={[
              "Promote CCDI’s mission truthfully. Do not share false information or make unauthorized statements on its behalf.",
              "Uphold CCDI’s reputation online and offline; communicate respectfully and avoid gossip, abusive language and conflict.",
              "Avoid conflicts of interest and notify leadership when a conflict arises. Follow organisational policies, procedures and leadership structures.",
            ]}
          />
        </details>
        <details>
          <summary>Safety and zero tolerance for misconduct</summary>
          <Points
            items={[
              "The code prohibits fraud, corruption, misuse of resources, sexual harassment, abuse and exploitation.",
              "Protect the safety and well-being of children, young people, women and vulnerable groups.",
              "Report risks, suspected abuse and unsafe conditions immediately. Conduct that harms beneficiaries or the organisation’s reputation is not acceptable.",
            ]}
          />
          <TextLink href="/child-protection/">
            Read the safeguarding procedures
          </TextLink>
        </details>
      </div>
    </section>
  );
}

export function OrganisationPrivacy() {
  return (
    <section className="document-content" id="organisational-privacy">
      <Eyebrow>People & information</Eyebrow>
      <h2>CCDI’s privacy and data protection policy</h2>
      <p>
        The Privacy & Safeguarding Framework applies to staff, volunteers,
        facilitators, contractors, partners and beneficiaries across CCDI’s four
        arms. It covers personal information in paper, electronic, photographic
        and verbal form.
      </p>
      <h3>Purpose and principles</h3>
      <p>
        The policy requires information to be handled lawfully, fairly and
        transparently, for specific legitimate purposes. Information should be
        limited to what is necessary, kept accurate, retained only as needed and
        protected against unauthorized access, loss or damage.
      </p>
      <h3>Information covered</h3>
      <Points
        items={[
          "Identity and contact details, including names, dates of birth, gender, identification details, phone numbers, emails and home or community addresses.",
          "Programme assessments, attendance, progress and certificates, and financial details for stipends, grants or vendors.",
          "Health or disability information needed for accommodation, children’s information subject to additional safeguards, and photographs or videos from programme activities.",
        ]}
      />
      <h3>How information may be used and protected</h3>
      <p>
        The framework identifies consent, programme agreements, legal
        obligations and legitimate interests such as monitoring, evaluation and
        reporting as bases for processing, without overriding individuals’
        rights. Its security provisions call for password-protected devices,
        access-controlled storage, locked paper records, need-to-know access and
        confidentiality undertakings.
      </p>
      <p>
        Records should be securely deleted or anonymized when no longer
        necessary, except where retention is required by law, donor agreements
        or legitimate historical or impact-reporting needs. Necessary sharing
        with donors, government agencies or partners should be covered by a
        written protective agreement. Commercial marketing requires explicit
        consent.
      </p>
      <h3>Your rights and raising a concern</h3>
      <p>
        The framework provides for requests to access or correct information,
        delete it where lawful, object to or restrict processing, and withdraw
        consent. Suspected data breaches should be reported immediately to the
        Data Protection Focal Person for containment, assessment and any
        required notifications.
      </p>
      <p>
        The supplied framework leaves the designated focal person’s contact
        fields blank. Contact CCDI to request the appropriate privacy contact
        and a suitable way to share your concern. The policy calls for annual
        review, or earlier review when law, programmes or risks change.
      </p>
      <TextLink href="/contact/?interest=Privacy%20enquiry">
        Request the privacy contact
      </TextLink>
    </section>
  );
}

export function SafeguardingContent() {
  return (
    <section className="document-content" id="safeguarding-policy">
      <Eyebrow>Child safeguarding policy</Eyebrow>
      <h2>Every child’s safety comes first.</h2>
      <p>
        CCDI’s framework defines a child as anyone under 18 and sets out zero
        tolerance for abuse, exploitation, neglect or harm. A child’s best
        interests should be the primary consideration. Every child has an equal
        right to protection, regardless of age, gender, disability, ethnicity or
        background. Safeguarding is everyone’s responsibility; concerns must be
        taken seriously and acted on promptly.
      </p>
      <h3>Standards for staff and volunteers</h3>
      <Points
        items={[
          "Never be alone with a single child in an unobserved or private setting.",
          "Do not use humiliating or harmful physical, verbal or emotional discipline.",
          "Never engage in romantic, sexual or other inappropriate contact with a child.",
          "Obtain the child’s and parent or guardian’s permission for photographs or video, as applicable.",
          "Report a concern, disclosure or suspicion immediately through the safeguarding procedure.",
        ]}
      />
      <h3>Recruitment, orientation and training</h3>
      <p>
        The policy calls for reference checks and background or police checks
        where legally available before engagement. New staff and volunteers
        should receive the policy and acknowledge their understanding in
        writing. Safeguarding orientation and annual refresher training should
        help people recognize physical, emotional and sexual abuse, neglect and
        exploitation.
      </p>
      <h3>Responding to a disclosure or concern</h3>
      <p>
        Listen calmly and without judgement, reassure the child, and do not
        promise confidentiality: information may need to be shared to protect
        them. Report concerns immediately to the designated Safeguarding Focal
        Person. The framework requires confidential handling, documentation and
        referral to statutory authorities where appropriate without delay.
      </p>
      <p>
        The supplied document does not name the focal person or provide their
        contact details. Contact CCDI directly to request the designated
        safeguarding contact. Do not include identifying or sensitive
        information about a child in the general website enquiry.
      </p>
      <TextLink href="/contact/?interest=Safeguarding%20contact">
        Request the safeguarding contact
      </TextLink>
      <h3>Images, privacy and review</h3>
      <p>
        Children’s images require informed consent. Home addresses and full
        personal circumstances should not be published with photographs. The
        policy calls for review each year or following an incident.
      </p>
    </section>
  );
}

export function MediaConsent({ brief = false }: { brief?: boolean }) {
  return (
    <section
      className={`document-content ${brief ? "media-consent-note" : "content-section"}`}
      id="photo-video-consent"
    >
      <Eyebrow>Photography & dignity</Eyebrow>
      <h2>Permission matters when we share a story.</h2>
      <p>
        CCDI’s photo/video consent form gives participants a choice about use on
        the website and social media; in newsletters, reports and printed
        materials; for training, monitoring and evaluation; and in fundraising
        and donor communications. For a participant under 18, the form includes
        parent or guardian details and consent.
      </p>
      {!brief && (
        <p>
          The form records the participant’s name, date of birth if under 18,
          programme arm, contact details, signature and date, with a CCDI staff
          witness. Images should never embarrass, endanger or misrepresent a
          participant.
        </p>
      )}
      <p>
        The form allows consent to be withdrawn in writing. It calls for
        reasonable efforts to stop future use, while explaining that already
        published printed materials may not be recoverable. Contact CCDI about
        permissions, a photograph or a request to withdraw consent.
      </p>
      <div className="form-callout-actions">
        <TextLink href="/documents/privacy-safeguarding.pdf#page=7">
          View the photo/video consent form
        </TextLink>
        <TextLink href="/contact/?interest=Photo%20or%20video%20permission">
          Ask about an image or permission
        </TextLink>
      </div>
    </section>
  );
}
