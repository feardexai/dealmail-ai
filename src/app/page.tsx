"use client";

import Link from 'next/link';
import { Sparkles, Eye, BarChart3, ArrowRight, CheckCircle2, Mail, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-8 flex justify-between items-center relative z-20"
      >
        <div className="text-2xl font-serif font-bold text-primary flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Mail className="text-background" size={22} />
          </div>
          <span className="tracking-tight">DealMail AI</span>
        </div>
        
        <div className="space-x-10 hidden md:flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-muted">
          <Link href="#features" className="hover:text-primary transition-colors hover:translate-y-[-1px]">Features</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors hover:translate-y-[-1px]">Pricing</Link>
          <Link href="/login" className="hover:text-primary transition-colors border-l border-accent pl-10 hover:translate-y-[-1px]">Login</Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link 
            href="/signup" 
            className="hidden sm:block bg-primary hover:bg-primary-light text-background px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
          >
            Get Started
          </Link>
          <button className="md:hidden text-primary">
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 pt-24 pb-40 text-center relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-primary/5 blur-[140px] rounded-full -z-10 pointer-events-none"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-accent/40 border border-primary/20 px-5 py-2.5 rounded-full mb-12"
        >
          <Sparkles size={14} className="text-primary fill-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/90">The Gold Standard for Real Estate Follow-up</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-10 leading-[0.85] tracking-tighter text-balance"
        >
          Emails That <span className="text-primary italic relative inline-block">Actually<span className="absolute bottom-4 left-0 w-full h-2 bg-primary/10 -z-10 skew-x-[-12deg]"></span></span> Get Replies
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl text-muted max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
        >
          Stop losing clients to silence. DealMail AI writes follow-ups so natural, they'll think you typed every word yourself.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-10"
        >
          <Link 
            href="/signup" 
            className="group bg-primary hover:bg-primary-light text-background px-12 py-6 rounded-2xl text-2xl font-black transition-all transform hover:-translate-y-1 shadow-2xl shadow-primary/30 w-full md:w-auto flex items-center justify-center active:scale-95"
          >
            Try Free for 7 Days
            <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={28} />
          </Link>
          <div className="flex items-center space-x-3 text-muted/80 font-bold text-sm uppercase tracking-widest">
            <CheckCircle2 size={18} className="text-primary shadow-sm shadow-primary/20" />
            <span>No Credit Card Required</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 flex flex-col items-center space-y-8"
        >
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Trusted by top luxury agents from</p>
           <div className="flex flex-wrap justify-center gap-12 md:gap-20 grayscale contrast-200 brightness-150">
              <div className="font-serif font-bold text-2xl tracking-tighter">FORBES</div>
              <div className="font-serif font-bold text-2xl tracking-tighter">SOTHEBY'S</div>
              <div className="font-serif font-bold text-2xl tracking-tighter">MANSION</div>
              <div className="font-serif font-bold text-2xl tracking-tighter">ESTATES</div>
           </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-surface py-40 border-y border-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[120px] rounded-full -mr-300 -mt-300 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[120px] rounded-full -ml-300 -mb-300 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight italic">Built for Relationship Building</h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24"
          >
            <FeatureCard 
              icon={<Sparkles size={36} />} 
              title="Sounds 100% like YOU" 
              description="No robot speak. Our AI understands real estate nuance and writes emails that feel personal, warm, and professional." 
            />
            <FeatureCard 
              icon={<Eye size={36} />} 
              title="Know when they read it" 
              description="Instant tracking notifications so you know the perfect moment to follow up with a call while you're top of mind." 
            />
            <FeatureCard 
              icon={<BarChart3 size={36} />} 
              title="Never forget a follow-up" 
              description="Automated reminders and smart suggestions ensure no lead ever goes cold. Reclaim 10+ hours every week." 
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-6 py-40 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-tight">Not just an email writer.<br/><span className="text-primary underline decoration-primary/10 underline-offset-[16px]">A closing system.</span></h2>
          <p className="text-xl md:text-2xl text-muted leading-relaxed mb-16 font-medium">
            Agents are not just buying an assistant. They are buying a system that helps them stay on top of every client and never lose a sale to silence again. 
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-10 rounded-3xl bg-accent/20 border border-primary/5 inline-block group hover:bg-accent/30 transition-colors"
          >
            <div className="flex flex-col items-center">
               <div className="text-primary font-black text-5xl mb-2">12.5%</div>
               <div className="text-muted uppercase text-[10px] font-black tracking-[0.3em]">Average increase in close rates</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-40">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-accent/60 to-surface rounded-[60px] p-12 md:p-32 border border-primary/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.07] rounded-full -mr-400 -mt-400 blur-[120px] group-hover:bg-primary/[0.1] transition-colors duration-1000 pointer-events-none"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 tracking-tight leading-[0.9]">Stop losing deals <br/>to silence.</h2>
            <p className="text-xl md:text-2xl text-muted mb-16 max-w-2xl mx-auto font-medium leading-relaxed">Join the future of real estate excellence. Start your free trial today and experience the DealMail AI difference.</p>
            
            <div className="flex flex-col items-center space-y-8">
              <Link 
                href="/signup" 
                className="bg-primary hover:bg-primary-light text-background px-16 py-7 rounded-2xl text-2xl font-black transition-all inline-flex items-center shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 group/btn"
              >
                Start Your Free Trial
                <ArrowRight className="ml-4 group-hover/btn:translate-x-2 transition-transform" size={28} />
              </Link>
              <p className="text-muted/60 text-xs font-black uppercase tracking-[0.4em]">7-day free trial — No credit card required</p>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="container mx-auto px-6 py-24 text-center border-t border-accent/30 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="text-2xl font-serif font-bold text-primary mb-10 tracking-tight">DealMail AI</div>
        
        <div className="flex justify-center space-x-12 mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-muted/60">
           <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
           <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
           <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
        </div>
        
        <p className="text-muted/40 text-[10px] font-bold uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} DealMail AI. All rights reserved. <br className="md:hidden"/> Designed for High Performance Agents.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      }}
      className="space-y-8 group p-4 rounded-3xl transition-all duration-500"
    >
      <div className="inline-flex p-5 rounded-[24px] bg-accent/40 border border-primary/10 text-primary group-hover:text-primary-light group-hover:border-primary/40 group-hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.15)] transition-all duration-500 transform group-hover:translate-y-[-8px]">
        {icon}
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl lg:text-3xl font-serif font-bold tracking-tight group-hover:text-primary transition-colors duration-500">{title}</h3>
        <p className="text-muted text-lg leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-500">{description}</p>
      </div>
    </motion.div>
  );
}
