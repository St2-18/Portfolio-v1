import { useState, useEffect } from "react";
import { ChevronDown, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["AI Developer", "Science Educator", "Tech Explorer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 fade-in-up">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I'm <span className="gradient-text">Harshit</span>{" "}
            <span className="text-4xl md:text-6xl">👋</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Engineering Student | AI & Software Enthusiast | Developer | Curious
            Human
          </p>

          <div className="text-lg md:text-xl mb-12">
            <span className="text-primary typing-cursor">
              {roles[currentRole]}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            onClick={() => scrollToSection("projects")}
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg glow-primary"
          >
            View Projects
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get in Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-16">
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-primary hover:bg-primary/10"
            asChild
          >
            <a
              href="https://github.com/St2-18"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-primary hover:bg-primary/10"
            asChild
          >
            <a href="mailto:harshitsharma77117@gmail.com?subject=Hello&body=I%20want%20to%20connect">
              <Mail className="w-6 h-6" />
            </a>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("about")}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
