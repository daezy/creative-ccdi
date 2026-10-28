export const facebook =
  "https://www.facebook.com/people/Creative-Craft-Development-Initiative/100069171407112/";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ccdi-skills-and-community.nicebook16.chatgpt.site";
export const navigation = [
  { label: "Home", href: "/" },
  {
    label: "About CCDI",
    href: "/about/",
    links: [
      { label: "About CCDI", href: "/about/" },
      { label: "Vision & Mission", href: "/vision-mission/" },
      { label: "Core Values", href: "/core-values/" },
      { label: "Impact Statistics", href: "/impact/" },
      { label: "Partnership", href: "/partners/" },
    ],
  },
  {
    label: "Projects",
    href: "/projects/",
    links: [
      { label: "Four Integrated Arms of CCDI", href: "/projects/" },
      { label: "Skills Training", href: "/skills-training/" },
      { label: "Skills Training", href: "/skills-training/#training-areas" },
      { label: "Privacy Policies", href: "/privacy-policy/" },
    ],
  },
  {
    label: "Explore CCDI",
    href: "/programmes/",
    links: [
      { label: "Featured Programmes", href: "/programmes/" },
      { label: "Services", href: "/services/" },
      { label: "Volunteers", href: "/volunteer/" },
      { label: "Testimonials", href: "/testimonials/" },
    ],
  },
  {
    label: "Media & Blog",
    href: "/blog/",
    links: [
      { label: "Updates / Blog", href: "/blog/" },
      { label: "Gallery of Event Photos", href: "/gallery/" },
      { label: "Videos of Events", href: "/videos/" },
      { label: "Events Documents", href: "/documents/" },
    ],
  },
  { label: "Contact & More", href: "/contact/" },
];
export const arms = [
  {
    slug: "capacity-development",
    name: "Capacity Development",
    fullName: "Capacity Development Initiative",
    division: "Skills, Certification & Professional Development",
    number: "01",
    theme: "green",
    icon: "skills",
    eyebrow: "Discover your potential",
    title: "Practical skills. Lifelong possibilities.",
    description:
      "Bridging the gap between potential and skills through self-discovery, self-mastery, capacity building, and skills for life.",
    activities: [
      "Skills acquisition and vocational training",
      "Entrepreneurship and business development",
      "Leadership and personal development",
      "Digital and ICT skills",
      "Financial literacy and employability",
      "Career development, mentoring, and coaching",
    ],
    outcomes: [
      "Practical competence and workplace readiness",
      "Greater self-employment and entrepreneurship",
      "Stronger financial literacy",
      "Ethical, value-based leadership",
    ],
    photo: "Hands-on learning and practical skills training",
  },
  {
    slug: "social-enterprise",
    name: "Social Enterprise",
    fullName: "Social Enterprise Initiative",
    division: "Financial Sustainability Division",
    number: "02",
    theme: "gold",
    icon: "enterprise",
    eyebrow: "Enterprise with purpose",
    title: "Where enterprise meets empowerment.",
    description:
      "Where Enterprise Meets Empowerment. Purpose driven Lasting Community Impact.",
    activities: [
      "Interior and exterior decoration",
      "Event planning and management",
      "Catering, bakery, and confectionery",
      "Event equipment and utensil rentals",
      "Printing and publishing",
      "Unisex fashion design and tailoring",
      "Business consulting and entrepreneurial skills",
      "Livestock and crop farming",
    ],
    outcomes: [
      "More sustainable programme funding",
      "Practical business exposure for trainees",
      "Job creation and economic empowerment",
      "Reduced dependence on donations",
    ],
    photo: "CCDI enterprise, catering, and production",
  },
  {
    slug: "benevolent-childcare",
    name: "Benevolent & Childcare",
    fullName: "Benevolent & Childcare Initiative",
    division: "Child Protection, Young Entrepreneurs & Welfare",
    number: "03",
    theme: "orange",
    icon: "care",
    eyebrow: "Protect. Nurture. Empower.",
    title: "Every young person deserves a future.",
    description:
      "Protecting children, empowering youth, and transforming futures through care, education, practical skills, and mentorship.",
    activities: [
      "Orphanage and vulnerable-community support",
      "Education and learning-material support",
      "Entrepreneurship and vocational training",
      "Food, clothing, and healthcare support",
      "Child protection advocacy and awareness",
      "Mentorship, counselling, and psychosocial support",
      "Children’s Day celebrations and awareness programmes",
      "School assistance and educational materials",
      "Child rights awareness and moral development",
    ],
    outcomes: [
      "Greater protection for vulnerable children",
      "Improved access to learning",
      "Confidence and skills for independent adulthood",
      "Stronger support networks for young people",
    ],
    photo: "Youth empowerment and child welfare programmes",
  },
  {
    slug: "creative-community",
    name: "Creative Community",
    fullName: "Creative Community Initiative",
    division: "Community & Family Strengthening",
    number: "04",
    theme: "light",
    icon: "community",
    eyebrow: "Stronger together",
    title: "Thriving families. Stronger communities.",
    description:
      "Building strong, resilient, peaceful, healthy, and value-driven families and communities.",
    activities: [
      "Relationship and parenting workshops",
      "Couples seminars and family conferences",
      "Healthy living skills seminars",
      "Preventive health and wellness education",
      "Community relationship development",
      "Peaceful homes and conflict-prevention education",
      "Marriage enrichment seminars and workshops",
      "Couples Blissful Day events",
      "Family counselling and responsible family management",
      "Community welfare and humanitarian outreach",
      "Community sensitisation and awareness campaigns",
    ],
    outcomes: [
      "Stronger family bonds",
      "Improved emotional well-being",
      "Healthier living practices",
      "More peaceful and resilient communities",
    ],
    photo: "Families learning and growing together",
  },
] as const;
export const values = [
  ["Compassion", "Caring for people and responding to genuine needs."],
  [
    "Self-discovery",
    "Helping people understand their gifts, abilities, and potential.",
  ],
  [
    "Self-mastery",
    "Developing discipline, competence, and continuous personal growth.",
  ],
  [
    "Self-sufficiency",
    "Equipping people with practical abilities for productive living.",
  ],
  [
    "Professionalism",
    "Maintaining responsible, ethical, and competent standards.",
  ],
  ["Excellence", "Pursuing quality and continuous improvement."],
  [
    "Interdependence",
    "Recognising the value of collaboration and mutual support.",
  ],
  [
    "Resilience",
    "Developing the strength to learn, adapt, and overcome challenges.",
  ],
  [
    "Strong communities",
    "Building communities where people can grow, contribute, and thrive.",
  ],
  [
    "Peace & love",
    "Promoting healthy relationships, dignity, harmony, and peaceful coexistence.",
  ],
];
export const training = [
  {
    title: "Fashion & tailoring",
    category: "Creative skills",
    description:
      "Develop practical garment-making skills, from measuring and cutting to production and finishing.",
    icon: "fashion",
  },
  {
    title: "Catering & bakery",
    category: "Food & hospitality",
    description:
      "Build practical cooking, baking, presentation, and food-enterprise skills.",
    icon: "food",
  },
  {
    title: "Beauty & makeover",
    category: "Creative skills",
    description:
      "Explore makeup, beauty services, client care, and the foundations of a service business.",
    icon: "beauty",
  },
  {
    title: "ICT & digital skills",
    category: "Digital skills",
    description:
      "Build digital confidence and practical abilities for work, enterprise, and everyday life.",
    icon: "digital",
  },
  {
    title: "Agriculture & poultry",
    category: "Enterprise skills",
    description:
      "Explore productive crop-farming and poultry skills with a focus on sustainable livelihoods.",
    icon: "agriculture",
  },
  {
    title: "Printing & publishing",
    category: "Enterprise skills",
    description:
      "Discover practical production skills and opportunities in printing and publishing.",
    icon: "printing",
  },
];
export const reship = [
  ["R", "Relationship skills"],
  ["E", "Entrepreneurial skills"],
  ["S", "Security skills"],
  ["H", "Healthy living skills"],
  ["I", "Impactful attitudes"],
  ["P", "Profitability skills"],
];
export const articles = [
  {
    slug: "from-potential-to-practical-skills",
    category: "Skills & growth",
    title: "From potential to practical skills",
    description:
      "Why discovery, practice, and support matter on the journey to productive living.",
    body: [
      [
        "Start with what is possible",
        "An interest, a natural ability, or a desire to learn can be the beginning of a meaningful skill. At CCDI, we believe that everyone has the ability to learn and master a skill when given the right support and training.",
      ],
      [
        "Learn, develop, master, apply",
        "Practical learning connects knowledge to everyday action. Opportunities to practise, receive guidance, and develop confidence help people move from an idea to an ability they can use.",
      ],
      [
        "Connect skills to purpose",
        "A skill can support employment, a small enterprise, or a contribution to family and community life. Our capacity-development work brings these possibilities together through vocational learning, mentoring, entrepreneurship, and personal development.",
      ],
    ],
  },
  {
    slug: "enterprise-that-strengthens-community",
    category: "Enterprise & purpose",
    title: "Enterprise that gives back to community",
    description:
      "How practical services and business experience can support lasting empowerment.",
    body: [
      [
        "Where enterprise meets empowerment",
        "CCDI’s social-enterprise model connects income-generating services with its wider mission. Fashion, catering, printing, agriculture, and other services create opportunities to connect practical skills with productive work.",
      ],
      [
        "Learning through experience",
        "Practical business exposure helps trainees understand how a skill becomes a service. It also makes room for learning about responsibility, quality, teamwork, and meeting a customer’s needs.",
      ],
      [
        "Building towards sustainability",
        "Our social-enterprise arm is designed to support programme sustainability and reduce dependence on donations. Enterprise is part of an integrated model that brings skills, child welfare, family strengthening, and community development together.",
      ],
    ],
  },
  {
    slug: "stronger-families-stronger-futures",
    category: "Family & community",
    title: "Stronger families, stronger futures",
    description:
      "Healthy relationships and supportive homes are part of community transformation.",
    body: [
      [
        "Transformation begins in everyday relationships",
        "Families and communities provide the setting in which people learn, develop, and use their abilities. CCDI’s Creative Community Initiative focuses on building strong, peaceful, healthy, and value-driven relationships.",
      ],
      [
        "Practical opportunities to learn together",
        "Parenting workshops, couples seminars, family conferences, and community programmes create opportunities for shared learning. Healthy communication, respect, and cooperation are central themes.",
      ],
      [
        "A whole-community approach",
        "Our community work also includes healthy-living and preventive-health education. These programmes sit alongside skills development and welfare support as part of CCDI’s integrated approach to purposeful living.",
      ],
    ],
  },
];
export const pageInfo: Record<
  string,
  { title: string; label: string; description: string }
> = {
  about: {
    label: "About CCDI",
    title: "About CCDI",
    description:
      "We help people discover it, develop it, and put it to work for a purposeful life.",
  },
  "vision-mission": {
    label: "Our direction",
    title: "Vision & Mission",
    description:
      "A world where everyone can discover, develop, and master meaningful skills for a productive life.",
  },
  "core-values": {
    label: "What guides us",
    title: "Our Core Values",
    description:
      "The principles behind how we learn, lead, care, and build stronger communities.",
  },
  impact: {
    label: "Our impact",
    title: "Our Impact Statistics",
    description:
      "Turning potential into capability, and capability into meaningful community impact.",
  },
  projects: {
    label: "The CCDI model",
    title: "Four-Integrated Project-Arm Structure",
    description:
      "An integrated approach to skills, sustainable enterprise, child welfare, and stronger communities.",
  },
  "skills-training": {
    label: "Learn with CCDI",
    title: "Discover a skill. Create your future.",
    description:
      "Practical learning that builds confidence, competence, and opportunities for productive living.",
  },
  programmes: {
    label: "Explore CCDI",
    title: "Find your next possibility.",
    description:
      "Discover the programmes that connect practical learning with a stronger future.",
  },
  services: {
    label: "Purpose in practice",
    title: "Good work. Greater purpose.",
    description:
      "Explore enterprise services that connect professional skills with community empowerment.",
  },
  volunteer: {
    label: "Give your time",
    title: "Your skills can open doors.",
    description:
      "Bring your experience, energy, and compassion to a community that is growing together.",
  },
  testimonials: {
    label: "Community voices",
    title: "Every journey has a story.",
    description:
      "First-hand stories of learning, growth, mentorship, and service from CCDI’s community, alongside personal leadership reflections.",
  },
  gallery: {
    label: "Life at CCDI",
    title: "Small moments. Meaningful journeys.",
    description:
      "A growing collection of learning, creating, and coming together.",
  },
  videos: {
    label: "CCDI in motion",
    title: "See possibility in action.",
    description:
      "A space for programme films, event highlights, and stories from our community.",
  },
  documents: {
    label: "Forms & resources",
    title: "Forms, guidance & resources.",
    description:
      "Registration forms, membership guidance, privacy and safeguarding documents, programme materials, and CCDI publications.",
  },
  blog: {
    label: "The CCDI journal",
    title: "Ideas for a more purposeful life.",
    description:
      "Perspectives on practical skills, enterprise, family, and community.",
  },
  partners: {
    label: "Grow with us",
    title: "Partner With CCDI",
    description:
      "Meaningful transformation grows through shared expertise, resources, and commitment.",
  },
  donate: {
    label: "Support possibility",
    title: "Give someone a place to begin.",
    description:
      "Help create opportunities to learn, grow, and build a more independent future.",
  },
  contact: {
    label: "Let’s connect",
    title: "A conversation can be a beginning.",
    description:
      "Ask about training, explore a partnership, or find your place in the CCDI community.",
  },
  "privacy-policy": {
    label: "Privacy & trust",
    title: "Your privacy matters.",
    description:
      "Clear information about this website and how to make an enquiry.",
  },
  "child-protection": {
    label: "Care & dignity",
    title: "Protecting children. Respecting dignity.",
    description:
      "Child welfare and safeguarding are central to our benevolent and childcare initiative.",
  },
  "financial-transparency": {
    label: "Accountability",
    title: "Trust begins with transparency.",
    description:
      "Our commitment to responsible leadership, measurable impact, and sustainable growth.",
  },
};
