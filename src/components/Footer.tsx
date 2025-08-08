
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import  Link  from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Club Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/xilo-logo.webp"
                alt="Xilotepelt FC Logo"
                className="h-12 w-auto"
              />
              <span className="font-display font-bold text-xl">Xilotepelt FC</span>
            </div>
            <p className="text-gray-300 mb-4">
              Club de fútbol fundado en 1969, ubicado en Jinotepe, Nicaragua.
              Comprometidos con el desarrollo deportivo de nuestra comunidad.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1CKUTfoycx/?mibextid=qi2Omg" target="_blank" rel="noreferrer" className="hover:text-xilo-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@xilofc?_t=ZM-8vcXBQ8ZhTT&_r=1" >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/xilotepelt_fc?igsh=dDliOHIxZDVwYmkx" target="_blank" rel="noreferrer" className="hover:text-xilo-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@XilotepeltFC" >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.001 3.001 0 0 0-2.118-2.118C19.5 4 12 4 12 4s-7.5 0-9.38.068A3.001 3.001 0 0 0 .502 6.186 36.4 36.4 0 0 0 0 12c0 1.5.12 2.9.502 5.814a3.001 3.001 0 0 0 2.118 2.118C4.5 20 12 20 12 20s7.5 0 9.38-.068a3.001 3.001 0 0 0 2.118-2.118C23.88 14.9 24 13.5 24 12c0-1.5-.12-2.9-.502-5.814zM9.545 15.637V8.363l6.454 3.637-6.454 3.637z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-xilo-yellow transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/club" className="text-gray-300 hover:text-xilo-yellow transition-colors">Sobre Nosotros</Link>
              </li>
              <li>
                <Link href="/equipos" className="text-gray-300 hover:text-xilo-yellow transition-colors">Equipos</Link>
              </li>
              <li>
                <Link href="/staff" className="text-gray-300 hover:text-xilo-yellow transition-colors">Staff</Link>
              </li>
              <li>
                <Link href="/logros" className="text-gray-300 hover:text-xilo-yellow transition-colors">Logros</Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-xilo-yellow transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/equipos/masculino" className="text-gray-300 hover:text-xilo-yellow transition-colors">Masculino</Link>
              </li>
              <li>
                <Link href="/equipos/femenino" className="text-gray-300 hover:text-xilo-yellow transition-colors">Femenino</Link>
              </li>
              <li>
                <Link href="/equipos/sub-13" className="text-gray-300 hover:text-xilo-yellow transition-colors">Sub-13</Link>
              </li>
              <li>
                <Link href="/equipos/sub-15" className="text-gray-300 hover:text-xilo-yellow transition-colors">Sub-15</Link>
              </li>
              <li>
                <Link href="/equipos/sub-17" className="text-gray-300 hover:text-xilo-yellow transition-colors">Sub-17</Link>
              </li>
              <li>
                <Link href="/equipos/mayores" className="text-gray-300 hover:text-xilo-yellow transition-colors">Mayores</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-xilo-yellow mt-1 flex-shrink-0" />
                <span className="text-gray-300">Estadio Municipal, Jinotepe, Nicaragua</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-xilo-yellow flex-shrink-0" />
                <span className="text-gray-300">+505 7705 0234</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-xilo-yellow flex-shrink-0" />
                <span className="text-gray-300">xilotepletfc@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-between md:flex-row border-t border-gray-800 py-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Xilotepelt FC. Todos los derechos reservados.</p>
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Creado y desarrollado por{" "}
            <a
              href="https://nicapages.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-gray-200"
            >
              NicaPages
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
