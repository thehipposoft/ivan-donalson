import {
  siFacebook,
  siInstagram,
  siSpotify,
  siTiktok,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";
import type { ChannelId } from "@/types";

/** Íconos oficiales de cada plataforma (Simple Icons, CC0) */
const icons: Record<ChannelId, SimpleIcon> = {
  instagram: siInstagram,
  youtube: siYoutube,
  spotify: siSpotify,
  tiktok: siTiktok,
  facebook: siFacebook,
};

type SocialIconProps = {
  id: ChannelId;
  className?: string;
};

/** Monocromo (currentColor) para mantener la paleta de la marca */
export function SocialIcon({ id, className = "" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={icons[id].path} />
    </svg>
  );
}
