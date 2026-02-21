import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star, MapPin, Clock, Phone, Image as ImageIcon, Calendar, Check, X, MessageSquare, ChevronRight } from 'lucide-react';

type TabType = 'restaurant' | 'salon' | 'artisan';

/* ------------------------------------------------------------------ */
/*  Hardcoded realistic business data — French only (Google profiles   */
/*  are always displayed in French regardless of site language)         */
/* ------------------------------------------------------------------ */

const businesses: Record<TabType, {
  name: string;
  primaryCategory: string;
  secondaryCategory: string;
  address: string;
  phone: string;
  before: {
    rating: string;
    ratingNum: number;
    reviews: string;
    hours: string;
    description: string;
    photos: string;
    issues: string[];
  };
  after: {
    rating: string;
    ratingNum: number;
    reviews: string;
    hours: string[];
    description: string;
    photos: string;
    responses: string;
    reviewsList: {
      name: string;
      time: string;
      stars: number;
      text: string;
      ownerReply: string;
    }[];
    post: { title: string; date: string };
    improvements: string[];
  };
}> = {
  restaurant: {
    name: 'Bistro Montclair',
    primaryCategory: 'Restaurant francais',
    secondaryCategory: 'Bistro',
    address: '27 Rue Oberkampf, 75011 Paris',
    phone: '01 48 05 62 14',
    before: {
      rating: '3,1',
      ratingNum: 3.1,
      reviews: '23 avis',
      hours: 'Horaires non renseignes',
      description: 'Restaurant a Paris. Cuisine traditionnelle.',
      photos: '2 photos',
      issues: [
        'Description generique, sans mots-cles',
        'Aucune categorie secondaire',
        'Photos floues et anciennes',
        'Aucune reponse aux avis',
        'Pas de publications',
      ],
    },
    after: {
      rating: '4,3',
      ratingNum: 4.3,
      reviews: '87 avis',
      hours: [
        'Lundi-Samedi : 12:00-14:30 / 19:00-22:30',
        'Dimanche : Ferme',
      ],
      description: 'Cuisine francaise de saison au coeur du 11eme. Produits frais du marche, carte des vins selectionnee par notre sommelier. Terrasse calme, reservation conseillee le week-end.',
      photos: '18 photos',
      responses: 'Repond sous 24h',
      reviewsList: [
        {
          name: 'Sophie Martin',
          time: 'il y a 3 semaines',
          stars: 4,
          text: 'Bonne cuisine, cadre agreable. Un peu d\'attente le midi mais ca reste une bonne adresse.',
          ownerReply: 'Merci Sophie pour votre retour, a bientot.',
        },
        {
          name: 'Julien Dubois',
          time: 'il y a 1 mois',
          stars: 5,
          text: 'Service rapide et plats bien presentes. Mention speciale pour le dessert.',
          ownerReply: 'Merci Julien pour votre confiance.',
        },
      ],
      post: { title: 'Menu de saison \u2013 Nouveautes', date: 'Publie il y a 6 jours' },
      improvements: [
        'Description optimisee avec mots-cles locaux',
        'Categories primaire et secondaire renseignees',
        'Reponses personnalisees aux avis',
        'Publications regulieres',
      ],
    },
  },
  salon: {
    name: 'Institut Elegance Paris 15',
    primaryCategory: 'Institut de beaute',
    secondaryCategory: 'Salon de manucure',
    address: '54 Rue Lecourbe, 75015 Paris',
    phone: '01 45 67 89 21',
    before: {
      rating: '3,4',
      ratingNum: 3.4,
      reviews: '14 avis',
      hours: 'Horaires non precises',
      description: 'Institut de beaute. Soins et manucure.',
      photos: '1 photo',
      issues: [
        'Description trop courte',
        'Categorie secondaire manquante',
        'Photo unique, non professionnelle',
        'Aucune reponse aux avis',
        'Pas de publications',
      ],
    },
    after: {
      rating: '4,6',
      ratingNum: 4.6,
      reviews: '52 avis',
      hours: [
        'Mardi-Samedi : 10:00-19:00',
        'Dimanche & Lundi : Ferme',
      ],
      description: 'Institut de beaute et bien-etre dans le 15eme. Soins visage sur-mesure, epilation douce, manucure semi-permanente. Equipe diplomee, ambiance calme et soignee.',
      photos: '14 photos',
      responses: 'Repond sous 12h',
      reviewsList: [
        {
          name: 'Camille Laurent',
          time: 'il y a 2 semaines',
          stars: 5,
          text: 'Tres satisfaite de mon soin visage. Personnel a l\'ecoute.',
          ownerReply: 'Merci Camille pour votre confiance.',
        },
        {
          name: 'Claire Moreau',
          time: 'il y a 1 mois',
          stars: 4,
          text: 'Prestation de qualite. Petit retard au rendez-vous.',
          ownerReply: 'Merci Claire, nous prenons note.',
        },
      ],
      post: { title: 'Nouvelle prestation \u2013 Soin hydratant', date: 'Publie il y a 10 jours' },
      improvements: [
        'Description detaillee avec specialites',
        'Deux categories pertinentes',
        'Reponses rapides et personnalisees',
        'Posts reguliers sur les nouveautes',
      ],
    },
  },
  artisan: {
    name: 'Dupont Plomberie',
    primaryCategory: 'Plombier',
    secondaryCategory: 'Service de depannage',
    address: '18 Rue de Charenton, 75012 Paris',
    phone: '06 23 45 78 91',
    before: {
      rating: '2,9',
      ratingNum: 2.9,
      reviews: '11 avis',
      hours: 'Non renseigne',
      description: 'Plombier professionnel. Depannage rapide.',
      photos: '0 photos',
      issues: [
        'Description minimale',
        'Aucune photo de chantier',
        'Categorie secondaire absente',
        'Pas de reponses aux avis',
        'Aucune publication',
      ],
    },
    after: {
      rating: '4,2',
      ratingNum: 4.2,
      reviews: '39 avis',
      hours: [
        'Lundi-Samedi : 8:00-19:00',
        'Urgences 7j/7',
      ],
      description: 'Plombier chauffagiste certifie dans le 12eme et arrondissements voisins. Depannage urgent, installation sanitaire, entretien chaudiere. Devis gratuit, intervention rapide.',
      photos: '9 photos',
      responses: 'Repond sous 48h',
      reviewsList: [
        {
          name: 'Antoine Bernard',
          time: 'il y a 2 semaines',
          stars: 5,
          text: 'Intervention rapide pour une fuite. Travail propre.',
          ownerReply: 'Merci Antoine pour votre retour.',
        },
        {
          name: 'Nicolas Petit',
          time: 'il y a 3 semaines',
          stars: 4,
          text: 'Depannage correct. Explications claires.',
          ownerReply: 'Merci Nicolas.',
        },
      ],
      post: { title: 'Installation chauffe-eau \u2013 Intervention recente', date: 'Publie il y a 8 jours' },
      improvements: [
        'Description structuree avec zone d\'intervention',
        'Photos de chantiers recents',
        'Reponses aux avis clients',
        'Publications avec exemples de travaux',
      ],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Render star rows                                                    */
/* ------------------------------------------------------------------ */

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.2;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  const id = `half-${rating}`;
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={size} className="text-yellow-400" fill="currentColor" />
      ))}
      {hasHalf && (
        <>
          <svg width={0} height={0}><defs><linearGradient id={id}><stop offset="50%" stopColor="#FACC15" /><stop offset="50%" stopColor="#D1D5DB" /></linearGradient></defs></svg>
          <Star size={size} className="text-yellow-400" fill={`url(#${id})`} />
        </>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={size} className="text-gray-300" />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Google-style tab bar                                                */
/* ------------------------------------------------------------------ */

function GoogleTabs({ active }: { active?: string }) {
  const tabs = ['Avis', 'Photos', '\u00C0 propos'];
  return (
    <div className="flex gap-0 border-t border-gray-100">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`flex-1 py-2.5 text-[11px] font-medium tracking-wide text-center transition-colors ${
            tab === (active ?? 'Avis')
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-400'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  MAIN COMPONENT                                                      */
/* ================================================================== */

export default function BeforeAfter() {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('restaurant');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const tabLabels: { id: TabType; label: string }[] = [
    { id: 'restaurant', label: language === 'fr' ? 'Restaurant' : 'Restaurant' },
    { id: 'salon', label: language === 'fr' ? 'Salon' : 'Salon' },
    { id: 'artisan', label: language === 'fr' ? 'Artisan' : 'Artisan' },
  ];

  const biz = businesses[activeTab];

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-navy overflow-hidden"
    >
      {/* Grid texture at 2% */}
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
          {tabLabels.map((tab) => (
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

        {/* Before / After Cards */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          key={activeTab}
        >
          {/* -------- BEFORE -------- */}
          <div className="flex flex-col bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(14, 26, 43, 0.08)' }}>
            {/* Header badge */}
            <div className="bg-red-50 px-6 py-3.5 border-b border-red-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-[11px] font-semibold uppercase tracking-wider rounded-full">
                <X size={11} />
                {t('beforeAfter.before.label')}
              </span>
              <span className="text-[11px] text-red-500/70">
                {language === 'fr' ? 'Avant optimisation' : 'Before optimization'}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
              {/* Profile header */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={22} className="text-gray-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">{biz.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{biz.primaryCategory}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-sm font-bold text-gray-600">{biz.before.rating}</span>
                    <Stars rating={biz.before.ratingNum} size={12} />
                    <span className="text-[11px] text-gray-400">({biz.before.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Info lines */}
              <div className="space-y-1.5 mb-4 text-[12px] text-gray-400">
                <div className="flex items-center gap-2"><MapPin size={12} /><span>{biz.address}</span></div>
                <div className="flex items-center gap-2"><Clock size={12} /><span>{biz.before.hours}</span></div>
              </div>

              {/* Description */}
              <div className="border-t border-gray-100 pt-3 mb-4">
                <p className="text-[12px] text-gray-500 leading-relaxed">{biz.before.description}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-5 mb-4 text-[11px] text-gray-400">
                <div className="flex items-center gap-1.5"><ImageIcon size={12} /><span>{biz.before.photos}</span></div>
                <div className="flex items-center gap-1.5"><MessageSquare size={12} /><span>0 reponses</span></div>
              </div>

              {/* Issues list */}
              <div className="space-y-1.5 mb-4">
                {biz.before.issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <X size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[12px] text-gray-500">{issue}</span>
                  </div>
                ))}
              </div>

              {/* Spacer pushes tabs to bottom */}
              <div className="flex-1" />

              {/* Tab bar */}
              <GoogleTabs active="Avis" />
            </div>
          </div>

          {/* -------- AFTER -------- */}
          <div
            className="flex flex-col bg-white rounded-xl overflow-hidden relative"
            style={{ boxShadow: '0 8px 32px rgba(14, 26, 43, 0.08)', border: '1px solid rgba(184, 156, 94, 0.12)' }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.15), transparent)' }} />

            {/* Header badge */}
            <div className="bg-green-50 px-6 py-3.5 border-b border-green-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-[11px] font-semibold uppercase tracking-wider rounded-full">
                <Check size={11} />
                {t('beforeAfter.after.label')}
              </span>
              <span className="text-[11px] text-green-600/70">
                {language === 'fr' ? 'Apres optimisation' : 'After optimization'}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
              {/* Profile header */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0 border border-gold/20">
                  <span className="text-xl">
                    {activeTab === 'restaurant' && '\uD83C\uDF7D\uFE0F'}
                    {activeTab === 'salon' && '\u2728'}
                    {activeTab === 'artisan' && '\uD83D\uDD27'}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">{biz.name}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {biz.primaryCategory} <span className="text-gray-300 mx-1">|</span> {biz.secondaryCategory}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-sm font-bold text-gray-900">{biz.after.rating}</span>
                    <Stars rating={biz.after.ratingNum} size={12} />
                    <span className="text-[11px] text-gray-500 font-medium">({biz.after.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Info lines */}
              <div className="space-y-1.5 mb-4 text-[12px]">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={12} className="text-gold flex-shrink-0" /><span>{biz.address}</span>
                </div>
                {biz.after.hours.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-600">
                    <Clock size={12} className={i === 0 ? 'text-green-500 flex-shrink-0' : 'text-gray-300 flex-shrink-0'} />
                    {i === 0 ? <span className="text-green-600 font-medium">{h}</span> : <span>{h}</span>}
                  </div>
                ))}
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={12} className="text-gold flex-shrink-0" /><span>{biz.phone}</span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-gray-100 pt-3 mb-4">
                <p className="text-[12px] text-gray-700 leading-relaxed">{biz.after.description}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-5 mb-4 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5"><ImageIcon size={12} className="text-gold" /><span className="font-medium">{biz.after.photos}</span></div>
                <div className="flex items-center gap-1.5"><MessageSquare size={12} className="text-gold" /><span className="font-medium">{biz.after.responses}</span></div>
              </div>

              {/* Reviews */}
              <div className="space-y-3 mb-4">
                {biz.after.reviewsList.map((review, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-semibold text-blue-600">
                        {review.name.charAt(0)}
                      </div>
                      <span className="text-[11px] font-medium text-gray-800">{review.name}</span>
                      <span className="text-[10px] text-gray-400">{review.time}</span>
                    </div>
                    <div className="mb-1"><Stars rating={review.stars} size={10} /></div>
                    <p className="text-[11px] text-gray-600 leading-relaxed mb-2">{review.text}</p>
                    <div className="pl-3 border-l-2 border-gold/30">
                      <p className="text-[10px] text-gray-500 italic">
                        <span className="font-medium not-italic text-gray-600">Reponse du proprietaire</span> &mdash; {review.ownerReply}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Post preview */}
              <div className="bg-blue-50/50 rounded-lg p-3 mb-4 flex items-start gap-2.5">
                <Calendar size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-medium text-gray-800">{biz.after.post.title}</p>
                  <p className="text-[10px] text-gray-400">{biz.after.post.date}</p>
                </div>
                <ChevronRight size={12} className="text-gray-300 ml-auto mt-1" />
              </div>

              {/* Improvements */}
              <div className="space-y-1.5 mb-4">
                {biz.after.improvements.map((imp, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[12px] text-gray-700 font-medium">{imp}</span>
                  </div>
                ))}
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Tab bar */}
              <GoogleTabs active="Avis" />
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
    </section>
  );
}
