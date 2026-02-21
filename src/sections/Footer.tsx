import { useLanguage } from '@/context/LanguageContext';
import { Mail, Linkedin, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';

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
      {/* Subtle grid texture at 2% opacity */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F4F1EA' fill-opacity='0.5'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Thin gold top divider */}
      <div className="relative z-10 section-padding pt-12">
        <div className="w-full h-px bg-gold/25" />
      </div>

      <div className="relative z-10 section-padding py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
          {/* Left: Company Info */}
          <div>
            <Logo variant="footer" color="ivory" />
            <div className="flex items-center gap-2 text-sm text-ivory/50 mt-6">
              <MapPin size={14} strokeWidth={1.5} />
              <span>{t('footer.location')}</span>
            </div>
          </div>

          {/* Center: Navigation */}
          <div className="md:text-center">
            <h4 className="text-xs uppercase tracking-widest text-ivory/30 mb-8 font-semibold">
              Navigation
            </h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-300 relative inline-block group tracking-wide"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Contact & Social */}
          <div className="md:text-right">
            <h4 className="text-xs uppercase tracking-widest text-ivory/30 mb-8 font-semibold">
              Contact
            </h4>
            <div className="space-y-5">
              <a
                href="mailto:contact@clarte-digital.fr"
                className="flex md:justify-end items-center gap-2 text-sm text-ivory/60 hover:text-ivory transition-colors duration-300 group"
              >
                <Mail size={16} strokeWidth={1.5} className="text-gold/50 group-hover:text-gold transition-colors duration-300" />
                <span>{t('footer.email')}</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex md:justify-end items-center gap-2 text-sm text-ivory/60 hover:text-ivory transition-colors duration-300 group"
              >
                <Linkedin size={16} strokeWidth={1.5} className="text-gold/50 group-hover:text-gold transition-colors duration-300" />
                <span>{t('footer.linkedin')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 section-padding py-8">
        <div className="w-full h-px bg-gold/15 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/35 tracking-wide">
            {t('footer.copyright')} — {t('footer.rights')}
          </p>
          <p className="text-xs text-ivory/25 tracking-wide">
            {t('footer.siret')}
          </p>
        </div>
      </div>
    </footer>
  );
}
