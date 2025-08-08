import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from '@/hooks/use-mobile';
import { Clock, Star, Trophy, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
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

  const historyItems = [
    {
      title: "Fundación - 1969",
      description: "Fundado en la ciudad de Jinotepe, Nicaragua, Xilotepelt FC nació como un proyecto deportivo para la juventud local. El nombre \"Xilotepelt\" rinde homenaje a las raíces indígenas de la región.",
      color: "from-xilo-purple to-xilo-blue"
    },
    {
      title: "Desarrollo - 1980-2000",
      description: "A lo largo de más de cinco décadas, el club ha crecido significativamente, formando múltiples generaciones de futbolistas y expandiéndose para incluir categorías masculinas y femeninas en diferentes edades.",
      color: "from-xilo-blue to-blue-500"
    },
    {
      title: "Actualidad - Desde 2000",
      description: "Hoy, Xilotepelt FC es un símbolo de orgullo para Jinotepe y un referente del fútbol nicaragüense, con instalaciones modernas y un sistema de formación integral para sus deportistas.",
      color: "from-xilo-yellow to-amber-500"
    }
  ];

  const MobileHistoryView = () => (
    <Accordion type="single" collapsible className="w-full">
      {historyItems.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4 w-full">
              <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center`}>
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-md font-bold text-gray-800">{item.title}</h4>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700 pl-12">{item.description}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  const DesktopHistoryView = () => (
    <div className="space-y-6">
      {historyItems.map((item, index) => (
        <div className="flex" key={index}>
          <div className="mr-4 mt-1">
            <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center`}>
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="about-section" className="section-padding " ref={sectionRef}>
      <div className="container md:mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Sobre Xilotepelt FC</h2>
          <p className="text-white/75 max-w-3xl mx-auto">
            Desde 1969, Xilotepelt FC se ha dedicado al desarrollo del talento futbolístico en Jinotepe, Nicaragua,
            formando atletas con valores y habilidades excepcionales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`bg-white p-8 rounded-lg overflow-hidden shadow-lg relative border-t-4 border-xilo-purple transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-xilo-purple/10 rounded-full"></div>
            <div className="absolute -left-5 -bottom-5 w-24 h-24 bg-xilo-purple/5 rounded-full"></div>
            <div className="bg-gradient-to-br from-xilo-purple to-xilo-blue p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-xilo-purple">Nuestra Misión</h3>
            <p className="text-gray-700 relative z-10">
              Promover el deporte como herramienta de desarrollo social, formando futbolistas de alto rendimiento
              que representen los valores de disciplina, respeto y trabajo en equipo.
            </p>
          </div>

          <div
            className={`bg-white p-8 rounded-lg overflow-hidden shadow-lg relative border-t-4 border-xilo-yellow transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-xilo-yellow/10 rounded-full"></div>
            <div className="absolute -left-5 -bottom-5 w-24 h-24 bg-xilo-yellow/5 rounded-full"></div>
            <div className="bg-gradient-to-br from-xilo-yellow to-amber-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-amber-600">Nuestra Visión</h3>
            <p className="text-gray-700 relative z-10">
              Ser reconocidos como el club de fútbol líder en Nicaragua, referente en la formación de talentos
              deportivos y desarrollo integral de personas a través del deporte.
            </p>
          </div>

          <div
            className={`bg-white p-8 rounded-lg overflow-hidden shadow-lg relative border-t-4 border-xilo-blue transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-xilo-blue/10 rounded-full"></div>
            <div className="absolute -left-5 -bottom-5 w-24 h-24 bg-xilo-blue/5 rounded-full"></div>
            <div className="bg-gradient-to-br from-xilo-blue to-blue-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-xilo-blue">Nuestros Valores</h3>
            <ul className="text-gray-700 space-y-3 relative z-10">
              {["Respeto", "Disciplina", "Trabajo en equipo", "Pasión", "Perseverancia"].map((value, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-xilo-blue to-blue-500 rounded-full mr-2"></span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-16 bg-white rounded-lg shadow-lg overflow-hidden ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-xilo-purple to-xilo-blue py-4 px-8">
            <h3 className="text-center text-2xl font-bold text-white">Nuestra Historia</h3>
          </div>
          
          <div className="p-4 lg:p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-full md:w-1/2">
                {isMobile ? <MobileHistoryView /> : <DesktopHistoryView />}
                
                <div className="mt-8">
                  <Button className="bg-gradient-to-r from-xilo-purple to-xilo-blue text-white hover:from-xilo-blue hover:to-xilo-purple">
                    Conoce más sobre nuestra historia
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://i.ibb.co/20dgp01T/historico.webp"
                    alt="Foto histórica del Xilotepelt FC"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white p-4 text-sm">Fotografía histórica del equipo fundador de Xilotepelt FC, 1969</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
