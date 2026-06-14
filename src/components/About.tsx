import { memo } from "react";
import { GraduationCap, MapPin, Globe, Heart, FileText, Code, Sparkles, ArrowUpRight, Mail } from "lucide-react";
import myImage from "@/assets/me.jpg";

const Header = memo(() => (
  <div className="text-center lg:mb-12 mb-6 px-4">
    <div className="inline-block relative group" data-aos="zoom-in-up" data-aos-duration="600">
      <h2 className="text-4xl md:text-5xl font-bold gradient-text">
        About Me
      </h2>
    </div>

  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center p-4">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-2xl animate-spin-slow opacity-50" />
      <div className="relative">
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden clay-card transform transition-all duration-700 group-hover:scale-105 p-2">
          <img
            src={myImage}
            alt="Harshit"
            className="w-full h-full rounded-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, value, label, description, animation }: any) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group h-full">
    <div className="clay-card p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 transition-transform group-hover:rotate-6">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <span className="text-xl sm:text-2xl font-bold text-foreground text-right" data-aos="fade-up-left">
          {value}
        </span>
      </div>
      <div>
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground/80">{description}</p>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const About = () => {
  const facts = [
    {
      icon: GraduationCap,
      value: "B.Tech CSE (AI)",
      label: "Education",
      description: "MAIT • 2023-2027",
      animation: "fade-right",
    },
    {
      icon: MapPin,
      value: "India",
      label: "Location",
      description: "Based in",
      animation: "fade-up",
    },
    {
      icon: Globe,
      value: "EN, HI, FR, JA",
      label: "Languages",
      description: "English, Hindi, French, Japanese",
      animation: "fade-left",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <Header />

        <div className="max-w-7xl mx-auto pt-8 relative">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left lg:col-span-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
                <span className="font-mono text-primary text-lg lg:text-xl tracking-widest block mb-2">&gt; System check...</span>
                <span className="block mt-2 text-foreground">Error 200: <span className="gradient-text">Harshit Found</span></span>
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pb-4" data-aos="fade-right" data-aos-duration="1500">
                I’m Harshit, a CSE (AI) student at MAIT and a Reliance Foundation Scholar. From training neural networks to writing robust Java backends that refuse to break under pressure, I build high-performance systems that make complex machine learning look entirely effortless. I love solving complex problems, pushing technical boundaries, and crafting seamless digital experiences. When I’m not staring at a terminal or breaking down complex tech for others, I’m usually reading stuff, watching anime, or negotiating with a very demanding ecosystem of cats.
              </p>

              {/* Quote Section */}
              <div className="relative my-6" data-aos="fade-up" data-aos-duration="1700">
                <div className="clay-card p-6 relative overflow-hidden text-left">
                  <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl"></div>
                  <div className="absolute top-3 left-4 text-primary opacity-30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>
                  <blockquote className="text-muted-foreground italic font-medium text-base relative z-10 pl-10 pr-8">
                    "I don't just write code, I negotiate with silicon until it does what I want."
                  </blockquote>
                  <div className="absolute bottom-3 right-4 text-primary opacity-30 rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>
                </div>
                <span className="hidden sm:block absolute -bottom-4 -right-14 text-muted-foreground/20 font-mono text-lg select-none pointer-events-none tracking-[0.5em]">↓ ↓</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 w-full justify-center lg:justify-start">
                <a href="#contact" className="w-full sm:w-auto" data-aos="fade-up" data-aos-duration="800">
                  <button className="w-full clay-btn px-6 py-3 flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" /> Contact Me
                  </button>
                </a>
                <a href="#projects" className="w-full sm:w-auto" data-aos="fade-up" data-aos-duration="1000">
                  <button className="w-full clay-card px-6 py-3 flex items-center justify-center gap-2 text-primary font-medium hover:text-accent">
                    <Code className="w-5 h-5" /> View Projects
                  </button>
                </a>
              </div>
            </div>

            {/* Right Profile Image */}
            <div className="relative lg:col-span-2 flex justify-center lg:justify-end">
              <ProfileImage />
            </div>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-24">
            {facts.map((fact) => (
              <StatCard key={fact.label} {...fact} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
