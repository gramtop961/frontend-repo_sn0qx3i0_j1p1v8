import React from 'react';
import { Rocket, Palette, Shield, Wallet, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Palette className="size-5 text-fuchsia-300" />,
    title: 'List in Minutes',
    desc: 'Upload images, set editions, and publish with instant previews.',
  },
  {
    icon: <Wallet className="size-5 text-fuchsia-300" />,
    title: 'Secure Payouts',
    desc: 'Built-in payout rails with transparent fees and fast settlements.',
  },
  {
    icon: <Shield className="size-5 text-fuchsia-300" />,
    title: 'Protection',
    desc: 'Watermarking, provenance, and access controls keep your work safe.',
  },
  {
    icon: <BarChart3 className="size-5 text-fuchsia-300" />,
    title: 'Analytics',
    desc: 'Real-time performance insights across views, favorites, and sales.',
  },
  {
    icon: <Rocket className="size-5 text-fuchsia-300" />,
    title: 'Growth Tools',
    desc: 'Discount codes, drops, and bundles to grow your collector base.',
  },
];

const FeatureCards = () => {
  return (
    <section id="features" className="relative w-full bg-gradient-to-b from-black to-[#0a0a12] py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h3 className="text-2xl font-bold md:text-3xl">Everything artists need</h3>
          <p className="mt-2 text-white/70">From first upload to global launch—your tools, your way.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white/5 p-2">{f.icon}</div>
                <div>
                  <h4 className="text-base font-semibold text-white/95">{f.title}</h4>
                  <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
