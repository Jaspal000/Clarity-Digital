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

      <div className="section-padding relative z-10">
        {/* Reverted header heights back to original */}
        <div className="flex items-center justify-between h-[78px] lg:h-[92px]">
          
          {/* Logo Section - Reverted to normal size */}
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
              color={isScrolled ? "ivory" : "navy"} 
            />
          </a>

          {/* Desktop Navigation - Reverted to original text-sm styling */}
          <nav className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`group relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isScrolled ? 'text-ivory/70 hover:text-ivory' : 'text-black'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-8">
            
            {/* Language Switcher - Ultra Pro High Quality Flags */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage('fr')}
                className={`relative overflow-hidden w-6 h-6 rounded-full transition-all duration-300 ring-2 ring-offset-1 ${
                  isScrolled ? 'ring-offset-navy' : 'ring-offset-[#F4F1EA]' // Matches your hero bg
                } ${
                  language === 'fr' 
                    ? 'ring-gold scale-110 opacity-100' 
                    : 'ring-transparent opacity-40 hover:opacity-80 hover:scale-105'
                }`}
                title="Français"
              >
                <img src="https://flagcdn.com/fr.svg" alt="FR" className="w-full h-full object-cover" />
              </button>
              
              <span className={`text-sm ${isScrolled ? 'text-ivory/20' : 'text-black/10'}`}>|</span>
              
              <button
                onClick={() => setLanguage('en')}
                className={`relative overflow-hidden w-6 h-6 rounded-full transition-all duration-300 ring-2 ring-offset-1 ${
                  isScrolled ? 'ring-offset-navy' : 'ring-offset-[#F4F1EA]'
                } ${
                  language === 'en' 
                    ? 'ring-gold scale-110 opacity-100' 
                    : 'ring-transparent opacity-40 hover:opacity-80 hover:scale-105'
                }`}
                title="English"
              >
                <img src="https://flagcdn.com/gb.svg" alt="EN" className="w-full h-full object-cover" />
              </button>
            </div>

            {/* CTA Button - Reverted to normal size */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`text-sm font-semibold uppercase tracking-wide px-7 py-3 rounded transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gold text-navy hover:bg-ivory hover:text-navy' 
                  : 'bg-navy text-white hover:bg-navy/90'
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
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 shadow-2xl transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        } ${
          isScrolled ? 'bg-navy border-t border-gold/25' : 'bg-white border-t border-gray-100'
        }`}
      >
        <div className="section-padding py-8 relative z-10">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`text-lg font-medium transition-colors ${
                  isScrolled ? 'text-ivory/80 hover:text-gold' : 'text-black hover:text-gold'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Language Switcher Flags */}
          <div className={`flex items-center gap-5 mt-8 pt-6 border-t ${isScrolled ? 'border-gold/10' : 'border-gray-100'}`}>
            <button
              onClick={() => setLanguage('fr')}
              className={`flex items-center gap-3 transition-all duration-300 ${language === 'fr' ? 'opacity-100' : 'opacity-40'}`}
            >
              <div className={`w-8 h-8 rounded-full overflow-hidden ring-2 ${language === 'fr' ? 'ring-gold' : 'ring-transparent'}`}>
                <img src="https://flagcdn.com/fr.svg" alt="FR" className="w-full h-full object-cover" />
              </div>
              <span className={`text-base font-semibold ${isScrolled ? 'text-ivory' : 'text-black'}`}>FR</span>
            </button>
            
            <span className={`text-base ${isScrolled ? 'text-ivory/20' : 'text-black/10'}`}>|</span>
            
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-3 transition-all duration-300 ${language === 'en' ? 'opacity-100' : 'opacity-40'}`}
            >
              <div className={`w-8 h-8 rounded-full overflow-hidden ring-2 ${language === 'en' ? 'ring-gold' : 'ring-transparent'}`}>
                <img src="https://flagcdn.com/gb.svg" alt="EN" className="w-full h-full object-cover" />
              </div>
              <span className={`text-base font-semibold ${isScrolled ? 'text-ivory' : 'text-black'}`}>EN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
