// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { Phone, Mail, Send } from 'lucide-react';
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

// const quickLinks = [
//   { label: 'Home', href: '/' },
//   { label: 'CIO Voice', href: '/cio-voice' },
//   { label: 'Thought', href: '/thought-leadership' },
//   { label: 'Business Insights', href: '/business-insights' },
//   { label: 'Technology', href: '/technology' },
//   { label: 'Leadership', href: '/leadership-lessons' },
//   { label: 'LeaderSpeak', href: '/leaderspeak' },
//   // { label: 'Event', href: '/events' },
//   // { label: 'Blog', href: '/blog' },
//   { label: 'Press Release', href: '/press-release' },
// ];

// export default function Footer() {
//   return (
//     <footer className="footer-section">
//       <div className="footer-main">
//         <div className="footer-container">
//           <div className="footer-grid">
//             <div className="footer-widget footer-brand">
//               <Link href="/" className="footer-logo">
//                 <Image
//                   src="/assets/logo/logo.webp"
//                   alt="CIO Dialogues"
//                   width={250}
//                   height={70}
//                   priority
//                 />
//               </Link>

//               {/* <p className="footer-description">
//                 CIO Dialogues is a premier platform connecting CIOs, CISOs, CTOs and business
//                 leaders through thought leadership, insights, events and industry conversations.
//               </p> */}
//             </div>

//             <div className="footer-widget">
//               <h4 className="footer-title">Quick Links</h4>

//               <ul className="footer-links footer-two-column-links">
//                 {quickLinks.map((item) => (
//                   <li key={item.label}>
//                     <Link href={item.href}>
//                       {item.label}
//                       {/* <ArrowUpRight size={13} /> */}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="footer-widget">
//               <h4 className="footer-title">Services</h4>

//               <ul className="footer-links">
//                 {/* <li>
//                   <Link href="/register">
//                     Registration

//                   </Link>
//                 </li>

//                 <li>
//                   <Link href="/nominate">
//                     Nominate

//                   </Link>
//                 </li> */}

//                 <li>
//                   <Link href="/events">
//                     Events
//                     {/* <ArrowUpRight size={13} /> */}
//                   </Link>
//                 </li>

//                 <li>
//                   <Link href="/blog">
//                     Blog
//                     {/* <ArrowUpRight size={13} /> */}
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div className="footer-widget">
//               <h4 className="footer-title">Subscribe</h4>

//               <form className="footer-subscribe">
//                 <input type="email" placeholder="Enter your email" className="footer-input" />

//                 <button type="submit" className="footer-submit" aria-label="Subscribe">
//                   <Send size={18} />
//                 </button>
//               </form>

//               <div className="footer-office-card">
//                 <h4>Our Office</h4>

//                 <p>
//                   Units Nos. 3037 – A1 Wing, 3rd Floor, Oberoi Garden Estate, Near Chandivali
//                   Studio, Andheri (East), Mumbai – 400072, INDIA
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <div className="footer-container footer-bottom-wrapper">
//           <div className="footer-contact">
//             <a href="tel:+917506035537" className="footer-contact-item">
//               <span className="footer-contact-icon">
//                 <Phone size={15} />
//               </span>

//               <span className="footer-contact-text">+91 22 4608 0974</span>
//             </a>

//             <div className="footer-contact-item">
//               {/* <span className="footer-contact-icon">
//                 <Mail size={15} />
//               </span> */}

//               <a
//                 href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="footer-contact-item"
//               >
//                 <span className="footer-contact-icon">
//                   <Mail size={15} />
//                 </span>

//                 <span className="footer-contact-text">contact@core-mediagroup.com</span>
//               </a>
//             </div>
//           </div>

//           <div className="footer-socials">
//             <a href="https://www.facebook.com/CIOCrown.in" aria-label="Facebook">
//               <FaFacebookF />
//             </a>

//             <a href="https://www.instagram.com/core_media_/" aria-label="Instagram">
//               <FaInstagram />
//             </a>

//             <a href="https://x.com/CIOChoice" aria-label="Twitter">
//               <FaXTwitter />
//             </a>

//             <a
//               href="https://www.linkedin.com/groups/CENTRE-RECOGNITION-EXCELLENCE-CIO-CHOICE-54013"
//               aria-label="LinkedIn"
//             >
//               <FaLinkedinIn />
//             </a>
//           </div>

//           <div className="footer-copy">Copyright © 2026 CIO Dialogues.</div>
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

import { subscribeWebsiteEmail } from '@/services/subscribes.service';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'CIO Voice', href: '/cio-voice' },
  { label: 'Thought', href: '/thought-leadership' },
  { label: 'Business Insights', href: '/business-insights' },
  { label: 'Technology', href: '/technology' },
  { label: 'Leadership', href: '/leadership-lessons' },
  { label: 'LeaderSpeak', href: '/leaderspeak' },
  // { label: 'Event', href: '/events' },
  // { label: 'Blog', href: '/blog' },
  { label: 'Press Release', href: '/press-release' },
];

export default function Footer() {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const [subscribePopupMessage, setSubscribePopupMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = subscribeEmail.trim();

    // Required validation
    if (!email) {
      setSubscribePopupMessage('Please enter your email address.');
      setShowSubscribePopup(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setSubscribePopupMessage('Please enter a valid email address.');
      setShowSubscribePopup(true);
      return;
    }

    setIsSubscribing(true);

    try {
      await subscribeWebsiteEmail(email);

      // Success message
      setSubscribePopupMessage('Operation successful');
      setShowSubscribePopup(true);

      // Clear input after successful subscription
      setSubscribeEmail('');
    } catch (error: unknown) {
      setSubscribePopupMessage(
        error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
      );

      setShowSubscribePopup(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  const closeSubscribePopup = () => {
    setShowSubscribePopup(false);
    setSubscribePopupMessage('');
  };

  return (
    <footer className="footer-section">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* =========================================
                COLUMN 1 - BRAND
            ========================================= */}

            <div className="footer-widget footer-brand">
              <Link href="/" className="footer-logo">
                <Image
                  src="/assets/logo/logo.webp"
                  alt="CIO Dialogues"
                  width={250}
                  height={70}
                  priority
                />
              </Link>

              {/* 
              <p className="footer-description">
                CIO Dialogues is a premier platform connecting CIOs, CISOs,
                CTOs and business leaders through thought leadership, insights,
                events and industry conversations.
              </p>
              */}
            </div>

            {/* =========================================
                COLUMN 2 - QUICK LINKS
            ========================================= */}

            <div className="footer-widget">
              <h4 className="footer-title">Quick Links</h4>

              <ul className="footer-links footer-two-column-links">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* =========================================
                COLUMN 3 - SERVICES
            ========================================= */}

            <div className="footer-widget">
              <h4 className="footer-title">Services</h4>

              <ul className="footer-links">
                {/*
                <li>
                  <Link href="/register">Registration</Link>
                </li>

                <li>
                  <Link href="/nominate">Nominate</Link>
                </li>
                */}

                <li>
                  <Link href="/events">Events</Link>
                </li>

                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>

            {/* =========================================
                COLUMN 4 - SUBSCRIBE
            ========================================= */}

            <div className="footer-widget">
              <h4 className="footer-title">Subscribe</h4>

              <form className="footer-subscribe" onSubmit={handleSubscribe} noValidate>
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="footer-input"
                  disabled={isSubscribing}
                  aria-label="Email address"
                  autoComplete="email"
                />

                <button
                  type="submit"
                  className="footer-submit"
                  aria-label="Subscribe"
                  disabled={isSubscribing}
                >
                  <Send size={18} />
                </button>
              </form>

              {/* =========================================
                  SUBSCRIBE TOAST
              ========================================= */}

              {showSubscribePopup && (
                <div className="subscribe-toast" role="alert" aria-live="polite">
                  <span className="subscribe-toast-dot" />

                  <p className="subscribe-toast-message">{subscribePopupMessage}</p>

                  <button
                    type="button"
                    className="subscribe-toast-close"
                    onClick={closeSubscribePopup}
                    aria-label="Close notification"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* =========================================
                  OFFICE
              ========================================= */}

              <div className="footer-office-card">
                <h4>Our Office</h4>

                <p>
                  Units Nos. 3037 – A1 Wing, 3rd Floor, Oberoi Garden Estate, Near Chandivali
                  Studio, Andheri (East), Mumbai – 400072, INDIA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          FOOTER BOTTOM
      ========================================= */}

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-wrapper">
          {/* =========================================
              CONTACT
          ========================================= */}

          <div className="footer-contact">
            {/* PHONE */}

            <a href="tel:+917506035537" className="footer-contact-item">
              <span className="footer-contact-icon">
                <Phone size={15} />
              </span>

              <span className="footer-contact-text">+91 22 4608 0974</span>
            </a>

            {/* EMAIL */}

            <div className="footer-contact-item">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <Mail size={15} />
                </span>

                <span className="footer-contact-text">contact@core-mediagroup.com</span>
              </a>
            </div>
          </div>

          {/* =========================================
              SOCIAL
          ========================================= */}

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/CIOCrown.in"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/core_media_/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://x.com/CIOChoice"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.linkedin.com/groups/CENTRE-RECOGNITION-EXCELLENCE-CIO-CHOICE-54013"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>

          {/* =========================================
              COPYRIGHT
          ========================================= */}

          <div className="footer-copy">Copyright © 2026 CIO Dialogues.</div>
        </div>
      </div>
    </footer>
  );
}
