import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Star, MapPin, Clock, Phone } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToBeforeAfter = () => document.getElementById('before-after')?.scrollIntoView({ behavior: 'smooth' });

  const fade = (delay = 0) => ({
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
  });

  return (
    <section id="hero" style={{ overflowX: 'hidden' }}>
      <style>{`
        /* ================================================
           BREAKPOINT: 768px
           Below 768px  → mobile layout shown, desktop hidden
           768px+       → desktop layout shown, mobile hidden

           We use CSS media queries here directly — NOT
           Tailwind classes — so we fully control the exact
           pixel breakpoint regardless of Tailwind config.
        ================================================ */

        .hero-mobile  { display: flex; }
        .hero-desktop { display: none; }
        .hero-mobile-card { display: block; }

        @media (min-width: 768px) {
          .hero-mobile      { display: none !important; }
          .hero-mobile-card { display: none !important; }
          .hero-desktop     { display: flex !important; }
        }
      `}</style>

      {/* ================================================
          MOBILE HERO  (< 768px)
          Single column. Tower centered. CTA at bottom.
          Strict 100svh — nothing can overflow below.
      ================================================ */}
      <div
        className="hero-mobile"
        style={{
          position: 'relative',
          height: '100svh',
          minHeight: '100vh',
          overflow: 'hidden',
          flexDirection: 'column',
        }}
      >
        {/* Tower */}
        <img src="/eiffel-tower-bg.jpg" alt="" aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center top',
          opacity: 0.75, filter: 'saturate(0.8)', zIndex: 0, pointerEvents: 'none',
        }} />
        {/* Top blur */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          mask: 'linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 12%)',
          WebkitMask: 'linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 12%)',
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(180deg,rgba(244,241,234,0.82) 0%,rgba(244,241,234,0.45) 15%,rgba(244,241,234,0.2) 30%,rgba(244,241,234,0.05) 55%,transparent 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2, flex: 1,
          display: 'flex', flexDirection: 'column',
          paddingTop: '115px', paddingLeft: '1.1rem',
          paddingRight: '1.1rem', paddingBottom: '5rem',
          boxSizing: 'border-box', height: '100%',
        }}>
          {/* Badge */}
          <div style={{ ...fade(0), display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: 'rgba(15,23,42,0.05)', borderRadius: '9999px', marginBottom: '0.75rem', width: 'fit-content' }}>
            <MapPin size={14} className="text-gold" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(30,30,30,0.7)', letterSpacing: '0.025em', whiteSpace: 'nowrap' }}>{t('hero.trustLine')}</span>
          </div>
          {/* Headline */}
          <h1 className="font-serif text-navy" style={{ ...fade(100), fontSize: '2rem', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            {t('hero.headline')}
          </h1>
          {/* Subheadline */}
          <p className="text-charcoal/70" style={{ ...fade(200), fontSize: '0.875rem', lineHeight: 1.55, margin: 0 }}>
            {t('hero.subheadline')}
          </p>
          {/* CTA — pushed to bottom via margin-top auto */}
          <div style={{ ...fade(300), marginTop: 'clamp(2rem,12vh,5rem)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <button onClick={scrollToContact} className="btn-primary group">
              <span>{t('hero.cta')}</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={scrollToBeforeAfter} className="btn-outline">Voir les exemples</button>
          </div>
        </div>
      </div>

      {/* Mobile Google card — appears on scroll, below 100svh hero */}
      <div className="hero-mobile-card" style={{ padding: '2rem 1.1rem', background: '#F4F1EA' }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
          <GoogleMockup t={t} />
        </div>
      </div>

      {/* ================================================
          DESKTOP HERO  (>= 768px)
          60/40 flex row. STRICT height: 100vh.
          overflow: hidden on section AND both columns.
          Tower left-aligned. Card starts at 88px (header).
          NO content below — impossible due to overflow hidden.
      ================================================ */}
      <div
        className="hero-desktop"
        style={{
          position: 'relative',
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
        {/* Top blur */}
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

        {/* LEFT — 60%, text centered vertically in viewport below header */}
        <div style={{
          position: 'relative', zIndex: 2,
          flex: '0 0 60%', maxWidth: '60%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'calc(88px + 1rem) 3rem 3rem 5rem',
          boxSizing: 'border-box', overflow: 'hidden',
        }}>
          {/* Badge */}
          <div style={{ ...fade(0), display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: 'rgba(15,23,42,0.05)', borderRadius: '9999px', marginBottom: '1rem', width: 'fit-content' }}>
            <MapPin size={14} className="text-gold" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(30,30,30,0.7)', letterSpacing: '0.025em', whiteSpace: 'nowrap' }}>{t('hero.trustLine')}</span>
          </div>
          {/* Headline */}
          <h1 className="font-serif text-navy" style={{ ...fade(100), fontSize: 'clamp(2.5rem,4vw,3.75rem)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            {t('hero.headline')}
          </h1>
          {/* Subheadline */}
          <p className="text-charcoal/70" style={{ ...fade(200), fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {t('hero.subheadline')}
          </p>
          {/* CTA */}
          <div style={{ ...fade(300), display: 'flex', flexDirection: 'row', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={scrollToContact} className="btn-primary group">
              <span>{t('hero.cta')}</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={scrollToBeforeAfter} className="btn-outline">Voir les exemples</button>
          </div>
        </div>

        {/* RIGHT — 40%, card fills exactly from header to bottom */}
        <div style={{
          position: 'relative', zIndex: 2,
          flex: '0 0 40%', maxWidth: '40%',
          display: 'flex', flexDirection: 'column',
          paddingTop: '88px',
          height: '100vh', maxHeight: '100vh',
          boxSizing: 'border-box', overflow: 'hidden',
        }}>
          <div style={{ ...fade(400), flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              borderRadius: '12px 0 0 0', overflow: 'hidden',
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
        <div style={{ width: 32, height: 32, background: 'white', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#2563EB', fontWeight: 700, fontSize: '0.875rem' }}>G</span>
        </div>
        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>Google Business Profile</span>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', background: 'white' }}>
        {/* Name + rating */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', marginBottom: '0.5rem' }}>{t('googleMockup.businessName') as string}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>{t('googleMockup.rating') as string}</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4].map(i => <Star key={i} size={15} className="text-yellow-400" fill="currentColor" />)}
              <Star size={15} className="text-yellow-400" fill="url(#half-star)" />
            </div>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>({t('googleMockup.reviews') as string})</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0 }}>{t('googleMockup.category') as string}</p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {[['Itinéraire', true], ['Enregistrer', false], ['Site web', false]].map(([label, primary]) => (
            <button key={label as string} style={{
              flex: 1, fontSize: '0.75rem', fontWeight: 500, padding: '0.5rem 0.25rem',
              borderRadius: '9999px', border: 'none', cursor: 'pointer',
              background: primary ? '#2563EB' : '#F3F4F6', color: primary ? 'white' : '#374151',
              minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{label as string}</button>
          ))}
        </div>

        {/* Info */}
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
          <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.5, margin: 0 }}>{t('googleMockup.description') as string}</p>
        </div>

        {/* Review */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#A78BFA,#F472B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 500 }}>ML</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#111', margin: 0 }}>Marie L.</p>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={9} className="text-yellow-400" fill="currentColor" />)}
              </div>
            </div>
            <span style={{ fontSize: '0.7rem', color: '#9CA3AF', marginLeft: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>il y a 2 sem.</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', fontStyle: 'italic', margin: 0 }}>{t('googleMockup.reviewPreview') as string}</p>
        </div>

        {/* Post */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div style={{ width: 22, height: 22, background: '#E5E7EB', borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>📸</div>
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
