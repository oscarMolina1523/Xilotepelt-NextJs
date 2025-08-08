import { ChevronDown, Menu, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (path: string) => {
    // If we're on the homepage and trying to navigate to a section
    if (location.pathname === '/' && path.includes('#')) {
      const sectionId = path.split('#')[1];
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsOpen(false);
        return;
      }
    }

    // If we're not on homepage but trying to navigate to a section
    if (path.includes('#')) {
      const sectionId = path.split('#')[1];
      navigate('/');
      // We need to give the page time to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Regular navigation to another page
      if (path !== location.pathname) {
        window.scrollTo(0, 0); // Scroll to top when navigating to new page
        navigate(path);
      }
    }

    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-md backdrop-blur-md py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="/xilo-logo.webp"
              alt="Xilotepelt FC Logo"
              className="h-12 w-auto"
            />
            <span className={`font-display font-bold text-xl ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Xilotepelt FC
            </span>
            <img
              src="https://i.ibb.co/0jPhN0Jf/alcaldia.png"
              alt="Alcaldia Logo"
              className="h-12 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <div className="relative group">
              <div className={`nav-link flex items-center gap-1 ${scrolled ? 'text-gray-800' : 'text-white hover:text-xilo-yellow'} cursor-pointer`}>
                Primer Equipo
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>
              <div className="absolute left-0 hidden group-hover:block bg-white rounded-lg shadow-lg py-2 w-48 z-50">
                <div
                  onClick={() => handleNavigation('/primer-equipo/fotos')}
                  className="px-4 py-2 hover:bg-xilo-blue/10 text-gray-700 hover:text-xilo-blue cursor-pointer"
                >
                  Fotos
                </div>
                <div
                  onClick={() => handleNavigation('/primer-equipo/resultados')}
                  className="px-4 py-2 hover:bg-xilo-blue/10 text-gray-700 hover:text-xilo-blue cursor-pointer"
                >
                  Resultados
                </div>
                <div
                  onClick={() => handleNavigation('/primer-equipo/clasificacion')}
                  className="px-4 py-2 hover:bg-xilo-blue/10 text-gray-700 hover:text-xilo-blue cursor-pointer"
                >
                  Clasificación
                </div>
                <div
                  onClick={() => handleNavigation('/primer-equipo/equipo')}
                  className="px-4 py-2 hover:bg-xilo-blue/10 text-gray-700 hover:text-xilo-blue cursor-pointer"
                >
                  Equipo
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className={`nav-link flex items-center gap-1 ${scrolled ? 'text-gray-800' : 'text-white hover:text-xilo-yellow'} cursor-pointer`}>
                Novedades
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>
              <div className="absolute left-0 hidden group-hover:block bg-white rounded-lg shadow-lg py-2 w-48 z-50">
                <div
                  onClick={() => handleNavigation('/novedades/reportajes')}
                  className="px-4 py-2 hover:bg-xilo-blue/10 text-gray-700 hover:text-xilo-blue cursor-pointer"
                >
                  Reportajes
                </div>
                <div
                  onClick={() => handleNavigation('/novedades/notas')}
                  className="px-4 py-2 hover:bg-xilo-blue/10 text-gray-700 hover:text-xilo-blue cursor-pointer"
                >
                  Notas
                </div>
              </div>
            </div>

            <div
              onClick={() => handleNavigation('/club')}
              className={`nav-link ${scrolled ? 'text-gray-800' : 'text-white hover:text-xilo-yellow'} cursor-pointer`}
            >
              El Club
            </div>
            <div
              onClick={() => handleNavigation('/#teams-section')}
              className={`nav-link ${scrolled ? 'text-gray-800' : 'text-white hover:text-xilo-yellow'} cursor-pointer`}
            >
              Otros Equipos
            </div>
            <div
              onClick={() => handleNavigation('/staff')}
              className={`nav-link ${scrolled ? 'text-gray-800' : 'text-white hover:text-xilo-yellow'} cursor-pointer`}
            >
              Staff
            </div>
            <div
              onClick={() => handleNavigation('/#achievements-section')}
              className={`nav-link ${scrolled ? 'text-gray-800' : 'text-white hover:text-xilo-yellow'} cursor-pointer`}
            >
              Logros
            </div>
            <div
              onClick={() => handleNavigation('/#contact-section')}
              className={`nav-link ${scrolled ? 'text-gray-800' : 'text-white hover:text-xilo-yellow'} cursor-pointer bg-xilo-blue/20 px-3 py-1 rounded-md`}
            >
              Contacto
            </div>

            {/* Botón de perfil */}
            <div
              onClick={() => handleNavigation('/login')}
              className={`nav-link ${scrolled ? 'text-gray-800' : 'text-white hover:text-xilo-yellow'} cursor-pointer ml-2`}
            >
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${scrolled ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-white/20'}`}
                aria-label="Perfil"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 bg-white rounded-lg mt-2 shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-1">
              <div
                onClick={() => handleNavigation('/')}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Inicio
              </div>

              <details className="group">
                <summary className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100">
                  <span className="text-xilo-blue font-medium">Primer Equipo</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-8 bg-gray-50">
                  <div
                    onClick={() => handleNavigation('/primer-equipo/fotos')}
                    className="px-4 py-2 hover:bg-xilo-blue/10 cursor-pointer"
                  >
                    Fotos
                  </div>
                  <div
                    onClick={() => handleNavigation('/primer-equipo/resultados')}
                    className="px-4 py-2 hover:bg-xilo-blue/10 cursor-pointer"
                  >
                    Resultados
                  </div>
                  <div
                    onClick={() => handleNavigation('/primer-equipo/clasificacion')}
                    className="px-4 py-2 hover:bg-xilo-blue/10 cursor-pointer"
                  >
                    Clasificación
                  </div>
                  <div
                    onClick={() => handleNavigation('/primer-equipo/equipo')}
                    className="px-4 py-2 hover:bg-xilo-blue/10 cursor-pointer"
                  >
                    Equipo
                  </div>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100">
                  <span className="text-xilo-blue font-medium">Novedades</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-8 bg-gray-50">
                  <div
                    onClick={() => handleNavigation('/novedades/reportajes')}
                    className="px-4 py-2 hover:bg-xilo-blue/10 cursor-pointer"
                  >
                    Reportajes
                  </div>
                  <div
                    onClick={() => handleNavigation('/novedades/notas')}
                    className="px-4 py-2 hover:bg-xilo-blue/10 cursor-pointer"
                  >
                    Notas
                  </div>
                </div>
              </details>
              <div
                onClick={() => handleNavigation('/club')}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                El Club
              </div>
              <div
                onClick={() => handleNavigation('/#teams-section')}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Otros Equipos
              </div>
              <div
                onClick={() => handleNavigation('/staff')}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Staff
              </div>
              <div
                onClick={() => handleNavigation('/#achievements-section')}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logros
              </div>
              
              {/* Botón de contacto */}
              <Button
                className="bg-xilo-blue hover:bg-red-800 text-white shadow-lg mx-2 mt-2"
                onClick={() => handleNavigation('/#contact-section')}
              >
                Contáctanos
              </Button>
              
              {/* Botón de login en menú móvil */}
              <Button
                className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-lg mx-2 mt-2"
                onClick={() => handleNavigation('/login')}
              >
                <User className="h-4 w-4" />
                Iniciar Sesión
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
