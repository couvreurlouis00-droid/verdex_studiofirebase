import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Dashboard } from '@/components/sections/Dashboard';
import { Roadmap } from '@/components/sections/Roadmap';
import { EligibilityCriteria } from '@/components/sections/EligibilityCriteria';
import { FAQ } from '@/components/sections/FAQ';
import { Waitlist } from '@/components/sections/Waitlist';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Dashboard />
      <Roadmap />
      <EligibilityCriteria />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
