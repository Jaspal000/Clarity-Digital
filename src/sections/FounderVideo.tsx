import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Play, ArrowRight } from 'lucide-react';

export default function FounderVideo() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const scrollToMethodology = () => {
    const element = document.getElementById('methodology');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="founder-video"
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
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className={`font-serif text-2xl sm:text-3xl lg:text-4xl text-navy transition-all duration-700 ease-elegant ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t('founderVideo.title')}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Video Frame */}
          <div
            className={`transition-all duration-700 ease-elegant delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="video-frame aspect-video bg-navy-light relative group cursor-pointer overflow-hidden rounded-lg">
              {/* Video placeholder background */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-muted">
                {/* Subtle pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B89C5E' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-gold/90 hover:bg-gold flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-card"
                >
                  <Play size={28} className="text-navy ml-1" fill="currentColor" />
                </button>
              </div>

              {/* Video label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ivory/60 uppercase tracking-wider">
                    {t('founderVideo.videoPlaceholder')}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold/30" />
              <div className="absolute bottom-12 left-4 w-8 h-8 border-l-2 border-b-2 border-gold/30" />
              <div className="absolute bottom-12 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/30" />
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`transition-all duration-700 ease-elegant delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="space-y-6">
              <p className="text-lg text-charcoal/80 leading-relaxed">
                {t('founderVideo.description')}
              </p>

              {/* Key points */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                  <span className="text-sm text-charcoal/70">Approche personnalisée pour chaque entreprise</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                  <span className="text-sm text-charcoal/70">Suivi rigoureux des performances</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                  <span className="text-sm text-charcoal/70">Expertise du marché parisien</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <button
                  onClick={scrollToMethodology}
                  className="group inline-flex items-center text-sm font-medium text-navy hover:text-gold transition-colors duration-300"
                >
                  <span className="relative">
                    {t('founderVideo.cta')}
                    <span className="absolute -bottom-0.5 left-0 w-full h-px bg-navy/30 group-hover:bg-gold transition-colors duration-300" />
                  </span>
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div 
          className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4"
          onClick={() => setIsPlaying(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-navy-light rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-ivory/60">
              <div className="text-center">
                <Play size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm uppercase tracking-wider">Video placeholder</p>
                <p className="text-xs text-ivory/40 mt-2">Founder presentation video would play here</p>
              </div>
            </div>
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 text-ivory/60 hover:text-ivory transition-colors"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
