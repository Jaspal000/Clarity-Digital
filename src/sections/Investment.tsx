import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Check } from 'lucide-react';

export default function Investment() {
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

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-ivory-gradient"
    >
      <div className="section-padding">
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t('investment.headline')}
          </h2>

          {/* Price */}
          <div
            className={`mb-8 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-sm text-charcoal/60 mb-3 uppercase tracking-wider">
              {t('investment.from')}
            </p>
            <p className="font-serif text-5xl sm:text-6xl lg:text-7xl text-navy">
              {t('investment.price')}
            </p>
          </div>

          {/* Notes */}
          <div
            className={`space-y-3 mb-10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-charcoal/60">
              <Check size={16} className="text-gold" />
              <span>{t('investment.note1')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-charcoal/60">
              <Check size={16} className="text-gold" />
              <span>{t('investment.note2')}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={scrollToContact}
              className="btn-primary group"
            >
              <span>{t('investment.cta')}</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
