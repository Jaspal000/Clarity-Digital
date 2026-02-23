import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, MapPin, Star, Clock, Phone } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const scrollToBeforeAfter = () =>
    document.getElementById("before-after")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#F4F1EA]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">

          {/* ================= LEFT COLUMN (60%) ================= */}
          <div className="relative w-full md:w-[60%]">

            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
              <img
                src="/eiffel-tower-bg.jpg"
                alt=""
                className="w-full h-full object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EA]/95 via-[#F4F1EA]/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="pt-24 pb-16 md:pt-32 md:pb-24">

              {/* Trust Line */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 mb-4 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <MapPin size={14} className="text-gold" />
                <span className="text-xs text-charcoal/70 whitespace-nowrap">
                  {t("hero.trustLine")}
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`font-serif text-navy leading-tight mb-4 transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ fontSize: "clamp(1.9rem,4vw,3.6rem)" }}
              >
                {t("hero.headline")}
              </h1>

              {/* Subheadline */}
              <p
                className={`text-charcoal/70 mb-8 transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ fontSize: "clamp(0.95rem,2vw,1.05rem)" }}
              >
                {t("hero.subheadline")}
              </p>

              {/* Buttons */}
              <div
                className={`flex flex-col gap-3 transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <button onClick={scrollToContact} className="btn-primary group">
                  <span>{t("hero.cta")}</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={scrollToBeforeAfter}
                  className="btn-outline"
                >
                  Voir les exemples
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (40%) ================= */}
          <div className="w-full md:w-[40%] mt-12 md:mt-0 bg-white shadow-2xl rounded-xl overflow-hidden">
            <GoogleMockup t={t} />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================= GOOGLE MOCKUP ================= */

function GoogleMockup({ t }: { t: (key: string) => unknown }) {
  return (
    <div className="flex flex-col">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-sm font-bold text-blue-600">G</span>
        </div>
        <span className="text-white text-sm font-semibold">
          Google Business Profile
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Business Name */}
        <h3 className="text-lg font-bold mb-2">
          {t("googleMockup.businessName") as string}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold">
            {t("googleMockup.rating") as string}
          </span>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm text-gray-600 mb-4">

          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-gray-400 mt-1" />
            <span>{t("googleMockup.address") as string}</span>
          </div>

          <div className="flex items-start gap-2">
            <Clock size={16} className="text-gray-400 mt-1" />
            <span>{t("googleMockup.hours") as string}</span>
          </div>

          <div className="flex items-start gap-2">
            <Phone size={16} className="text-gray-400 mt-1" />
            <span>01 42 34 56 78</span>
          </div>

        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed">
          {t("googleMockup.description") as string}
        </p>

      </div>
    </div>
  );
}
