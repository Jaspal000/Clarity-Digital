import { useLanguage } from '@/context/LanguageContext';
import { Mail, Linkedin, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'hero', label: t('nav.home') as string },
    { id: 'before-after', label: 'Exemples' },
    { id: 'methodology', label: t('nav.methodology') as string },
    { id: 'contact', label: t('nav.contact') as string },
  ];

  return (
    <footer className="relative bg-navy overflow-hidden">
      {/* Stone texture */}
      <div className="stone-texture absolute inset-0" />

      {/* Gold top divider */}
      <div className="relative z-10 section-padding">
        <div className="w-full h-px bg-gold/30" />
      </div>

      <div className="relative z-10 section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          {/* Left: Company Info */}
          <div>
            <div className="mb-6">
              <span className="font-serif text-2xl text-ivory">Clarté</span>
              <span className="font-sans text-2xl font-light text-ivory/80">
                Digital
              </span>
            </div>
            <p className="text-sm text-ivory/60 mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-sm text-ivory/50">
              <MapPin size={14} strokeWidth={1.5} />
              <span>{t('footer.location')}</span>
            </div>
          </div>

          {/* Center: Navigation */}
          <div className="md:text-center">
            <h4 className="text-xs uppercase tracking-wider text-ivory/40 mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-300 relative inline-block group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Contact */}
          <div className="md:text-right">
            <h4 className="text-xs uppercase tracking-wider text-ivory/40 mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:contact@clarte-digital.fr"
                className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-ivory transition-colors duration-300 group"
              >
                <Mail size={16} strokeWidth={1.5} className="text-gold/60 group-hover:text-gold transition-colors" />
                <span>{t('footer.email')}</span>
              </a>
              <div>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-ivory transition-colors duration-300 group"
                >
                  <Linkedin size={16} strokeWidth={1.5} className="text-gold/60 group-hover:text-gold transition-colors" />
                  <span>{t('footer.linkedin')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 section-padding pb-8">
        <div className="w-full h-px bg-gold/20 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/40">
            {t('footer.copyright')} — {t('footer.rights')}
          </p>
          <p className="text-xs text-ivory/30">
            {t('footer.siret')}
          </p>
        </div>
      </div>
    </footer>
  );
}
