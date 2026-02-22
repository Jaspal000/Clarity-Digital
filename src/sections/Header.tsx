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
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[85px] lg:h-[110px]">
          {/* Logo Section - Increased Size & High Quality Scaling */}
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
                color="navy"
              />
            </div>
          </a>

          {/* Desktop Navigation - Clean Black Text */}
          <nav className="hidden lg:flex items-center gap-14">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="group relative text-[15px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 text-black antialiased"
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
                    ? 'text-black border-b-2 border-gold pb-0.5' 
                    : 'text-black/40 hover:text-black'
                }`}
              >
                FR
              </button>
              <span className="text-black/10 text-xs">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-bold tracking-tighter transition-all duration-300 ${
                  language === 'en' 
                    ? 'text-black border-b-2 border-gold pb-0.5' 
                    : 'text-black/40 hover:text-black'
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
              className="text-[13px] font-bold uppercase tracking-widest px-9 py-4 rounded-sm transition-all duration-500 bg-black text-white hover:bg-gold hover:text-black shadow-lg shadow-black/5"
            >
              {t('nav.cta')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-black"
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-50 shadow-2xl transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="px-8 py-12">
          <nav className="flex flex-col gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="text-black hover:text-gold text-2xl font-light tracking-tight transition-colors"
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
