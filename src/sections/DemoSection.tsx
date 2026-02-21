import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Check, Star, Image as ImageIcon, MessageSquare, TrendingUp } from 'lucide-react';

export default function DemoSection() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const beforePoints = (t('demo.before.points') as string[]) || [];
  const afterPoints = (t('demo.after.points') as string[]) || [];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-ivory-light"
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
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className={`font-serif text-2xl sm:text-3xl lg:text-4xl text-navy mb-4 transition-all duration-700 ease-elegant ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t('demo.title')}
          </h2>
          <p
            className={`text-base text-charcoal/60 transition-all duration-700 ease-elegant delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t('demo.subtitle')}
          </p>
        </div>

        {/* Before/After Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Before Card */}
          <div
            className={`transition-all duration-700 ease-elegant delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-red-200/30 overflow-hidden shadow-elegant">
              {/* Card Header */}
              <div className="px-6 py-4 bg-red-50/50 border-b border-red-100/50 flex items-center justify-between">
                <span className="badge-before">{t('demo.before.label')}</span>
                <div className="flex items-center gap-1 text-red-400">
                  <X size={14} />
                  <span className="text-xs font-medium">Non optimisé</span>
                </div>
              </div>

              {/* Card Content - Mock Google Profile */}
              <div className="p-6">
                {/* Mock Profile Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={24} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-charcoal mb-1">Bistro du Coin</h4>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-sm text-charcoal/60">3.2</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((i) => (
                          <Star key={i} size={12} className="text-amber-400" fill="currentColor" />
                        ))}
                        {[4, 5].map((i) => (
                          <Star key={i} size={12} className="text-gray-300" />
                        ))}
                      </div>
                      <span className="text-xs text-charcoal/40">(47 avis)</span>
                    </div>
                    <p className="text-xs text-charcoal/50">Restaurant • Paris</p>
                  </div>
                </div>

                {/* Mock Description */}
                <div className="mb-6">
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    Restaurant traditionnel parisien. Venez découvrir nos plats.
                  </p>
                </div>

                {/* Mock Stats */}
                <div className="flex items-center gap-6 mb-6 text-xs text-charcoal/50">
                  <div className="flex items-center gap-1.5">
                    <ImageIcon size={14} />
                    <span>3 photos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={14} />
                    <span>2 réponses</span>
                  </div>
                </div>

                {/* Issues List */}
                <div className="space-y-2">
                  {beforePoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-charcoal/70">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* After Card */}
          <div
            className={`transition-all duration-700 ease-elegant delay-400 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-green-200/30 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
              {/* Card Header */}
              <div className="px-6 py-4 bg-green-50/50 border-b border-green-100/50 flex items-center justify-between">
                <span className="badge-after">{t('demo.after.label')}</span>
                <div className="flex items-center gap-1 text-green-600">
                  <Check size={14} />
                  <span className="text-xs font-medium">Optimisé</span>
                </div>
              </div>

              {/* Card Content - Mock Google Profile */}
              <div className="p-6">
                {/* Mock Profile Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0 border border-gold/20">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-charcoal mb-1">Bistro du Coin</h4>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-sm text-charcoal font-medium">4.7</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4].map((i) => (
                          <Star key={i} size={12} className="text-amber-400" fill="currentColor" />
                        ))}
                        <Star size={12} className="text-amber-400" fill="url(#half)" />
                      </div>
                      <span className="text-xs text-charcoal/60 font-medium">(189 avis)</span>
                    </div>
                    <p className="text-xs text-charcoal/70">Restaurant français • 11ème arrondissement • Ouvert aujourd'hui</p>
                  </div>
                </div>

                {/* Mock Description */}
                <div className="mb-6">
                  <p className="text-sm text-charcoal/80 leading-relaxed">
                    <span className="font-medium">Cuisine française authentique</span> dans le 11ème arrondissement de Paris. 
                    Spécialités du terroir, produits frais du marché, ambiance conviviale. 
                    Réservation recommandée pour le week-end.
                  </p>
                </div>

                {/* Mock Stats */}
                <div className="flex items-center gap-6 mb-6 text-xs text-charcoal/70">
                  <div className="flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-gold" />
                    <span className="font-medium">24 photos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-gold" />
                    <span className="font-medium">Réponses sous 2h</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="font-medium text-green-600">+156% visibilité</span>
                  </div>
                </div>

                {/* Improvements List */}
                <div className="space-y-2">
                  {afterPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-charcoal/80">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div
          className={`text-center mt-10 transition-all duration-700 ease-elegant delay-500 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-sm text-charcoal/50">
            Résultats observés après 3 mois d'accompagnement — Données réelles, client anonymisé
          </p>
        </div>
      </div>

      {/* SVG for half star */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
