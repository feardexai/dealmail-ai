"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Mail, PenTool, BarChart3, Bell, Zap, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrialStatus } from '@/lib/auth/trial';
import { Profile } from '@/types';

// This would be fetched from Supabase in a real app
const mockProfile: Profile = {
  id: '00000000-0000-0000-0000-000000000000',
  full_name: 'John Doe',
  email: 'john@example.com',
  stripe_customer_id: null,
  subscription_status: 'trialing',
  trial_ends_at: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
  created_at: new Date().toISOString(),
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const trial = getTrialStatus(mockProfile);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-surface border-r border-accent flex-col shrink-0">
        <div className="p-8 text-2xl font-serif font-bold text-primary tracking-tighter">
          DealMail AI
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarLink href="/dashboard" label="Overview" icon={<LayoutDashboard size={20} />} active={pathname === '/dashboard'} />
          <SidebarLink href="/dashboard/emails" label="Sent Emails" icon={<Mail size={20} />} active={pathname === '/dashboard/emails'} />
          <SidebarLink href="/dashboard/new" label="Write New" icon={<PenTool size={20} />} active={pathname === '/dashboard/new'} />
          <SidebarLink href="/dashboard/analytics" label="Open Rates" icon={<BarChart3 size={20} />} active={pathname === '/dashboard/analytics'} />
        </nav>

        <div className="p-6 border-t border-accent mt-auto">
          {trial.isTrial ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-accent/50 p-5 rounded-2xl border border-primary/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -mr-8 -mt-8 blur-xl"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <p className="text-[10px] text-muted uppercase font-black tracking-widest text-primary/70">Trial Status</p>
                <Zap size={14} className="text-primary fill-primary animate-pulse" />
              </div>
              <div className="w-full bg-background/50 rounded-full h-2 mb-4 overflow-hidden border border-accent relative z-10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(trial.daysLeft / 7) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(212,175,55,0.5)]" 
                ></motion.div>
              </div>
              <div className="flex justify-between items-end relative z-10">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    {trial.daysLeft} {trial.daysLeft === 1 ? 'day' : 'days'} left
                  </span>
                  <span className="text-[10px] text-muted font-medium uppercase tracking-tight">Free Trial</span>
                </div>
                <Link href="/dashboard/upgrade" className="bg-primary/10 hover:bg-primary text-primary hover:text-background p-2 px-3 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest border border-primary/20">
                  Upgrade
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                  <Zap size={16} className="text-background fill-background" />
                </div>
                <div>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-tight">Pro Plan</p>
                  <p className="text-xs font-bold text-foreground">Active</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Nav (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-accent flex items-center justify-around px-2 z-50 shadow-2xl backdrop-blur-lg bg-surface/90">
        <MobileNavLink href="/dashboard" icon={<LayoutDashboard size={20} />} active={pathname === '/dashboard'} />
        <MobileNavLink href="/dashboard/emails" icon={<Mail size={20} />} active={pathname === '/dashboard/emails'} />
        <div className="relative -mt-8">
          <Link href="/dashboard/new" className="w-14 h-14 bg-primary text-background rounded-full flex items-center justify-center shadow-xl shadow-primary/30 active:scale-90 transition-transform border-4 border-background">
            <PenTool size={24} />
          </Link>
        </div>
        <MobileNavLink href="/dashboard/analytics" icon={<BarChart3 size={20} />} active={pathname === '/dashboard/analytics'} />
        <button className="flex flex-col items-center justify-center space-y-1 text-muted p-2">
          <Menu size={20} />
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 md:h-20 border-b border-accent flex items-center justify-between px-6 md:px-10 bg-surface/30 backdrop-blur-xl shrink-0 z-20">
          <div className="flex items-center gap-4">
            <div className="md:hidden text-primary font-serif font-bold text-xl">DM</div>
            <h2 className="text-lg md:text-xl font-serif font-semibold text-foreground/90">Dashboard</h2>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-8">
            <button className="text-muted hover:text-primary transition-colors relative p-2">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
            </button>
            <div className="flex items-center space-x-3 md:pl-8 md:border-l border-accent">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-foreground">John Doe</p>
                <p className="text-[10px] text-muted uppercase tracking-tighter font-black opacity-70">Luxury Partner</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-primary font-serif font-bold text-sm shadow-inner group cursor-pointer hover:border-primary/60 transition-all"
              >
                JD
              </motion.div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative pb-24 md:pb-10 overflow-x-hidden">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ href, label, icon, active = false }: { href: string; label: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all group relative ${
        active 
          ? 'text-background font-bold' 
          : 'text-muted hover:bg-accent/40 hover:text-foreground hover:translate-x-1'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="active-nav"
          className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20 -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className={active ? '' : 'group-hover:text-primary transition-colors'}>{icon}</span>
      <span className="text-sm tracking-tight">{label}</span>
    </Link>
  );
}

function MobileNavLink({ href, icon, active = false }: { href: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex flex-col items-center justify-center space-y-1 p-2 transition-all relative ${
        active ? 'text-primary scale-110' : 'text-muted'
      }`}
    >
      {icon}
      {active && (
        <motion.div 
          layoutId="mobile-active-nav"
          className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
        />
      )}
    </Link>
  );
}
