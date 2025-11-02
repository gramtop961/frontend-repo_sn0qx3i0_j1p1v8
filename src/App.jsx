import React from 'react';
import Hero3D from './components/Hero3D.jsx';
import LoadingShowcase from './components/LoadingShowcase.jsx';
import FeatureCards from './components/FeatureCards.jsx';
import CTASection from './components/CTASection.jsx';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
          <span className="text-sm font-semibold tracking-wide text-white/90">Artsea</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#cta" className="hover:text-white">Dashboard</a>
          <a href="#" className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10">Sign in</a>
        </nav>
      </header>

      <main className="w-full">
        <Hero3D />
        <LoadingShowcase />
        <FeatureCards />
        <CTASection />
      </main>

      <footer className="border-t border-white/10 bg-[#080810] py-10 text-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
            <span>© {new Date().getFullYear()} Artsea</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
