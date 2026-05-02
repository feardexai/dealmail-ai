'use client';

import { useState } from 'react';
import { Check, Loader2, Zap, Shield, Crown } from 'lucide-react';

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // In a real app, we'd get these from the session/context
      const userId = '00000000-0000-0000-0000-000000000000';
      const email = 'user@example.com';
      const name = 'Real Estate Agent';

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, name }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      
      if (url) window.location.href = url;
    } catch (err) {
      console.error(err);
      alert('Could not initiate checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Elevate Your Real Estate Business</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Your 7-day trial gives you a taste of the future. Upgrade to Pro and never lose a deal to silence again.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Why Upgrade Section */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
              <Zap className="text-primary fill-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Unlimited AI Drafts</h3>
              <p className="text-muted text-sm leading-relaxed">Generate as many personalized emails as you need. Listing pitches, offer negotiations, and more.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
              <Shield className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Advanced Tracking</h3>
              <p className="text-muted text-sm leading-relaxed">Know exactly when, where, and how many times your clients open your emails.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
              <Crown className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Priority Support</h3>
              <p className="text-muted text-sm leading-relaxed">Dedicated concierge support to help you maximize your DealMail AI experience.</p>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-surface border-2 border-primary/30 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-background text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-bl-2xl">
            Most Popular
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Pro Plan</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-primary">$39</span>
              <span className="text-muted font-medium">/month</span>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <FeatureItem text="Unlimited AI Email Generation" />
            <FeatureItem text="Real-time Open Notifications" />
            <FeatureItem text="Automatic Follow-up Suggestions" />
            <FeatureItem text="Premium Luxury Templates" />
            <FeatureItem text="Mobile Dashboard Access" />
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-background py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Get Started Now'}
          </button>
          
          <p className="text-center text-muted text-[10px] font-medium mt-6 uppercase tracking-widest opacity-60">
            Cancel anytime. No long-term contracts.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
        <Check size={12} className="text-primary" />
      </div>
      <span className="text-foreground/90 font-medium text-sm">{text}</span>
    </div>
  );
}
