import library from "./media-library.json";
/** Add approved photographs here. The key is the label passed to PhotoSlot.
 * Put files in public/images/ and use a root-relative src, e.g. /images/training.jpg.
 * Keep alt text factual, and do not identify children without approved consent.
 * An absent entry intentionally renders the designed placeholder.
 */
export type Photo = {
  src: string;
  alt: string;
  objectPosition?: string;
  width?: number;
  height?: number;
  contain?: boolean;
};
export const photos: Record<string, Photo> = {
  "Gloria Omoze Omagbemi · Portrait space": {
    src: "/images/testimonials/testimonial-gloria.jpeg",
    alt: "Gloria Omoze Omagbemi, CCDI Chairman and Life Skills Coach",
    objectPosition: "50% 35%",
  },
  "Temisan Ignatius Omagbemi · Portrait space": {
    src: "/images/testimonials/testimonial-temisan.jpeg",
    alt: "Temisan Ignatius Omagbemi, CCDI Trustee Secretary and Life Skill Coach",
    objectPosition: "50% 24%",
  },

  "Hands-on skills. Real-world possibility.": library["catering-class"],
  "Learning together": library["baking-trainees"],
  "Enterprise that empowers.": library["catering-service"],
  "Creating with purpose": library["handmade-accessories"],
  "Stronger families. Thriving communities.": library["couples-blissful-day"],
  "Growing together": library["couples-celebration"],
  "People, purpose, and practical learning": library["seminar-audience"],
  "Mentors, learners, and shared possibilities": library["outreach-team"],
  "The people and purpose behind CCDI": library["ccdi-centre"],
  "Practical training at CCDI": library["sewing-class"],
  "Volunteers and facilitators making room for growth":
    library["outreach-volunteers"],
  "Partners working alongside the CCDI community": library["craft-workshop"],
  "Hands-on learning and practical skills training": library["catering-class"],
  "CCDI enterprise, catering, and production": library["catering-service"],
  "Youth empowerment and child welfare programmes":
    library["community-outreach"],
  "Families learning and growing together": library["couples-blissful-day"],
  "Fashion & tailoring": library["fashion-design"],
  "Catering & bakery": library["bread-making"],
  "Beauty & makeover": library["beauty-training"],
  "ICT & digital skills": library["training-centre-entry"],
  "Agriculture & poultry": library["agriculture-project"],
  "Printing & publishing": library["helpers-helpmeet"],
  "Youth skills training, mentorship, and community volunteering":
    library["tailoring-workshop"],
  "Women learning, building businesses, and supporting one another":
    library["craft-workshop"],
  "Benevolent outreach, children’s learning, and welfare support":
    library["welfare-visit"],
  "Community outreach, parenting workshops, and family events":
    library["family-event-guests"],
  "Learning by doing": library["catering-class"],
  "Made with purpose": library["handmade-accessories"],
  "Growing in confidence": library["craft-workshop"],
  "A place to create": library["sewing-class"],
  "Together, we thrive": library["couples-blissful-day"],
  "From skill to service": library["catering-service"],
  "CCDI centre": library["ccdi-centre"],
  "From potential to practical skills": library["sewing-class"],
  "Enterprise that gives back to community": library["catering-service"],
  "Stronger families, stronger futures": library["couples-blissful-day"],
};
