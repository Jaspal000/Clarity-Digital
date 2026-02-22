import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Star, MapPin, Clock, Phone } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBeforeAfter = () => {
    const element = document.getElementById('before-after');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* ====== LAYER 0: EIFFEL TOWER IMAGE ====== */}
      {/* MOBILE: positioned below header (top: 110px), height 65-70% of viewport */}
      {/* to frame the tower inside hero without extending beyond CTA area. */}
      {/* DESKTOP: full-width, full-height, object-contain aligned LEFT so the */}
      {/* tower fills the left half behind the hero text, not the Google card. */}
      <img
        src="/eiffel-tower-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 w-full pointer-events-none
          h-[65%] object-contain object-[center_top]
          lg:top-0 lg:h-full lg:object-left"
        style={{
          zIndex: 0,
          opacity: 0.7,
          filter: 'saturate(0.8)',
          top: 'clamp(0px, 110px, calc(100vh - 65vh))',
        }}
      />

      {/* ====== LAYER 1: Top blur mask (top 15% only, 4px max) ====== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 1,
          mask: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 15%)',
          WebkitMask: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 15%)',
        }}
      />

      {/* ====== LAYER 2: Text safe zone gradient ====== */}
      {/* Mobile: covers top 60% where the tower lives — gentle ivory wash */}
      {/* so the tower is clearly visible behind the headline text. */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none lg:hidden"
        style={{
          height: '60%',
          background: 'linear-gradient(180deg, rgba(244,241,234,0.82) 0%, rgba(244,241,234,0.6) 40%, rgba(244,241,234,0.35) 70%, rgba(244,241,234,0.15) 90%, transparent 100%)',
          zIndex: 1,
        }}
      />
      {/* Desktop: soft ivory wash over full section so text remains readable */}
      {/* against the full-width tower behind. Left side more opaque for text. */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background: 'linear-gradient(90deg, rgba(244,241,234,0.92) 0%, rgba(244,241,234,0.75) 30%, rgba(244,241,234,0.5) 50%, rgba(244,241,234,0.3) 70%, rgba(244,241,234,0.45) 100%)',
          zIndex: 1,
        }}
      />

      {/* ====== LAYER 3: Subtle bottom blend (desktop only) ====== */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none hidden lg:block"
        style={{
          height: '20%',
          background: 'linear-gradient(180deg, rgba(244,241,234,0) 0%, rgba(244,241,234,0.5) 100%)',
          zIndex: 1,
        }}
      />

      {/* ====== LAYER 4: Grain texture ====== */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' fill='%23F4F1EA'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ====== LAYER 5: CONTENT — always above tower ====== */}
      <div className="relative min-h-screen" style={{ zIndex: 2 }}>
        {/* Left side: Text content with section padding */}
        <div className="section-padding absolute top-0 left-0 h-full lg:w-1/2 flex items-start pt-[90px]">
          <div className="max-w-xl">
                {/* Trust badge */}
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-navy/5 rounded-full mb-6 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <MapPin size={14} className="text-gold" />
                  <span className="text-xs text-charcoal/70 tracking-wide">{t('hero.trustLine')}</span>
                </div>

                {/* Headline */}
                <h1
                  className={`font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-navy leading-tight mb-5 transition-all duration-700 delay-100 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  {t('hero.headline')}
                </h1>

                {/* Subheadline */}
                <p
                  className={`text-base lg:text-lg text-charcoal/70 leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  {t('hero.subheadline')}
                </p>

                {/* CTA Buttons */}
                <div
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  <button onClick={scrollToContact} className="btn-primary group">
                    <span>{t('hero.cta')}</span>
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button onClick={scrollToBeforeAfter} className="btn-outline">
                    Voir les exemples
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Google Business Card - positioned absolutely to extend beyond padding */}
        <div className="absolute top-0 right-0 h-full w-full lg:w-1/2 flex items-start pt-[90px] lg:pt-8 pointer-events-none">
          <div
            className={`hero-card-column relative transition-all duration-1000 delay-400 w-full ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ zIndex: 5, pointerEvents: 'auto' }}
          >
                <div className="animate-float">
                  <div className="google-mockup w-full">
                    {/* Mockup Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-sm">G</span>
                      </div>
                      <span className="text-white text-sm font-medium truncate">Google Business Profile</span>
                    </div>

                    {/* Mockup Content */}
                    <div className="p-4 sm:p-5">
                      {/* Business Name & Rating */}
                      <div className="mb-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 break-words">
                          {(t('googleMockup.businessName') as string)}
                        </h3>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-2xl font-bold text-gray-900">{(t('googleMockup.rating') as string)}</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4].map((i) => (
                              <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                            ))}
                            <Star size={16} className="text-yellow-400" fill="url(#half-star)" />
                          </div>
                          <span className="text-sm text-gray-500">({(t('googleMockup.reviews') as string)})</span>
                        </div>
                        <p className="text-sm text-gray-600">{(t('googleMockup.category') as string)}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mb-5">
                        <button className="flex-1 bg-blue-600 text-white text-xs sm:text-sm font-medium py-2.5 rounded-full hover:bg-blue-700 transition-colors min-w-0 truncate">
                          {'Itin\u00e9raire'}
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium py-2.5 rounded-full hover:bg-gray-200 transition-colors min-w-0 truncate">
                          Enregistrer
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium py-2.5 rounded-full hover:bg-gray-200 transition-colors min-w-0 truncate">
                          Site web
                        </button>
                      </div>

                      {/* Info Items */}
                      <div className="space-y-3 mb-5">
                        <div className="flex items-start gap-3">
                          <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 break-words">{(t('googleMockup.address') as string)}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-green-600 font-medium">Ouvert</span>
                            <span className="text-sm text-gray-700 ml-2">{(t('googleMockup.hours') as string)}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">01 42 34 56 78</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="border-t pt-4 mb-4">
                        <p className="text-sm text-gray-700 leading-relaxed break-words">
                          {(t('googleMockup.description') as string)}
                        </p>
                      </div>

                      {/* Review Preview */}
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                            ML
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900">Marie L.</p>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} size={10} className="text-yellow-400" fill="currentColor" />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 ml-auto flex-shrink-0 whitespace-nowrap">il y a 2 sem.</span>
                        </div>
                        <p className="text-sm text-gray-600 italic break-words">
                          {(t('googleMockup.reviewPreview') as string)}
                        </p>
                      </div>

                      {/* Post Preview */}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">{'📸'}</span>
                          </div>
                          <span className="text-xs text-gray-500">{'Publi\u00e9 il y a 3 jours'}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 break-words">{(t('googleMockup.postTitle') as string)}</p>
                        <p className="text-sm text-gray-600 break-words">{(t('googleMockup.postContent') as string)}</p>
                      </div>
                    </div>
                  </div>

                  {/* SVG for half star */}
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" stopColor="#FACC15" />
                        <stop offset="50%" stopColor="#D1D5DB" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
