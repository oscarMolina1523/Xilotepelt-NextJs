
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Definition of staff member type
interface StaffMember {
  id: string;
  name: string;
  position: string;
  image?: string;
  description: string;
}

// Featured staff members for the homepage
const featuredStaff: StaffMember[] = [
  {
    id: "A1B2C3D4E5F6G7H8",
    name: "Ewner Zuniga",
    image: "https://i.ibb.co/zTxpZPgT/ewner.webp",
    position: "Presidente de la junta Directiva",
    description: "Su función principal es dirigir la gestión del club , tomar decisiones estratégicas y representar a la institución ante terceros."
  },
  {
    id: "K9L8M7N6O5P4Q3R2",
    name: "Luis Diaz",
    position: "Director Tecnico",
    description: "Su enfoque estratégico y su profundo conocimiento del juego le permiten diseñar tácticas efectivas."
  },
  {
    id: "G1H2I3J4K5L6M7N8",
    name: "Gustavo Avellan",
    position: "Doctor",
    description: "Dedicado a proporcionar atención integral y mejorar la calidad de vida de sus pacientes."
  },
];

const StaffSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100" ref={sectionRef} id="staff-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-xilo-purple to-xilo-blue inline-block text-transparent bg-clip-text">
            Nuestro Equipo
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Contamos con profesionales altamente cualificados que trabajan juntos para desarrollar 
            el máximo potencial de nuestros jugadores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStaff.map((member, index) => (
            <div 
              key={member.id} 
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} 
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="h-2 bg-gradient-to-r from-xilo-purple to-xilo-blue"></div>
              <div className="p-6">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-xilo-purple/10 to-xilo-blue/10 flex items-center justify-center">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <User className="w-12 h-12 text-xilo-purple" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                <p className="text-xilo-purple font-medium text-center mb-4">{member.position}</p>
                <p className="text-gray-600 text-center line-clamp-3">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-xilo-blue hover:bg-xilo-purple text-white px-8 py-3">
            <Link to="/staff">Ver Todo el Staff</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
