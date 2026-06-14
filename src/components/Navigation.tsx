import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const SortingAnimation = () => {
  return (
    <div className="flex items-end gap-[2px] h-4 ml-3 opacity-80" title="O(n log n)">
      {[4, 2, 5, 3, 1].map((h, i) => (
        <div 
          key={i} 
          className="w-[3px] bg-primary rounded-t-sm"
          style={{ 
            height: `${h * 3}px`,
            animation: `sort-pulse 1.5s infinite alternate ${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems
        .map((item) => {
          const section = document.getElementById(item.id);
          if (section) {
            return {
              id: item.id,
              offset: section.offsetTop - 150,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean) as { id: string; offset: number; height: number }[];

      const currentPosition = window.scrollY;
      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const top = section.offsetTop - 80;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isOpen
          ? "bg-background"
          : scrolled
          ? "py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className={`mx-auto transition-all duration-500 ${scrolled ? 'w-[95%] md:w-[80%] clay-card rounded-full mt-2' : 'w-full px-6'} backdrop-blur-xl`}>
        <div className={`flex items-center justify-between ${scrolled ? 'h-14 px-6' : 'h-16'}`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="text-xl font-bold gradient-text"
            >
              Carpe diem
            </a>
            <SortingAnimation />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className="group relative px-1 py-2 text-sm font-medium"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      activeSection === item.id
                        ? "gradient-text font-semibold"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform origin-left transition-transform duration-300 ${
                      activeSection === item.id
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 text-muted-foreground hover:text-foreground transition-transform duration-300 ease-in-out transform ${
                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-background transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 border-b border-border/50" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`block py-3 text-lg font-medium transition-all duration-300 ease ${
                activeSection === item.id
                  ? "gradient-text font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(50px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
