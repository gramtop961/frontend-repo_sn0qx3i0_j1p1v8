import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG paths approximating cube, sphere, and torus silhouettes
const SHAPES = [
  {
    name: 'cube',
    d: 'M20 10 L44 4 L68 10 L68 34 L44 40 L20 34 Z M44 40 L44 16 M20 10 L44 16 M68 10 L44 16',
    viewBox: '0 0 88 48',
  },
  {
    name: 'sphere',
    d: 'M44 6a22 22 0 1 1 0 44a22 22 0 1 1 0-44Z M44 6c10 6 10 38 0 44 M44 6c-10 6-10 38 0 44',
    viewBox: '0 0 88 56',
  },
  {
    name: 'torus',
    d: 'M44 6a22 22 0 1 1 0 44a22 22 0 1 1 0-44Z M44 18a10 10 0 1 0 0 20a10 10 0 1 0 0-20Z',
    viewBox: '0 0 88 56',
  },
];

const HoloArtFrame = ({ progress = 0 }) => {
  const [index, setIndex] = useState(0);
  const shape = useMemo(() => SHAPES[index % SHAPES.length], [index]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SHAPES.length), 1800);
    return () => clearInterval(id);
  }, []);

  // Determine zoom as we approach 100%
  const phaseZoom = progress >= 70 ? 1 + (progress - 70) / 30 * 1.2 : 1;
  const phaseOpacity = progress >= 90 ? 1 - (progress - 90) / 10 : 1;

  return (
    <motion.div
      style={{ opacity: phaseOpacity }}
      animate={{ rotateY: progress >= 30 ? 360 : 0 }}
      transition={{ duration: 12, ease: 'linear' }}
      className="relative mx-auto grid h-[380px] w-[380px] place-items-center [perspective:1200px] md:h-[440px] md:w-[440px]"
    >
      <motion.div
        style={{ transform: `translateZ(0) scale(${phaseZoom})` }}
        className="relative aspect-square w-[78%] rotate-6 rounded-3xl border border-fuchsia-400/40 bg-white/5 shadow-[0_0_80px_rgba(217,70,239,0.2)] backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-500/10 via-violet-400/5 to-cyan-300/10" />
        <div className="absolute inset-0 grid place-items-center">
          <AnimatePresence mode="popLayout">
            <motion.svg
              key={shape.name}
              viewBox={shape.viewBox}
              initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.05, rotate: 6 }}
              transition={{ duration: 0.6 }}
              className="h-[60%] w-[60%] drop-shadow-[0_0_24px_rgba(168,85,247,0.45)]"
            >
              <defs>
                <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
              <path d={shape.d} fill="url(#holo)" fillOpacity="0.25" stroke="url(#holo)" strokeWidth="1.6" />
            </motion.svg>
          </AnimatePresence>
        </div>
        <div className="pointer-events-none absolute -inset-0.5 rounded-3xl border border-white/10" />
      </motion.div>
    </motion.div>
  );
};

export default HoloArtFrame;
