import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? 'bg-navy border-b border-gold/25 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Texture Background (Matches Footer, only visible when scrolled) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isScrolled ? 'opacity-[0.02]' : 'opacity-0'
        }`}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F4F1EA' fill-opacity='0.5'%3E%3Cpath d='M0 0h30v30H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex items-center justify-between h-[85px] lg:h-[110px]">
          {/* Logo Section */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="group flex items-center transform-gpu transition-all duration-500 hover:opacity-90"
          >
            <div className="scale-125 lg:scale-[1.65] origin-left transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.3] lg:group-hover:scale-[1.70]">
              <Logo 
                variant="header" 
                color={isScrolled ? "ivory" : "navy"} // Adapts based on scroll
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-14">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`group relative text-[15px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 antialiased ${
                  isScrolled ? 'text-ivory/80 hover:text-ivory' : 'text-black'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gold transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage('fr')}
                className={`text-xs font-bold tracking-tighter transition-all duration-300 ${
                  language === 'fr' 
                    ? (isScrolled ? 'text-ivory border-b-2 border-gold pb-0.5' : 'text-black border-b-2 border-gold pb-0.5')
                    : (isScrolled ? 'text-ivory/40 hover:text-ivory' : 'text-black/40 hover:text-black')
                }`}
              >
                FR
              </button>
              <span className={`text-xs ${isScrolled ? 'text-ivory/20' : 'text-black/10'}`}>/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-bold tracking-tighter transition-all duration-300 ${
                  language === 'en' 
                    ? (isScrolled ? 'text-ivory border-b-2 border-gold pb-0.5' : 'text-black border-b-2 border-gold pb-0.5')
                    : (isScrolled ? 'text-ivory/40 hover:text-ivory' : 'text-black/40 hover:text-black')
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`text-[13px] font-bold uppercase tracking-widest px-9 py-4 rounded-sm transition-all duration-500 shadow-lg shadow-black/5 ${
                isScrolled 
                  ? 'bg-gold text-navy hover:bg-ivory hover:text-navy' 
                  : 'bg-black text-white hover:bg-gold hover:text-black'
              }`}
            >
              {t('nav.cta')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-ivory' : 'text-black'
            }`}
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 shadow-2xl transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        } ${
          isScrolled ? 'bg-navy border-t border-gold/25' : 'bg-white border-t border-gray-50'
        }`}
      >
        <div className="px-8 py-12 relative z-10">
          <nav className="flex flex-col gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`text-2xl font-light tracking-tight transition-colors ${
                  isScrolled ? 'text-ivory hover:text-gold' : 'text-black hover:text-gold'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
