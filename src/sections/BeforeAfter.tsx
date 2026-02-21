import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star, MapPin, Clock, Phone, Image as ImageIcon, Calendar, Check, X } from 'lucide-react';

type TabType = 'restaurant' | 'salon' | 'artisan';

export default function BeforeAfter() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('restaurant');
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

  const tabs: { id: TabType; label: string }[] = [
    { id: 'restaurant', label: t('beforeAfter.tabs.restaurant') as string },
    { id: 'salon', label: t('beforeAfter.tabs.salon') as string },
    { id: 'artisan', label: t('beforeAfter.tabs.artisan') as string },
  ];

  const getBusinessData = (tab: TabType) => {
    const data = {
      restaurant: {
        name: t('beforeAfter.restaurant.name'),
        category: t('beforeAfter.restaurant.category'),
        address: t('beforeAfter.restaurant.address'),
        beforeDesc: t('beforeAfter.restaurant.beforeDesc'),
        afterDesc: t('beforeAfter.restaurant.afterDesc'),
      },
      salon: {
        name: t('beforeAfter.salon.name'),
        category: t('beforeAfter.salon.category'),
        address: t('beforeAfter.salon.address'),
        beforeDesc: t('beforeAfter.salon.beforeDesc'),
        afterDesc: t('beforeAfter.salon.afterDesc'),
      },
      artisan: {
        name: t('beforeAfter.artisan.name'),
        category: t('beforeAfter.artisan.category'),
        address: t('beforeAfter.artisan.address'),
        beforeDesc: t('beforeAfter.artisan.beforeDesc'),
        afterDesc: t('beforeAfter.artisan.afterDesc'),
      },
    };
    return data[tab];
  };

  const business = getBusinessData(activeTab);

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-navy overflow-hidden"
    >
      {/* Grid texture at 2% opacity */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F4F1EA' fill-opacity='0.5'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t('beforeAfter.title')}
          </h2>
          <p
            className={`text-lg text-ivory/60 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t('beforeAfter.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex justify-center gap-2 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gold text-navy'
                  : 'bg-ivory/10 text-ivory/70 hover:bg-ivory/20 hover:text-ivory'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Before/After Comparison */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Before Card */}
          <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(14, 26, 43, 0.08)' }}>
            {/* Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-wider rounded-full">
                <X size={12} />
                {t('beforeAfter.before.label')}
              </span>
              <span className="text-xs text-red-600/70">Avant optimisation</span>
            </div>

            <div className="p-7">
              {/* Business Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={24} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                  <p className="text-sm text-gray-500">{business.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-gray-700">{t('beforeAfter.before.rating')}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                      ))}
                      {[4, 5].map((i) => (
                        <Star key={i} size={14} className="text-gray-300" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">({t('beforeAfter.before.reviews')})</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} />
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>Horaires non précisés</span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 leading-relaxed">{business.beforeDesc}</p>
              </div>

              {/* Issues */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-500">Description générique</span>
                </div>
                <div className="flex items-start gap-2">
                  <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-500">Photos de faible qualité</span>
                </div>
                <div className="flex items-start gap-2">
                  <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-500">Aucune publication</span>
                </div>
              </div>
            </div>
          </div>

          {/* After Card */}
          <div 
            className="bg-white rounded-lg overflow-hidden relative"
            style={{ 
              boxShadow: '0 8px 32px rgba(14, 26, 43, 0.08)',
              border: '1px solid rgba(184, 156, 94, 0.1)',
            }}
          >
            {/* Muted green glow border at 10% opacity on top */}
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.1), transparent)',
              }}
            />
            
            {/* Header */}
            <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wider rounded-full">
                <Check size={12} />
                {t('beforeAfter.after.label')}
              </span>
              <span className="text-xs text-green-600/70">Après optimisation</span>
            </div>

            <div className="p-7">
              {/* Business Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-gold/20">
                  <span className="text-2xl">
                    {activeTab === 'restaurant' && '🍽️'}
                    {activeTab === 'salon' && '✨'}
                    {activeTab === 'artisan' && '🔧'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                  <p className="text-sm text-gray-600">{business.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-gray-900">{t('beforeAfter.after.rating')}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((i) => (
                        <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                      ))}
                      <Star size={14} className="text-yellow-400" fill="url(#half-star-after)" />
                    </div>
                    <span className="text-sm text-gray-500">({t('beforeAfter.after.reviews')})</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={14} className="text-gold" />
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock size={14} className="text-green-500" />
                  <span className="text-green-600 font-medium">Ouvert</span>
                  <span className="text-gray-600">• 09:00–19:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone size={14} className="text-gold" />
                  <span>01 42 34 56 78</span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-700 leading-relaxed">{business.afterDesc}</p>
              </div>

              {/* Improvements */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 font-medium">Description optimisée avec mots-clés locaux</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 font-medium">Photos professionnelles et actualisées</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 font-medium">Publications régulières</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p
          className={`text-center text-sm text-ivory/40 mt-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {t('beforeAfter.disclaimer')}
        </p>
      </div>

      {/* SVG for half star */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half-star-after" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="#D1D5DB" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
