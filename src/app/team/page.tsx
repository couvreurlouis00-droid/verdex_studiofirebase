import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import Image from 'next/image';

const members = [
  { name: "Dr. Elena Vance", role: "Chief Scientist", bio: "Climate researcher with 15+ years experience at MIT." },
  { name: "Marcus Thorne", role: "Core Architect", bio: "Ex-Ethereum Foundation, focused on L1 consensus." },
  { name: "Sarah Chen", role: "Ecosystem Lead", bio: "Passionate about building regenerative communities." }
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6">
        <h1 className="font-headline font-bold text-5xl mb-16 text-center">The <span className="text-primary italic font-body font-light">Architects</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {members.map((m, i) => (
            <div key={i} className="text-center group">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                <Image src={`https://picsum.photos/seed/team${i}/200/200`} alt={m.name} width={200} height={200} className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-2xl font-headline font-bold">{m.name}</h3>
              <p className="text-primary font-code text-xs mb-4 uppercase">{m.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
