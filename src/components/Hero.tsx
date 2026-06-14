import { useState, useEffect, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Sparkles, Download } from "lucide-react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";

const StatusBadge = memo(() => (
  <div className="inline-block lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full clay-card flex items-center">
        {/* <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-primary animate-pulse" /> */}
        <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text font-mono sm:text-sm text-[0.7rem] font-bold">
          &gt; while(alive) &#123; innovate(); &#125;
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-primary to-accent blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-primary/80 to-accent/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
          Software
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-primary to-accent blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Engineer
        </span>
        <span className="absolute -right-16 md:-right-24 bottom-2 text-muted-foreground/10 font-mono text-sm md:text-lg select-none pointer-events-none tracking-[0.5em]">↑ ↑</span>
      </span>
    </h1>
  </div>
));

const GlitchRole = memo(() => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "AI Developer",
    "Tech Explorer",
    "Web Developer",
    "Pew Pew Pew🔫"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-8 flex items-center text-xl md:text-2xl font-bold text-primary"
      data-aos="fade-up"
      data-aos-delay="800"
    >
      <span className="glitch" data-text={roles[roleIndex]}>
        {roles[roleIndex]}
      </span>
    </div>
  );
});

const CTAButton = memo(({ href, text, icon: Icon }: { href: string; text: string; icon: any }) => (
  <a href={href} onClick={(e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }}>
    <button className="group relative w-[160px] h-12 clay-btn overflow-hidden flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300">
      <span className="z-10">{text}</span>
      <Icon className={`w-4 h-4 z-10 transition-transform duration-300 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'}`} />
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }: { icon: any; link: string; label: string }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-3 clay-card rounded-xl hover:scale-110 transition-transform duration-300">
      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  </a>
));

const TECH_STACK = ["Java", "Python", "React", "Node.js"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/St2-18", label: "GitHub" },
  { icon: Linkedin, link: "https://linkedin.com/in/harshit-sharma-64a62728b", label: "LinkedIn" },
  { icon: Mail, link: "mailto:harshitsharma77117@gmail.com", label: "Email" }
];

const Hero = () => {
  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konami[konamiIndex] || e.key.toLowerCase() === konami[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
          console.log('%c🎉 You found this in O(1)? Impressive. Most people take O(n).', 'color: #00ff00; font-size: 20px; font-weight: bold;');

          document.body.classList.add('easter-egg-chaos');

          setTimeout(() => {
            document.body.classList.remove('easter-egg-chaos');
            Swal.fire({
              title: "O(1) Discovery!",
              text: "You found the Konami Code. Impressive. Most people take O(n).",
              icon: "success",
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              confirmButtonColor: "hsl(var(--primary))"
            });
          }, 2500);

          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center pt-20">
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="flex flex-col items-center lg:items-start space-y-6">
              <StatusBadge />
              <MainTitle />

              <GlitchRole />

              {/* Description */}
              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-light" data-aos="fade-up" data-aos-delay="1000">
                Data in. Intelligence out. Beautiful UI in between.
                Making machines smarter and interfaces cleaner. Usually in that order.
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1200">
                {TECH_STACK.map((tech, index) => (
                  <div key={index} className="px-4 py-2 rounded-full clay-card text-sm text-muted-foreground hover:text-primary transition-colors">
                    {tech}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-row flex-wrap gap-4 justify-center lg:justify-start w-full pt-4" data-aos="fade-up" data-aos-delay="1400">
                <CTAButton href="https://drive.google.com/file/d/1f42UdwRYFW17iwRg6Pob5Pj3jcI7yDCs/view?usp=drivesdk" text="Download CV" icon={Download} />
                <CTAButton href="#projects" text="Projects" icon={ExternalLink} />
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start pt-4" data-aos="fade-up" data-aos-delay="1600">
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialLink key={index} {...social} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 3D Object */}
          <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative order-1 lg:order-2" data-aos="fade-left" data-aos-delay="600">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="w-full h-full relative z-10 bg-card/50 backdrop-blur-2xl overflow-hidden !rounded-[3rem] shadow-[20px_20px_50px_rgba(0,0,0,0.8),-10px_-10px_30px_rgba(255,255,255,0.03),inset_4px_4px_10px_rgba(255,255,255,0.08),inset_-8px_-8px_20px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[25px_25px_60px_rgba(0,0,0,0.9),-12px_-12px_40px_rgba(255,255,255,0.04),inset_6px_6px_12px_rgba(255,255,255,0.1),inset_-10px_-10px_24px_rgba(0,0,0,0.9)]">
              <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
