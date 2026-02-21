import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Check } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Hardcoded bilingual content — NO dynamic translation              */
/* ------------------------------------------------------------------ */

const content = {
  fr: {
    headline: 'Une Collaboration Structurée et Orientée Résultats',
    subheadline:
      'Nous accompagnons un nombre limité d\u2019entreprises par secteur à Paris afin de garantir une progression mesurable et stratégique de leur visibilité locale.',
    cards: [
      {
        title: 'Fondation Stratégique',
        price: '590\u20AC \u2014 Intervention ponctuelle',
        description:
          'Mise en place d\u2019une base solide avant toute croissance durable.',
        bullets: [
          'Audit complet du profil Google Business',
          'Analyse concurrentielle locale',
          'Optimisation stratégique des catégories et mots-clés',
          'Restructuration complète du profil',
          'Optimisation visuelle',
          'Plan d\u2019action personnalisé',
        ],
        cta: 'Démarrer avec une Analyse Stratégique',
        highlighted: false,
        badge: null,
        footerNotes: null,
      },
      {
        title: 'Partenariat de Croissance Continue',
        price: 'À partir de 390\u20AC / mois',
        description:
          'Accompagnement mensuel pour renforcer durablement votre visibilité locale.',
        bullets: [
          'Optimisation continue',
          'Gestion stratégique des avis',
          'Publications Google régulières',
          'Suivi du positionnement local',
          'Reporting mensuel clair',
          'Ajustements stratégiques',
        ],
        cta: 'Planifier une Consultation Privée',
        highlighted: true,
        badge: 'Le Plus Choisi',
        footerNotes: [
          'Sans engagement long terme',
          'Partenariats limités par secteur à Paris',
        ],
      },
    ],
  },
  en: {
    headline: 'A Structured and Results-Oriented Partnership',
    subheadline:
      'We work with a limited number of businesses per sector in Paris to ensure measurable and strategic improvement of local visibility.',
    cards: [
      {
        title: 'Strategic Foundation',
        price: '\u20AC590 \u2014 One-Time Setup',
        description:
          'Establishing a strong foundation before sustainable growth begins.',
        bullets: [
          'Complete Google Business Profile Audit',
          'Local Competitive Analysis',
          'Strategic Category & Keyword Optimization',
          'Full Profile Restructuring',
          'Visual Optimization',
          'Personalized Action Plan',
        ],
        cta: 'Start with a Strategic Assessment',
        highlighted: false,
        badge: null,
        footerNotes: null,
      },
      {
        title: 'Ongoing Growth Partnership',
        price: 'From \u20AC390 / month',
        description:
          'Monthly partnership designed to strengthen your local visibility over time.',
        bullets: [
          'Continuous Profile Optimization',
          'Strategic Review Management',
          'Regular Google Posts',
          'Local Ranking Monitoring',
          'Clear Monthly Reporting',
          'Ongoing Strategic Adjustments',
        ],
        cta: 'Schedule a Private Consultation',
        highlighted: true,
        badge: 'Most Selected',
        footerNotes: [
          'No long-term commitment',
          'Limited partnerships per sector in Paris',
        ],
      },
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function Investment() {
  const { language } = useLanguage();
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
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const data = content[language];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-ivory-gradient"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div className="section-padding">
        <div className="max-w-[1200px] mx-auto">
          {/* ---- Section header ---- */}
          <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-[42px] lg:leading-tight text-navy mb-6 text-balance transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {data.headline}
            </h2>
            <p
              className={`text-charcoal/65 text-base lg:text-lg leading-relaxed transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {data.subheadline}
            </p>
          </div>

          {/* ---- Two pricing cards ---- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {data.cards.map((card, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col rounded-lg overflow-hidden transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${card.highlighted
                    ? 'bg-navy text-ivory ring-2 ring-gold/40'
                    : 'bg-white text-charcoal border border-charcoal/10'
                }`}
                style={{
                  transitionDelay: `${200 + idx * 150}ms`,
                  boxShadow: card.highlighted
                    ? '0 16px 48px rgba(14, 26, 43, 0.25)'
                    : '0 8px 32px rgba(14, 26, 43, 0.06)',
                }}
              >
                {/* Badge */}
                {card.badge && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gold text-navy text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-bl-lg">
                      {card.badge}
                    </div>
                  </div>
                )}

                {/* Card body */}
                <div className="flex flex-col flex-1 px-8 py-10 lg:px-10 lg:py-12">
                  {/* Title */}
                  <h3
                    className={`font-serif text-2xl lg:text-[26px] mb-3 ${
                      card.highlighted ? 'text-ivory' : 'text-navy'
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* Price */}
                  <p
                    className={`font-sans text-lg lg:text-xl font-semibold mb-4 ${
                      card.highlighted ? 'text-gold' : 'text-gold-dark'
                    }`}
                  >
                    {card.price}
                  </p>

                  {/* Description */}
                  <p
                    className={`text-sm lg:text-[15px] leading-relaxed mb-8 ${
                      card.highlighted ? 'text-ivory/70' : 'text-charcoal/60'
                    }`}
                  >
                    {card.description}
                  </p>

                  {/* Bullets */}
                  <ul className="flex-1 space-y-3 mb-10">
                    {card.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <Check
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            card.highlighted ? 'text-gold' : 'text-gold'
                          }`}
                        />
                        <span
                          className={`text-sm lg:text-[15px] leading-snug ${
                            card.highlighted ? 'text-ivory/85' : 'text-charcoal/75'
                          }`}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer notes (only on highlighted card) */}
                  {card.footerNotes && (
                    <div className="mb-8 space-y-1.5">
                      {card.footerNotes.map((note, nIdx) => (
                        <p
                          key={nIdx}
                          className="text-xs text-ivory/50 italic tracking-wide"
                        >
                          {note}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={scrollToContact}
                    className={`group inline-flex items-center justify-center w-full px-6 py-4 text-sm font-medium uppercase tracking-wide rounded transition-all duration-300 ${
                      card.highlighted
                        ? 'bg-gold text-navy hover:bg-gold-light shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30'
                        : 'bg-navy text-ivory hover:bg-navy-light shadow-md hover:shadow-lg'
                    }`}
                    style={{ transform: 'translateY(0)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'translateY(-2px)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'translateY(0)')
                    }
                  >
                    <span>{card.cta}</span>
                    <ArrowRight
                      size={16}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
