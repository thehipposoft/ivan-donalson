import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
// Hero original disponible en "@/components/sections/Hero" — probando HeroTwo
import { HeroTwo } from "@/components/sections/HeroTwo";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <HeroTwo />
        <About />
        <Contact />
        <FeaturedProject />
      </main>
      <Footer />
    </>
  );
}
