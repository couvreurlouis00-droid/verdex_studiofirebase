import React from 'react';
import Link from 'next/link';
import { Hexagon, Twitter, Github, Linkedin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/40 border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <Hexagon className="text-primary w-8 h-8" />
              <span className="font-headline font-bold text-2xl tracking-tight">Verdex</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              The carbon-neutral Layer-1 protocol.<br />Built for the planet.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, MessageCircle].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="font-code text-[10px] text-muted-foreground uppercase tracking-widest">Protocol</h5>
            <ul className="space-y-3 flex flex-col">
              {['Whitepaper', 'Documentation', 'GitHub', 'Audit Reports'].map(link => (
                <Link key={link} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</Link>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="font-code text-[10px] text-muted-foreground uppercase tracking-widest">Ecosystem</h5>
            <ul className="space-y-3 flex flex-col">
              {['Developers', 'Grants', 'Validators', 'Carbon Oracle'].map(link => (
                <Link key={link} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</Link>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="font-code text-[10px] text-muted-foreground uppercase tracking-widest">Company</h5>
            <ul className="space-y-3 flex flex-col">
              {['About', 'Team', 'Blog', 'Press Kit'].map(link => (
                <Link key={link} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground font-code text-[10px] uppercase tracking-widest">
          <span>© 2025 Verdex Protocol Foundation</span>
          <span>Made with <span className="text-primary">🌱</span> & curiosity</span>
        </div>
      </div>
    </footer>
  );
};