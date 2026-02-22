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
          ? 'bg-white/90 backdrop-blur-sm border-b border-gold/10' // Changed bg to white so black text is visible
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-[78px] lg:h-[92px]">
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
              color={isScrolled ? 'navy' : 'navy'} // Keep logo dark
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
                /* Added 'group' for hover effect and 'text-black' for color */
                className="group relative text-sm font-medium tracking-wide transition-colors duration-300 text-black"
              >
                {item.label}
                {/* This span creates the gold underline hover effect */}
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
                className={`text-sm transition-all duration-300 font-medium ${
                  language === 'fr' 
                    ? 'text-black border-b border-gold pb-0.5' 
                    : 'text-black/50 hover:text-black'
                }`}
              >
                FR
              </button>
              <span className="text-black/30 text-sm">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-sm transition-all duration-300 font-medium ${
                  language === 'en' 
                    ? 'text-black border-b border-gold pb-0.5' 
                    : 'text-black/50 hover:text-black'
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
              className="text-sm font-semibold uppercase tracking-wide px-7 py-3 rounded transition-all duration-300 bg-navy text-white hover:bg-navy/90"
            >
              {t('nav.cta')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 transition-colors duration-300 text-black"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 transition-all duration-300 ${
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
                className="text-black hover:text-gold text-lg font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setLanguage('fr')}
              className={`text-base font-semibold tracking-widest ${language === 'fr' ? 'text-black border-b-2 border-gold pb-0.5' : 'text-black/40'}`}
            >
              FR
            </button>
            <span className="text-black/20 text-base">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`text-base font-semibold tracking-widest ${language === 'en' ? 'text-black border-b-2 border-gold pb-0.5' : 'text-black/40'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
