import { Code, Database, Wrench, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: ["Java", "C++", "Python", "JavaScript", "TypeScript"],
      color: "text-primary",
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["MySQL", "MongoDB"],
      color: "text-accent",
    },
    {
      icon: Wrench,
      title: "Frameworks & Tools",
      skills: [
        "React",
        "Node.js",
        "TailwindCSS",
        "Git",
        "VS Code",
        "IntelliJ IDEA",
      ],
      color: "text-success",
    },
    {
      icon: Brain,
      title: "AI & Other",
      skills: [
        "TensorFlow",
        "Machine Learning",
        "Data Structures",
        "Algorithms",
        "Postman",
      ],
      color: "text-primary-glow",
    },
  ];

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="glass hover-lift skill-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-primary`}>
                      <category.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 text-sm bg-muted rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Currently Learning */}
          <div className="mt-16 text-center fade-in-up">
            <Card className="glass inline-block">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-3 text-primary">
                  Currently Exploring
                </h4>
                <div className="flex flex-wrap gap-3 justify-center">
                  {["Next.js", "GraphQL", "Docker", "Kubernetes", "AWS"].map(
                    (tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm bg-gradient-primary text-primary-foreground rounded-full animate-glow-pulse"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
