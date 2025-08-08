import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { Award, Medal, Star, Trophy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Achievement {
  id: number;
  title: string;
  year: string;
  description: string;
  icon: 'trophy' | 'award' | 'star' | 'medal';
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Ascenso a Liga II Division",
    year: "15 - Mayo - 2022",
    description: "Campiones Nacionales de III Division",
    icon: 'trophy'
  },
  {
    id: 2,
    title: "Campeón Apertura",
    year: "2021",
    description: "Categoria de Menores U13",
    icon: 'medal'
  },
  {
    id: 3,
    title: "Campeón Clausura",
    year: "2023",
    description: "Categoria de Menores U13",
    icon: 'medal'
  },
  {
    id: 4,
    title: "Campeón Apertura 2024",
    year: "2024",
    description: "Categoria de Menores U13",
    icon: 'medal'
  },
];

const AchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  const ITEMS_PER_PAGE = isMobile ? 3 : 6;

  useEffect(() => {
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

  useEffect(() => {
    setCurrentPage(1);
  }, [isMobile]);

  const totalPages = Math.ceil(achievements.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = achievements.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderIcon = (iconType: Achievement['icon']) => {
    switch (iconType) {
      case 'trophy':
        return <Trophy className="w-8 h-8 text-white" />;
      case 'award':
        return <Award className="w-8 h-8 text-white" />;
      case 'star':
        return <Star className="w-8 h-8 text-white" />;
      case 'medal':
        return <Medal className="w-8 h-8 text-white" />;
      default:
        return <Trophy className="w-8 h-8 text-white" />;
    }
  };

  const getIconBgColor = (iconType: Achievement['icon']) => {
    switch (iconType) {
      case 'trophy':
        return 'from-xilo-yellow to-amber-500';
      case 'award':
        return 'from-xilo-blue to-blue-500';
      case 'star':
        return 'from-xilo-purple to-purple-600';
      case 'medal':
        return 'from-xilo-yellow to-orange-500';
      default:
        return 'from-xilo-yellow to-amber-500';
    }
  };

  return (
    <section className="section-padding bg-gray-50" ref={sectionRef} id="achievements-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 gradient-text">Nuestros Logros</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A lo largo de nuestra historia, Xilotepelt FC ha cosechado importantes éxitos tanto en categorías 
            masculinas como femeninas, en diferentes edades y competiciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((achievement, index) => (
            <div 
              key={achievement.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${getIconBgColor(achievement.icon)}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`bg-gradient-to-br ${getIconBgColor(achievement.icon)} rounded-full p-3 mr-4`}>
                    {renderIcon(achievement.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                    <p className="text-sm text-xilo-purple">{achievement.year}</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className={`p-8 bg-gradient-to-r from-xilo-purple/90 to-xilo-blue/90 rounded-xl shadow-lg ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <h3 className="text-white text-2xl font-bold mb-2">Nuestro legado continúa</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              En Xilotepelt FC seguimos trabajando día a día para alcanzar nuevas metas y formar 
              a los futuros campeones del fútbol nicaragüense.
            </p>
            <button className="btn-secondary">Únete a nuestro club</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
