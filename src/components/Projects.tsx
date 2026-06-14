import { useState, memo } from "react";
import { ExternalLink, Github, Droplets, Gamepad2, Brain, X, ArrowUpRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="clay-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-primary/10">
              <project.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>
              <p className="text-primary font-medium">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 text-foreground">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1 text-sm bg-background rounded-full border border-border shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="w-full clay-card py-3 px-4 flex items-center justify-center gap-2 hover:text-primary transition-colors">
                  <Github className="w-5 h-5" /> View Source Code
                </button>
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="w-full clay-btn py-3 px-4 flex items-center justify-center gap-2">
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </button>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = memo(({ project, index, onClick }: any) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className={`group relative rounded-[2.5rem] bg-card/20 backdrop-blur-xl border border-white/5 overflow-hidden cursor-pointer flex flex-col hover:border-primary/30 transition-all duration-700 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)] ${project.colSpan}`}
      onClick={() => onClick(project)}
    >
      {/* Spotlight Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Decorative Abstract Backgrounds */}
      {project.title === 'Wanderlust' && (
        <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none hidden lg:block opacity-30 group-hover:opacity-60 transition-opacity duration-700">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      {project.title === 'Aquasense' && (
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700 -translate-y-1/2 translate-x-1/3" />
      )}

      {project.title === 'Deal or No Deal' && (
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay" />
      )}

      <div className="p-8 md:p-12 flex flex-col h-full relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 shadow-xl">
            <project.icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 backdrop-blur-md">
            <ArrowUpRight className="w-5 h-5 text-foreground group-hover:text-primary-foreground group-hover:rotate-45 transition-all duration-500" />
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-primary font-bold">{project.subtitle}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors duration-500 tracking-tight">{project.title}</h3>
          <p className="text-muted-foreground/80 leading-relaxed mb-10 max-w-3xl line-clamp-2 md:line-clamp-3 text-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {project.tech.map((tech: string, techIndex: number) => (
              <div key={techIndex} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
                <span className="text-sm text-foreground/70 font-medium tracking-wide group-hover:text-foreground transition-colors">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      icon: Globe,
      title: "Wanderlust",
      subtitle: "Full-Stack Platform",
      description:
        "A production-grade full-stack platform built with Node.js, Express, MongoDB & EJS. Features end-to-end listing creation, search, auth, and secure session handling. Optimized MongoDB indexing improved query performance by 38%, with average API response latency under 45ms.",
      tech: ["Node.js", "Express", "MongoDB", "EJS"],
      github: "https://github.com/St2-18/Major-Project",
      demo: "#",
      featured: true,
      colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    },
    {
      icon: Droplets,
      title: "Aquasense",
      subtitle: "Full‑stack agricultural water management platform",
      description:
        "Agricultural water management platform using React/Vite + Node.js with Feature-Based DDD architecture. Integrates TensorFlow.js for real-time object detection and Algolia Search.",
      tech: ["React", "Node.js", "TensorFlow.js", "Docker"],
      github: "https://github.com/St2-18/AquaSense.git",
      demo: "#",
      featured: true,
      colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    },
    {
      icon: Gamepad2,
      title: "Deal or No Deal",
      subtitle: "JavaFX MVC Game",
      description:
        "Zero-dependency Java 21/JavaFX application with strict MVC architecture and reactive bindings. Features an EV-based Banker algorithm. A fully automated CI/CD pipeline using GitHub Actions matrix workflows to release native executables(.msi, .dmg, .deb, and portable .zip)",
      tech: ["Java 21", "JavaFX", "Actions"],
      github: "https://github.com/St2-18/Deal-or-No-Deal-Game.git",
      demo: "#",
      featured: true,
      colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    },
  ];

  return (
    <section id="projects" className="py-20 lg:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24" data-aos="fade-down">
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Featured Projects
              </h2>
              <span className="absolute -left-20 top-2 text-muted-foreground/20 font-mono text-xl select-none pointer-events-none tracking-[0.5em]">← →</span>
            </div>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <a
              href="https://github.com/St2-18"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="clay-btn px-8 py-4 flex items-center gap-2">
                <Github className="w-5 h-5" /> View All on GitHub
              </button>
            </a>
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
