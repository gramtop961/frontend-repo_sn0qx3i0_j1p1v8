import React from 'react';
import { motion } from 'framer-motion';

const shimmer = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: { repeat: Infinity, duration: 1.6, ease: 'linear' },
  },
};

const dots = {
  animate: {
    opacity: [0.2, 1, 0.2],
    transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut', staggerChildren: 0.15 },
  },
};

const LoadingShowcase = () => {
  return (
    <section className="relative w-full bg-[#07070a] py-16 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Setting up your Creator Dashboard</h2>
          <p className="mt-3 text-white/70">
            We’re preparing your workspace: storefront, payouts, analytics, and portfolio. This only takes a moment.
          </p>

          <div className="mt-6 space-y-4">
            {["Connecting wallet", "Generating storefront", "Optimizing previews", "Securing payouts"]
              .map((label, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/90">{label}</span>
                  <span className="text-xs text-fuchsia-300">loading...</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400"
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              </div>
            ))}
          </div>

          <motion.div
            className="mt-6 flex items-center gap-1 text-sm text-white/70"
            variants={dots}
            animate="animate"
          >
            <span>Preparing assets</span>
            <motion.span className="mx-0.5 inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            <motion.span className="mx-0.5 inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            <motion.span className="mx-0.5 inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
          </motion.div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b0b12] to-[#131324] p-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-xl bg-white/5"
                  initial={{ opacity: 0.4, scale: 0.95 }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1, 0.95] }}
                  transition={{ repeat: Infinity, duration: 2 + (i % 3) * 0.2, ease: 'easeInOut' }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 via-transparent to-indigo-400/20"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 text-center text-sm text-white/60">Live preview tiles generating…</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingShowcase;
