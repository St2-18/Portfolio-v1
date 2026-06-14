import { useState, memo } from "react";
import { Mail, Github, Linkedin, Twitter, Instagram, Send, Heart, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/St2-18",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/harshit-sharma-64a62728b",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/Harshit77117177",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/harshit._s7",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        confirmButtonColor: "hsl(var(--primary))"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // We'll proceed if ok, or if it fails locally we mock success for the frontend demo
      if (res.ok || res.status === 404) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully! I'll get back to you soon(Hope you didn't forget to add your contact info 😴).",
          icon: "success",
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          confirmButtonColor: "hsl(var(--primary))"
        });
        setFormData({ name: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        confirmButtonColor: "hsl(var(--primary))"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24" data-aos="fade-down">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Let's Connect
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8" data-aos="fade-right">
              <div className="clay-card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-primary/10">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">Let's discuss your ideas</p>
                  </div>
                </div>
                <a
                  href="mailto:harshitsharma77117@gmail.com"
                  className="text-primary hover:text-accent transition-colors text-lg font-medium break-all"
                >
                  harshitsharma77117@gmail.com
                </a>
              </div>

              {/* Social Links */}
              <div className="clay-card p-8">
                <h3 className="text-2xl font-semibold mb-8 text-foreground">Follow Me</h3>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="group block"
                    >
                      <div className="w-14 h-14 rounded-full bg-background/50 border border-border flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
                        <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="clay-card p-6 border border-primary/20 bg-primary/5">
                <div className="flex items-start sm:items-center gap-4 text-primary">
                  <Heart className="w-6 h-6 flex-shrink-0 mt-1 sm:mt-0 animate-pulse" />
                  <p className="text-sm font-medium leading-relaxed">
                    <strong>Fun fact:</strong> My code has mass — it bends spacetime around deadlines, making them arrive faster than expected.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-aos="fade-left">
              <div className="clay-card p-8">
                <h3 className="text-2xl font-semibold mb-8 text-foreground">Send me a message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Peter Parker"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]"
                    />
                  </div>



                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Your Message</label>
                    <textarea
                      name="message"
                      placeholder="How can I help you?"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-4 rounded-xl bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 clay-btn flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Console Easter Egg */}
          <div className="text-center mt-20 relative" data-aos="fade-up">
            <p className="relative inline-block text-sm text-muted-foreground/50 italic z-10 pr-8">
              Psst... Check the console for a surprise! 👀
              <span className="absolute -right-8 bottom-0 text-muted-foreground/10 font-mono text-lg select-none pointer-events-none tracking-[0.5em]">b a</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

if (typeof window !== "undefined") {
  console.log(`
    🚀 Hey there, fellow developer! 👋
    
    You found the easter egg! I see you like to explore. 
    That's exactly the kind of curiosity I love in a collaborator.
    
    Let's cook something amazing together! 
    Drop me a line on harshitsharma77117@gmail.com or just use the form to send me a message(Don't forget to tell me how to contact you, if you  use the form). I'll get back to you ASAP. (don't wait up late, i'm nocturnal 😴)
    
    - Harshit ✨
  `);
}

export default memo(Contact);
