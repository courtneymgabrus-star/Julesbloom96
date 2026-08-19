import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import brandLogo from '../assets/images/regenerated_image_1787107351523.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', isPage: false },
    { name: 'Offerings', href: '#offerings', isPage: false },
    { name: 'Studio Suite', href: '/studio', isPage: true },
    { name: 'Gatherings', href: '/gatherings', isPage: true },
    { name: 'Research', href: '/research', isPage: true },
    { name: 'FAQ', href: '#faq', isPage: false },
  ];

  const getHref = (link: { name: string; href: string; isPage: boolean }) => {
    if (link.isPage) return link.href;
    return isHome ? link.href : `/${link.href}`;
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled || !isHome ? 'bg-cream/95 shadow-sm backdrop-blur-md py-3' : 'bg-transparent'
        }`}
      >
        <Link to="/" className="group flex items-center gap-2.5">
          <img
            src={brandLogo}
            alt="Jules in Bloom"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            width="36"
            height="36"
          />
          <span className="font-serif italic text-2xl md:text-3xl tracking-tight text-wine font-medium group-hover:opacity-80 transition-opacity whitespace-nowrap">
            Jules in Bloom
          </span>
        </Link>

        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = link.isPage && location.pathname === link.href;
            return (
              <li key={link.name}>
                {link.isPage ? (
                  <Link
                    to={link.href}
                    className={`text-[0.7rem] uppercase tracking-widest transition-colors py-1 ${
                      isActive
                        ? 'text-wine font-bold border-b-2 border-wine'
                        : 'text-slate font-medium hover:text-wine'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={getHref(link)}
                    className="text-[0.7rem] uppercase tracking-widest text-slate font-medium hover:text-wine transition-colors py-1"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            );
          })}
          <li>
            <a
              href={isHome ? '#connect' : '/#connect'}
              className="text-[0.7rem] uppercase tracking-widest font-medium text-wine border border-wine px-5 py-2.5 rounded-full hover:bg-wine hover:text-white transition-all"
            >
              Book a Session
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-px bg-wine transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-px bg-wine transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-wine transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-cream/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => {
              const isActive = link.isPage && location.pathname === link.href;
              return link.isPage ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg uppercase tracking-widest font-medium ${
                    isActive ? 'text-wine font-bold underline underline-offset-8' : 'text-slate hover:text-wine'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={getHref(link)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest text-slate hover:text-wine font-medium"
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href={isHome ? '#connect' : '/#connect'}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg uppercase tracking-widest font-medium text-wine border border-wine px-8 py-3 rounded-full"
            >
              Book a Session
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
