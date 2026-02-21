import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Send, Check } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessType: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-navy"
    >
      {/* Stone texture */}
      <div className="stone-texture absolute inset-0" />

      <div className="relative z-10 section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {t('contact.title')}
            </h2>
            <p
              className={`text-lg text-ivory/60 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-ivory/70 mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 text-sm rounded-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-ivory/70 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 text-sm rounded-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
            </div>

            {/* Phone & Business Type Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-ivory/70 mb-2">
                  {t('contact.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 text-sm rounded-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-ivory/70 mb-2">
                  {t('contact.businessType')}
                </label>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 text-sm rounded-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm text-ivory/70 mb-2">
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-5 py-4 bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 text-sm rounded-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitted}
                className={`w-full sm:w-auto btn-gold group ${
                  isSubmitted ? 'bg-green-500 text-white' : ''
                }`}
              >
                {isSubmitted ? (
                  <>
                    <Check size={16} className="mr-2" />
                    <span>{t('contact.success')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('contact.submit')}</span>
                    <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>


        </div>
      </div>
    </section>
  );
}
