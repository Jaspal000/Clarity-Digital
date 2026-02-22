import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Star, MapPin, Clock, Phone } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToBeforeAfter = () => {
    document.getElementById('before-after')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{ overflowX: 'hidden' }}
    >

      {/* =================================================
          MOBILE LAYOUT  (< 768px)
          Single column. Tower centered. CTA at bottom.
          Rendered as a 100svh tall block.
      ================================================= */}
      <div
        className="md:hidden relative"
        style={{ height: '100svh', minHeight: '100vh', overflow: 'hidden' }}
      >
        {/* Tower */}
        <img src="/eiffel-tower-bg.jpg" alt="" aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center top',
          opacity: 0.75, filter: 'saturate(0.8)', zIndex: 0, pointerEvents: 'none',
        }} />
        {/* Blur */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          mask: 'linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 12%)',
          WebkitMask: 'linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 12%)',
        }} />
        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(180deg,rgba(244,241,234,0.82) 0%,rgba(244,241,234,0.45) 15%,rgba(244,241,234,0.2) 30%,rgba(244,241,234,0.05) 55%,transparent 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2, height: '100%',
          display: 'flex', flexDirection: 'column',
          paddingTop: '115px', paddingLeft: '1.1rem',
          paddingRight: '1.1rem', paddingBottom: '5rem',
          boxSizing: 'border-box',
        }}>
          {/* Badge */}
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.45rem 1rem', background: 'rgba(15,23,42,0.05)',
              borderRadius: '9999px', marginBottom: '0.75rem', width: 'fit-content',
            }}
          >
            <MapPin size={14} className="text-gold" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(30,30,30,0.7)', letterSpacing: '0.025em', whiteSpace: 'nowrap' }}>
              {t('hero.trustLine')}
            </span>
          </div>

          <h1
            className={`font-serif text-navy transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: '2rem', lineHeight: 1.2, marginBottom: '0.75rem' }}
          >
            {t('hero.headline')}
          </h1>

          <p
            className={`text-charcoal/70 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: '0.875rem', lineHeight: 1.55, margin: 0 }}
          >
            {t('hero.subheadline')}
          </p>

          {/* CTA pushed to bottom */}
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ marginTop: 'clamp(2rem, 12vh, 5rem)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}
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

      {/* Mobile Google card — below hero, user scrolls to see */}
      <div className="md:hidden" style={{ padding: '2rem 1.1rem', background: '#F4F1EA' }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
          <GoogleMockup t={t} />
        </div>
      </div>

      {/* =================================================
          DESKTOP LAYOUT  (>= 768px)
          60/40 flex row. Strict height: 100vh.
          overflow: hidden — physically cannot overflow.
          Card starts exactly at header bottom (88px).
          Tower left-aligned behind text.
      ================================================= */}
      <div
        className="hidden md:flex relative"
        style={{
          height: '100vh',
          maxHeight: '100vh',
          overflow: 'hidden',
          flexDirection: 'row',
        }}
      >
        {/* Tower */}
        <img src="/eiffel-tower-bg.jpg" alt="" aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'left top',
          opacity: 0.75, filter: 'saturate(0.8)', zIndex: 0, pointerEvents: 'none',
        }} />
        {/* Blur */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          mask: 'linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 12%)',
          WebkitMask: 'linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 12%)',
        }} />
        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(90deg,rgba(244,241,234,0.82) 0%,rgba(244,241,234,0.6) 20%,rgba(244,241,234,0.3) 42%,rgba(244,241,234,0.08) 60%,rgba(244,241,234,0.15) 100%)',
        }} />

        {/* LEFT — 60%, hero text vertically centered */}
        <div style={{
          position: 'relative', zIndex: 2,
          flex: '0 0 60%', maxWidth: '60%',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          /* paddingTop accounts for fixed header so content centers in visible area */
          padding: 'calc(88px + 1rem) 3rem 3rem 5rem',
          boxSizing: 'border-box',
        }}>
          {/* Badge */}
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.45rem 1rem', background: 'rgba(15,23,42,0.05)',
              borderRadius: '9999px', marginBottom: '1rem', width: 'fit-content',
            }}
          >
            <MapPin size={14} className="text-gold" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(30,30,30,0.7)', letterSpacing: '0.025em', whiteSpace: 'nowrap' }}>
              {t('hero.trustLine')}
            </span>
          </div>

          <h1
            className={`font-serif text-navy transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)', lineHeight: 1.15, marginBottom: '1.25rem' }}
          >
            {t('hero.headline')}
          </h1>

          <p
            className={`text-charcoal/70 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}
          >
            {t('hero.subheadline')}
          </p>

          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ display: 'flex', flexDirection: 'row', gap: '1rem', flexWrap: 'wrap' }}
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

        {/* RIGHT — 40%, card starts exactly at header bottom */}
        <div style={{
          position: 'relative', zIndex: 2,
          flex: '0 0 40%', maxWidth: '40%',
          display: 'flex', flexDirection: 'column',
          /* Top padding = header height only. No extra gap. */
          paddingTop: '88px',
          height: '100vh',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}>
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            {/* Card fills remaining height with rounded left corners only */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              borderRadius: '12px 0 0 0',
              overflow: 'hidden',
              boxShadow: '-8px 0 48px rgba(0,0,0,0.12)',
            }}>
              <GoogleMockup t={t} />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function GoogleMockup({ t }: { t: (key: string) => unknown }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>

      {/* Blue header */}
      <div style={{
        background: 'linear-gradient(to right,#2563EB,#3B82F6)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.75rem 1rem', flexShrink: 0,
      }}>
        <div style={{
          width: 32, height: 32, background: 'white', borderRadius: '50%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#2563EB', fontWeight: 700, fontSize: '0.875rem' }}>G</span>
        </div>
        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>Google Business Profile</span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', background: 'white' }}>

        {/* Business name + rating */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', marginBottom: '0.5rem' }}>
            {t('googleMockup.businessName') as string}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>{t('googleMockup.rating') as string}</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4].map(i => <Star key={i} size={15} className="text-yellow-400" fill="currentColor" />)}
              <Star size={15} className="text-yellow-400" fill="url(#half-star)" />
            </div>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>({t('googleMockup.reviews') as string})</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>{t('googleMockup.category') as string}</p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {[['Itinéraire', true], ['Enregistrer', false], ['Site web', false]].map(([label, primary]) => (
            <button key={label as string} style={{
              flex: 1, fontSize: '0.75rem', fontWeight: 500,
              padding: '0.5rem 0.25rem', borderRadius: '9999px', border: 'none', cursor: 'pointer',
              background: primary ? '#2563EB' : '#F3F4F6',
              color: primary ? 'white' : '#374151',
              minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{label as string}</button>
          ))}
        </div>

        {/* Info rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <MapPin size={15} style={{ color: '#9CA3AF', flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: '0.8rem', color: '#374151' }}>{t('googleMockup.address') as string}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <Clock size={15} style={{ color: '#9CA3AF', flexShrink: 0, marginTop: 2 }} />
            <div>
              <span style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 500 }}>Ouvert</span>
              <span style={{ fontSize: '0.8rem', color: '#374151', marginLeft: '0.4rem' }}>{t('googleMockup.hours') as string}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Phone size={15} style={{ color: '#9CA3AF', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8rem', color: '#374151' }}>01 42 34 56 78</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.5 }}>
            {t('googleMockup.description') as string}
          </p>
        </div>

        {/* Review */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#A78BFA,#F472B6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '0.7rem', fontWeight: 500,
            }}>ML</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#111', margin: 0 }}>Marie L.</p>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={9} className="text-yellow-400" fill="currentColor" />)}
              </div>
            </div>
            <span style={{ fontSize: '0.7rem', color: '#9CA3AF', marginLeft: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>il y a 2 sem.</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', fontStyle: 'italic', margin: 0 }}>
            {t('googleMockup.reviewPreview') as string}
          </p>
        </div>

        {/* Post */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div style={{
              width: 22, height: 22, background: '#E5E7EB', borderRadius: 4, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem',
            }}>📸</div>
            <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Publié il y a 3 jours</span>
          </div>
          <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#111', margin: '0 0 0.2rem' }}>{t('googleMockup.postTitle') as string}</p>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0 }}>{t('googleMockup.postContent') as string}</p>
        </div>
      </div>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
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
