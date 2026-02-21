import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function FinalCta() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-navy-light overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4F1EA' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/20 to-transparent" />

      <div className="relative z-10 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          {/* Gold accent */}
          <div
            className={`mx-auto w-8 h-px bg-gold mb-8 transition-all duration-700 ease-elegant ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />

          {/* Headline */}
          <h2
            className={`font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory mb-10 transition-all duration-700 ease-elegant delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t('finalCta.headline')}
          </h2>

          {/* CTA Button with enhanced hover */}
          <div
            className={`transition-all duration-700 ease-elegant delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={scrollToContact}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="relative inline-flex items-center justify-center px-8 py-4 bg-gold text-navy text-sm font-medium uppercase tracking-widest overflow-hidden group"
            >
              {/* Background slide effect */}
              <span 
                className={`absolute inset-0 bg-ivory transition-transform duration-500 ease-elegant ${
                  isButtonHovered ? 'translate-x-0' : '-translate-x-full'
                }`}
              />
              
              {/* Content */}
              <span className="relative z-10 flex items-center transition-colors duration-300">
                <span>{t('finalCta.cta')}</span>
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
