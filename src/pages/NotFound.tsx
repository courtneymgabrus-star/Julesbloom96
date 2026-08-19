import { Link } from 'react-router-dom';
import { ArrowLeft, Flower2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page Not Found');

  return (
    <div className="bg-cream min-h-screen flex flex-col justify-between">
      <Navbar />
      
      <main className="pt-40 pb-28 px-6 flex-1 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-[#d4e5cc] rounded-full flex items-center justify-center mx-auto text-sage">
            <Flower2 className="w-8 h-8" />
          </div>

          <span className="text-[0.65rem] uppercase tracking-[0.25em] font-bold text-sage block">
            404 • Path Not Found
          </span>

          <h1 className="font-serif italic text-4xl md:text-5xl text-wine">
            A Quiet Detour
          </h1>

          <p className="text-slate text-sm leading-relaxed">
            The page or gathering you are searching for does not reside at this address. Take a deep breath and return to the main sanctuary.
          </p>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-wine text-white px-8 py-3.5 rounded-full text-[0.7rem] uppercase tracking-[0.15em] font-bold hover:bg-wine/90 transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Sanctuary Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
