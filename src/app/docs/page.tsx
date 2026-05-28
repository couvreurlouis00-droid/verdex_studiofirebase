import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-20">
        <SidebarProvider>
          <div className="flex w-full">
            <Sidebar className="top-20 h-[calc(100vh-5rem)] border-r border-border bg-secondary/20">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Introduction</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem><SidebarMenuButton>Getting Started</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton>Core Concepts</SidebarMenuButton></SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Validators</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem><SidebarMenuButton>Running a Node</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton>Hardware Requirements</SidebarMenuButton></SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="bg-background p-12 max-w-4xl mx-auto">
              <h1 className="font-headline font-bold text-4xl mb-6">Documentation</h1>
              <p className="text-muted-foreground mb-8">Everything you need to build on Verdex, run a node, or integrate climate data into your dApps.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-2">Build with Solidity</h3>
                  <p className="text-sm text-muted-foreground">Verdex is fully EVM compatible. Use your favorite tools like Hardhat or Foundry.</p>
                </div>
                <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-2">Connect to Oracle</h3>
                  <p className="text-sm text-muted-foreground">Learn how to query the Carbon Oracle for live environmental metrics.</p>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
      <Footer />
    </main>
  );
}
