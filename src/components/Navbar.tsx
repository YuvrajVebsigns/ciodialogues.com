// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X, ArrowUpRight } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';

// export default function Navbar() {
//   const pathname = usePathname();

//   const [isHidden, setIsHidden] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const closeAllMenus = () => {
//     setMobileOpen(false);
//     setIsHidden(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
//     >
//       <div className="navbar-container">
//         <Link href="/" className="navbar-logo" onClick={closeAllMenus}>
//           <Image src="/assets/logo/logo.webp" alt="CORE Media" width={190} height={150} priority />
//         </Link>
//       </div>
//       <div>
//         <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
//           <Link
//             href="/cio-voice"
//             className={`nav-link ${pathname === '/cio-voice' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             CIO Voice
//           </Link>

//           <Link
//             href="/thought-leadership"
//             className={`nav-link ${pathname === '/thought-leadership' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Thought Leadership
//           </Link>

//           <Link
//             href="/business-insights"
//             className={`nav-link ${pathname === '/business-insights' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Business Insights
//           </Link>

//           <Link
//             href="/technology"
//             className={`nav-link ${pathname === '/technology' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Technology
//           </Link>

//           <Link
//             href="/leadership-lessons"
//             className={`nav-link ${pathname === '/leadership-lessons' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Leadership
//           </Link>

//           <Link
//             href="/leaderspeak"
//             className={`nav-link ${pathname === '/leaderspeak' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Leader Speak
//           </Link>

//           <Link
//             href="/events"
//             className={`nav-link ${pathname === '/events' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Event
//           </Link>

//           <Link
//             href="/blog"
//             className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Blog
//           </Link>

//           <Link
//             href="/press-release"
//             className={`nav-link ${pathname === '/press-release' ? 'active' : ''}`}
//             onClick={closeAllMenus}
//           >
//             Press Release
//           </Link>
//         </nav>

//         <div className="navbar-actions">
//           <Link href="/#contact-section" className="talk-btn" onClick={closeAllMenus}>
//             <span>Let&apos;s Talk</span>

//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>

//           <button
//             type="button"
//             className={`menu-btn ${mobileOpen ? 'open' : ''}`}
//             aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={mobileOpen}
//             onClick={() => {
//               setMobileOpen((state) => !state);
//               setIsHidden(false);
//             }}
//           >
//             {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
// import { Menu, X, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAllMenus = () => {
    setMobileOpen(false);
    setIsHidden(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-top">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo" onClick={closeAllMenus}>
            <Image
              src="/assets/logo/logo.webp"
              alt="CORE Media"
              width={300}
              height={110}
              priority
            />
          </Link>

          <div className="navbar-ad">
            <span>Work without interruption</span>
          </div>
        </div>
      </div>

      <div className="navbar-bottom">
        <div className="navbar-container navbar-row">
          <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
            <Link
              href="/cio-voice"
              className={`nav-link ${pathname === '/cio-voice' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              CIO Voice
            </Link>

            <Link
              href="/thought-leadership"
              className={`nav-link ${pathname === '/thought-leadership' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              Thought
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
          </nav>

          <div className="navbar-actions">
            {/* <button type="button" className="search-btn" aria-label="Search">
              <Search size={30} />
            </button> */}

            {/* <button
              type="button"
              className={`menu-btn ${mobileOpen ? 'open' : ''}`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((state) => !state);
                setIsHidden(false);
              }}
            >
              {mobileOpen ? <X size={34} /> : <Menu size={38} />}
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
