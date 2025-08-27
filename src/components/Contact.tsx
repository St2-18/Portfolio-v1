import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
// import heroBg from "@/assets/hero-bg.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/St2-18",
      color: "hover:text-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/harshit-sharma-64a62728b",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/Harshit77117177?t=Seyrxtu2Cm5nQSZGMhIhUw&s=08",
      color: "hover:text-blue-300",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com",
      color: "hover:text-pink-400",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // clear form
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear
              from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 fade-in-up">
              <Card className="glass hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-primary glow-primary">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Email</h3>
                      <p className="text-muted-foreground">
                        Let's discuss your ideas
                      </p>
                    </div>
                  </div>
                  <a
                    href="mailto:harshitsharma77117@gmail.com"
                    className="text-primary hover:text-primary-glow transition-colors text-lg font-medium"
                  >
                    harshitsharma77117@gmail.com
                  </a>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Follow Me</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className={`justify-start h-auto p-4 ${social.color} hover:bg-primary/5`}
                        asChild
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <social.icon className="w-5 h-5" />
                          <span>{social.label}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fun Fact */}
              <Card className="glass border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-primary">
                    <Heart className="w-5 h-5" />
                    <p className="text-sm">
                      <strong>Fun fact:</strong> I reply to every genuine
                      message within 24 hours!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="fade-in-up">
              <Card className="glass">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">
                    Send me a message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-muted/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-muted/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <Textarea
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="bg-muted/50 border-border focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 glow-primary"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Console Easter Egg */}
          <div className="text-center mt-16 fade-in-up">
            <p className="text-sm text-muted-foreground">
              Psst... Check the console for a surprise! 👀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Console Easter Egg
if (typeof window !== "undefined") {
  console.log(`
    🚀 Hey there, fellow developer! 👋
    
    You found the easter egg! I see you like to explore. 
    That's exactly the kind of curiosity I love in a collaborator.
    
    Let's build something amazing together! 
    Drop me a line: contact@example.com
    
    - Harshit ✨
  `);
}

export default Contact;
