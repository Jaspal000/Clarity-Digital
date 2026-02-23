import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Star, MapPin, Clock, Phone } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToBeforeAfter = () => document.getElementById('before-after')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" style={{ overflowX: 'hidden' }}>

      {/* ─── PURE CSS BREAKPOINT — no Tailwind md: dependency ─── */}
      <style>{`
        .h-mobile        { display: flex; flex-direction: column; }
        .h-mobile-card   { display: block; }
        .h-desktop       { display: none; }

        @media (min-width: 768px) {
          .h-mobile        { display: none !important; }
          .h-mobile-card   { display: none !important; }
          .h-desktop       { display: flex !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          MOBILE  < 768px
          Single column. Tower centered. CTA near bottom.
      ═══════════════════════════════════════════════════════ */}
      <div className="h-mobile" style={{
        position: 'relative',
        height: '100svh', minHeight: '100vh',
        overflow: 'hidden', flexDirection: 'column',
      }}>
        <img src="/eiffel-tower-bg.jpg" alt="" aria-hidden="true" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center top',
          opacity: 0.4, filter: 'saturate(0.8)', zIndex: 0, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          mask: 'linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 12%)',
          WebkitMask: 'linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 12%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(180deg,rgba(244,241,234,0.92) 0%,rgba(244,241,234,0.7) 15%,rgba(244,241,234,0.45) 35%,rgba(244,241,234,0.15) 60%,transparent 100%)',
        }} />
        <div style={{
          position: 'relative', zIndex: 2, flex: 1, height: '100%',
          display: 'flex', flexDirection: 'column',
          padding: '115px 1.1rem 5rem', boxSizing: 'border-box',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: 'rgba(15,23,42,0.05)', borderRadius: '9999px', marginBottom: '0.75rem', width: 'fit-content', opacity: isVisible ? 1 : 0, transition: 'opacity .7s, transform .7s', transform: isVisible ? 'none' : 'translateY(16px)' }}>
            <MapPin size={14} className="text-gold" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(30,30,30,0.7)', letterSpacing: '0.025em', whiteSpace: 'nowrap' }}>{t('hero.trustLine')}</span>
          </div>
          <h1 className="font-serif text-navy" style={{ fontSize: '2rem', lineHeight: 1.2, marginBottom: '0.75rem', opacity: isVisible ? 1 : 0, transition: 'opacity .7s .1s, transform .7s .1s', transform: isVisible ? 'none' : 'translateY(24px)' }}>
            {t('hero.headline')}
          </h1>
          <p className="text-charcoal/70" style={{ fontSize: '0.875rem', lineHeight: 1.55, margin: 0, opacity: isVisible ? 1 : 0, transition: 'opacity .7s .2s, transform .7s .2s', transform: isVisible ? 'none' : 'translateY(24px)' }}>
            {t('hero.subheadline')}
          </p>
          <div style={{ marginTop: 'clamp(2rem,12vh,5rem)', display: 'flex', flexDirection: 'column', gap: '0.65rem', opacity: isVisible ? 1 : 0, transition: 'opacity .7s .3s, transform .7s .3s', transform: isVisible ? 'none' : 'translateY(24px)' }}>
            <button onClick={scrollToContact} className="btn-primary group">
              <span>{t('hero.cta')}</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={scrollToBeforeAfter} className="btn-outline">Voir les exemples</button>
          </div>
        </div>
      </div>

      {/* Mobile card — below fold, scroll to see */}
      <div className="h-mobile-card" style={{ padding: '2rem 1.1rem', background: '#F4F1EA' }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
          <GoogleMockup t={t} headerPaddingTop={0} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          DESKTOP  >= 768px

          Two columns, flush to all 4 edges, exactly 100vh.
          LEFT 60%  — tower image + hero text
          RIGHT 40% — Google card from very top of page.
                      Card blue header has padding-top: 88px
                      so "Google Business Profile" text clears
                      the nav and doesn't overlap it.
          overflow: hidden everywhere — zero chance of bleed.
      ═══════════════════════════════════════════════════════ */}
      <div className="h-desktop" style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'stretch',
      }}>

        {/* ── LEFT 60%: tower + text ── */}
        <div style={{
          position: 'relative',
          flex: '0 0 60%', width: '60%',
          height: '100vh', overflow: 'hidden',
        }}>
          {/* Tower image */}
          <img src="/eiffel-tower-bg.jpg" alt="" aria-hidden="true" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            opacity: 0.4, filter: 'saturate(0.8)', zIndex: 0, pointerEvents: 'none',
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
            background: 'linear-gradient(90deg,rgba(244,241,234,0.96) 0%,rgba(244,241,234,0.82) 25%,rgba(244,241,234,0.5) 55%,rgba(244,241,234,0.1) 85%,transparent 100%)',
          }} />
          {/* Hero text — vertically centered in space below header */}
          <div style={{
            position: 'relative', zIndex: 2,
            height: '100%', display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            /* top padding clears fixed header */
            padding: 'calc(88px + 2rem) 3rem 3rem 5rem',
            boxSizing: 'border-box',
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: 'rgba(15,23,42,0.06)', borderRadius: '9999px', marginBottom: '1.25rem', width: 'fit-content', opacity: isVisible ? 1 : 0, transition: 'opacity .7s, transform .7s', transform: isVisible ? 'none' : 'translateY(16px)' }}>
              <MapPin size={14} className="text-gold" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', color: 'rgba(30,30,30,0.7)', letterSpacing: '0.025em', whiteSpace: 'nowrap' }}>{t('hero.trustLine')}</span>
            </div>
            <h1 className="font-serif text-navy" style={{ fontSize: 'clamp(2.4rem,3.8vw,3.6rem)', lineHeight: 1.12, marginBottom: '1.25rem', opacity: isVisible ? 1 : 0, transition: 'opacity .7s .1s, transform .7s .1s', transform: isVisible ? 'none' : 'translateY(24px)' }}>
              {t('hero.headline')}
            </h1>
            <p className="text-charcoal/70" style={{ fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2.25rem', opacity: isVisible ? 1 : 0, transition: 'opacity .7s .2s, transform .7s .2s', transform: isVisible ? 'none' : 'translateY(24px)' }}>
              {t('hero.subheadline')}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: isVisible ? 1 : 0, transition: 'opacity .7s .3s, transform .7s .3s', transform: isVisible ? 'none' : 'translateY(24px)' }}>
              <button onClick={scrollToContact} className="btn-primary group">
                <span>{t('hero.cta')}</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={scrollToBeforeAfter} className="btn-outline">Voir les exemples</button>
            </div>
          </div>
        </div>

        {/* ── RIGHT 40%: Google card flush top-to-bottom ── */}
        <div style={{
          flex: '0 0 40%', width: '40%',
          height: '100vh', maxHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          /* subtle shadow separating from left */
          boxShadow: '-12px 0 40px rgba(0,0,0,0.08)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s .4s, transform 1s .4s',
          transform: isVisible ? 'none' : 'translateX(32px)',
        }}>
          {/*
            Card starts at page top (0px).
            The blue header has paddingTop=88px so
            "Google Business Profile" text sits BELOW
            the nav bar — no overlap, no gap.
          */}
          <GoogleMockup t={t} headerPaddingTop={88} />
        </div>

      </div>
    </section>
  );
}

/* ── Google Business Mockup ──
   headerPaddingTop: extra top padding on the blue header.
   On desktop: 88px clears the fixed nav.
   On mobile:  0 (no fixed nav overlap issue).
*/
function GoogleMockup({ t, headerPaddingTop = 0 }: { t: (key: string) => unknown; headerPaddingTop?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>

      {/* Blue header — paddingTop clears fixed nav on desktop */}
      <div style={{
        background: 'linear-gradient(to right,#1D4ED8,#2563EB)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        paddingTop: `calc(${headerPaddingTop}px + 0.75rem)`,
        paddingBottom: '0.75rem',
        paddingLeft: '1rem', paddingRight: '1rem',
        flexShrink: 0,
      }}>
        {/* Official Google 'G' Logo SVG Wrapper */}
        <div style={{ width: 34, height: 34, background: 'white', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>Google Business Profile</span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '1.1rem 1.25rem', background: 'white' }}>

        {/* Business name + rating */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' }}>{t('googleMockup.businessName') as string}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111' }}>{t('googleMockup.rating') as string}</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4].map(i => <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />)}
              <Star size={16} className="text-yellow-400" fill="url(#half-star-d)" />
            </div>
            <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>({t('googleMockup.reviews') as string})</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>{t('googleMockup.category') as string}</p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {[['Itinéraire', true], ['Enregistrer', false], ['Site web', false]].map(([label, primary]) => (
            <button key={label as string} style={{
              flex: 1, fontSize: '0.8rem', fontWeight: 500,
              padding: '0.55rem 0.25rem', borderRadius: '9999px',
              border: 'none', cursor: 'pointer',
              background: primary ? '#2563EB' : '#F3F4F6',
              color: primary ? 'white' : '#374151',
              minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{label as string}</button>
          ))}
        </div>

        {/* Info rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
            <MapPin size={16} style={{ color: '#9CA3AF', flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: '0.82rem', color: '#374151' }}>{t('googleMockup.address') as string}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
            <Clock size={16} style={{ color: '#9CA3AF', flexShrink: 0, marginTop: 2 }} />
            <div>
              <span style={{ fontSize: '0.82rem', color: '#16A34A', fontWeight: 600 }}>Ouvert</span>
              <span style={{ fontSize: '0.82rem', color: '#374151', marginLeft: '0.4rem' }}>{t('googleMockup.hours') as string}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Phone size={16} style={{ color: '#9CA3AF', flexShrink: 0 }} />
            <span style={{ fontSize: '0.82rem', color: '#374151' }}>01 42 34 56 78</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.85rem', marginBottom: '0.85rem' }}>
          <p style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.55, margin: 0 }}>{t('googleMockup.description') as string}</p>
        </div>

        {/* Review */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#A78BFA,#F472B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 600 }}>ML</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111', margin: 0 }}>Marie L.</p>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-yellow-400" fill="currentColor" />)}
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#9CA3AF', marginLeft: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>il y a 2 sem.</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', fontStyle: 'italic', margin: 0 }}>{t('googleMockup.reviewPreview') as string}</p>
        </div>

        {/* Post */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.85rem', marginTop: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div style={{ width: 24, height: 24, background: '#E5E7EB', borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>📸</div>
            <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Publié il y a 3 jours</span>
          </div>
          <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111', margin: '0 0 0.25rem' }}>{t('googleMockup.postTitle') as string}</p>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>{t('googleMockup.postContent') as string}</p>
        </div>
      </div>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="half-star-d" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="#D1D5DB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
