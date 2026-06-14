import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden w-full relative">
      <Navigation />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <ScrollToTop />

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Harshit. Crafted with <span className="text-primary">☕</span>{" "}
            and questionable sleep schedules
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
