import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import BeforeAfter from '@/sections/BeforeAfter';
import Sectors from '@/sections/Sectors';
import Methodology from '@/sections/Methodology';
import ParisContext from '@/sections/ParisContext';
import Testimonials from '@/sections/Testimonials';
import Investment from '@/sections/Investment';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-ivory overflow-x-hidden w-full">
        <Header />
        <main>
          <Hero />
          <BeforeAfter />
          <Sectors />
          <Methodology />
          <ParisContext />
          <Testimonials />
          <Investment />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
