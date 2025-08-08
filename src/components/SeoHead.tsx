
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
}

const SeoHead = ({
  title = 'Xilotepelt FC - Club de Fútbol de Jinotepe, Nicaragua',
  description = 'Sitio oficial del Xilotepelt FC, club de fútbol ubicado en Jinotepe, Nicaragua. Descubre nuestros equipos, logros y valores.',
  keywords = 'Xilotepelt FC, fútbol, Nicaragua, Jinotepe, club deportivo, fútbol femenino, fútbol masculino, academias de fútbol',
  ogImage = '/lovable-uploads/747f00f0-bb43-4a25-b593-f57829d07591.png',
  ogUrl = 'https://xilotepeltfc.com',
  ogType = 'website'
}: SeoHeadProps) => {
  return (
    <Helmet>
      {/* Título y meta básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Configuración adicional para SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Xilotepelt FC" />
      
      {/* Configuración de la vista en dispositivos móviles */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Favicon */}
      <link rel="icon" href="/lovable-uploads/747f00f0-bb43-4a25-b593-f57829d07591.png" type="image/png" />
    </Helmet>
  );
};

export default SeoHead;
