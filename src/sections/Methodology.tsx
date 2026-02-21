import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Target, TrendingUp } from 'lucide-react';

const stepIcons = [Search, Target, TrendingUp];

export default function Methodology() {
  const { t } = useLanguage();
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: t('methodology.step1.number'),
      title: t('methodology.step1.title'),
      description: t('methodology.step1.description'),
      icon: stepIcons[0],
    },
    {
      number: t('methodology.step2.number'),
      title: t('methodology.step2.title'),
      description: t('methodology.step2.description'),
      icon: stepIcons[1],
    },
    {
      number: t('methodology.step3.number'),
      title: t('methodology.step3.title'),
      description: t('methodology.step3.description'),
      icon: stepIcons[2],
    },
  ];

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0E1A2B 0%, #141f33 50%, #0E1A2B 100%)',
      }}
    >
      {/* Subtle grid texture at 3% opacity */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F4F1EA' stroke-width='0.5'%3E%3Cpath d='M0 0h60M0 30h60M0 60h60M0 0v60M30 0v60M60 0v60'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="relative z-10 section-padding">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t('methodology.title')}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-px">
            <div 
              className={`h-full bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
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
                    className="bg-white rounded-lg p-8 transition-all duration-500"
                    style={{
                      boxShadow: '0 8px 32px rgba(14, 26, 43, 0.08)',
                    }}
                  >
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-5xl text-gold/25 font-normal">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-navy/8 flex items-center justify-center group-hover:bg-gold/15 transition-all duration-400">
                        <IconComponent 
                          size={22} 
                          strokeWidth={1.5}
                          className="text-navy/50 group-hover:text-gold transition-colors duration-400"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl text-navy mb-4 font-normal">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-charcoal/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
