// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// // import { useRef } from 'react';
// import { ArrowUpRight } from 'lucide-react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// export default function FoundersMessage() {
//   const sectionRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-up',
//     initialTransform: 'translateY(40px)',
//   });

//   return (
//     <section ref={sectionRef} className="founder-message-section">
//       <div className="founder-message-container">
//         {/* LEFT SIDE IMAGE */}
//         <div className="founder-image-wrapper">
//           <div className="founder-image-frame">
//             <Image
//               src="/assets/team/Anoop-Mathur.png"
//               alt="Anoop Mathur - Founder"
//               width={500}
//               height={500}
//               className="founder-image"
//               priority
//             />
//           </div>
//         </div>

//         {/* RIGHT SIDE CONTENT */}
//         <div className="founder-content">
//           {/* LABEL */}
//           <div className="founder-label">
//             <span className="founder-label-icon">♟</span>
//             <span className="founder-label-text">Founder’s Message</span>
//           </div>

//           {/* TITLE */}
//           <h2 className="founder-title">
//             Building Connections in a<br />
//             <span>Digital World.</span>
//           </h2>

//           {/* DESCRIPTION */}
//           <p className="founder-description">
//             For 13 years, CORE Media has innovated at the intersection of ICT and marketing. We
//             don’t just deliver messages; we build bespoke ecosystems that drive impactful results
//             for India’s leading stakeholders.
//           </p>

//           {/* QUOTE */}
//           <blockquote className="founder-quote">
//             <p>
//               “We innovate to build relationships that deliver exceptional results, every single
//               time.”
//             </p>
//           </blockquote>

//           {/* AUTHOR */}
//           <div className="founder-author">
//             <h3>Anoop Mathur</h3>
//             <span>Founder, CORE MEDIA</span>
//           </div>

//           {/* BUTTON */}
//           <Link href="/#contact-section" className="founder-btn">
//             <span>Partner With Us</span>
//             <div className="founder-btn-icon">
//               <ArrowUpRight size={22} />
//             </div>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FoundersMessage() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(60px)',
  });

  return (
    <section ref={sectionRef} className="founder-modern-section">
      <div className="founder-modern-bg"></div>

      <div className="founder-modern-container">
        {/* LEFT */}
        <div className="founder-modern-image-area">
          <div className="founder-glow"></div>

          <div className="founder-modern-image-card">
            <Image
              src="/assets/team/Anoop-Mathur.png"
              alt="Anoop Mathur"
              width={520}
              height={620}
              priority
              className="founder-modern-image"
            />
          </div>

          <div className="founder-floating-card">
            <span>13+ Years</span>
            <p>Driving ICT & Media Innovation</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="founder-modern-content">
          <div className="founder-modern-label">Founder’s Message</div>

          <h2 className="founder-modern-title">
            Building Connections
            <br />
            <span>In A Digital World.</span>
          </h2>

          <p className="founder-modern-description">
            For over 13 years, CORE Media has pioneered innovation at the intersection of
            technology, leadership, and marketing. We build meaningful ecosystems that connect
            decision-makers, transform industries, and create measurable business impact.
          </p>

          <div className="founder-modern-quote">
            <Quote size={38} />

            <p>
              We innovate to build relationships that deliver exceptional results, every single
              time.
            </p>
          </div>

          <div className="founder-modern-author">
            <h3>Anoop Mathur</h3>
            <span>Founder & Visionary Leader, CORE Media</span>
          </div>

          <div className="founder-modern-actions">
            <Link href="/#contact-section" className="founder-modern-btn">
              <span>Partner With Us</span>

              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
