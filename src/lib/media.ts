/** Add approved photographs here. The key is the label passed to PhotoSlot.
 * Put files in public/images/ and use a root-relative src, e.g. /images/training.jpg.
 * Keep alt text factual, and do not identify children without approved consent.
 * An absent entry intentionally renders the designed placeholder.
 */
export type Photo = { src: string; alt: string; objectPosition?: string };
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
  // 'Hands-on skills. Real-world possibility.': {
  //   src: '/images/home-training.jpg',
  //   alt: 'Participants practising a vocational skill at a CCDI training session',
  //   objectPosition: '50% 40%',
  // },
};
