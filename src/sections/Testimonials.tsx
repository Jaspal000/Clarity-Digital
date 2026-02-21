import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const reviews = (t('testimonials.reviews') as unknown) as Array<{
    name: string;
    business: string;
    text: string;
  }>;

  // Get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Generate consistent avatar colors based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-green-400 to-green-600',
      'from-amber-400 to-amber-600',
      'from-rose-400 to-rose-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-ivory"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230E1A2B' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t('testimonials.title')}
          </h2>
          <p
            className={`text-lg text-charcoal/60 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`testimonial-card transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote size={24} className="text-gold/40" />
              </div>

              {/* Review text */}
              <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-charcoal/5">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(review.name)} flex items-center justify-center text-white text-sm font-medium`}>
                  {getInitials(review.name)}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-navy">{review.name}</p>
                  <p className="text-xs text-charcoal/50">{review.business}</p>
                </div>

                {/* Stars */}
                <div className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} className="text-gold" fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust indicator */}
        <div
          className={`flex items-center justify-center gap-6 mt-12 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {reviews.slice(0, 4).map((review, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(review.name)} border-2 border-white flex items-center justify-center text-white text-xs font-medium`}
                >
                  {getInitials(review.name)}
                </div>
              ))}
            </div>
            <span className="text-sm text-charcoal/60 ml-2">+{reviews.length} avis vérifiés</span>
          </div>
        </div>
      </div>
    </section>
  );
}
