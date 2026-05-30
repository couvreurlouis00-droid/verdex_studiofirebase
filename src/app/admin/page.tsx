'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/lib/i18n';
import { Loader2, Users, Database, Shield, LayoutDashboard, LogOut, Zap } from 'lucide-react';

const ADMIN_EMAIL = "louloucvrr@gmail.com";
const ADMIN_PASS = "Louis@911073";

export default function AdminPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Static mock data for demo since DB is disabled
  const mockEntries = [
    { id: '1', name: 'Dr. Elena Vance', email: 'elena@mit.edu', role: 'validator', walletAddress: '0x71C...3d12', createdAt: new Date() },
    { id: '2', name: 'Marcus Thorne', email: 'marcus@eth.org', role: 'dev', walletAddress: '0x123...abcD', createdAt: new Date() },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md bg-secondary/30 border-border">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-headline font-bold">{t.admin?.login || 'Admin Login'}</CardTitle>
              <CardDescription>Restricted Area</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.admin?.email || 'Email'}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@protocol.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t.admin?.password || 'Password'}</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <Button className="w-full h-12 font-bold" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : (t.admin?.signIn || 'Sign In')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    );
  }

  const stats = {
    total: 14678,
    validators: 1200,
    developers: 850,
    investors: 12628,
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="font-headline font-bold text-4xl mb-2 flex items-center gap-3">
              <LayoutDashboard className="text-primary" /> {t.admin?.title || 'Protocol Dashboard'}
            </h1>
            <p className="text-muted-foreground">{t.admin?.subtitle || 'Static View (Database Offline)'}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-secondary/20 border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Users className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-code tracking-widest">{t.admin?.stats?.total || 'Total'}</p>
                  <p className="text-3xl font-headline font-bold">{stats.total.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/20 border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-xl text-accent"><Shield className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-code tracking-widest">{t.admin?.stats?.validators || 'Validators'}</p>
                  <p className="text-3xl font-headline font-bold">{stats.validators.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/20 border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Database className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-code tracking-widest">{t.admin?.stats?.developers || 'Devs'}</p>
                  <p className="text-3xl font-headline font-bold">{stats.developers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/20 border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><Zap className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-code tracking-widest">{t.admin?.stats?.investors || 'Investors'}</p>
                  <p className="text-3xl font-headline font-bold">{stats.investors.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-secondary/20 border-border overflow-hidden">
          <CardHeader className="border-b border-border bg-secondary/10">
            <CardTitle className="text-xl font-headline font-bold">Recent Signups (Example Data)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="font-code text-[10px] uppercase tracking-widest">{t.admin?.table?.name || 'Name'}</TableHead>
                    <TableHead className="font-code text-[10px] uppercase tracking-widest">{t.admin?.table?.email || 'Email'}</TableHead>
                    <TableHead className="font-code text-[10px] uppercase tracking-widest">{t.admin?.table?.role || 'Role'}</TableHead>
                    <TableHead className="font-code text-[10px] uppercase tracking-widest">{t.admin?.table?.wallet || 'Wallet'}</TableHead>
                    <TableHead className="font-code text-[10px] uppercase tracking-widest">{t.admin?.table?.date || 'Date'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEntries.map((entry: any) => (
                    <TableRow key={entry.id} className="border-border hover:bg-secondary/10">
                      <TableCell className="font-medium">{entry.name}</TableCell>
                      <TableCell className="text-muted-foreground">{entry.email}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-md border border-primary/20">
                          {entry.role}
                        </span>
                      </TableCell>
                      <TableCell className="font-code text-[10px] truncate max-w-[120px]">
                        {entry.walletAddress || 'N/A'}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {entry.createdAt.toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
