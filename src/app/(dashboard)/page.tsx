"use client";

import { Mail, Eye, MessageSquare, Clock, ArrowUpRight, ArrowDownRight, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  // Mock trial status check
  const isTrialExpired = false; 

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {isTrialExpired && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle className="text-red-500" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-serif">Your trial has expired</h3>
              <p className="text-muted text-sm">Upgrade to Pro to continue writing personalized AI emails and tracking client opens.</p>
            </div>
          </div>
          <Link href="/dashboard/upgrade" className="bg-primary text-background px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-light transition-all shadow-lg shadow-primary/20">
            Upgrade Now
          </Link>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-foreground font-sans"
      >
        <motion.div variants={item}><StatCard title="Total Sent" value="124" change="+12" icon={<Mail size={24} />} /></motion.div>
        <motion.div variants={item}><StatCard title="Open Rate" value="68%" change="+5%" icon={<Eye size={24} />} /></motion.div>
        <motion.div variants={item}><StatCard title="Replies" value="42" change="+3" icon={<MessageSquare size={24} />} /></motion.div>
        <motion.div variants={item}><StatCard title="Follow-ups" value="18" change="-2" icon={<Clock size={24} />} /></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-surface rounded-xl border border-accent overflow-hidden shadow-2xl"
        >
          <div className="p-6 border-b border-accent flex justify-between items-center bg-accent/5">
            <h3 className="text-xl font-serif font-semibold text-primary">Sent Emails</h3>
            <button className="text-sm text-primary font-semibold hover:text-primary-light transition-colors underline decoration-primary/20 underline-offset-8 flex items-center group">
              View All <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-accent/20 text-muted uppercase text-[10px] font-black tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-5">Client</th>
                  <th className="px-8 py-5">Property</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Opens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/50">
                <EmailRow 
                  client="Sarah Jenkins" 
                  property="123 Oak St" 
                  status="Sent" 
                  opens={2} 
                  time="2h ago" 
                />
                <EmailRow 
                  client="Michael Ross" 
                  property="456 Pine Ave" 
                  status="Opened" 
                  opens={5} 
                  time="5h ago" 
                  isOpened 
                />
                <EmailRow 
                  client="Emma Wilson" 
                  property="789 Maple Dr" 
                  status="Opened" 
                  opens={1} 
                  time="Yesterday" 
                  isOpened 
                />
                <EmailRow 
                  client="David Brown" 
                  property="101 Cedar Ln" 
                  status="Sent" 
                  opens={0} 
                  time="Yesterday" 
                />
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Sidebar / Follow-up Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-surface rounded-xl border border-accent p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
            <h3 className="text-xl font-serif font-semibold mb-6 flex items-center justify-between relative z-10">
              Smart Actions
              <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded-full border border-primary/30 font-black uppercase tracking-tighter shadow-sm shadow-primary/20">4 Priority</span>
            </h3>
            <div className="space-y-4 relative z-10">
              <FollowUpItem 
                name="Michael Ross" 
                trigger="Email opened 5 times" 
                time="High Intent" 
                urgent
              />
              <FollowUpItem 
                name="Sarah Jenkins" 
                trigger="Opened 1 hour ago" 
                time="2nd Step" 
              />
            </div>
            <button className="w-full mt-8 py-4 bg-primary text-background rounded-lg font-black uppercase text-xs tracking-widest hover:bg-primary-light transition-all shadow-xl shadow-primary/10 relative z-10 active:scale-[0.98] flex items-center justify-center space-x-2">
              <Sparkles size={14} className="fill-background" />
              <span>Launch Assistant</span>
            </button>
          </div>

          <div className="bg-primary/5 rounded-xl border border-primary/10 p-6 relative group hover:bg-primary/[0.07] transition-colors overflow-hidden">
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            <h4 className="text-primary font-black mb-3 text-[10px] uppercase tracking-[0.2em] flex items-center">
              <span className="w-4 h-[1px] bg-primary/50 mr-2"></span>
              Deal Prediction
            </h4>
            <p className="text-sm text-muted mb-5 leading-relaxed font-medium">Based on open patterns, Michael Ross is <span className="text-foreground font-bold">85% likely</span> to book a showing soon.</p>
            <div className="w-full bg-background/50 rounded-full h-1.5 overflow-hidden border border-accent/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                className="bg-gradient-to-r from-primary/80 to-primary h-full shadow-[0_0_12px_rgba(212,175,55,0.4)]" 
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-surface p-6 rounded-xl border border-accent shadow-lg hover:border-primary/40 transition-all group relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-2 text-primary/5 group-hover:text-primary/10 transition-colors">
        {icon}
      </div>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-lg bg-accent/40 text-primary group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider flex items-center border ${isPositive ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
          {isPositive ? <ArrowUpRight size={10} className="mr-1" /> : <ArrowDownRight size={10} className="mr-1" />}
          {change}
        </span>
      </div>
      <h4 className="text-muted text-[10px] font-black uppercase tracking-[0.15em]">{title}</h4>
      <p className="text-3xl font-serif font-bold mt-1 text-foreground group-hover:text-primary transition-colors">{value}</p>
    </div>
  );
}

function EmailRow({ client, property, status, opens, time, isOpened = false }: { client: string; property: string; status: string; opens: number; time: string; isOpened?: boolean }) {
  return (
    <tr className="hover:bg-accent/20 transition-all group cursor-pointer">
      <td className="px-8 py-6">
        <div className="font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">{client}</div>
        <div className="text-[10px] text-muted uppercase font-black tracking-tighter flex items-center mt-1">
          <Clock size={10} className="mr-1 opacity-50" />
          {time}
        </div>
      </td>
      <td className="px-8 py-6 text-sm text-muted group-hover:text-foreground/80 transition-colors font-medium">{property}</td>
      <td className="px-8 py-6">
        <span className={`text-[9px] font-black px-2.5 py-1.5 rounded-md border uppercase tracking-[0.1em] shadow-sm ${isOpened ? 'bg-primary/10 text-primary border-primary/30 shadow-primary/5' : 'bg-accent/50 text-muted border-accent/50 shadow-black/20'}`}>
          {status}
        </span>
      </td>
      <td className="px-8 py-6 font-mono font-black text-primary group-hover:scale-110 transition-transform origin-left">{opens}</td>
    </tr>
  );
}

function FollowUpItem({ name, trigger, time, urgent = false }: { name: string; trigger: string; time: string, urgent?: boolean }) {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className={`p-4 rounded-xl bg-accent/20 border transition-all group cursor-pointer active:scale-[0.97] ${urgent ? 'border-primary/40 hover:border-primary shadow-lg shadow-primary/5' : 'border-accent/50 hover:border-primary/30'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className={`font-black text-xs uppercase tracking-tight ${urgent ? 'text-primary' : 'text-primary/80 group-hover:text-primary'}`}>{name}</div>
        <div className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded border tracking-tighter transition-colors ${urgent ? 'bg-primary text-background border-primary' : 'text-muted border-accent group-hover:text-foreground group-hover:border-primary/30'}`}>{time}</div>
      </div>
      <div className="text-[11px] text-muted leading-tight font-medium group-hover:text-foreground/70 transition-colors flex items-center">
         <div className={`w-1 h-1 rounded-full mr-2 ${urgent ? 'bg-primary animate-pulse' : 'bg-muted group-hover:bg-primary/50'}`}></div>
         {trigger}
      </div>
    </motion.div>
  );
}
