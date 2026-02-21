import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ParisContext() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        setParallaxOffset(clampedProgress * 80 - 40);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px) scale(1.15)` }}
      >
        <img
          src="/paris-architecture.jpg"
          alt="Paris architecture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navy overlay */}
      <div className="absolute inset-0 bg-navy/60 z-[1]" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/40 z-[2]" />

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          {/* Gold accent line */}
          <div
            className={`mx-auto w-16 h-px bg-gold mb-10 transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />

          {/* Headline */}
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t('parisContext.headline')}
          </h2>

          {/* Subheadline */}
          <p
            className={`text-lg text-ivory/70 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t('parisContext.subheadline')}
          </p>

          {/* Decorative elements */}
          <div
            className={`flex items-center justify-center gap-4 mt-12 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-20 h-px bg-gold/40" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="w-20 h-px bg-gold/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
