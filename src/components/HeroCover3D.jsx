import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleWordmark from './ParticleWordmark.jsx';
import HoloArtFrame from './HoloArtFrame.jsx';
import ProgressWave from './ProgressWave.jsx';

const HeroCover3D = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start = performance.now();
    const duration = 12000; // 12s timeline
    let raf = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const pct = Math.round(t * 100);
      setProgress(pct);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/oRrPvYYzPQFRFKuU/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />

      {/* Progress ring + waves */}
      <ProgressWave progress={progress} />

      {/* Center stage */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl place-items-center px-6">
        <div className="relative w-full">
          <AnimatePresence>
            {progress < 30 && (
              <motion.div
                key="particles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-[340px] w-full md:h-[420px]"
              >
                <ParticleWordmark progress={progress} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {progress >= 30 && (
              <motion.div
                key="frame"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <HoloArtFrame progress={progress} />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-sm text-white/80"
                >
                  Showcasing mediums: sculpture • paint • digital
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Fade to interface as we finish */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: progress >= 95 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute inset-0 bg-black/80"
      />

      {/* Prompt to continue once done */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
          className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs text-white/80 backdrop-blur-md"
        >
          Transitioning to your dashboard…
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCover3D;
