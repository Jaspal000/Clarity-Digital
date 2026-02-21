import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface SectorCard {
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  image: string;
}

/**
 * Paragraph lengths are intentionally kept within ~25 words each so that
 * no single card's text block is taller than another, regardless of language.
 */
const sectors: SectorCard[] = [
  {
    titleFr: 'Restaurants',
    titleEn: 'Restaurants',
    descFr:
      'Optimisation de la visibilite locale pour capter plus de clients et de touristes. Gestion des avis, photos soignees, publications regulieres et fiche Google completement structuree.',
    descEn:
      'Local visibility optimization to attract more customers and tourists. Review management, curated photos, regular posts and a fully structured Google Business listing.',
    image: '/restaurant.jpg',
  },
  {
    titleFr: 'Salons & Instituts',
    titleEn: 'Salons & Spas',
    descFr:
      'Strategie de reservation en ligne et gestion de reputation pour fideliser votre clientele. Augmentation des prises de rendez-vous et amelioration du positionnement local.',
    descEn:
      'Online booking strategy and reputation management to retain your clientele. Increased appointment bookings and improved local search positioning.',
    image: '/salon.jpg',
  },
  {
    titleFr: 'Artisans',
    titleEn: 'Artisans',
    descFr:
      'Presence digitale structuree pour valoriser votre savoir-faire et capter les demandes locales. Profil optimise, photos de chantiers et avis clients mis en avant.',
    descEn:
      'Structured digital presence to showcase your craftsmanship and capture local demand. Optimized profile, project photos and highlighted client reviews.',
    image: '/artisan.jpg',
  },
];

export default function Sectors() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isFr = language === 'fr';

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-ivory-gradient">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230E1A2B' fill-opacity='0.4'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {isFr ? "Secteurs d'Activite" : 'Industries Served'}
          </h2>
          <p
            className={`text-lg text-charcoal/60 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {isFr
              ? 'Une expertise dediee aux entreprises locales parisiennes'
              : 'Expertise dedicated to Parisian local businesses'}
          </p>
        </div>

        {/* Cards Grid -- equal-height via flex + stretch */}
        <div className="flex flex-col md:flex-row items-stretch gap-10 lg:gap-12 max-w-6xl mx-auto">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className={`flex-1 flex flex-col group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <div
                className="flex-1 flex flex-col overflow-hidden rounded-lg transition-all duration-500"
                style={{ boxShadow: '0 8px 28px rgba(14, 26, 43, 0.08)' }}
              >
                {/* Image -- identical aspect ratio (16:9), same brightness */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                  <img
                    src={sector.image}
                    alt={isFr ? sector.titleFr : sector.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: 'brightness(0.9)' }}
                  />
                  {/* Warm tone overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-900/15 mix-blend-multiply" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content -- identical padding, flex-col with spacer */}
                <div className="flex flex-col flex-1 p-8 lg:p-10 bg-white">
                  <h3 className="font-serif text-xl text-navy mb-4 font-normal group-hover:text-gold transition-colors duration-300">
                    {isFr ? sector.titleFr : sector.titleEn}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    {isFr ? sector.descFr : sector.descEn}
                  </p>

                  {/* Spacer -- forces all cards to equal height */}
                  <div className="flex-1" />

                  <div className="flex items-center gap-2 text-sm text-navy/70 group-hover:text-gold transition-colors duration-300 mt-6">
                    <span className="font-medium relative pb-1 group-hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold after:w-0 after:transition-all after:duration-300">
                      {isFr ? 'En savoir plus' : 'Learn more'}
                    </span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
