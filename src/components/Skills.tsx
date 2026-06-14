import { memo, useState, useEffect, useRef } from "react";
import { Code2, Database, Wrench, Brain, Cpu, Network, Globe, Layout, Terminal, Compass } from "lucide-react";

const SkillCard = memo(({ category, index }: any) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="group relative h-full perspective-[1000px]"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-accent/30 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
      <div className="clay-card p-6 md:p-8 h-full flex flex-col relative z-10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.3)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary/10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <category.icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{category.title}</h3>
        </div>

        <div className="flex flex-wrap gap-3 mt-auto">
          {category.skills.map((skill: string, skillIndex: number) => (
            <span
              key={skillIndex}
              className="px-4 py-2 text-sm text-muted-foreground bg-background/50 rounded-full shadow-[inset_1px_1px_3px_rgba(0,0,0,0.3)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

const CurrentlyExploringTile = memo(() => {
  const [size, setSize] = useState({ w: 800, h: 100 });
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  const offsetRef = useRef(0);
  const isHoveredRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    let animationFrame: number;
    let repelX = 0;
    let repelY = 0;

    const animate = () => {
      if (!pathRef.current || !textPathRef.current || !textRef.current) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const pathLength = pathRef.current.getTotalLength();
      if (pathLength === 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      // Normal movement
      if (!isHoveredRef.current) {
        offsetRef.current += 1.5;
      }

      // Seamless Loop
      const halfLength = pathLength / 2;
      if (offsetRef.current >= halfLength) {
        offsetRef.current -= halfLength;
      }

      const percentage = (offsetRef.current / pathLength) * 100;
      textPathRef.current.setAttribute('startOffset', `${percentage}%`);

      // Repel Logic
      let targetRepelX = 0;
      let targetRepelY = 0;

      if (isHoveredRef.current) {
        const textCenterOffset = (offsetRef.current + 80) % pathLength;
        const centerPoint = pathRef.current.getPointAtLength(textCenterOffset);

        const dx = centerPoint.x - mousePosRef.current.x;
        const dy = centerPoint.y - mousePosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const repelRadius = 250;
        if (distance < repelRadius && distance > 0) {
          const force = (repelRadius - distance) / repelRadius;
          targetRepelX = (dx / distance) * force * 50;
          targetRepelY = (dy / distance) * force * 50;
        }
      }

      // Interpolation for smooth push/return
      repelX += (targetRepelX - repelX) * 0.1;
      repelY += (targetRepelY - repelY) * 0.1;

      textRef.current.style.transform = `translate(${repelX}px, ${repelY}px)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const p = 0;
  const r = 32;

  const d = `
    M ${r},0 
    L ${size.w - r},0 A ${r},${r} 0 0,1 ${size.w},${r} 
    L ${size.w},${size.h - r} A ${r},${r} 0 0,1 ${size.w - r},${size.h} 
    L ${r},${size.h} A ${r},${r} 0 0,1 0,${size.h - r} 
    L 0,${r} A ${r},${r} 0 0,1 ${r},0 
    L ${size.w - r},0 A ${r},${r} 0 0,1 ${size.w},${r} 
    L ${size.w},${size.h - r} A ${r},${r} 0 0,1 ${size.w - r},${size.h} 
    L ${r},${size.h} A ${r},${r} 0 0,1 0,${size.h - r} 
    L 0,${r} A ${r},${r} 0 0,1 ${r},0
  `.replace(/\s+/g, ' ').trim();

  const techStack = ["LangChain", "Web3", "Advanced NLP", "System Design", "Microservices"];

  return (
    <div
      className="mt-12 lg:mt-16 w-full max-w-4xl mx-auto group relative perspective-[1000px]"
      data-aos="fade-up"
      data-aos-delay="600"
      onMouseEnter={() => isHoveredRef.current = true}
      onMouseLeave={() => isHoveredRef.current = false}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={containerRef}
        className="relative w-full rounded-[2rem] bg-card/40 backdrop-blur-md border border-white/5 shadow-2xl min-h-[100px] flex items-center justify-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.3)]"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 20 }}>
          <path ref={pathRef} id="border-path" d={d} fill="none" stroke="none" />
          <text
            ref={textRef}
            className="fill-primary font-mono text-sm sm:text-base tracking-[0.3em] font-bold uppercase glitch-text-fast"
            dy="-12"
          >
            <textPath ref={textPathRef} href="#border-path">
              CURRENTLY EXPLORING
            </textPath>
          </text>
        </svg>

        <div className="py-6 px-6 md:px-10 flex flex-wrap gap-4 justify-center items-center relative z-10 w-full">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-5 py-2.5 text-sm font-medium text-foreground bg-background/60 backdrop-blur-md rounded-full border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.1)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] hover:bg-primary/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Programming Languages",
      skills: ["Java", "C++", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      icon: Brain,
      title: "Machine Learning & AI",
      skills: ["TensorFlow", "Scikit-learn", "Gen AI", "Prompt Engineering"],
    },
    {
      icon: Layout,
      title: "Frontend Development",
      skills: ["React", "Tailwind", "JavaFX", "HTML/CSS", "EJS"],
    },
    {
      icon: Database,
      title: "Backend Development",
      skills: ["Node.js", "Express", "MongoDB", "RESTful APIs", "MySQL"],
    },
    {
      icon: Terminal,
      title: "Core Computer Science",
      skills: ["DSA", "DBMS", "OOPS", "OS", "CN", "System Design"],
    },
    {
      icon: Wrench,
      title: "Tools & Ecosystem",
      skills: ["Git", "Postman", "Linux", "Vercel", "Docker", "Maven"],
    },
  ];

  const bgIcons = [
    { Icon: Cpu, className: "top-[10%] left-[5%] w-24 h-24" },
    { Icon: Code2, className: "top-[30%] right-[10%] w-32 h-32" },
    { Icon: Database, className: "bottom-[20%] left-[15%] w-20 h-20" },
    { Icon: Network, className: "top-[60%] right-[30%] w-28 h-28" },
    { Icon: Globe, className: "bottom-[10%] right-[5%] w-24 h-24" },
  ];

  return (
    <section id="skills" className="py-20 lg:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Floating Background Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
            {bgIcons.map((item, i) => (
              <item.Icon
                key={i}
                className={`absolute text-primary/10 animate-float ${item.className}`}
                style={{ animationDelay: `${i * 1.5}s`, animationDuration: '8s' }}
              />
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-16 lg:mb-24" data-aos="fade-down">
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Technical Arsenal
              </h2>
              <span className="absolute -right-20 top-2 text-muted-foreground/20 font-mono text-xl select-none pointer-events-none tracking-[0.5em]">← →</span>
            </div>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Technologies and tools I use to build scalable systems and intelligent applications.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard key={index} category={category} index={index} />
            ))}
          </div>

          {/* Currently Exploring Horizontal Tile */}
          <CurrentlyExploringTile />
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
