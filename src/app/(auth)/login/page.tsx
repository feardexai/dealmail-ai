"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real app, this would handle login
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
        <h1 className="text-2xl font-serif font-bold text-foreground">Welcome back</h1>
        <p className="text-muted text-sm mt-2">Enter your credentials to access your dashboard.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="flex items-center justify-between mb-2 ml-1">
            <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70">Password</label>
            <Link href="#" className="text-[10px] uppercase tracking-widest font-black text-primary hover:text-primary-light transition-colors">Forgot?</Link>
          </div>
          <input 
            type="password" 
            required
            placeholder="••••••••"
            className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/30"
          />
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
              Login to Dashboard
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-accent text-center">
        <p className="text-muted text-sm font-medium">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary font-bold hover:underline underline-offset-4">Sign up for free</Link>
        </p>
      </div>
    </motion.div>
  );
}
