import React, { useState } from 'react';
import { useReveal } from './hooks/useReveal';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AIAssistant } from './components/AIAssistant';
import { About } from './components/About';
import { Categories } from './components/Categories';
import { Catalog } from './components/Catalog';
import { Differentials } from './components/Differentials';
import { Deadlines } from './components/Deadlines';
import { CnpjNotice } from './components/CnpjNotice';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { PrivacyModal } from './components/PrivacyModal';

export function App() {
  useReveal();
  const [catalogFilter, setCatalogFilter] = useState('todos');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="relative overflow-x-clip min-h-screen selection:bg-cyan selection:text-navy">
      <Header />
      <main>
        <Hero />
        <AIAssistant />
        <About />
        <Categories onSelectCategory={(catId) => setCatalogFilter(catId)} />
        <Catalog
          filter={catalogFilter}
          onFilterChange={(newFilter) => setCatalogFilter(newFilter)}
        />
        <Differentials />
        <Deadlines />
        <CnpjNotice />
        <ContactForm />
      </main>
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <WhatsAppFloat />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}

export default App;
