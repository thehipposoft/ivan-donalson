import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Biography, biographyId } from "@/components/sections/Biography";

export const metadata: Metadata = {
  title: "Biografía",
  description:
    "Mi camino: la búsqueda, la formación, la música, los viajes y los proyectos de Iván Donalson.",
};

export default function BiographyPage() {
  return (
    <>
      <SmoothScroll />
      <Header variant="page" mainId={biographyId} />
      <main>
        <Biography />
      </main>
      <Footer variant="page" />
    </>
  );
}
