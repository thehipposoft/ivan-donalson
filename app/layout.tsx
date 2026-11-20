import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/styles/fonts";
import { site } from "@/lib/constants/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#3d3935",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fontVariables} antialiased`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
