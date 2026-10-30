import library from "./media-library.json";
export const publicationIds = [
  "godly-pattern",
  "grace-empowered",
  "true-riches",
  "advancing-in-age",
  "purpose-fulfilled",
  "kept-from-falling",
  "hope-dry-tree",
  "helpers-helpmeet",
] as const;
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
// Stable choices by placement keep the same arm recognisable without repeating
// one photo everywhere. Only these two arms use the newly supplied collection.
const armImages = {
  "capacity-development": {
    hero: "skills-certification-graduates",
    overview: "skills-training-showcase",
    project: "skills-baking-team",
    related: "skills-certification-graduates",
  },
  "benevolent-childcare": {
    hero: "welfare-donation-team",
    overview: "welfare-support-visit",
    project: "welfare-donation-team",
    related: "welfare-support-visit",
  },
} as const;
export function armPhoto(
  slug: string,
  placement: "hero" | "overview" | "project" | "related",
): Photo | undefined {
  const images = armImages[slug as keyof typeof armImages];
  return images ? library[images[placement]] : undefined;
}
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

  "Hands-on skills. Real-world possibility.": library["skills-baking-team"],
  "Learning together": library["skills-training-showcase"],
  "Enterprise that empowers.": library["event-service-team"],
  "Creating with purpose": library["handmade-accessories"],
  "Stronger families. Thriving communities.": library["couples-blissful-day"],
  "Growing together": library["couples-celebration"],
  "People, purpose, and practical learning":
    library["skills-certification-graduates"],
  "Mentors, learners, and shared possibilities":
    library["welfare-donation-team"],
  "The people and purpose behind CCDI": library["ccdi-centre"],
  "Practical training at CCDI": library["skills-baking-team"],
  "Volunteers and facilitators making room for growth":
    library["welfare-donation-team"],
  "Partners working alongside the CCDI community":
    library["skills-certification-graduates"],
  "Hands-on learning and practical skills training":
    library["skills-baking-team"],
  "CCDI enterprise, catering, and production": library["catering-service"],
  "Youth empowerment and child welfare programmes":
    library["welfare-donation-team"],
  "Families learning and growing together": library["couples-blissful-day"],
  "Fashion & tailoring": library["fashion-design"],
  "Catering & bakery": library["skills-baking-team"],
  "Beauty & makeover": library["beauty-training"],
  "ICT & digital skills": library["training-centre-entry"],
  "Agriculture & poultry": library["agriculture-project"],
  "Printing & publishing": library["helpers-helpmeet"],
  "Youth skills training, mentorship, and community volunteering":
    library["skills-certification-graduates"],
  "Women learning, building businesses, and supporting one another":
    library["skills-training-showcase"],
  "Benevolent outreach, children’s learning, and welfare support":
    library["welfare-support-visit"],
  "Community outreach, parenting workshops, and family events":
    library["family-event-guests"],
  "Learning by doing": library["skills-baking-team"],
  "Made with purpose": library["handmade-accessories"],
  "Growing in confidence": library["craft-workshop"],
  "A place to create": library["sewing-class"],
  "Together, we thrive": library["couples-blissful-day"],
  "From skill to service": library["catering-service"],
  "CCDI centre": library["ccdi-centre"],
  "From potential to practical skills":
    library["skills-certification-graduates"],
  "Enterprise that gives back to community": library["catering-service"],
  "Stronger families, stronger futures": library["couples-blissful-day"],
};
