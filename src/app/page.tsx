import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Packages } from "@/components/Packages";
import { BrokerReviews } from "@/components/BrokerReviews";
import { HowItWorks } from "@/components/HowItWorks";
import { AboutUs } from "@/components/AboutUs";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { AnimateIn } from "@/components/AnimateIn";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AnimateIn animation="fade-in" triggerOnScroll={false}>
          <Hero />
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={100}>
          <Packages />
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={100}>
          <BrokerReviews />
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={100}>
          <HowItWorks />
        </AnimateIn>
        <AnimateIn animation="slide-left" delay={100}>
          <AboutUs />
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={100}>
          <FAQ />
        </AnimateIn>
      </main>
      <Footer />
      <Link
        href="#"
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition z-50"
      >
        <span className="material-icons-outlined">keyboard_arrow_up</span>
      </Link>
    </div>
  );
}
