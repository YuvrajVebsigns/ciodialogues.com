'use client';

import React from 'react';

const TICKER_ITEMS = [
  {
    label: 'Kyndryl – APPLICATION MODERNIZATION',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Dynatrace – AI OBSERVABILITY',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Veeam Software – RANSOMWARE RECOVERY PLATFORM',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'SentinelOne Cybersecurity India – AI SECURITY PLATFORM',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Freshworks Technologies – AI-POWERED ITSM',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Archon Consulting Systems – AI INFRASTRUCTURE ENABLER',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Noventiq Services India – ARTIFICIAL INTELLIGENCE (AI)',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Tata Communications – CUSTOMER INTERACTION SUITE',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Rubrik India – CYBER RESILIENCE AS-A-SERVICE',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Anunta Technology – DATA CENTER INFRASTRUCTURE MANAGEMENT',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'HCLTech – DATA CENTER TRANSFORMATION SERVICES',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Archon Consulting Systems – DATA INFRASTRUCTURE MODERNISATION',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Anunta Technology – DESKTOP VIRTUALIZATION',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'NetApp – ENTERPRISE FLASH STORAGE',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Lenovo Global Technology – HYPER-CONVERGED INFRASTRUCTURE',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Tata Communications – INFRASTRUCTURE OBSERVABILITY',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Tech Mahindra – IT WORKFORCE AUGMENTATION',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Veeam Software – SAFE AI AT SCALE',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  { label: 'VODAFONE IDEA – SIP TRUNK', href: 'https://www.cio-choice.in/recognized-brands/2026' },
  {
    label: 'Lavelle Networks – SD-WAN PLATFORM',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Lenovo Global Technology – SERVERS',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Barracuda Networks – APPLICATION SECURITY',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Infoqort Technologies – BUSINESS INTELLIGENCE',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Perpetuuiti Technosoft Services – CYBER VAULT',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  { label: 'atQor – DATA LAKES', href: 'https://www.cio-choice.in/recognized-brands/2026' },
  {
    label: '63SATS Cybertech – DATA PRIVACY & REGULATORY COMPLIANCE SERVICES',
    href: 'https://www.cio-choice.in/recognized-brands/2026-recognized-brands/',
  },
  {
    label: 'adStringO Software – END POINT COMPRESSION',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  { label: 'IceWarp – ENTERPRISE EMAIL', href: 'https://www.cio-choice.in/recognized-brands/2026' },
  {
    label: 'Frontlyne – FRONTLINE LEARNING AND MANAGEMENT SOLUTION',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Whitehats Technologies – GOVERNANCE RISK AND COMPLIANCE',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Techno Digital Infra – GREEN DATA CENTER',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Officenet by Netcomm Labs – HR & GLOBAL PAYROLL',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'COMnet Solutions – IT INFRASTRUCTURE SERVICES',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Versa Networks – NETWORK SECURITY',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'CLOUDPE.COM (Powered by LeapSwitch Networks) – PUBLIC CLOUD',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Karnival Internet Technologies – SMART RECEIPT',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Sigma-byte Computers – STRUCTURED CABLING',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Arteria Technologies – SUPPLY CHAIN MANAGEMENT',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label: 'Innovative Techhub – SYSTEM INTEGRATOR',
    href: 'https://www.cio-choice.in/recognized-brands/2026',
  },
  {
    label:
      'The Intelligent Operations Imperative: Where Technology Strategy Meets Business Reality',
    href: 'https://ciodialogues.com/index.php/events/the-intelligent-operations-imperative-where-technology-strategy-meets-business-reality/',
  },
  { label: 'BESPOKE', href: 'https://ciodialogues.com/index.php/category/events/bespoke/' },
  { label: 'EVENTS', href: 'https://ciodialogues.com/index.php/category/events/' },
  {
    label: 'AI Is Accelerating Code, So Why Is Software Delivery Still Slow?',
    href: 'https://ciodialogues.com/index.php/events/ai-is-accelerating-code-so-why-is-software-delivery-still-slow/',
  },
];

export default function TrendingTicker() {
  // Duplicate items to ensure a seamless looping scroll animation
  const doubledItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full bg-white border-t border-b border-gray-100 -mt-px py-2.5 px-4 overflow-hidden relative flex items-center text-sm font-medium z-10 shadow-xs ">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#8e0101] text-white text-xs font-bold uppercase tracking-wider rounded-md shrink-0 mr-4 z-20 shadow-xs ">
        {/* <Flame size={12} className="animate-pulse" /> */}
        <span>CIO CHOICE 2026 RECOGNISED BRANDS</span>
      </div>

      <div className="relative w-full overflow-hidden flex items-center ">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {doubledItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#8e0101] transition-colors cursor-pointer flex items-center gap-2 "
            >
              <span className="inline-block w-1.5 h-1.5 bg-[#8e0101] rounded-full shrink-0" />
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* CSS style block for self-contained marquee animation to avoid breaking styling context */}
      <style jsx global>{`
        @keyframes tickerMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: tickerMarquee 180s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
