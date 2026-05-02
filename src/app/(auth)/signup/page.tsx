"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real app, this would handle signup
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-foreground">Join DealMail AI</h1>
        <p className="text-muted text-sm mt-2">Start your 7-day free trial. No credit card required.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70 mb-2 ml-1">Full Name</label>
          <input 
            type="text" 
            required
            placeholder="John Smith"
            className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/30"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70 mb-2 ml-1">Email Address</label>
          <input 
            type="email" 
            required
            placeholder="agent@luxury.com"
            className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/30"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70 mb-2 ml-1">Password</label>
          <input 
            type="password" 
            required
            placeholder="••••••••"
            className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/30"
          />
        </div>

        <div className="flex items-start space-x-3 py-2">
          <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={16} />
          <p className="text-[10px] text-muted font-medium leading-relaxed">
            I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-light text-background px-8 py-5 rounded-2xl font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center group disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Start Free Trial
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-accent text-center">
        <p className="text-muted text-sm font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline underline-offset-4">Log in here</Link>
        </p>
      </div>
    </motion.div>
  );
}
