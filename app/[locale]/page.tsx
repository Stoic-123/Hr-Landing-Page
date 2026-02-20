import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import MobileApp from "@/sections/MobileApp";
import HowItWorks from "@/sections/HowItWorks";
import FAQ from "@/sections/FAQ";
import Pricing from "@/sections/Pricing";
import Testimonials from "@/sections/Testimonials";
import TrustedBy from "@/sections/TrustedBy";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <MobileApp />
      <Contact />
      <FAQ />
    </>
  );
}
