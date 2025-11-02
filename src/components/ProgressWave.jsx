import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const ProgressWave = ({ progress = 0 }) => {
  const p = Math.max(0, Math.min(100, progress));
  const spring = useSpring(p, { stiffness: 80, damping: 20, mass: 0.8 });
  const dash = useTransform(spring, [0, 100], [0, 283]); // circumference of r=45 circle ~ 2πr = 282.6

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-end p-6">
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]">
          <defs>
            <linearGradient id="oceanSunset" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A2463" />
              <stop offset="100%" stopColor="#F9A826" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="50" stroke="#1f2937" strokeWidth="10" fill="none" />
          <motion.circle
            cx="60" cy="60" r="45" fill="none" stroke="url(#oceanSunset)" strokeWidth="10" strokeLinecap="round"
            strokeDasharray="283" strokeDashoffset={useTransform(dash, (v) => 283 - v)}
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="64" textAnchor="middle" className="fill-white" style={{ fontWeight: 800, fontSize: '22px' }}>
            {Math.round(p)}%
          </text>
        </svg>
      </div>
      {/* Waves at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 left-0 right-0">
        <svg className="h-24 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <path d="M0 60 C 240 120, 480 0, 720 60 C 960 120, 1200 0, 1440 60 L 1440 120 L 0 120 Z" fill="url(#waveGrad)" opacity="0.25">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0 60 C 240 120, 480 0, 720 60 C 960 120, 1200 0, 1440 60 L 1440 120 L 0 120 Z;
                      M0 50 C 240 0, 480 120, 720 50 C 960 0, 1200 120, 1440 50 L 1440 120 L 0 120 Z;
                      M0 60 C 240 120, 480 0, 720 60 C 960 120, 1200 0, 1440 60 L 1440 120 L 0 120 Z" />
          </path>
        </svg>
      </div>
    </div>
  );
};

export default ProgressWave;
