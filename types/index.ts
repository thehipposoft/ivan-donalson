export type NavItem = {
  label: string;
  href: `#${string}` | `/${string}`;
};

export type ChannelId =
  | "instagram"
  | "spotify"
  | "youtube"
  | "tiktok"
  | "facebook";

export type Channel = {
  id: ChannelId;
  name: string;
  /** Usuario o descripción corta visible debajo del nombre */
  handle: string;
  /** Qué encuentra el usuario en ese canal */
  description: string;
  href: string;
};

export type Project = {
  name: string;
  description: string;
  href: string;
};

export type Pillar = {
  title: string;
  description: string;
};
