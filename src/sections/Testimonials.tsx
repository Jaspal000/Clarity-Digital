import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star } from 'lucide-react';

interface Review {
  name: string;
  business: string;
  stars: number;
  timestamp: string;
  text: string;
  ownerReply?: string;
}

export default function Testimonials() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isFr = language === 'fr';

  const reviews: Review[] = isFr
    ? [
        {
          name: 'Sophie Martin',
          business: 'Restaurant \u2013 Paris 11',
          stars: 5,
          timestamp: 'il y a 2 mois',
          text: 'Nous avons constate une nette amelioration de notre visibilite sur Google. Les demandes de reservation ont progressivement augmente. L\'accompagnement est structure et rassurant.',
          ownerReply: 'Merci pour votre confiance, Sophie. Ravie que les resultats soient au rendez-vous.',
        },
        {
          name: 'Julien Bernard',
          business: 'Plomberie \u2013 Paris 12',
          stars: 4,
          timestamp: 'il y a 1 mois',
          text: 'Bonne comprehension de notre activite. Les optimisations ont rendu notre profil plus clair et plus professionnel.',
        },
        {
          name: 'Camille Laurent',
          business: 'Institut de beaute \u2013 Paris 15',
          stars: 5,
          timestamp: 'il y a 3 semaines',
          text: 'Le suivi mensuel apporte une vraie valeur. Les avis sont mieux geres et notre presence est plus coherente.',
          ownerReply: 'Merci Camille, c\'est un plaisir de collaborer avec votre equipe.',
        },
      ]
    : [
        {
          name: 'Sophie Martin',
          business: 'Restaurant \u2013 Paris 11',
          stars: 5,
          timestamp: '2 months ago',
          text: 'We noticed a clear improvement in our Google visibility. Reservation requests have gradually increased. The support is structured and reassuring.',
          ownerReply: 'Thank you for your trust, Sophie. Glad the results are showing.',
        },
        {
          name: 'Julien Bernard',
          business: 'Plumbing \u2013 Paris 12',
          stars: 4,
          timestamp: '1 month ago',
          text: 'Good understanding of our business. The optimizations made our profile clearer and more professional.',
        },
        {
          name: 'Camille Laurent',
          business: 'Beauty Institute \u2013 Paris 15',
          stars: 5,
          timestamp: '3 weeks ago',
          text: 'The monthly follow-up brings real value. Reviews are better managed and our presence is more coherent.',
          ownerReply: 'Thank you Camille, it\'s a pleasure working with your team.',
        },
      ];

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  // Muted, professional avatar backgrounds — no gradients
  const avatarColors = ['#4A6274', '#6B7B6E', '#7A6E5D'];

  return (
    <section ref={sectionRef} className="relative py-28 lg:py-36 bg-ivory">
      <div className="relative z-10 section-padding">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {isFr ? 'Ils nous font confiance' : 'They Trust Us'}
          </h2>
          <p
            className={`text-base text-charcoal/55 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {isFr
              ? 'Temoignages d\'entreprises locales accompagnees'
              : 'Testimonials from supported local businesses'}
          </p>
        </div>

        {/* Reviews Grid — staggered on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto lg:items-start">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 120 + 200}ms`,
                // Slight stagger offset on desktop: middle card pushed down
                marginTop: index === 1 ? undefined : undefined,
              }}
            >
              <div
                className="bg-white rounded-lg border border-charcoal/[0.06] flex flex-col h-full"
                style={{
                  boxShadow: '0 2px 12px rgba(14, 26, 43, 0.04)',
                  padding: '32px 28px',
                  // Middle card slightly offset for visual interest
                  transform: index === 1 ? 'translateY(16px)' : 'none',
                }}
              >
                {/* Header: Avatar + Name + Stars */}
                <div className="flex items-start gap-3 mb-5">
                  {/* Avatar circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                    style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
                  >
                    {getInitials(review.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy leading-tight">
                      {review.name}
                    </p>
                    <p className="text-xs text-charcoal/45 mt-0.5">{review.business}</p>
                  </div>
                </div>

                {/* Stars + Timestamp */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i <= review.stars ? 'text-amber-400' : 'text-charcoal/15'
                        }
                        fill={i <= review.stars ? 'currentColor' : 'none'}
                        strokeWidth={i <= review.stars ? 0 : 1.5}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-charcoal/35">{review.timestamp}</span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-charcoal/75 leading-relaxed">
                  {review.text}
                </p>

                {/* Owner Reply (optional) */}
                {review.ownerReply && (
                  <div className="mt-5 pt-4 border-t border-charcoal/[0.06]">
                    <p className="text-xs text-charcoal/40 font-medium mb-1.5">
                      {isFr ? 'Reponse du proprietaire' : 'Owner response'}
                    </p>
                    <p className="text-xs text-charcoal/55 leading-relaxed italic">
                      "{review.ownerReply}"
                    </p>
                  </div>
                )}

                <div className="flex-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          className={`text-center mt-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <p className="text-xs text-charcoal/35 tracking-wide">
            {isFr
              ? 'Temoignages issus de collaborations reelles.'
              : 'Testimonials from real collaborations.'}
          </p>
        </div>
      </div>
    </section>
  );
}
