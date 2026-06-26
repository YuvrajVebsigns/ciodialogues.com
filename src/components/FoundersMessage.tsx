// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// export default function FoundersMessage() {
//   const sectionRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-up',
//     initialTransform: 'translateY(60px)',
//   });

//   return (
//     <section ref={sectionRef} className="founder-news-page">
//       <div className="founder-news-paper">
//         <div className="founder-news-topbar">
//           <span>Founder&apos;s Desk</span>
//           <span>CORE Media Editorial</span>
//           <span>13+ Years of Impact</span>
//         </div>

//         <div className="founder-news-main-grid">
//           <div className="founder-news-lead">
//             <span className="founder-news-label">Editor&apos;s Note</span>

//             <h2>
//               Building Conversations
//               <br />
//               That Shape Industries
//             </h2>

//             <p>
//               For over 13 years, CORE Media has connected technology leaders,
//               innovators, and decision-makers through meaningful stories,
//               insightful events, and trusted industry conversations.
//             </p>

//             <div className="founder-news-image">
//               <Image
//                 src="/assets/team/Anoop-Mathur.png"
//                 alt="Anoop Mathur"
//                 width={760}
//                 height={520}
//                 priority
//               />
//             </div>
//           </div>

//           <aside className="founder-news-sidebar">
//             <h3>Latest Notes</h3>

//             <ul>
//               <li>Technology leadership in a changing world</li>
//               <li>Building business communities through media</li>
//               <li>The future of enterprise storytelling</li>
//               <li>Creating impact through conversations</li>
//               <li>Connecting leaders across industries</li>
//             </ul>
//           </aside>
//         </div>

//         <div className="founder-news-stats">
//           <div>
//             <strong>13+</strong>
//             <span>Years</span>
//           </div>

//           <div>
//             <strong>500+</strong>
//             <span>Events</span>
//           </div>

//           <div>
//             <strong>1000+</strong>
//             <span>Leaders</span>
//           </div>

//           <div>
//             <strong>50+</strong>
//             <span>Cities</span>
//           </div>
//         </div>

//         <div className="founder-news-columns">
//           <article>
//             <h4>Our Journey</h4>
//             <p>
//               What began as a vision to connect leaders has evolved into a
//               trusted ecosystem for ideas, insights, and collaboration.
//             </p>
//           </article>

//           <article>
//             <h4>Our Mission</h4>
//             <p>
//               We create platforms where enterprise leaders exchange knowledge,
//               build relationships, and discover meaningful opportunities.
//             </p>
//           </article>

//           <article>
//             <h4>Our Vision</h4>
//             <p>
//               To become the most trusted media and engagement platform for
//               technology and business decision-makers.
//             </p>
//           </article>
//         </div>

//         <div className="founder-news-editorial">
//           <p className="founder-news-dropcap">
//             For more than thirteen years, CORE Media has remained committed to
//             creating a platform where meaningful conversations inspire
//             innovation, leadership, and business transformation.
//           </p>

//           <p>
//             In an increasingly digital world, information travels faster than
//             ever before. Yet what truly creates impact is not information
//             itself, but the conversations that emerge from it.
//           </p>

//           <p>
//             Every article we publish, every event we host, and every discussion
//             we facilitate is designed to bring people together around the ideas
//             shaping tomorrow.
//           </p>

//           <p>
//             As we continue our journey, our commitment remains unchanged: to
//             deliver trusted journalism, valuable insights, and powerful industry
//             connections.
//           </p>
//         </div>

//         <blockquote className="founder-news-quote">
//           Every headline begins a conversation. Every conversation creates an
//           opportunity.
//         </blockquote>

//         <div className="founder-news-footer">
//           <div>
//             <h3>Anoop Mathur</h3>
//             <span>Founder &amp; Publisher</span>
//           </div>

//           <Link href="/#contact-section" className="founder-news-btn">
//             Connect With Us
//             <ArrowUpRight size={18} />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';

const sideStories = [
  'India’s enterprise AI moment: From systematic adoption to scale',
  'Quantum networks, not computers, may arrive first for enterprises',
  'Cisco: The future of IT will run itself with AI-driven platforms',
];

const latestStories = [
  'Tech leaders decode how data can power sustainable growth',
  'AI startups pitch for enterprise-ready innovation',
  'Cloud-first strategies reshape digital business models',
  'Modern CIOs lead the next phase of enterprise transformation',
];

const eventCards = [
  {
    type: 'WEBINAR',
    title: 'From Data-Rich to AI-Ready',
    text: 'Indian enterprises have the scale, data, and infrastructure to support AI adoption.',
    date: 'Wed, 24 Jun 2026',
  },
  {
    type: 'EVENT',
    title: 'The Executive Summit at Imagine',
    text: 'Step inside the highest level of enterprise technology leadership.',
    date: 'Thu, 02 Jul 2026',
  },
  {
    type: 'EVENT',
    title: 'Architecting the Intelligent Enterprise',
    text: 'Deploying and supporting AI infrastructure is now a top priority.',
    date: 'Fri, 03 Jul 2026',
  },
  {
    type: 'EVENT',
    title: 'Enterprise Dilemma',
    text: 'As AI becomes central to enterprise innovation, leaders face new choices.',
    date: 'Fri, 03 Jul 2026',
  },
];

export default function FoundersMessage() {
  return (
    <section className="founder-news-home">
      <div className="founder-news-wrapper">
        <div className="founder-news-grid">
          <article className="founder-main-story">
            <h2>The CORE Media Story: Conversations that power India’s technology leadership</h2>

            <p>
              CORE Media builds platforms where CIOs, CISOs, CTOs, business leaders and enterprise
              technology brands exchange ideas that shape the future.
            </p>

            <div className="founder-main-image">
              <Image
                src="/assets/team/Anoop-Mathur.png"
                alt="Anoop Mathur"
                width={520}
                height={420}
                priority
              />
            </div>
          </article>

          <div className="founder-side-stories">
            {sideStories.map((story, index) => (
              <article key={story} className="founder-side-story">
                <h3>{story}</h3>
                <div className="founder-side-thumb">
                  <Image
                    src="/assets/team/Anoop-Mathur.png"
                    alt="Founder"
                    width={120}
                    height={90}
                  />
                </div>
                {index > 0 && <span>EXCLUSIVE</span>}
              </article>
            ))}
          </div>

          <aside className="founder-latest">
            <div className="founder-tabs">
              <button className="active">Latest</button>
              <button>Most Read</button>
            </div>

            {latestStories.map((item) => (
              <article key={item}>
                <h4>{item}</h4>
              </article>
            ))}
          </aside>
        </div>

        <div className="founder-view-more">
          <Link href="/#contact-section">
            View More <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="founder-ad-row">
          <div className="founder-ad-card cloud">
            <h3>CORE Cloud Summit ’26</h3>
            <p>Cloud 4.0: Intelligent, Secure & Sustainable Infrastructure</p>
            <button>Express Interest</button>
          </div>

          <div className="founder-tools-card">
            <h3>Tools & Solutions</h3>
            <p>What to measure when evaluating enterprise technology partners.</p>
            <Link href="#">View More →</Link>
          </div>

          <div className="founder-ad-card dark">
            <h3>Workplace 2035</h3>
            <p>Enterprise leadership for the next decade of work.</p>
            <button>Know More</button>
          </div>
        </div>

        <div className="founder-events-panel">
          <h2>What’s happening in CORE Media</h2>

          <div className="founder-event-grid">
            {eventCards.map((event) => (
              <article key={event.title} className="founder-event-card">
                <span>{event.type}</span>
                <h3>{event.title}</h3>
                <p>{event.text}</p>

                <div className="founder-event-meta">
                  <CalendarDays size={14} />
                  {event.date}
                </div>

                <div className="founder-event-meta">
                  <MapPin size={14} />
                  Mumbai, India
                </div>

                <Link href="#">Register Now ›</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
