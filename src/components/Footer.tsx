'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'CIO', href: '/cio-voice' },
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
  return (
    <footer className="footer-section">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-widget footer-brand">
              <Link href="/" className="footer-logo">
                <Image
                  src="/assets/logo/logo.webp"
                  alt="CIO Dialogues"
                  width={150}
                  height={70}
                  priority
                />
              </Link>

              <p className="footer-description">
                CIO Dialogues is a premier platform connecting CIOs, CISOs, CTOs and business
                leaders through thought leadership, insights, events and industry conversations.
              </p>
            </div>

            <div className="footer-widget">
              <h4 className="footer-title">Quick Links</h4>

              <ul className="footer-links footer-two-column-links">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>
                      {item.label}
                      {/* <ArrowUpRight size={13} /> */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-widget">
              <h4 className="footer-title">Services</h4>

              <ul className="footer-links">
                <li>
                  <Link href="/register">
                    Registration
                    {/* <ArrowUpRight size={13} /> */}
                  </Link>
                </li>

                <li>
                  <Link href="/nominate">
                    Nominate
                    {/* <ArrowUpRight size={13} /> */}
                  </Link>
                </li>

                <li>
                  <Link href="/events">
                    Events
                    {/* <ArrowUpRight size={13} /> */}
                  </Link>
                </li>

                <li>
                  <Link href="/blog">
                    Blog
                    {/* <ArrowUpRight size={13} /> */}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-widget">
              <h4 className="footer-title">Subscribe</h4>

              <form className="footer-subscribe">
                <input type="email" placeholder="Enter your email" className="footer-input" />

                <button type="submit" className="footer-submit" aria-label="Subscribe">
                  <Send size={18} />
                </button>
              </form>

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

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-wrapper">
          <div className="footer-contact">
            <a href="tel:+917506035537" className="footer-contact-item">
              <span className="footer-contact-icon">
                <Phone size={15} />
              </span>

              <span className="footer-contact-text">+91 7506035537</span>
            </a>

            <a href="mailto:contact@core-mediagroup.com" className="footer-contact-item">
              <span className="footer-contact-icon">
                <Mail size={15} />
              </span>

              <span className="footer-contact-text">contact@core-mediagroup.com</span>
            </a>
          </div>

          <div className="footer-socials">
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="https://www.instagram.com/" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="https://x.com/" aria-label="Twitter">
              <FaXTwitter />
            </a>

            <a href="https://www.linkedin.com/" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>

          <div className="footer-copy">Copyright © 2026 CIO Dialogues.</div>
        </div>
      </div>
    </footer>
  );
}
