/** Add approved photographs here. The key is the label passed to PhotoSlot.
 * Put files in public/images/ and use a root-relative src, e.g. /images/training.jpg.
 * Keep alt text factual, and do not identify children without approved consent.
 * An absent entry intentionally renders the designed placeholder.
 */
export type Photo = { src: string; alt: string; objectPosition?: string };
export const photos: Record<string, Photo> = {
  // 'Hands-on skills. Real-world possibility.': {
  //   src: '/images/home-training.jpg',
  //   alt: 'Participants practising a vocational skill at a CCDI training session',
  //   objectPosition: '50% 40%',
  // },
};
