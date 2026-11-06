import { Facebook, MessageCircle, Music2, Youtube } from "lucide-react";

export function SocialIcon({
  platform,
  size = 18,
}: {
  platform: string;
  size?: number;
}) {
  const Icon =
    platform === "YouTube"
      ? Youtube
      : platform === "WhatsApp"
        ? MessageCircle
        : platform === "TikTok"
          ? Music2
          : Facebook;
  return <Icon size={size} aria-hidden="true" />;
}
