
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";

// Datos de ejemplo para la galería
const galleryImages = [
  {
    id: 1,
    url: "https://i.ibb.co/BKBK9WHp/campeones.webp",
    title: "Campeones 3ra División Nacional",
    description: ""
  },
  {
    id: 2,
    url: "https://i.ibb.co/mV78R6dd/campeonu13.webp",
    title: "1er Campeonato U13",
    description: ""
  },
  {
    id: 3,
    url: "https://i.ibb.co/fzCPTQrB/campeonu13second.webp",
    title: "Segundo Campeonato U13",
    description: "(Bicampeones)"
  },
  {
    id: 4,
    url: "https://i.ibb.co/RpJ71XTc/campeonu13third.webp",
    title: "Tercer Campeonato U13",
    description: "(Tricampeones)"
  },
  {
    id: 5,
    url: "https://i.postimg.cc/pL7BJ7h8/campo.jpg",
    title: "Casa del Xilo",
    description: "Estadio Municipal de Jinotepe"
  },
];

const GallerySection = () => {
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
    <section className="section-padding bg-gradient-to-br from-xilo-purple via-xilo-blue to-xilo-yellow/50" ref={sectionRef} id="gallery-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white mb-4"> Momentos inolvidables de nuestro club</h2>
          {/* <p className="text-white/80 max-w-3xl mx-auto">
            Momentos inolvidables de nuestro club
          </p> */}
        </div>
        
        <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl transform transition-transform hover:scale-[1.01] duration-300">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{image.title}</h3>
                      <p className="text-white/90 max-w-lg">{image.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 md:-left-16 text-xilo-yellow bg-white/20 hover:bg-white/30" />
            <CarouselNext className="absolute -right-12 md:-right-16 text-xilo-yellow bg-white/20 hover:bg-white/30" />
          </Carousel>
          
          {/* Gallery dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryImages.map((_, index) => (
              <span 
                key={index} 
                className="w-2 h-2 rounded-full bg-white/50"
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
