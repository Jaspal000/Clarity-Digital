import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LayoutGrid, MapPin, BarChart3, TrendingUp } from 'lucide-react';

const icons = [
  LayoutGrid,
  MapPin,
  BarChart3,
  TrendingUp,
];

export default function TrustPillars() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
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

  const pillars = [
    {
      title: t('pillars.title1'),
      description: t('pillars.desc1'),
      icon: icons[0],
    },
    {
      title: t('pillars.title2'),
      description: t('pillars.desc2'),
      icon: icons[1],
    },
    {
      title: t('pillars.title3'),
      description: t('pillars.desc3'),
      icon: icons[2],
    },
    {
      title: t('pillars.title4'),
      description: t('pillars.desc4'),
      icon: icons[3],
    },
  ];

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-ivory"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            const isHovered = hoveredPillar === index;

            return (
              <div
                key={index}
                className={`group transition-all duration-500 ease-elegant ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 100}ms` }}
                onMouseEnter={() => setHoveredPillar(index)}
                onMouseLeave={() => setHoveredPillar(null)}
              >
                {/* Icon */}
                <div 
                  className={`mb-6 transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isHovered 
                        ? 'bg-gold/15' 
                        : 'bg-navy/5'
                    }`}
                  >
                    <IconComponent
                      size={24}
                      strokeWidth={1.5}
                      className={`transition-colors duration-300 ${
                        isHovered ? 'text-gold' : 'text-navy/60'
                      }`}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl lg:text-2xl text-navy mb-4">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Subtle underline on hover */}
                <div 
                  className={`mt-4 h-px bg-gold/40 transition-all duration-300 ${
                    isHovered ? 'w-12' : 'w-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
