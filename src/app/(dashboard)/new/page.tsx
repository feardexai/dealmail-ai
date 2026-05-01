'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PenTool, Send, Sparkles, User, Home, Tag, Info, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewEmailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<{ id?: string; subject: string; body: string } | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    propertyAddress: '',
    price: '',
    situation: '',
    emailType: 'buyer_follow_up'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock user ID for now since auth isn't fully integrated here yet
      const userId = '00000000-0000-0000-0000-000000000000'; 
      const agentName = 'John Doe'; // Mock agent name

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId,
          agentName
        }),
      });

      if (!response.ok) throw new Error('Failed to generate email');
      
      const data = await response.json();
      setGeneratedEmail({
        id: data.email.id,
        subject: data.email.subject,
        body: data.email.body
      });
    } catch (error) {
      console.error(error);
      alert('Error generating email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!generatedEmail?.id) return;
    setSending(true);

    try {
      const response = await fetch(`/api/emails/${generatedEmail.id}/send`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to send email');
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/emails?sent=true');
      }, 2000);
    } catch (error) {
      console.error(error);
      alert('Error sending email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-primary/40"
        >
          <CheckCircle size={48} className="text-background" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-serif font-bold text-foreground mb-4"
        >
          Email Sent Successfully!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted text-lg max-w-sm"
        >
          Your client will receive it shortly. We'll notify you as soon as they open it.
        </motion.p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {generatedEmail ? (
        <motion.div 
          key="preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-4xl mx-auto"
        >
          <button 
            onClick={() => setGeneratedEmail(null)}
            className="flex items-center text-muted hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to edit details
          </button>

          <div className="bg-surface border border-accent rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-accent bg-accent/30 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-serif font-bold text-foreground">Review Your Email</h1>
                <p className="text-muted text-sm mt-1">AI has crafted this to sound 100% like you.</p>
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20 flex items-center">
                <Sparkles size={14} className="mr-2 fill-primary" />
                Agent Tone Optimized
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70 mb-2">Subject Line</label>
                <input 
                  type="text" 
                  value={generatedEmail.subject}
                  onChange={(e) => setGeneratedEmail({ ...generatedEmail, subject: e.target.value })}
                  className="w-full bg-background border border-accent rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70 mb-2">Message</label>
                <textarea 
                  rows={12}
                  value={generatedEmail.body}
                  onChange={(e) => setGeneratedEmail({ ...generatedEmail, body: e.target.value })}
                  className="w-full bg-background border border-accent rounded-xl px-6 py-5 text-foreground focus:outline-none focus:border-primary transition-all leading-relaxed resize-none"
                ></textarea>
              </div>
            </div>

            <div className="p-8 bg-accent/20 border-t border-accent flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-muted text-xs italic">
                * A tracking pixel will be added automatically to track opens.
              </p>
              <button 
                onClick={handleSend}
                disabled={sending}
                className="w-full sm:w-auto bg-primary hover:bg-primary-light text-background px-10 py-4 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send Now
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Write New Email</h1>
            <p className="text-muted max-w-lg">Fill in a few details and let DealMail AI write a personalized, professional follow-up that sounds exactly like you.</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-8">
            <div className="bg-surface border border-accent rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="flex items-center text-[10px] uppercase tracking-widest font-black text-primary/70 ml-1">
                    <User size={12} className="mr-2" />
                    Client Name
                  </label>
                  <input
                    required
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-[10px] uppercase tracking-widest font-black text-primary/70 ml-1">
                    <Send size={12} className="mr-2" />
                    Client Email
                  </label>
                  <input
                    required
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="sarah@example.com"
                    className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-[10px] uppercase tracking-widest font-black text-primary/70 ml-1">
                    <Home size={12} className="mr-2" />
                    Property Address
                  </label>
                  <input
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                    placeholder="123 Luxury Way, Beverly Hills"
                    className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-[10px] uppercase tracking-widest font-black text-primary/70 ml-1">
                    <Tag size={12} className="mr-2" />
                    Price (Optional)
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. $2.5M"
                    className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center text-[10px] uppercase tracking-widest font-black text-primary/70 ml-1">
                    <PenTool size={12} className="mr-2" />
                    Email Type
                  </label>
                  <select
                    name="emailType"
                    value={formData.emailType}
                    onChange={handleInputChange}
                    className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="buyer_follow_up">Buyer Follow-up</option>
                    <option value="listing_pitch">Listing Pitch</option>
                    <option value="offer_negotiation">Offer Negotiation</option>
                    <option value="open_house_invite">Open House Invite</option>
                    <option value="price_reduction_notice">Price Reduction Notice</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center text-[10px] uppercase tracking-widest font-black text-primary/70 ml-1">
                    <Info size={12} className="mr-2" />
                    Situation / Context
                  </label>
                  <textarea
                    required
                    name="situation"
                    value={formData.situation}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="e.g. Sarah loved the kitchen but is worried about the commute time. Mention the new metro extension."
                    className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50 resize-none leading-relaxed"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto min-w-[280px] bg-primary hover:bg-primary-light text-background px-12 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 group"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="mr-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="mr-3 group-hover:rotate-12 transition-transform fill-background" />
                    Generate AI Email
                  </>
                )}
              </button>
              <p className="text-muted text-[10px] font-medium mt-4 uppercase tracking-[0.2em] opacity-50">Powered by DealMail Intelligence</p>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
