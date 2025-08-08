
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeams } from '@/contexts/TeamsContext';

const TeamsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { categories } = useTeams();

  useEffect(() => {
    // Performance optimization: use IntersectionObserver for on-demand rendering
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleCategoryClick = (slug: string) => {
    // Navigate to dedicated team page
    navigate(`/equipos/${slug}`);
  };

  return (
    <section 
      className="section-padding bg-gradient-to-br from-xilo-purple via-xilo-blue to-transparent" 
      ref={sectionRef} 
      id="teams-section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white mb-4">Nuestros Equipos</h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Xilotepelt FC cuenta con equipos en diferentes categorías tanto masculinos como 
            femeninos, promoviendo la inclusión y el desarrollo del talento en todas las edades.
          </p>
        </div>

        {/* Render categories only when visible for performance */}
        {isVisible ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="group cursor-pointer relative overflow-hidden rounded-lg shadow-xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  backgroundImage: category.backgroundImage ? `url(${category.backgroundImage})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80 transition-opacity group-hover:opacity-90`}></div>
                <div className="relative p-6 h-64 flex flex-col justify-between z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-xilo-yellow transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-white/90 mb-4 group-hover:text-white transition-colors">
                      {category.description}
                    </p>
                  </div>
                  <Button 
                    variant="secondary"
                    className="w-full bg-xilo-yellow text-xilo-dark hover:bg-white hover:text-xilo-purple transition-all group-hover:scale-105"
                  >
                    <span>Ver equipo</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Lightweight placeholder while not visible
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white/10 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamsSection;
