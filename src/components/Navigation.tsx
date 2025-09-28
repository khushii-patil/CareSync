import { Button } from "./ui/button";
import { Leaf, Menu, UserRound, Stethoscope } from "lucide-react";
import { useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  onLogin?: (email: string, type: "doctor" | "patient") => void;
}

export function Navigation({ onLogin }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginType, setLoginType] = useState<"doctor" | "patient" | null>(null);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#workflow" },
    { label: "Demo", href: "#demo" },
    { label: "Resources", href: "#resources" }
  ];

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.href.substring(1),
        element: document.getElementById(item.href.substring(1))
      }));

      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = (type: "doctor" | "patient") => {
    setLoginType(type);
    setIsLoginOpen(true);
  };

  const handleLoginSuccess = (email: string, type: "doctor" | "patient") => {
    setIsLoginOpen(false);
    if (onLogin) {
      onLogin(email, type);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
<<<<<<< HEAD
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300">
=======
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300">
>>>>>>> 5263ed51f8a398de7028c57f8a41b707bb6f3bb1
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">CareSync</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative text-sm font-medium transition-all duration-300 hover:text-foreground ${
                    activeSection === item.href.substring(1)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  {/* Active/Hover underline with blue-green gradient */}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#55738D] to-[#70805D] transition-all duration-300 origin-left ${
                      activeSection === item.href.substring(1)
                        ? "scale-x-100"
                        : "scale-x-0 hover:scale-x-100"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                onClick={() => handleLoginClick("patient")}
                className="text-muted-foreground hover:text-foreground hover:bg-accent hover:scale-105 transition-all duration-300"
              >
                <UserRound className="w-4 h-4 mr-2" />
                Patient Login
              </Button>
              <Button 
                onClick={() => handleLoginClick("doctor")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Doctor Login
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? "max-h-96 opacity-100 border-t border-border py-4" 
              : "max-h-0 opacity-0 overflow-hidden"
          }`}>
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left p-2 rounded-lg transition-all duration-300 hover:bg-accent hover:text-foreground ${
                    activeSection === item.href.substring(1)
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  onClick={() => handleLoginClick("patient")}
                  className="text-muted-foreground hover:text-foreground justify-start hover:bg-accent transition-all duration-300"
                >
                  <UserRound className="w-4 h-4 mr-2" />
                  Patient Login
                </Button>
                <Button 
                  onClick={() => handleLoginClick("doctor")}
                  className="bg-primary hover:bg-primary/90 justify-start hover:shadow-lg transition-all duration-300"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctor Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        loginType={loginType}
        onLogin={handleLoginSuccess}
      />
    </>
  );
}