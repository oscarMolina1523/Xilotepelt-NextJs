import { ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
}: HeroSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollDown = () => {
    const nextSection = document.querySelector("#teams-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDiscoverMore = () => {
    // If we're already on the homepage, just scroll
    if (pathname === "/") {
      const aboutSection = document.querySelector("#teams-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to homepage and then scroll
      router.push("/");
      setTimeout(() => {
        const aboutSection = document.querySelector("#teams-section");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-16"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${backgroundImage}')`,
      }}
    >
      {/* Overlay with stronger gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-xilo-purple/85 via-xilo-blue/80 to-xilo-blue/70 opacity-85"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-white mb-6 animate-fade-in">{title}</h1>
        <p
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          {subtitle}
        </p>
        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <button
            onClick={handleDiscoverMore}
            className="btn-secondary hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all duration-300"
          >
            Descubre Más
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={handleScrollDown}
      >
        <ChevronDown className="h-8 w-8 text-white hover:text-xilo-yellow transition-colors" />
      </div>
    </section>
  );
};

export default HeroSection;
