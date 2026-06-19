'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// const winnerLinks = [
//   { label: 'Winner 2025', href: '/winners/winner-2025' },
//   { label: 'Winner 2024', href: '/winners/winner-2024' },
//   { label: 'Winner 2023', href: '/winners/winner-2023' },
//   { label: 'Winner 2022', href: '/winners/winner-2022' },
//   { label: 'Winner 2021', href: '/winners/winner-2021' },
//   { label: 'Winner 2020', href: '/winners/winner-2020' },
//   { label: 'Winner 2019', href: '/winners/winner-2019' },
//   { label: 'Winner 2018', href: '/winners/winner-2018' },
//   { label: 'Winner 2017', href: '/winners/winner-2017' },
//   { label: 'Winner 2016', href: '/winners/winner-2016' },
// ];

// const speakerLinks = [
//   { label: 'Speaker 2026', href: '/speakers/speaker-2026' },
//   { label: 'Speaker 2025', href: '/speakers/speaker-2025' },
//   { label: 'Speaker 2024', href: '/speakers/speaker-2024' },
//   { label: 'Speaker 2023', href: '/speakers/speaker-2023' },
//   { label: 'Speaker 2022', href: '/speakers/speaker-2022' },
//   { label: 'Speaker 2021', href: '/speakers/speaker-2021' },
//   { label: 'Speaker 2020', href: '/speakers/speaker-2020' },
//   { label: 'Speaker 2019', href: '/speakers/speaker-2019' },
//   { label: 'Speaker 2018', href: '/speakers/speaker-2018' },
//   { label: 'Speaker 2017', href: '/speakers/speaker-2017' },
//   { label: 'Speaker 2016', href: '/speakers/speaker-2016' },
// ];

// const partnerLinks = [
//   { label: 'Partner 2026', href: '/partners/partner-2026' },
//   { label: 'Past Key Partner', href: '/partners/past-key-partner' },
// ];

export default function Navbar() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [partnersOpen, setPartnersOpen] = useState(false);
  // const [activeHash, setActiveHash] = useState('');
  const winnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speakersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const partnersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // const isPartnerPage = pathname.startsWith('/partners');

  // const openPartners = () => {
  //   if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
  //   partnersCloseTimer.current = null;
  //   setPartnersOpen(true);
  // };

  // const closePartners = () => {
  //   if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
  //   partnersCloseTimer.current = setTimeout(() => {
  //     setPartnersOpen(false);
  //     partnersCloseTimer.current = null;
  //   }, 140);
  // };

  const closeAllMenus = () => {
    setMobileOpen(false);
    setPartnersOpen(false);
    setIsHidden(false);
  };

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();
    window.addEventListener('hashchange', updateHash);

    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (winnersCloseTimer.current) clearTimeout(winnersCloseTimer.current);
      if (speakersCloseTimer.current) clearTimeout(speakersCloseTimer.current);
      if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" onClick={closeAllMenus}>
          <Image src="/assets/logo/logo.webp" alt="CORE Media" width={150} height={100} priority />
        </Link>

        <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          {/* <Link
            href="/"
            className={`nav-link ${pathname === '/' && activeHash === '' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Home
          </Link> */}

          {/* <div
            className={`nav-dropdown ${partnersOpen ? 'open' : ''}`}
            onMouseEnter={openPartners}
            onMouseLeave={closePartners}
          >
            <button
              type="button"
              className={`nav-link ${isPartnerPage ? 'active' : ''}`}
              aria-expanded={partnersOpen}
              onClick={() => setPartnersOpen((open) => !open)}
            >
              Partners
              <ChevronDown size={16} />
            </button>

            {partnersOpen && (
              <div className="mega-panel" onMouseEnter={openPartners} onMouseLeave={closePartners}>
                <div className="mega-inner">
                  <div className="mega-column">
                    <ul>
                      {partnerLinks.map((partner) => (
                        <li key={partner.href}>
                          <Link
                            href={partner.href}
                            className={`mega-item ${pathname === partner.href ? 'active' : ''}`}
                            onClick={closeAllMenus}
                          >
                            <span className="mega-icon" aria-hidden />
                            <span>{partner.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div> */}
          <Link
            href="/cio-voice"
            className={`nav-link ${pathname === '/cio-voice' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            CIO Voice
            {/* CIO Voice */}
          </Link>
          <Link
            href="/thought-leadership"
            className={`nav-link ${pathname === '/thought-leadership' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Thought Leadership
            {/* Thought Leadership */}
          </Link>
          <Link
            href="/business-insights"
            className={`nav-link ${pathname === '/business-insights' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Business Insights
          </Link>
          <Link
            href="/technology"
            className={`nav-link ${pathname === '/technology' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Technology
          </Link>
          <Link
            href="/leadership-lessons"
            className={`nav-link ${pathname === '/leadership-lessons' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Leadership
            {/* Leadership Lessons */}
          </Link>

          <Link
            href="/leaderspeak"
            className={`nav-link ${pathname === '/leaderspeak' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Leader Speak
          </Link>

          <Link
            href="/events"
            className={`nav-link ${pathname === '/events' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Event
          </Link>

          <Link
            href="/blog"
            className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Blog
          </Link>

          <Link
            href="/press-release"
            className={`nav-link ${pathname === '/press-release' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Press Release
          </Link>
          {/* <Link
            href="/register"
            className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
            onClick={closeAllMenus}
          >
            Registration
          </Link> */}
        </nav>

        <div className="navbar-actions">
          <Link href="/#contact-section" className="talk-btn" onClick={closeAllMenus}>
            <span>Let’s Talk</span>

            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>

          <button
            className={`menu-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((s) => !s);
              setIsHidden(false);
            }}
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </header>
  );
}
