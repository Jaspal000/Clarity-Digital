import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('clarte-language') as Language;
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLanguageState(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setLanguageState(lang);
      localStorage.setItem('clarte-language', lang);
      document.documentElement.lang = lang;
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 200);
  };

  const t = (key: string): string | string[] => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return value as string | string[];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      expertise: 'Expertise',
      methodology: 'Méthodologie',
      contact: 'Contact',
      cta: 'Consultation Privée',
    },
    hero: {
      headline: 'Optimisez votre présence Google à Paris.',
      subheadline: 'Clarté Digital accompagne les entreprises locales dans l\'optimisation stratégique de leur visibilité sur Google. Méthode structurée, résultats mesurables.',
      cta: 'Demander un Diagnostic',
      trustLine: 'Basé à Paris • Accompagnement structuré',
    },
    googleMockup: {
      businessName: 'Bistro Montclair',
      category: 'Restaurant • Paris 11',
      rating: '4,4',
      reviews: '87 avis',
      address: '24 Rue de la Roquette, 75011 Paris',
      hours: 'Ouvert aujourd\'hui : 12:00–15:00, 19:00–23:00',
      description: 'Cuisine française traditionnelle dans une ambiance chaleureuse. Produits frais, menu du marché, carte des vins sélectionnée. Réservation recommandée.',
      reviewPreview: '"Excellent bistro, accueil chaleureux et plats délicieux. Une belle découverte dans le 11ème !"',
      postTitle: 'Menu du jour',
      postContent: 'Filet de bar, légumes de saison...',
    },
    beforeAfter: {
      title: 'Exemples d\'Optimisation',
      subtitle: 'Transformation stratégique de profils Google Business',
      tabs: {
        restaurant: 'Restaurant',
        salon: 'Salon',
        artisan: 'Artisan',
      },
      before: {
        label: 'Avant',
        rating: '3,2',
        reviews: '23 avis',
      },
      after: {
        label: 'Après',
        rating: '4,4',
        reviews: '87 avis',
      },
      disclaimer: 'Exemple illustratif • Résultats après 3 mois d\'accompagnement',
      restaurant: {
        name: 'Bistro Montclair',
        category: 'Restaurant • Paris 11',
        address: '24 Rue de la Roquette, 75011 Paris',
        beforeDesc: 'Restaurant traditionnel parisien. Venez découvrir nos plats.',
        afterDesc: 'Cuisine française authentique dans le 11ème arrondissement. Spécialités du terroir, produits frais du marché, ambiance conviviale. Réservation recommandée.',
      },
      salon: {
        name: 'Institut Élégance',
        category: 'Institut de beauté • Paris 15',
        address: '45 Rue du Commerce, 75015 Paris',
        beforeDesc: 'Institut de beauté. Prenez rendez-vous.',
        afterDesc: 'Institut de beauté haut de gamme dans le 15ème. Soins du visage personnalisés, épilation professionnelle, manucure spa. Expertise et bien-être.',
      },
      artisan: {
        name: 'Dupont Plomberie',
        category: 'Plombier • Paris 12',
        address: '8 Avenue Daumesnil, 75012 Paris',
        beforeDesc: 'Plombier professionnel. Intervention rapide.',
        afterDesc: 'Plombier chauffagiste certifié intervenant dans le 12ème et alentours. Dépannage urgent, installation sanitaire, entretien chaudière. Devis gratuit.',
      },
    },
    sectors: {
      title: 'Secteurs d\'Activité',
      subtitle: 'Une expertise dédiée aux entreprises locales parisiennes',
      restaurant: {
        title: 'Restaurants',
        description: 'Optimisation de la visibilité pour attirer plus de clients locaux et de touristes. Gestion des avis, photos professionnelles, posts réguliers.',
      },
      salon: {
        title: 'Salons & Instituts',
        description: 'Stratégie de réservation en ligne et gestion de réputation pour fidéliser votre clientèle et augmenter vos prises de rendez-vous.',
      },
      artisan: {
        title: 'Artisans',
        description: 'Présence digitale structurée pour valoriser votre savoir-faire et capter les demandes locales en recherche active de services.',
      },
    },
    parisContext: {
      headline: 'La visibilité locale est un levier stratégique à Paris.',
      subheadline: 'Dans chaque arrondissement, des milliers de recherches quotidiennes. Votre présence Google est souvent le premier contact avec vos futurs clients.',
    },
    testimonials: {
      title: 'Ils nous font confiance',
      subtitle: 'Témoignages d\'entreprises locales accompagnées',
      reviews: [
        {
          name: 'Sophie Martin',
          business: 'Restaurant – Paris 11',
          text: 'Nous avons constaté une amélioration significative de notre visibilité sur Google en quelques semaines. Les réservations par téléphone ont augmenté de manière notable. Une approche professionnelle et structurée que je recommande.',
        },
        {
          name: 'Julien Dubois',
          business: 'Institut de beauté – Paris 15',
          text: 'Le travail sur notre fiche Google a transformé notre activité. Nos clientes nous trouvent désormais facilement et les avis positifs se multiplient. Un accompagnement précieux pour notre développement.',
        },
        {
          name: 'Camille Laurent',
          business: 'Boulangerie – Paris 20',
          text: 'Grâce à l\'optimisation de notre profil, nous apparaissons désormais dans les premiers résultats pour "boulangerie près de chez moi". Le nombre de nouveaux clients a clairement progressé.',
        },
        {
          name: 'Antoine Bernard',
          business: 'Plombier – Paris 12',
          text: 'Avant, mes clients me trouvaient uniquement par bouche-à-oreille. Aujourd\'hui, je reçois régulièrement des appels de prospects qui m\'ont découvert sur Google. Un vrai changement pour mon activité.',
        },
        {
          name: 'Claire Moreau',
          business: 'Salon de coiffure – Paris 9',
          text: 'L\'accompagnement a été méthodique et efficace. Notre fiche est maintenant complète, attractive et bien notée. Les prises de rendez-vous en ligne ont facilité la gestion de mon planning.',
        },
        {
          name: 'Nicolas Petit',
          business: 'Café – Paris 18',
          text: 'Nous avions une fiche Google incomplète et mal optimisée. Depuis l\'intervention de Clarté Digital, notre visibilité a considérablement augmenté. Les avis clients sont mieux gérés et notre note s\'est améliorée.',
        },
      ],
    },
    methodology: {
      title: 'Notre Méthodologie',
      step1: {
        number: '01',
        title: 'Diagnostic Stratégique',
        description: 'Audit complet de votre présence actuelle, analyse concurrentielle et identification des opportunités prioritaires.',
      },
      step2: {
        number: '02',
        title: 'Optimisation de Précision',
        description: 'Restructuration méthodique de votre profil, optimisation des mots-clés locaux et alignement du contenu.',
      },
      step3: {
        number: '03',
        title: 'Croissance Continue',
        description: 'Suivi mensuel rigoureux, analyse des performances et ajustements tactiques pour maintenir votre positionnement.',
      },
    },
    investment: {
      headline: 'Une collaboration claire et transparente',
      from: 'Accompagnement à partir de',
      price: '290€ / mois',
      note1: 'Sans engagement de longue durée',
      note2: 'Nombre limité de collaborations par secteur à Paris',
      cta: 'Planifier une Consultation',
    },
    contact: {
      title: 'Discutons de votre positionnement local',
      subtitle: 'Prenez rendez-vous pour un diagnostic stratégique gratuit de votre présence Google.',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      businessType: 'Type d\'entreprise',
      message: 'Votre message',
      submit: 'Envoyer',
      success: 'Votre message a été envoyé avec succès',
    },
    footer: {
      company: 'Clarté Digital',
      tagline: 'Cabinet de Conseil en Visibilité Digitale',
      location: 'Paris, France',
      email: 'Email',
      linkedin: 'LinkedIn',
      copyright: '© 2026 Clarté Digital',
      rights: 'Tous droits réservés',
      siret: 'SIRET en cours d\'enregistrement',
    },
  },
  en: {
    nav: {
      home: 'Home',
      expertise: 'Expertise',
      methodology: 'Methodology',
      contact: 'Contact',
      cta: 'Private Consultation',
    },
    hero: {
      headline: 'Optimize Your Google Presence in Paris.',
      subheadline: 'Clarté Digital partners with local businesses to strategically optimize their Google visibility. Structured method, measurable results.',
      cta: 'Request a Diagnostic',
      trustLine: 'Based in Paris • Structured support',
    },
    googleMockup: {
      businessName: 'Bistro Montclair',
      category: 'Restaurant • Paris 11',
      rating: '4.4',
      reviews: '87 reviews',
      address: '24 Rue de la Roquette, 75011 Paris',
      hours: 'Open today: 12:00–3:00 PM, 7:00–11:00 PM',
      description: 'Traditional French cuisine in a warm atmosphere. Fresh products, market menu, curated wine list. Reservations recommended.',
      reviewPreview: '"Excellent bistro, warm welcome and delicious dishes. A great discovery in the 11th arrondissement!"',
      postTitle: 'Today\'s Menu',
      postContent: 'Sea bass fillet, seasonal vegetables...',
    },
    beforeAfter: {
      title: 'Optimization Examples',
      subtitle: 'Strategic transformation of Google Business Profiles',
      tabs: {
        restaurant: 'Restaurant',
        salon: 'Salon',
        artisan: 'Artisan',
      },
      before: {
        label: 'Before',
        rating: '3.2',
        reviews: '23 reviews',
      },
      after: {
        label: 'After',
        rating: '4.4',
        reviews: '87 reviews',
      },
      disclaimer: 'Illustrative example • Results after 3 months of support',
      restaurant: {
        name: 'Bistro Montclair',
        category: 'Restaurant • Paris 11',
        address: '24 Rue de la Roquette, 75011 Paris',
        beforeDesc: 'Traditional Parisian restaurant. Come discover our dishes.',
        afterDesc: 'Authentic French cuisine in the 11th arrondissement. Local specialties, fresh market products, friendly atmosphere. Reservations recommended.',
      },
      salon: {
        name: 'Institut Élégance',
        category: 'Beauty Institute • Paris 15',
        address: '45 Rue du Commerce, 75015 Paris',
        beforeDesc: 'Beauty institute. Make an appointment.',
        afterDesc: 'High-end beauty institute in the 15th. Personalized facial treatments, professional hair removal, spa manicures. Expertise and well-being.',
      },
      artisan: {
        name: 'Dupont Plumbing',
        category: 'Plumber • Paris 12',
        address: '8 Avenue Daumesnil, 75012 Paris',
        beforeDesc: 'Professional plumber. Quick intervention.',
        afterDesc: 'Certified plumber and heating engineer serving the 12th arrondissement and surroundings. Emergency repairs, sanitary installation, boiler maintenance. Free quote.',
      },
    },
    sectors: {
      title: 'Industries Served',
      subtitle: 'Expertise dedicated to Parisian local businesses',
      restaurant: {
        title: 'Restaurants',
        description: 'Visibility optimization to attract more local customers and tourists. Review management, professional photos, regular posts.',
      },
      salon: {
        title: 'Salons & Spas',
        description: 'Online booking strategy and reputation management to retain your clientele and increase your appointments.',
      },
      artisan: {
        title: 'Artisans',
        description: 'Structured digital presence to showcase your craftsmanship and capture local demand actively searching for services.',
      },
    },
    parisContext: {
      headline: 'Local visibility is a strategic lever in Paris.',
      subheadline: 'In every arrondissement, thousands of daily searches. Your Google presence is often the first contact with your future customers.',
    },
    testimonials: {
      title: 'They Trust Us',
      subtitle: 'Testimonials from supported local businesses',
      reviews: [
        {
          name: 'Sophie Martin',
          business: 'Restaurant – Paris 11',
          text: 'We noticed a significant improvement in our Google visibility within a few weeks. Phone reservations have increased notably. A professional and structured approach that I recommend.',
        },
        {
          name: 'Julien Dubois',
          business: 'Beauty Institute – Paris 15',
          text: 'The work on our Google listing has transformed our business. Our clients now find us easily and positive reviews are multiplying. Precious support for our development.',
        },
        {
          name: 'Camille Laurent',
          business: 'Bakery – Paris 20',
          text: 'Thanks to the optimization of our profile, we now appear in the top results for "bakery near me". The number of new customers has clearly progressed.',
        },
        {
          name: 'Antoine Bernard',
          business: 'Plumber – Paris 12',
          text: 'Before, my clients found me only through word of mouth. Today, I regularly receive calls from prospects who discovered me on Google. A real change for my business.',
        },
        {
          name: 'Claire Moreau',
          business: 'Hair Salon – Paris 9',
          text: 'The support was methodical and effective. Our listing is now complete, attractive and well-rated. Online appointments have made managing my schedule easier.',
        },
        {
          name: 'Nicolas Petit',
          business: 'Café – Paris 18',
          text: 'We had an incomplete and poorly optimized Google listing. Since Clarté Digital\'s intervention, our visibility has considerably increased. Customer reviews are better managed and our rating has improved.',
        },
      ],
    },
    methodology: {
      title: 'Our Methodology',
      step1: {
        number: '01',
        title: 'Strategic Diagnostic',
        description: 'Complete audit of your current presence, competitive analysis and identification of priority opportunities.',
      },
      step2: {
        number: '02',
        title: 'Precision Optimization',
        description: 'Methodical restructuring of your profile, optimization of local keywords and content alignment.',
      },
      step3: {
        number: '03',
        title: 'Continuous Growth',
        description: 'Rigorous monthly monitoring, performance analysis and tactical adjustments to maintain your positioning.',
      },
    },
    investment: {
      headline: 'A Clear and Transparent Partnership',
      from: 'Partnership starting from',
      price: '€290 / month',
      note1: 'No long-term commitment',
      note2: 'Limited number of partnerships per sector in Paris',
      cta: 'Schedule a Consultation',
    },
    contact: {
      title: 'Let\'s Discuss Your Local Positioning',
      subtitle: 'Book a free strategic diagnostic of your Google presence.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      businessType: 'Business Type',
      message: 'Your Message',
      submit: 'Send',
      success: 'Your message has been sent successfully',
    },
    footer: {
      company: 'Clarté Digital',
      tagline: 'Digital Visibility Consulting Firm',
      location: 'Paris, France',
      email: 'Email',
      linkedin: 'LinkedIn',
      copyright: '© 2026 Clarté Digital',
      rights: 'All rights reserved',
      siret: 'SIRET registration in progress',
    },
  },
};
