'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Hexagon, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.token, href: '#token' },
    { name: t.nav.roadmap, href: '#roadmap' },
    { name: t.nav.dashboard, href: '#dashboard' },
    { name: t.nav.faq, href: '#faq' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ar', name: 'العربية' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/90 backdrop-blur-md border-b py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Hexagon className="text-primary w-6 h-6 animate-pulse" />
          <span className="font-headline font-bold text-xl tracking-tight">Verdex</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-headline font-semibold text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA & Lang */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 font-code text-[10px] uppercase">
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === language)?.name || language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-border max-h-[300px] overflow-y-auto">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code} 
                  onClick={() => setLanguage(lang.code as any)} 
                  className={cn("cursor-pointer", language === lang.code && "bg-primary/10 text-primary")}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" asChild>
            <Link href="#criteria">{t.nav.eligibility}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="#waitlist">{t.nav.join}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-headline font-semibold text-lg py-2 border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <div className="grid grid-cols-3 gap-2 mb-2">
              {languages.map((lang) => (
                <Button 
                  key={lang.code}
                  variant={language === lang.code ? 'default' : 'outline'} 
                  size="sm" 
                  className="text-[10px]"
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setMobileMenuOpen(false);
                  }}
                >
                  {lang.code.toUpperCase()}
                </Button>
              ))}
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="#criteria" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.eligibility}
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="#waitlist" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.join}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
