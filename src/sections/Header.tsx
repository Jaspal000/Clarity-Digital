import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Header() {
  const { language, setLanguage, t, isTransitioning } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: t('nav.home') as string },
    { id: 'before-after', label: 'Exemples' },
    { id: 'methodology', label: t('nav.methodology') as string },
    { id: 'contact', label: t('nav.contact') as string },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-navy/90 backdrop-blur-sm border-b border-gold/10'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-[75px] lg:h-[88px]">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <Logo 
              variant="header" 
              color={isScrolled ? 'ivory' : 'navy'}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isScrolled
                    ? 'text-ivory/70 hover:text-ivory'
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('fr')}
                className={`text-sm transition-all duration-300 ${
                  language === 'fr' 
                    ? (isScrolled ? 'text-ivory border-b border-gold pb-0.5' : 'text-navy border-b border-gold pb-0.5')
                    : (isScrolled ? 'text-ivory/50 hover:text-ivory/80' : 'text-charcoal/50 hover:text-charcoal/80')
                }`}
              >
                FR
              </button>
              <span className={`text-sm ${isScrolled ? 'text-ivory/30' : 'text-charcoal/30'}`}>|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-sm transition-all duration-300 ${
                  language === 'en' 
                    ? (isScrolled ? 'text-ivory border-b border-gold pb-0.5' : 'text-navy border-b border-gold pb-0.5')
                    : (isScrolled ? 'text-ivory/50 hover:text-ivory/80' : 'text-charcoal/50 hover:text-charcoal/80')
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`text-sm font-semibold uppercase tracking-wide px-7 py-3 rounded transition-all duration-300 ${
                isScrolled
                  ? 'bg-navy text-ivory border border-gold/30 hover:bg-navy-light hover:border-gold/50'
                  : 'bg-navy text-ivory border border-gold/30 hover:bg-navy-light hover:border-gold/50'
              }`}
            >
              {t('nav.cta')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-ivory' : 'text-navy'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-navy transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="section-padding py-8">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="text-ivory/80 hover:text-ivory text-lg font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-ivory/10">
            <button
              onClick={() => setLanguage('fr')}
              className={`text-sm ${language === 'fr' ? 'text-ivory border-b border-gold pb-0.5' : 'text-ivory/50'}`}
            >
              FR
            </button>
            <span className="text-ivory/30">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`text-sm ${language === 'en' ? 'text-ivory border-b border-gold pb-0.5' : 'text-ivory/50'}`}
            >
              EN
            </button>
          </div>

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="inline-block mt-6 bg-gold text-navy text-sm font-medium uppercase tracking-widest px-8 py-4"
          >
            {t('nav.cta')}
          </a>
        </div>
      </div>

      {/* Content Transition Overlay */}
      <div
        className={`fixed inset-0 bg-ivory z-40 pointer-events-none transition-opacity duration-300 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </header>
  );
}
