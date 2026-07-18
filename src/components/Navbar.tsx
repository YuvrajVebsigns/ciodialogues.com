// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import { usePathname } from 'next/navigation';

// const AD_MESSAGES = [
//   'Where Technology Leaders Shape the Future',
//   'Insights That Empower CIOs',
//   'Lead Smarter. Innovate Faster.',
//   'The Voice of Digital Leadership',
//   'Driving Enterprise Innovation',
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [adIndex, setAdIndex] = useState(0);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const timer = window.setInterval(() => {
//       setAdIndex((current) => (current + 1) % AD_MESSAGES.length);
//     }, 2000);

//     return () => window.clearInterval(timer);
//   }, []);

//   return (
//     <header className="navbar">
//       {/* Advertisement */}

//       {/* <div className="top-ad">
//         <div className="top-ad-inner">
//           <Image
//             src="/assets/ads/banner-3.png"
//             alt="Advertisement"
//             fill
//             sizes="100vw"
//             className="ad-image"
//             priority
//           />
//         </div>
//       </div> */}
//       {/* Logo */}

//       <div className="navbar-main">
//         <div className="navbar-container">
//           <Link href="/" className="navbar-logo">
//             <Image src="/assets/logo/logo.webp" alt="Core Media" width={220} height={70} priority />
//           </Link>

//           <div className="navbar-ad-inline" aria-label="Advertisement" aria-live="polite">
//             <span className="navbar-ad-heading">{AD_MESSAGES[adIndex]}</span>
//           </div>

//           <div className="navbar-right">
//             <button
//               type="button"
//               className="navbar-hamburger"
//               aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
//               aria-expanded={mobileOpen}
//               onClick={() => setMobileOpen((current) => !current)}
//             >
//               {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>

//             <Link href="/contact" className="btn-register">
//               Lets Talk
//             </Link>

//             {/* <Link href="/login" className="btn-login">
//               Sign In
//             </Link> */}
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}

//       <div className="navbar-menu-wrapper">
//         <div className="navbar-container">
//           <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
//             <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
//               HOME
//             </Link>

//             <Link
//               href="/cio-voice"
//               className={`nav-link ${pathname === '/cio-voice' ? 'active' : ''}`}
//             >
//               CIO VOICE
//             </Link>

//             <Link
//               href="/thought-leadership"
//               className={`nav-link ${pathname === '/thought-leadership' ? 'active' : ''}`}
//             >
//               THOUGHT LEADERSHIP
//             </Link>

//             <Link
//               href="/business-insights"
//               className={`nav-link ${pathname === '/business-insights' ? 'active' : ''}`}
//             >
//               BUSINESS INSIGHTS
//             </Link>

//             <Link
//               href="/technology"
//               className={`nav-link ${pathname === '/technology' ? 'active' : ''}`}
//             >
//               TECHNOLOGY
//             </Link>

//             <Link
//               href="/leadership-lessons"
//               className={`nav-link ${pathname === '/leadership-lessons' ? 'active' : ''}`}
//             >
//               LEADERSHIP
//             </Link>

//             <Link
//               href="/leaderspeak"
//               className={`nav-link ${pathname === '/leaderspeak' ? 'active' : ''}`}
//             >
//               LEADER SPEAK
//             </Link>

//             <Link href="/events" className={`nav-link ${pathname === '/events' ? 'active' : ''}`}>
//               EVENTS
//             </Link>

//             <Link href="/blog" className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}>
//               BLOG
//             </Link>

//             <Link
//               href="/press-release"
//               className={`nav-link ${pathname === '/press-release' ? 'active' : ''}`}
//             >
//               PRESS RELEASE
//             </Link>

//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const AD_MESSAGES = [
  'Where Technology Leaders Shape the Future',
  'Insights That Empower CIOs',
  'Lead Smarter. Innovate Faster.',
  'The Voice of Digital Leadership',
  'Driving Enterprise Innovation',
];

const otherServiceLinks = [
  {
    label: 'Event',
    href: '/events',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Bespoke',
    href: '/bespoke',
  },
  {
    label: 'CIO Transitions',
    href: '/cio-transitions',
  },
  {
    label: 'Leadership Transitions',
    href: '/leader-transitions',
  },
  {
    label: 'Main Story',
    href: '/main-story',
  },
  {
    label: 'Our Brand',
    href: '/our-brand',
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [adIndex, setAdIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [otherServicesOpen, setOtherServicesOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAdIndex((current) => (current + 1) % AD_MESSAGES.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOtherServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isOtherServicesActive = otherServiceLinks.some((item) => isActive(item.href));

  const closeMenus = () => {
    setMobileOpen(false);
    setOtherServicesOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-main">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo" onClick={closeMenus}>
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
              onClick={() => {
                setMobileOpen((current) => !current);
                setOtherServicesOpen(false);
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/contact" className="btn-register" onClick={closeMenus}>
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>

      <div className="navbar-menu-wrapper">
        <div className="navbar-container">
          <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
            <Link
              href="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              onClick={closeMenus}
            >
              HOME
            </Link>

            <Link
              href="/cio-voice"
              className={`nav-link ${isActive('/cio-voice') ? 'active' : ''}`}
              onClick={closeMenus}
            >
              CIO VOICE
            </Link>

            <Link
              href="/thought-leadership"
              className={`nav-link ${isActive('/thought-leadership') ? 'active' : ''}`}
              onClick={closeMenus}
            >
              THOUGHT LEADERSHIP
            </Link>

            <Link
              href="/business-insights"
              className={`nav-link ${isActive('/business-insights') ? 'active' : ''}`}
              onClick={closeMenus}
            >
              BUSINESS INSIGHTS
            </Link>

            <Link
              href="/technology"
              className={`nav-link ${isActive('/technology') ? 'active' : ''}`}
              onClick={closeMenus}
            >
              TECHNOLOGY
            </Link>

            <Link
              href="/leadership-lessons"
              className={`nav-link ${isActive('/leadership-lessons') ? 'active' : ''}`}
              onClick={closeMenus}
            >
              LEADERSHIP
            </Link>

            <Link
              href="/leaderspeak"
              className={`nav-link ${isActive('/leaderspeak') ? 'active' : ''}`}
              onClick={closeMenus}
            >
              LEADER SPEAK
            </Link>

            {/* <Link
              href="/events"
              className={`nav-link ${
                isActive('/events') ? 'active' : ''
              }`}
              onClick={closeMenus}
            >
              EVENTS
            </Link>

            <Link
              href="/blog"
              className={`nav-link ${
                isActive('/blog') ? 'active' : ''
              }`}
              onClick={closeMenus}
            >
              BLOG
            </Link> */}

            <Link
              href="/press-release"
              className={`nav-link ${isActive('/press-release') ? 'active' : ''}`}
              onClick={closeMenus}
            >
              PRESS RELEASE
            </Link>

            <div
              className={`nav-dropdown ${otherServicesOpen ? 'open' : ''}`}
              onMouseEnter={() => setOtherServicesOpen(true)}
              onMouseLeave={() => setOtherServicesOpen(false)}
            >
              <button
                type="button"
                className={`nav-link nav-dropdown-button ${isOtherServicesActive ? 'active' : ''}`}
                aria-haspopup="true"
                aria-expanded={otherServicesOpen}
                onClick={() => setOtherServicesOpen((current) => !current)}
              >
                OTHER SERVICES
                <ChevronDown size={15} className="nav-dropdown-icon" aria-hidden="true" />
              </button>

              <div className="nav-dropdown-menu">
                {otherServiceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-dropdown-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
