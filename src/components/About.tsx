import { MapPin, GraduationCap, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const facts = [
    {
      icon: GraduationCap,
      label: "Education",
      value: "B.Tech CSE (AI), Class of 2027",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Based in India",
    },
    {
      icon: Globe,
      label: "Languages",
      value: "English, Hindi, French (A2), Japanese (basic)",
    },
    {
      icon: Heart,
      label: "Interests",
      value: "Programming · Astronomy · Music · Sports",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Avatar */}
            <div className="text-center lg:text-left fade-in-up">
              <div className="relative inline-block mb-8">
                <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full bg-gradient-primary p-1 glow-primary">
                  <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-6xl font-bold gradient-text">
                    IC
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8 fade-in-up">
              <div className="prose prose-lg text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  I'm{" "}
                  <span className="text-primary font-semibold">Harshit</span>, a
                  Computer Science and Engineering student specializing in
                  Artificial Intelligence at MAIT and also a (Reliance
                  Foundation Scholar). I'm passionate about building intelligent
                  systems, designing interactive applications, and helping
                  people learn technology and science in simple ways.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you'll find me exploring the cosmos
                  through astronomy, creating educational content, or diving
                  into the latest tech trends. I believe in the power of
                  technology to solve real-world problems and make learning
                  accessible to everyone.
                </p>
              </div>

              {/* Quick Facts Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {facts.map((fact, index) => (
                  <Card key={index} className="glass hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <fact.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-primary mb-1">
                            {fact.label}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {fact.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
