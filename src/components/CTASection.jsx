import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section id="cta" className="relative w-full bg-[#07070a] py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.15),rgba(0,0,0,0))]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101022] to-[#0c0c18] p-8 md:p-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h4 className="text-2xl font-bold md:text-3xl">Launch your Artsea store today</h4>
              <p className="mt-2 text-white/70">Your dashboard is ready. Import your art, set pricing, and go live in minutes.</p>
            </div>
            <div className="flex items-center md:justify-end">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:bg-fuchsia-400"
              >
                Enter Dashboard
              </motion.a>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-white/50">By continuing, you agree to our Terms and Privacy Policy.</p>
      </div>
    </section>
  );
};

export default CTASection;
