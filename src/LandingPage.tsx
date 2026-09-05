import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import About from './components/About';
import Offerings from './components/Offerings';
import Yoga from './components/Yoga';
import SoundHealing from './components/SoundHealing';
import Events from './components/Events';
import PastEventsCarousel from './components/PastEventsCarousel';
import FAQ from './components/FAQ';
import Connect from './components/Connect';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import BotanicalDivider from './components/BotanicalDivider';

export default function LandingPage() {
  useEffect(() => {
    document.title = 'Juls in Bloom | Yoga & Sound Healing in Atlanta, GA';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Queer-affirming wellness sanctuary in Atlanta, GA. Yoga, sound healing, and research-led spirit work by Juls.');
    }
  }, []);

  return (
    <div className="min-h-screen selection:bg-blush/30">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <About />
        <BotanicalDivider />
        <Offerings />
        <BotanicalDivider />
        <Yoga />
        <SoundHealing />
        <BotanicalDivider />
        <Events />
        <PastEventsCarousel />
        <BotanicalDivider />
        <FAQ />
        <Connect />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
