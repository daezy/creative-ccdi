/** First-person stories supplied for the CCDI website. Duplicate submissions
 * from Gloria Omagbemi and Adanma Akinboyewa are included once each.
 * Portrait associations follow the explicitly named source files.
 */
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  title: string;
  category: string;
  portrait: string;
  position?: string;
  excerpt: string;
  paragraphs: string[];
};
export const communityTestimonials: Testimonial[] = [
  {
    id: "emadu",
    name: "Emadu Erhumena",
    role: "Businesswoman & HR Practitioner",
    title: "From student to professional",
    category: "Learning & leadership",
    portrait: "/images/testimonials/testimonial-emadu.jpeg",
    position: "50% 27%",
    excerpt:
      "CCDI did more than teach me a skill—it helped me discover what I could become and gave me the opportunity to develop the capacity to pursue it.",
    paragraphs: [
      "My name is Emadu Erhumena, and my journey with Creative Craft Development Initiative (CCDI) began in 2015 as a student. What started as an opportunity to learn and develop skills soon became a journey that shaped my career and who I am today.",
      "At CCDI, I progressed from being a student to becoming a facilitator and later the Business Development/Office Administrator, where I had the privilege of coordinating and overseeing over 200 students and facilitators. It was my first real work experience, and it gave me invaluable opportunities to develop my leadership, administrative, communication, and people-management skills.",
      "Looking back, I can confidently say that CCDI did more than teach me a skill—it helped me discover what I could become and gave me the opportunity to develop the capacity to pursue it.",
      "Today, I am a businesswoman and HR Practitioner, and many of the lessons, experiences, and values I gained through CCDI continue to influence my professional journey.",
      "I am grateful to have been part of CCDI’s story, and I am even more excited to be part of its new development and growth journey. It is inspiring to see an organisation that invests in people, equips them with meaningful skills, and creates pathways for them to build purposeful and self-sufficient lives.",
      "CCDI was part of my beginning, and I am proud to be part of its future.",
    ],
  },
  {
    id: "grace",
    name: "Mrs. Grace Ita-Nzeh",
    role: "CCDI community member since 2015",
    title: "From 2015 to now: my CCDI journey",
    category: "Self-discovery & growth",
    portrait: "/images/testimonials/testimonial-grace.jpeg",
    position: "50% 32%",
    excerpt:
      "It gave me an environment to discover abilities within me that I may not have recognised on my own and encouraged me to keep growing beyond where I started.",
    paragraphs: [
      "My journey with Creative Craft Development Initiative (CCDI) began in 2015. At the time, I simply saw it as an opportunity to learn, grow, and develop myself. Looking back today, I realise that it was much more than that—it was the beginning of a journey that has continued to shape my life.",
      "Over the years, CCDI has been a place where I have experienced self-discovery, capacity building, learning, and personal development. It gave me an environment to discover abilities within me that I may not have recognised on my own and encouraged me to keep growing beyond where I started.",
      "What makes my CCDI experience particularly meaningful is that it has been a journey of growth. From where I was in 2015 to where I am today, I have gained not only skills and knowledge, but also greater confidence, discipline, resilience, and a deeper understanding of the importance of empowering people with the right opportunities.",
      "CCDI taught me that sometimes, all a person needs is someone or an organisation willing to provide the platform, guidance, and opportunity to discover what they are capable of becoming.",
      "Today, when I look back at my journey, I am grateful that my story is connected to CCDI. I have seen firsthand how investing in people and equipping them with practical skills can create lasting impact—not only in individuals, but also in families and communities.",
      "I am proud of how far I have come since 2015, and I am even more grateful to still be connected to an organisation whose vision continues to centre around self-discovery, capacity building, and skills for life.",
      "CCDI was part of my journey then, it has contributed to who I am today, and I look forward to seeing the greater impact it will continue to make in the lives of many more people.",
      "I am grateful for the journey. I am grateful for the growth. And I am grateful to be part of the CCDI story.",
    ],
  },
  {
    id: "chidozie",
    name: "Chidozie Obi",
    role: "AI Video Producer & Product Marketer",
    title: "Clarity, purpose, and practical wisdom",
    category: "Mentorship & relationships",
    portrait: "/images/testimonials/testimonial-chidozie.jpeg",
    position: "50% 35%",
    excerpt:
      "Her guidance has helped me gain clarity, strengthen my mindset, and become more deliberate about pursuing purpose and excellence in my career.",
    paragraphs: [
      "Working with Pastor Gloria Omagbemi has been a transformative experience for me, both personally and professionally. Her depth of understanding of relationships, purpose, and the Scriptures has given me practical wisdom and spiritual direction that I continue to apply in my everyday life.",
      "Through her counsel and teachings, I have gained a deeper understanding of how to build a healthier and more purposeful marriage, communicate better, and approach relationships with greater wisdom and intentionality. Professionally, her guidance has helped me gain clarity, strengthen my mindset, and become more deliberate about pursuing purpose and excellence in my career.",
      "Pastor Gloria has a unique way of using timeless biblical principles and deep spiritual insights to help people understand who they are, discover their purpose, and take meaningful steps toward fulfilling it. I am genuinely grateful for the impact her mentorship and counsel have had on my life.",
    ],
  },
  {
    id: "uchenna",
    name: "Uchenna Ebenezer",
    role: "Professional bass guitarist & decorator",
    title: "From a student to a professional",
    category: "Creative skills & confidence",
    portrait: "/images/testimonials/testimonial-uchenna.jpeg",
    position: "50% 24%",
    excerpt:
      "CCDI offered me the opportunity to develop my skill/talent and build my capacity and confidence.",
    paragraphs: [
      "My name is Uchenna Ebenezer, and my journey with Creative Craft Development Initiative (CCDI) began in the year 2011.",
      "From being a student, I have become a professional guitarist (bass player) and a professional decorator.",
      "CCDI offered me the opportunity to develop my skill/talent and build my capacity and confidence.",
      "The words of Pastor Omagbemi—“If you graduate from school, get a skill, and if you get a skill, go to school”—were a big motivation and inspiration to me.",
      "I am sincerely grateful to God Almighty for the opportunity provided by CCDI to develop myself. I am also grateful to CCDI for this opportunity.",
    ],
  },
  {
    id: "adanma",
    name: "Deaconess Adanma Akinboyewa",
    role: "Humanitarian giver · CCDI facilitator, 2010–2018",
    title: "The confidence to take the next step",
    category: "Service & personal development",
    portrait: "/images/testimonials/testimonial-adanma.jpeg",
    position: "50% 25%",
    excerpt:
      "The experience equipped me with the techniques and skills to help young people navigate challenges, correct unproductive behaviours, and make informed decisions that support their overall development.",
    paragraphs: [
      "My name is Deaconess Adanma Akinboyewa. I am a humanitarian giver, passionate about guiding young women towards personal and spiritual growth, as well as responsible living.",
      "I was one of the facilitators who worked with the Creative Craft Development Initiative (CCDI) between 2010 and 2018 and it was indeed an awesome experience.",
      "CCDI was an important step in my growth and a source of leverage that gave me the confidence to take certain steps in life, especially in my humanitarian work.",
      "It was a great privilege to serve with CCDI. The experience equipped me with the techniques and skills to help young people navigate challenges, correct unproductive behaviours, and make informed decisions that support their overall development.",
      "Thank you, CCDI. I am truly grateful.",
    ],
  },
];
export const leadershipReflections: Testimonial[] = [
  {
    id: "gloria",
    name: "Gloria Omagbemi",
    role: "Chairman, CCDI · Leadership & Management · Life Skills Coach",
    title: "Leadership that develops people",
    category: "A leadership reflection",
    portrait: "/images/testimonials/testimonial-gloria.jpeg",
    position: "50% 35%",
    excerpt:
      "For me, leadership is both a responsibility and an opportunity to positively influence lives.",
    paragraphs: [
      "My experience working in leadership and management has been a deeply meaningful journey of learning, service, and continuous development. I have had the privilege of working with individuals and teams, helping them discover their strengths, take responsibility, develop their capabilities, and work together toward shared goals.",
      "My leadership approach is centred on people development, effective communication, accountability, strategic thinking, teamwork, and purposeful action. I believe that effective leadership is not simply about directing people, but about creating an environment where individuals can grow, contribute meaningfully, and become better equipped to fulfil their responsibilities.",
      "Through my work with CCDI, I have developed and applied practical approaches to team coordination, programme planning, organisational management, capacity development, and community-focused initiatives. I have learned that sustainable results are achieved when people are properly guided, responsibilities are clearly defined, communication is intentional, and everyone understands how their contribution connects to the larger vision.",
      "I am particularly passionate about identifying potential, developing people, strengthening teams, and helping individuals move from ideas to practical action. My leadership and management experience has continually reinforced my commitment to integrity, excellence, professionalism, compassion, accountability, and service.",
      "For me, leadership is both a responsibility and an opportunity to positively influence lives. I remain committed to building people, strengthening organisations, and creating purposeful systems that enable individuals and communities to thrive.",
    ],
  },
  {
    id: "temisan",
    name: "Pastor Temisan Omagbemi",
    role: "Trustee Secretary, CCDI · Life Skill Coach · Business development & consultancy entrepreneur",
    title: "Working together with purpose",
    category: "Leadership & management experience",
    portrait: "/images/testimonials/testimonial-temisan.jpeg",
    position: "50% 24%",
    excerpt:
      "Her leadership is not merely about directing others; it is about developing people, identifying potential, solving challenges, building confidence, and creating opportunities for individuals and teams to grow.",
    paragraphs: [
      "Working with Pastor Gloria Omagbemi in leadership and management has been a deeply valuable and transformative experience for me. Her leadership approach combines wisdom, structure, compassion, accountability, and a strong sense of purpose. She has a remarkable ability to bring people together, clarify responsibilities, and encourage individuals to contribute their strengths toward achieving shared organisational goals.",
      "Through her leadership and management guidance, I have learned the importance of effective communication, strategic planning, teamwork, accountability, and responsible decision-making. She creates an environment where people are encouraged to develop their abilities, take ownership of their responsibilities, and pursue excellence in their assignments.",
      "Pastor Gloria demonstrates a unique capacity to manage both people and processes while keeping the broader vision in focus. Her leadership is not merely about directing others; it is about developing people, identifying potential, solving challenges, building confidence, and creating opportunities for individuals and teams to grow.",
      "Her commitment to excellence, integrity, service, and purposeful leadership has made a meaningful impact on my professional development. I am genuinely grateful for the leadership lessons, mentorship, and practical management experience I have gained through working with her and through CCDI.",
    ],
  },
];
