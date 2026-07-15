// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// // import { Menu, X, Search } from 'lucide-react';
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
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
//     >
//       <div className="navbar-top">
//         <div className="navbar-container">
//           <Link href="/" className="navbar-logo" onClick={closeAllMenus}>
//             <Image
//               src="/assets/logo/logo.webp"
//               alt="CORE Media"
//               width={300}
//               height={110}
//               priority
//             />
//           </Link>

//           <div className="navbar-ad">
//             <span>Work without interruption</span>
//           </div>
//         </div>
//       </div>

//       <div className="navbar-bottom">
//         <div className="navbar-container navbar-row">
//           <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
//             <Link
//               href="/cio-voice"
//               className={`nav-link ${pathname === '/cio-voice' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               CIO Voice
//             </Link>

//             <Link
//               href="/thought-leadership"
//               className={`nav-link ${pathname === '/thought-leadership' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               Thought
//             </Link>

//             <Link
//               href="/business-insights"
//               className={`nav-link ${pathname === '/business-insights' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               Business Insights
//             </Link>

//             <Link
//               href="/technology"
//               className={`nav-link ${pathname === '/technology' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               Technology
//             </Link>

//             <Link
//               href="/leadership-lessons"
//               className={`nav-link ${pathname === '/leadership-lessons' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               Leadership
//             </Link>

//             <Link
//               href="/leaderspeak"
//               className={`nav-link ${pathname === '/leaderspeak' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               Leader Speak
//             </Link>

//             <Link
//               href="/events"
//               className={`nav-link ${pathname === '/events' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               Event
//             </Link>

//             <Link
//               href="/blog"
//               className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               Blog
//             </Link>

//             <Link
//               href="/press-release"
//               className={`nav-link ${pathname === '/press-release' ? 'active' : ''}`}
//               onClick={closeAllMenus}
//             >
//               Press Release
//             </Link>
//           </nav>

//           <div className="navbar-actions">
//             {/* <button type="button" className="search-btn" aria-label="Search">
//               <Search size={30} />
//             </button> */}

//             {/* <button
//               type="button"
//               className={`menu-btn ${mobileOpen ? 'open' : ''}`}
//               aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
//               aria-expanded={mobileOpen}
//               onClick={() => {
//                 setMobileOpen((state) => !state);
//                 setIsHidden(false);
//               }}
//             >
//               {mobileOpen ? <X size={34} /> : <Menu size={38} />}
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const AD_MESSAGES = [
  'Where Technology Leaders Shape the Future',
  'Insights That Empower CIOs',
  'Lead Smarter. Innovate Faster.',
  'The Voice of Digital Leadership',
  'Driving Enterprise Innovation',
];

export default function Navbar() {
  const pathname = usePathname();
  const [adIndex, setAdIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAdIndex((current) => (current + 1) % AD_MESSAGES.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="navbar">
      {/* Advertisement */}

      {/* <div className="top-ad">
        <div className="top-ad-inner">
          <Image
            src="/assets/ads/banner-3.png"
            alt="Advertisement"
            fill
            sizes="100vw"
            className="ad-image"
            priority
          />
        </div>
      </div> */}
      {/* Logo */}

      <div className="navbar-main">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo">
            <Image src="/assets/logo/logo.webp" alt="Core Media" width={220} height={70} priority />
          </Link>

          <div className="navbar-ad-inline" aria-label="Advertisement" aria-live="polite">
            <span className="navbar-ad-heading">{AD_MESSAGES[adIndex]}</span>
          </div>

          <div className="navbar-right">
            <button
              type="button"
              className="navbar-hamburger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((current) => !current)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/contact" className="btn-register">
              Lets Talk
            </Link>

            {/* <Link href="/login" className="btn-login">
              Sign In
            </Link> */}
          </div>
        </div>
      </div>

      {/* Navigation */}

      <div className="navbar-menu-wrapper">
        <div className="navbar-container">
          <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>

            <Link
              href="/cio-voice"
              className={`nav-link ${pathname === '/cio-voice' ? 'active' : ''}`}
            >
              CIO Voice
            </Link>

            <Link
              href="/thought-leadership"
              className={`nav-link ${pathname === '/thought-leadership' ? 'active' : ''}`}
            >
              Thought Leadership
            </Link>

            <Link
              href="/business-insights"
              className={`nav-link ${pathname === '/business-insights' ? 'active' : ''}`}
            >
              Business Insights
            </Link>

            <Link
              href="/technology"
              className={`nav-link ${pathname === '/technology' ? 'active' : ''}`}
            >
              Technology
            </Link>

            <Link
              href="/leadership-lessons"
              className={`nav-link ${pathname === '/leadership-lessons' ? 'active' : ''}`}
            >
              Leadership
            </Link>

            <Link
              href="/leaderspeak"
              className={`nav-link ${pathname === '/leaderspeak' ? 'active' : ''}`}
            >
              Leader Speak
            </Link>

            <Link href="/events" className={`nav-link ${pathname === '/events' ? 'active' : ''}`}>
              Events
            </Link>

            <Link href="/blog" className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}>
              Blog
            </Link>

            <Link
              href="/press-release"
              className={`nav-link ${pathname === '/press-release' ? 'active' : ''}`}
            >
              Press Release
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
