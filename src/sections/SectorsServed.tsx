import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { UtensilsCrossed, Sparkles, Hammer, Store } from 'lucide-react';

const sectorIcons = [UtensilsCrossed, Sparkles, Hammer, Store];

export default function SectorsServed() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

    return () => observer.disconnect();
  }, []);

  const sectors = [
    {
      title: t('sectors.restaurant.title'),
      description: t('sectors.restaurant.description'),
      icon: sectorIcons[0],
    },
    {
      title: t('sectors.salon.title'),
      description: t('sectors.salon.description'),
      icon: sectorIcons[1],
    },
    {
      title: t('sectors.artisan.title'),
      description: t('sectors.artisan.description'),
      icon: sectorIcons[2],
    },
    {
      title: t('sectors.commerce.title'),
      description: t('sectors.commerce.description'),
      icon: sectorIcons[3],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-navy-muted"
    >
      {/* Gold divider line at top */}
      <div className="section-padding mb-16">
        <div
          className={`w-full h-px bg-gold/30 transition-all duration-700 ease-elegant ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <div className="section-padding">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className={`font-serif text-2xl sm:text-3xl lg:text-4xl text-navy mb-4 transition-all duration-700 ease-elegant ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t('sectors.title')}
          </h2>
          <p
            className={`text-base text-charcoal/60 transition-all duration-700 ease-elegant delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t('sectors.subtitle')}
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon;
            const isHovered = hoveredSector === index;

            return (
              <div
                key={index}
                className={`group transition-all duration-500 ease-elegant ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                onMouseEnter={() => setHoveredSector(index)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                <div 
                  className={`relative bg-white/70 backdrop-blur-sm rounded-lg p-8 h-full border transition-all duration-400 ease-elegant ${
                    isHovered 
                      ? 'border-gold/30 shadow-card-hover bg-white/90' 
                      : 'border-charcoal/5 shadow-elegant'
                  }`}
                  style={{
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  {/* Icon */}
                  <div 
                    className={`mb-6 transition-all duration-300 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <div 
                      className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isHovered 
                          ? 'bg-gold/15' 
                          : 'bg-navy/5'
                      }`}
                    >
                      <IconComponent 
                        size={26} 
                        strokeWidth={1.5}
                        className={`transition-colors duration-300 ${
                          isHovered ? 'text-gold' : 'text-navy/60'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-navy mb-3">
                    {sector.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {sector.description}
                  </p>

                  {/* Subtle corner accent on hover */}
                  <div 
                    className={`absolute top-0 right-0 w-12 h-12 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold/40" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
