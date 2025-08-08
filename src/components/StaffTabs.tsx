
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from 'lucide-react';
import { useState } from 'react';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  image?: string;
  description: string;
}

// Staff data organized by department
const directivos: StaffMember[] = [
  {
    id: "A1B2C3D4E5F6G7H8",
    name: "Ewner Zuniga",
    image: "https://i.ibb.co/zTxpZPgT/ewner.webp",
    position: "Presidente de la junta Directiva",
    description: "Su función principal es dirigir la gestión del club, tomar decisiones estratégicas y representar a la institución ante terceros, siendo elegido por la Asamblea General de socios."
  },
  {
    id: "A1B2C3D4kjabckbaG7H8",
    name: "Lic. Mariano Madrigal",
    image: "https://i.ibb.co/qLNTw4j3/alacalde.jpg",
    position: "Presidente Honorario",
    description: "Miembro Honorario"
  },
  {
    id: "A1B2khgkE5F6G7H8",
    name: "Eduardo Correa",
    position: "Gerente General del Equipo Xilo",
    description: ""
  },
];

const cuerpoTecnico: StaffMember[] = [
  {
    id: "K9L8M7N6O5P4Q3R2",
    name: "Luis Diaz",
    position: "Director Tecnico",
    description: "Su enfoque estratégico y su profundo conocimiento del juego le permiten diseñar tácticas efectivas y desarrollar planes de entrenamiento que maximizan el rendimiento de los jugadores."
  },
  {
    id: "C1D2E3F4G5H6I7J8",
    name: "Natanael Mungia",
    position: "Asistente Tecnico",
    description: "Su labor incluye el análisis del rendimiento de los jugadores, la preparación de sesiones de práctica y la coordinación de actividades en el campo."
  },
  {
    id: "M1N2O3P4Q5R6S7T8",
    image: "https://i.ibb.co/Q7Yv3HqC/sergio-Lopez.jpg",
    name: "Sergio López",
    position: "Preparador Fisico",
    description: "Se dedica a diseñar y supervisar programas de entrenamiento personalizados que mejoran la fuerza, resistencia y agilidad de los atletas."
  },
  {
    id: "U9V8W7X6Y5Z4A3B2",
    name: "Douglas Estrada",
    position: "Entrenador Porteros",
    description: "Con un enfoque en la técnica, la agilidad y la toma de decisiones, se dedica a preparar a los porteros para enfrentar los desafíos del juego."
  }
];

const equipo_medico: StaffMember[] = [
  {
    id: "G1H2I3J4K5L6M7N8",
    name: "Gustavo Avellan",
    position: "Doctor",
    description: "Dedicado a proporcionar atención integral y mejorar la calidad de vida de sus pacientes."
  },
  {
    id: "Q1R2S3T4U5V6W7X8",
    name: "Cesia Solano",
    position: "Asistente Médico",
    description: "Encargada de proporcionar atención médica inmediata y coordinar la recuperación de lesiones de los jugadores."
  },
  {
    id: "Y9Z8A7B6C5D4E3F2",
    name: "Rene Estrada",
    position: "Atención Hospitalaria",
    description: "Comprometido con la atención y el bienestar de los pacientes en entornos de salud."
  },
  {
    id: "I9J8K7L6M5N4O3P2",
    name: "Mylvian López",
    position: "Director de Inteligencia emocional",
    description: "Experiencia de más de 15 años dirigiendo equipos profesionales. Ex-jugador nacional."
  },
];

const logistica: StaffMember[] = [
  {
    id: "O9P8Q7R6S5T4U3V2",
    name: "Armando Hernandez",
    position: "Utileros y Logistica",
    description: "Encargándose de la preparación y mantenimiento del material necesario para los atletas y el equipo."
  },
  {
    id: "W1X2Y3Z4A5B6C7D8",
    name: "Leonel",
    position: "Utileros y Logistica",
    description: "Encargándose de la preparación y mantenimiento del material necesario para los atletas y el equipo."
  }
];

const comunicacion: StaffMember[] = [
  {
    id: "U9V8W7X6Y5Z4FCHB2",
    name: "Eli Vargas",
    position: "Comunicador",
    description: "Gestiona las comunicaciones oficiales del club y mantiene al día la información para los aficionados.",
    image:"https://i.ibb.co/BKryvNnh/eli.jpg"
  },
  {
    id: "U9V8W7GV5Z4FCHB2",
    name: "Pedro Moraga",
    position: "Fotografo",
    image: "https://i.ibb.co/BVKbhPCT/pedro-Moraga.jpg",
    description: "Captura los momentos más importantes del equipo tanto en entrenamientos como en partidos oficiales."
  },
  {
    id: "U9V8W7GV5Z4FHVJHHB2",
    name: "José Narvaez",
    position: "Periodista",
    description: "Encargado de la cobertura periodística de todos los eventos relacionados con el club.",
    image:"https://i.ibb.co/VFtbdJK/jorge-Narvaez.jpg"
  },
  {
    id: "U9V8W7GV5Z4FHVJHHGUVJ",
    name: "Pedro Cruz",
    position: "Narrador",
    description:"",
    image:"https://i.ibb.co/wtFs0qw/pedro-Cruz.jpg"
    
  },
  {
    id: "U9V8W7GV5Z461JHHGUVJ",
    name: "Reyna Potosme",
    position: "Fotografo",
    description:"",
    image: "https://i.ibb.co/zHVPGgx1/reyna-Potosme.jpg"
  },
  {
    id: "U9VGV7GV5Z4FHVJHHGUVJ",
    name: "Jorge Medrano",
    position: "Comentarista",
    description: "Aporta análisis táctico y técnico durante las transmisiones de los partidos del club.",
    image:"https://i.ibb.co/jvqXzGRh/jorge-Medrano.jpg"
  },
  {
    id: "U9VGV7GVjgjHGHVJHHGUVJ",
    name: "Roberto Murillo",
    position: "Fotografo",
    description: "Especialista en fotografía deportiva que documenta visualmente los momentos clave del equipo."
  }
];

const web_team: StaffMember[] = [
  {
    id: "U9VGV7khbkHGHVJHHGUVJ",
    name: "Joshua Chavez",
    position: "Web Master",
    description: "Desarrollador web responsable de mantener y mejorar la plataforma digital del club.",
    image: "https://i.ibb.co/5xhCMCh2/joshua.jpg",
  },
  {
    id: "U9VGV7khbkHGHVJHjhkJ",
    name: "Oscar Molina",
    position: "Web Master",
    description: "Encargado del diseño UX/UI y mantenimiento de la experiencia digital del club.",
    image: "https://i.ibb.co/x8dLhVNK/yo.webp",
  }
];

const StaffCard = ({ member }: { member: StaffMember }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
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
          <p className={`text-gray-600 text-center ${isHovered ? "" : "line-clamp-3"} transition-all duration-300`}>
            {member.description || "Miembro del equipo de trabajo del club."}
          </p>
          <div className="text-center mt-4">
            <button 
              className="text-xilo-purple hover:text-xilo-blue transition-colors text-sm font-medium"
            >
              Ver más información
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal for staff details */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <p className="text-xilo-purple font-medium mb-4">{member.position}</p>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-xilo-purple/10 to-xilo-blue/10 flex items-center justify-center mx-auto mb-6">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User className="w-12 h-12 text-xilo-purple" />
              )}
            </div>
            <p className="text-gray-600 mb-6">{member.description || "Miembro del equipo de trabajo del club."}</p>
            <div className="text-center">
              <button 
                className="px-4 py-2 bg-gradient-to-r from-xilo-purple to-xilo-blue text-white rounded-md hover:from-xilo-blue hover:to-xilo-purple transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const StaffTabs = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 py-16" id="staff-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-xilo-purple to-xilo-blue inline-block text-transparent bg-clip-text">Nuestro Equipo</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Contamos con profesionales altamente cualificados que trabajan juntos para 
            desarrollar el máximo potencial de nuestros jugadores.
          </p>
        </div>

        <Tabs defaultValue="directiva" className="w-full">
          <div className="overflow-x-auto pb-4">
            <TabsList className="w-full justify-center gap-4 bg-transparent h-auto flex-wrap mb-8">
              <TabsTrigger 
                value="directiva"
                className="data-[state=active]:bg-xilo-blue data-[state=active]:text-white px-8 py-2.5"
              >
                Junta Directiva
              </TabsTrigger>
              <TabsTrigger 
                value="tecnico"
                className="data-[state=active]:bg-xilo-blue data-[state=active]:text-white px-8 py-2.5"
              >
                Cuerpo Técnico
              </TabsTrigger>
              <TabsTrigger 
                value="medico"
                className="data-[state=active]:bg-xilo-blue data-[state=active]:text-white px-8 py-2.5"
              >
                Equipo Médico
              </TabsTrigger>
              <TabsTrigger 
                value="logistica"
                className="data-[state=active]:bg-xilo-blue data-[state=active]:text-white px-8 py-2.5"
              >
                Logística
              </TabsTrigger>
              <TabsTrigger 
                value="comunicacion"
                className="data-[state=active]:bg-xilo-blue data-[state=active]:text-white px-8 py-2.5"
              >
                Comunicación
              </TabsTrigger>
              <TabsTrigger 
                value="web"
                className="data-[state=active]:bg-xilo-blue data-[state=active]:text-white px-8 py-2.5"
              >
                Web
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="directiva" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {directivos.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tecnico" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cuerpoTecnico.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medico" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipo_medico.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logistica" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logistica.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comunicacion" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comunicacion.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="web" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {web_team.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default StaffTabs;
