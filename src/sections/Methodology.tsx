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
      className="relative py-24 lg:py-32 bg-navy-muted"
    >
      <div className="section-padding">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-4 transition-all duration-700 ${
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
              className={`h-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
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
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-5xl text-gold/30 font-normal">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                        <IconComponent 
                          size={22} 
                          strokeWidth={1.5}
                          className="text-navy/60 group-hover:text-gold transition-colors duration-300"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl text-navy mb-4">
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
