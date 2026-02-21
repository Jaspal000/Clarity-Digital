import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Settings, BarChart3 } from 'lucide-react';

const stepIcons = [Search, Settings, BarChart3];

export default function Methodology() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isFr = language === 'fr';

  const steps = [
    {
      number: '01',
      title: isFr ? 'Diagnostic Strategique' : 'Strategic Diagnostic',
      description: isFr
        ? 'Analyse approfondie de votre positionnement local, de votre concurrence directe et de la structure actuelle de votre profil Google Business. Identification des leviers prioritaires a fort impact.'
        : 'In-depth analysis of your local positioning, direct competition, and the current structure of your Google Business profile. Identification of high-impact priority levers.',
      icon: stepIcons[0],
    },
    {
      number: '02',
      title: isFr ? 'Optimisation Structuree' : 'Structured Optimization',
      description: isFr
        ? 'Optimisation methodique des elements critiques : categories, mots-cles, contenus, structure d\'information et coherence globale du profil.'
        : 'Methodical optimization of critical elements: categories, keywords, content, information structure, and overall profile coherence.',
      icon: stepIcons[1],
    },
    {
      number: '03',
      title: isFr ? 'Pilotage & Croissance Continue' : 'Management & Continuous Growth',
      description: isFr
        ? 'Suivi regulier des performances, ajustements strategiques et amelioration progressive de la visibilite dans un environnement concurrentiel dynamique.'
        : 'Regular performance tracking, strategic adjustments, and progressive improvement of visibility in a dynamic competitive environment.',
      icon: stepIcons[2],
    },
  ];

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0E1A2B 0%, #141f33 50%, #0E1A2B 100%)',
      }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F4F1EA' stroke-width='0.5'%3E%3Cpath d='M0 0h60M0 30h60M0 60h60M0 0v60M30 0v60M60 0v60'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 section-padding">
        {/* Section Title */}
        <div className="text-center mb-20 lg:mb-24">
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory mb-0 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {isFr ? 'Notre Methodologie' : 'Our Methodology'}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-32 left-[20%] right-[20%] h-px">
            <div
              className={`h-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 lg:items-stretch">
            {steps.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <div
                  key={index}
                  className={`relative group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150 + 200}ms` }}
                >
                  <div
                    className="relative bg-white rounded-lg transition-all duration-500 h-full flex flex-col"
                    style={{
                      boxShadow: '0 12px 40px rgba(14, 26, 43, 0.12)',
                      padding: '52px 40px 52px 40px',
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="absolute w-11 h-11 rounded-full bg-navy/6 flex items-center justify-center group-hover:bg-gold/12 transition-all duration-400"
                      style={{ top: '32px', right: '32px' }}
                    >
                      <IconComponent
                        size={20}
                        strokeWidth={1.5}
                        className="text-navy/40 group-hover:text-gold transition-colors duration-400"
                      />
                    </div>

                    {/* Step Number */}
                    <span className="font-serif text-5xl text-gold/20 font-normal mb-2 leading-none select-none">
                      {step.number}
                    </span>

                    {/* Gold accent line under number */}
                    <div className="w-8 h-[2px] bg-gold/35 mb-6" />

                    {/* Title */}
                    <h3 className="font-serif text-xl text-navy mb-5 font-normal leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-charcoal/65 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing micro-line */}
          <div
            className={`text-center mt-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <p className="text-sm text-ivory/45 tracking-wide font-sans italic">
              {isFr
                ? 'Une approche fondee sur la clarte, la rigueur et la constance.'
                : 'An approach built on clarity, rigor, and consistency.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
