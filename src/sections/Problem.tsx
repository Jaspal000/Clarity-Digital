import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Problem() {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
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
        <div className="max-w-3xl mx-auto text-center">
          {/* Gold accent */}
          <div
            className={`mx-auto w-8 h-px bg-gold mb-8 transition-all duration-700 ease-elegant ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />

          {/* Headline */}
          <h2
            className={`font-serif text-2xl sm:text-3xl lg:text-4xl text-navy leading-snug mb-8 transition-all duration-700 ease-elegant delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t('problem.headline')}
          </h2>

          {/* Paragraph */}
          <p
            className={`text-base lg:text-lg text-charcoal/70 leading-relaxed transition-all duration-700 ease-elegant delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t('problem.paragraph')}
          </p>
        </div>
      </div>
    </section>
  );
}
