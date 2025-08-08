
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavigationMenuDemoProps {
  scrolled?: boolean;
}

export function NavigationMenuDemo({ scrolled = false }: NavigationMenuDemoProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const textColor = scrolled ? "text-gray-900" : "text-white";
  const hoverColor = scrolled ? "hover:text-xilo-purple" : "hover:text-xilo-yellow";

  return (
    <NavigationMenu
      className={`hidden md:flex transition-colors ${open ? "z-50" : ""}`}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              `${textColor} ${hoverColor} bg-transparent hover:bg-transparent focus:bg-transparent`
            )}
            onClick={() => handleNavigation("/")}
          >
            Inicio
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              `${textColor} ${hoverColor} bg-transparent hover:bg-transparent focus:bg-transparent`
            )}
            onClick={() => handleNavigation("/club")}
          >
            El Club
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              `${textColor} ${hoverColor} bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent`
            )}
          >
            Primer Equipo
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px] bg-white rounded-md border shadow-lg">
              <div className="grid w-full gap-2 p-4 md:grid-cols-2">
                <NavigationMenuLink
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={() => handleNavigation("/primer-equipo/fotos")}
                >
                  <div className="text-sm font-medium leading-none">Fotos</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Galería de imágenes del primer equipo
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={() => handleNavigation("/primer-equipo/resultados")}
                >
                  <div className="text-sm font-medium leading-none">Resultados</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Últimos resultados y próximos partidos
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={() => handleNavigation("/primer-equipo/clasificacion")}
                >
                  <div className="text-sm font-medium leading-none">Clasificación</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Tabla de posiciones actualizada
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={() => handleNavigation("/primer-equipo/equipo")}
                >
                  <div className="text-sm font-medium leading-none">Equipo</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Plantilla completa del primer equipo
                  </p>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              `${textColor} ${hoverColor} bg-transparent hover:bg-transparent focus:bg-transparent`
            )}
            onClick={() => handleNavigation("/#teams-section")}
          >
            Otros Equipos
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              `${textColor} ${hoverColor} bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent`
            )}
          >
            Novedades
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-4 md:w-[400px] bg-white rounded-md border shadow-lg">
              <div className="grid w-full gap-2 p-4">
                <NavigationMenuLink
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={() => handleNavigation("/novedades/reportajes")}
                >
                  <div className="text-sm font-medium leading-none">Reportajes</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Videos y reportajes semanales
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={() => handleNavigation("/novedades/notas")}
                >
                  <div className="text-sm font-medium leading-none">Notas</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Últimas noticias y novedades del club
                  </p>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              `${textColor} ${hoverColor} bg-transparent hover:bg-transparent focus:bg-transparent`
            )}
            onClick={() => handleNavigation("/#staff-section")}
          >
            Staff
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              `${textColor} ${hoverColor} bg-transparent hover:bg-transparent focus:bg-transparent`
            )}
            onClick={() => handleNavigation("/#achievements-section")}
          >
            Logros
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              `${textColor} ${hoverColor} bg-transparent hover:bg-transparent focus:bg-transparent`
            )}
            onClick={() => handleNavigation("/#contact-section")}
          >
            Contacto
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
