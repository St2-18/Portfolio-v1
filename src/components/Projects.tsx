import { ExternalLink, Github, Droplets, Gamepad2, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      icon: Droplets,
      title: "Aquasense",
      subtitle: "Water Footprint Scanner & Calculator",
      description:
        "An interactive web app with AI-powered scanner (COCO SSD + TensorFlow) and MongoDB integration to calculate the water footprint of products. Features include calculator, multilingual support, games, and live chatbot.",
      tech: ["React", "Node.js", "MongoDB", "TensorFlow", "TailwindCSS"],
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      icon: Gamepad2,
      title: "Deal or No Deal",
      subtitle: "JavaFX Game Implementation",
      description:
        "A single-player JavaFX implementation of the classic TV show game with banker logic and MySQL storage for final results. Features authentic game mechanics and professional UI design.",
      tech: ["Java", "JavaFX", "MySQL"],
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      icon: Brain,
      title: "Simon Says",
      subtitle: "Interactive Memory Game",
      description:
        "A fun browser-based game with color sequences and interactive sound effects. Built with vanilla web technologies focusing on smooth animations and user experience.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "#",
      demo: "#",
      featured: false,
    },
  ];

  const miniProjects = [
    "Tic Tac Toe with GUI (Java)",
    "Alarm App",
    "Personal Finance Tracker (JavaScript)",
    "Weather App with API Integration",
  ];

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <Card
                  key={index}
                  className="glass project-card group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-8">
                    {/* Project Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-gradient-primary glow-primary">
                        <project.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-sm text-primary">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary/10"
                        asChild
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-primary hover:opacity-90"
                        asChild
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <Card key={index} className="glass hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <project.icon className="w-6 h-6 text-primary" />
                      <h4 className="text-lg font-semibold">{project.title}</h4>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Mini Projects */}
          <div className="text-center fade-in-up">
            <h3 className="text-2xl font-bold mb-8">Other Mini Projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {miniProjects.map((project, index) => (
                <Card key={index} className="glass hover-lift">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {project}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View All Projects
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
