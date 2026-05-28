import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const posts = [
  { title: "The Future of Proof-of-Growth", date: "Feb 12, 2025", desc: "How we're changing the way blockchain networks verify environmental impact." },
  { title: "Verdex Phase 3 Roadmap Update", date: "Jan 28, 2025", desc: "A deep dive into our upcoming IoT sensor network integration." },
  { title: "Why Carbon Neutrality is Not Enough", date: "Jan 15, 2025", desc: "Why we focus on regenerative finance rather than just offsetting." }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-5xl">
        <h1 className="font-headline font-bold text-5xl mb-12 text-center">Verdex <span className="text-primary italic font-body font-light">Insights</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Card key={i} className="bg-secondary/30 border-border hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <span className="font-code text-[10px] text-primary uppercase">{post.date}</span>
                <CardTitle className="mt-2">{post.title}</CardTitle>
                <CardDescription>{post.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
