import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import NextMatchCountdown from "@/components/NextMatchCountdown";
import SeoHead from "@/components/SeoHead";
import SponsorsBanner from "@/components/SponsorsBanner";
import TeamsSection from "@/components/TeamsSection";
import { useScrollAnimation } from "@/utils/scrollAnimation";
import { useEffect } from "react";

export default function Home(){
  useScrollAnimation();
  // const location = useLocation();

  // useEffect(() => {
  //   // Scroll to top on initial load
  //   window.scrollTo(0, 0);
    
  //   // Check if there's a hash in the URL to scroll to specific section
  //   if (location.hash) {
  //     // Remove the # symbol
  //     const sectionId = location.hash.substring(1);
      
  //     // Give a small timeout to ensure DOM is ready
  //     setTimeout(() => {
  //       const element = document.getElementById(sectionId);
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     }, 100);
  //   }
  // }, [location]);

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden flex flex-col">
      <SeoHead />
      <Navbar />
      
      <HeroSection 
        title="Xilotepelt FC" 
        subtitle="El orgullo de Jinotepe, Nicaragua. Formando campeones desde 1969." 
        backgroundImage="https://i.ibb.co/zV6wV0Dp/hero.webp"
      />
      
      <SponsorsBanner />
      
      <NextMatchCountdown />
      
      <div id="teams-section">
        <TeamsSection />
      </div>
      
      <div id="achievements-section">
        <AchievementsSection />
      </div>
      
      <div id="gallery-section">
        <GallerySection />
      </div>
      
      <div id="contact-section">
        <ContactSection />
      </div>
      
      <Footer />
    </div>
  );
};