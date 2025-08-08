
import { useEffect, useRef, useState } from 'react';

// Simulated sponsors data
const sponsors = [
  { id: 'jhvcs', name: 'Mr Burger Logo', logo: 'https://i.ibb.co/rfHzZ30H/mrBurger.png' },
  { id: 'ssdvsv651', name: 'Electrolit Logo', logo: 'https://i.ibb.co/WvrwJBk6/electrolit.png' },
  { id: '65d1fbd', name: 'Hot Chicken Logo', logo: 'https://i.ibb.co/p651WkXt/hot-Chicken.png' },
  { id: 'spgvjvj', name: 'Ferre Mas Menos Logo', logo: 'https://i.ibb.co/Gf0MFFKv/ferre-Mas-Menos.png' },
  { id: 'skhbsdwvbs', name: 'DaiDerck Logo', logo: 'https://i.ibb.co/vCVbMdcr/daiderck.png' },
  { id: '654dbd', name: 'Mia Mezcal Logo', logo: 'https://i.ibb.co/PvCVCDrR/mia-Mezcal.png' },
  { id: 'sjhavcjah', name: 'Milos Logo', logo: 'https://i.ibb.co/Lhv13GWy/milos.png' },
  { id: 'sj165165h', name: 'Buttons Logo', logo: 'https://i.ibb.co/qY4R6Nfz/buttons.png' },
  { id: 'sj165JVh', name: 'Asaditos Criollos Logo', logo: 'https://i.ibb.co/bgW1N0Xc/asaditos-Criollos.png' },
  { id: 'sj16VUGJ5h', name: 'Force Logo', logo: 'https://i.ibb.co/qYyN44M0/force.png' },
  { id: 'ksbksbgjv', name: 'La Placita Logo', logo: 'https://i.ibb.co/SXLJrkmt/la-Placita.png' },
  { id: 'ksbk1165v', name: 'Cetsa Logo', logo: 'https://i.ibb.co/zTLRcJBf/cetsa.png' }
];

// Generate a unique key for each sponsor
const sponsorItems = sponsors.map((sponsor, index) => ({
  ...sponsor,
  uniqueKey: `sponsor-item-${sponsor.id}-${index}`
}));

// Duplicate the sponsors for infinite scroll effect, ensuring each has a unique key
const allSponsors = [
  ...sponsorItems.map(sponsor => ({ ...sponsor, uniqueKey: `${sponsor.uniqueKey}-first` })),
  ...sponsorItems.map(sponsor => ({ ...sponsor, uniqueKey: `${sponsor.uniqueKey}-second` })),
];

const SponsorsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

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

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className={`bg-gray-900 py-8 overflow-hidden ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <h3 className="text-center text-white text-xl font-semibold mb-8">Nuestros Patrocinadores</h3>
        
        <div className="relative">
          <div className="flex overflow-hidden">
            {/* First set of sponsors */}
            <div className="flex animate-marquee">
              {allSponsors.map(sponsor => (
                <div 
                  key={sponsor.uniqueKey}
                  className="flex-shrink-0 mx-4 rounded-md p-4 w-32 h-20 flex items-center justify-center"
                >
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="max-w-full max-h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsBanner;
