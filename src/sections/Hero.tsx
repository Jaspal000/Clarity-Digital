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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBeforeAfter = () => {
    const element = document.getElementById('before-after');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden flex items-flex-start pt-24 lg:pt-0 lg:flex-col lg:items-stretch"
      style={{ minHeight: '95vh' }}
    >
      {/* LAYER 1: Eiffel Tower Background (High-res, clean, 85%+ opacity) */}
      <div 
        className="absolute inset-0 lg:relative lg:flex-1"
        style={{
          backgroundImage: `url('/eiffel-tower-bg.jpg')`,
          backgroundPosition: '55% center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          opacity: 0.85,
          filter: 'saturate(0.85)',
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* LAYER 2: Directional Blur Mask (Top 25%, 6-8px blur max) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 25%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 1,
          mask: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%)',
          WebkitMask: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%)',
        }}
      />

      {/* LAYER 3: Text Safe Zone Gradient (Left 40% solid, middle 15% fade, right 45% open) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(244, 241, 234, 1) 0%, rgba(244, 241, 234, 1) 40%, rgba(244, 241, 234, 0.5) 55%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* LAYER 4: Subtle Bottom Blur (Bottom 25%, 2-3px only) */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '25%',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          zIndex: 1,
        }}
      />

      {/* LAYER 5: Premium grain texture (minimal, 1.2% opacity) */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{ zIndex: 1 }}>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' fill='%23F4F1EA'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* LAYER 6: Content - Relative z-index 2 */}
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="section-padding">
        <div className="min-h-screen flex items-center justify-center lg:flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full py-16 lg:py-0">
            
            {/* Left: Text Content */}
            <div className="max-w-xl">
              {/* Trust badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 bg-navy/5 rounded-full mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <MapPin size={14} className="text-gold" />
                <span className="text-xs text-charcoal/70 tracking-wide">{t('hero.trustLine')}</span>
              </div>

              {/* Headline */}
              <h1
                className={`font-serif text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight mb-6 transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {t('hero.headline')}
              </h1>

              {/* Subheadline */}
              <p
                className={`text-lg text-charcoal/70 leading-relaxed mb-10 transition-all duration-700 delay-200 ${
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
                <button
                  onClick={scrollToContact}
                  className="btn-primary group"
                >
                  <span>{t('hero.cta')}</span>
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={scrollToBeforeAfter}
                  className="btn-outline"
                >
                  Voir les exemples
                </button>
              </div>
            </div>

            {/* Right: Google Mockup */}
            <div
              className={`relative transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="animate-float">
                {/* Google Business Profile Mockup */}
                <div className="google-mockup max-w-md mx-auto lg:ml-auto">
                  {/* Mockup Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">G</span>
                    </div>
                    <span className="text-white text-sm font-medium">Google Business Profile</span>
                  </div>

                  {/* Mockup Content */}
                  <div className="p-5">
                    {/* Business Name & Rating */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {(t('googleMockup.businessName') as string)}
                      </h3>
                      <div className="flex items-center gap-2 mb-1">
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
                      <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-full hover:bg-blue-700 transition-colors">
                        Itinéraire
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                        Enregistrer
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                        Site web
                      </button>
                    </div>

                    {/* Info Items */}
                    <div className="space-y-3 mb-5">
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{(t('googleMockup.address') as string)}</span>
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
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {(t('googleMockup.description') as string)}
                      </p>
                    </div>

                    {/* Review Preview */}
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          ML
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Marie L.</p>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} size={10} className="text-yellow-400" fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 ml-auto">il y a 2 semaines</span>
                      </div>
                      <p className="text-sm text-gray-600 italic">
                        {(t('googleMockup.reviewPreview') as string)}
                      </p>
                    </div>

                    {/* Post Preview */}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs">📸</span>
                        </div>
                        <span className="text-xs text-gray-500">Publié il y a 3 jours</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{(t('googleMockup.postTitle') as string)}</p>
                      <p className="text-sm text-gray-600">{(t('googleMockup.postContent') as string)}</p>
                    </div>
                  </div>
                </div>

                {/* SVG for half star */}
                <svg width="0" height="0">
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
