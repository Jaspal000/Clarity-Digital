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
      className="relative"
      style={{ overflowX: 'hidden' }}
    >
      {/* EIFFEL TOWER — DESKTOP */}
      <img
        src="/eiffel-tower-bg.jpg"
        alt=""
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          objectPosition: 'left top',
          opacity: 0.75,
          filter: 'saturate(0.8)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* EIFFEL TOWER — MOBILE */}
      <img
        src="/eiffel-tower-bg.jpg"
        alt=""
        aria-hidden="true"
        className="lg:hidden"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100svh',
          objectFit: 'contain',
          objectPosition: 'center top',
          opacity: 0.75,
          filter: 'saturate(0.8)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* TOP BLUR */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '100svh',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 1,
        mask: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 12%)',
        WebkitMask: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 12%)',
        pointerEvents: 'none',
      }} />

      {/* MOBILE GRADIENT */}
      <div className="lg:hidden" style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100svh',
        background: 'linear-gradient(180deg, rgba(244,241,234,0.82) 0%, rgba(244,241,234,0.45) 15%, rgba(244,241,234,0.2) 30%, rgba(244,241,234,0.05) 55%, transparent 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* DESKTOP GRADIENT */}
      <div className="hidden lg:block" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(244,241,234,0.82) 0%, rgba(244,241,234,0.6) 20%, rgba(244,241,234,0.3) 42%, rgba(244,241,234,0.08) 60%, rgba(244,241,234,0.15) 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* GRAIN */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100svh',
        opacity: 0.012, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' fill='%23F4F1EA'/%3E%3C/svg%3E")`,
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <style>{`

          /* ============================================
             MOBILE < 1024px

             FIX 1 — padding-top: 115px
             Header height ≈ 88px CSS.
             Image starts at exactly 88px.
             115px = 27px inside image.
             At 120% zoom = 138px visual — badge
             sits clearly fully ON the tower image.
             Nothing touches white/beige space above.

             FIX 2 — padding-bottom: 2.5rem
             Lifts CTA buttons up from before (was 3rem→4rem).
             Balanced gap between buttons and screen bottom.

             FIX 3 — badge width handled in JSX inline style
             ============================================ */
          @media (max-width: 1023px) {
            .first-screen {
              display: flex;
              flex-direction: column;
              height: 100svh;
              min-height: 100vh;
              padding-top: 115px;
              padding-left: 1.1rem;
              padding-right: 1.1rem;
              padding-bottom: 2.5rem;
              box-sizing: border-box;
            }
            .hero-left {
              display: flex;
              flex-direction: column;
              flex: 1;
              width: 100%;
            }
            .hero-headline {
              font-size: 2rem !important;
              line-height: 1.2 !important;
              margin-bottom: 0.75rem !important;
            }
            .hero-subheadline {
              font-size: 0.875rem !important;
              line-height: 1.55 !important;
              margin-bottom: 0 !important;
            }
            .hero-cta {
              margin-top: auto !important;
              padding-top: 1.5rem;
              display: flex !important;
              flex-direction: column !important;
              gap: 0.65rem !important;
            }
            .hero-right { display: none !important; }
            .mobile-card-block {
              display: block;
              width: 100%;
              padding: 2rem 1.1rem;
              box-sizing: border-box;
              background: #F4F1EA;
            }
            .mobile-card-block .google-mockup {
              width: 100%;
              box-sizing: border-box;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            }
            .desktop-card-block { display: none !important; }
          }

          /* ============================================
             DESKTOP >= 1024px
             ============================================ */
          @media (min-width: 1024px) {
            .first-screen {
              display: flex;
              flex-direction: row;
              align-items: stretch;
              width: 100%;
              min-height: 100vh;
              padding-top: 88px;
              padding-bottom: 0;
              box-sizing: border-box;
            }
            .hero-left {
              flex: 0 0 60%;
              max-width: 60%;
              padding: 3.5rem 3rem 3rem 5rem;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
            }
            .hero-headline {
              font-size: clamp(2.5rem, 4vw, 3.75rem) !important;
              line-height: 1.15 !important;
            }
            .hero-subheadline {
              font-size: 1.1rem !important;
              margin-bottom: 2rem !important;
            }
            .hero-cta {
              margin-top: 0 !important;
              padding-top: 0 !important;
              display: flex !important;
              flex-direction: row !important;
              gap: 1rem !important;
            }
            .hero-right {
              flex: 0 0 40%;
              max-width: 40%;
              padding: 1rem 0 0 0;
              box-sizing: border-box;
              align-self: stretch;
              display: flex;
              flex-direction: column;
              overflow-y: auto;
              overflow-x: hidden;
            }
            .hero-right::-webkit-scrollbar { width: 4px; }
            .hero-right::-webkit-scrollbar-thumb {
              background: rgba(0,0,0,0.15);
              border-radius: 2px;
            }
            .hero-right .card-wrapper {
              flex: 1;
              display: flex;
              flex-direction: column;
            }
            .google-mockup {
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
              border-radius: 12px 0 0 12px;
              overflow: hidden;
              box-shadow: -8px 0 48px rgba(0,0,0,0.12);
              flex: 1;
              display: flex;
              flex-direction: column;
            }
            .google-mockup > div:last-child {
              flex: 1;
              overflow-y: auto;
            }
            .mobile-card-block { display: none !important; }
            .desktop-card-block {
              display: flex !important;
              flex-direction: column;
              flex: 1;
            }
          }
        `}</style>

        {/* FIRST SCREEN: exactly 100svh */}
        <div className="first-screen">
          <div className="hero-left">

            {/* Badge — inline style ensures width fits content on both mobile & desktop */}
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1rem',
                background: 'rgba(15,23,42,0.05)',
                borderRadius: '9999px',
                marginBottom: '0.75rem',
                /* KEY FIX: width fits content, not full container width */
                width: 'fit-content',
                maxWidth: '100%',
              }}
            >
              <MapPin size={14} className="text-gold" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', color: 'rgba(30,30,30,0.7)', letterSpacing: '0.025em', whiteSpace: 'nowrap' }}>
                {t('hero.trustLine')}
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`hero-headline font-serif text-navy leading-tight mb-5 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {t('hero.headline')}
            </h1>

            {/* Subheadline */}
            <p
              className={`hero-subheadline text-charcoal/70 leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {t('hero.subheadline')}
            </p>

            {/* CTA */}
            <div
              className={`hero-cta flex gap-4 transition-all duration-700 delay-300 ${
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

          {/* Desktop right card */}
          <div className="hero-right desktop-card-block">
            <div className={`card-wrapper transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <GoogleMockup t={t} />
            </div>
          </div>
        </div>

        {/* MOBILE CARD — structurally outside 100svh, impossible to see on first load */}
        <div className="mobile-card-block">
          <GoogleMockup t={t} />
        </div>
      </div>
    </section>
  );
}

function GoogleMockup({ t }: { t: (key: string) => unknown }) {
  return (
    <div className="animate-float" style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <div className="google-mockup w-full" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold text-sm">G</span>
          </div>
          <span className="text-white text-sm font-medium truncate">Google Business Profile</span>
        </div>

        <div className="p-4 sm:p-5 bg-white flex-1 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 break-words">
              {t('googleMockup.businessName') as string}
            </h3>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-2xl font-bold text-gray-900">{t('googleMockup.rating') as string}</span>
              <div className="flex gap-0.5">
                {[1,2,3,4].map(i => <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />)}
                <Star size={16} className="text-yellow-400" fill="url(#half-star)" />
              </div>
              <span className="text-sm text-gray-500">({t('googleMockup.reviews') as string})</span>
            </div>
            <p className="text-sm text-gray-600">{t('googleMockup.category') as string}</p>
          </div>

          <div className="flex gap-2 mb-5">
            <button className="flex-1 bg-blue-600 text-white text-xs sm:text-sm font-medium py-2.5 rounded-full hover:bg-blue-700 transition-colors min-w-0 truncate">Itinéraire</button>
            <button className="flex-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium py-2.5 rounded-full hover:bg-gray-200 transition-colors min-w-0 truncate">Enregistrer</button>
            <button className="flex-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium py-2.5 rounded-full hover:bg-gray-200 transition-colors min-w-0 truncate">Site web</button>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 break-words">{t('googleMockup.address') as string}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm text-green-600 font-medium">Ouvert</span>
                <span className="text-sm text-gray-700 ml-2">{t('googleMockup.hours') as string}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">01 42 34 56 78</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed break-words">{t('googleMockup.description') as string}</p>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">ML</div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">Marie L.</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-yellow-400" fill="currentColor" />)}
                </div>
              </div>
              <span className="text-xs text-gray-400 ml-auto flex-shrink-0 whitespace-nowrap">il y a 2 sem.</span>
            </div>
            <p className="text-sm text-gray-600 italic break-words">{t('googleMockup.reviewPreview') as string}</p>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-xs">📸</span>
              </div>
              <span className="text-xs text-gray-500">Publié il y a 3 jours</span>
            </div>
            <p className="text-sm font-medium text-gray-900 break-words">{t('googleMockup.postTitle') as string}</p>
            <p className="text-sm text-gray-600 break-words">{t('googleMockup.postContent') as string}</p>
          </div>
        </div>
      </div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="#D1D5DB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
