import { Link, useLocation } from 'react-router-dom';
import { Instagram, Mail, Calendar } from 'lucide-react';
import brandLogo from '../assets/images/regenerated_image_1787107351523.png';

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'About', href: '#about', isPage: false },
    { name: 'Offerings', href: '#offerings', isPage: false },
    { name: 'Gatherings', href: '/gatherings', isPage: true },
    { name: 'Research', href: '/research', isPage: true },
    { name: 'Connect', href: '#connect', isPage: false },
  ];

  return (
    <footer className="bg-ink text-white/50 py-20 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img
            src={brandLogo || "/logo.png"}
            alt="Juls in Bloom Logo"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://i.postimg.cc/3xwr4sfh/Divine-Jules.png";
            }}
            className="w-24 md:w-28 mb-4 brightness-125 contrast-125 opacity-90 transition-opacity hover:opacity-100"
            width="112"
            height="112"
            loading="lazy"
            decoding="async"
          />
          <span className="font-serif italic text-3xl text-white/90 block mb-2">Juls in Bloom</span>
          <p className="text-sage text-[0.62rem] tracking-[0.2em] uppercase font-medium max-w-md mx-auto mb-6">
            Yoga Instructor · Sound Healer · Advocate · Research Scientist · Atlanta, GA
          </p>

          {/* Social & Booking Links */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="https://calendly.com/julesinbloom96"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Book on Calendly"
              title="Book on Calendly"
            >
              <Calendar className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/julesinbloom"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:julesinbloom96@gmail.com"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Email Juls"
              title="Email Juls"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12">
          {navItems.map((item) => (
            item.isPage ? (
              <Link key={item.name} to={item.href} className="text-[0.7rem] uppercase tracking-widest hover:text-white transition-colors font-medium">
                {item.name}
              </Link>
            ) : (
              <a key={item.name} href={isHome ? item.href : `/${item.href}`} className="text-[0.7rem] uppercase tracking-widest hover:text-white transition-colors font-medium">
                {item.name}
              </a>
            )
          ))}
        </nav>

        <div className="pt-10 border-t border-white/10 text-[0.78rem] tracking-wider">
          <p>© 2026 Juls in Bloom · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
