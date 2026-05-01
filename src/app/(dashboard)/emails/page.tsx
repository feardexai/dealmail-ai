'use client';

import { useState } from 'react';
import { Mail, Eye, Calendar, MapPin, Search, Filter, MoreHorizontal, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SentEmailsPage() {
  const [search, setSearch] = useState('');

  const emails = [
    { 
      id: 1, 
      client: 'Sarah Jenkins', 
      email: 'sarah@example.com',
      property: '123 Oak Street, Beverly Hills', 
      status: 'Sent', 
      opens: 2, 
      lastOpen: '2h ago',
      date: 'May 1, 2024',
      type: 'Buyer Follow-up'
    },
    { 
      id: 2, 
      client: 'Michael Ross', 
      email: 'm.ross@firm.com',
      property: '456 Pine Ave, Santa Monica', 
      status: 'Opened', 
      opens: 5, 
      lastOpen: '5h ago',
      date: 'May 1, 2024',
      isOpened: true,
      type: 'Listing Pitch'
    },
    { 
      id: 3, 
      client: 'Emma Wilson', 
      email: 'emma.w@gmail.com',
      property: '789 Maple Dr, Malibu', 
      status: 'Opened', 
      opens: 1, 
      lastOpen: 'Yesterday',
      date: 'Apr 30, 2024',
      isOpened: true,
      type: 'Offer Negotiation'
    },
    { 
      id: 4, 
      client: 'David Brown', 
      email: 'dbrown@realestate.com',
      property: '101 Cedar Ln, Hollywood', 
      status: 'Sent', 
      opens: 0, 
      lastOpen: 'N/A',
      date: 'Apr 30, 2024',
      type: 'Open House Invite'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-serif font-bold text-foreground">Sent Emails</h1>
          <p className="text-muted mt-2">Track and manage your luxury communications.</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 w-full md:w-auto"
        >
          <button className="flex-1 md:flex-none bg-surface border border-accent text-foreground px-5 py-2.5 rounded-xl font-bold hover:bg-accent/50 transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
            <Filter size={16} className="text-primary" />
            Filters
          </button>
          <button className="flex-1 md:flex-none bg-primary text-background px-6 py-2.5 rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg shadow-primary/20 active:scale-95 text-sm">
            Export Report
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface rounded-2xl border border-accent overflow-hidden shadow-2xl relative"
      >
        <div className="p-6 border-b border-accent bg-accent/10 flex flex-col md:flex-row items-center gap-4">
           <div className="flex-1 relative w-full">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
             <input 
               type="text" 
               placeholder="Search clients or properties..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full bg-background/50 border border-accent rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted/50"
             />
           </div>
           <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted whitespace-nowrap">
             <span>Sort by:</span>
             <select className="bg-transparent border-none focus:ring-0 text-primary cursor-pointer font-black">
               <option>Recent</option>
               <option>Most Opens</option>
               <option>Client Name</option>
             </select>
           </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-accent/20 text-muted uppercase text-[10px] font-black tracking-[0.2em] border-b border-accent/50">
              <tr>
                <th className="px-8 py-5">Communication</th>
                <th className="px-8 py-5 hidden lg:table-cell">Property</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Opens</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <motion.tbody 
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-accent/30"
            >
              {emails.map((email) => (
                <motion.tr 
                  variants={item}
                  key={email.id} 
                  className="hover:bg-accent/10 transition-colors group cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${email.isOpened ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-background border-accent text-muted'}`}>
                        <Mail size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-foreground truncate max-w-[150px] md:max-w-xs">{email.client}</div>
                        <div className="text-[10px] text-muted uppercase font-black tracking-tight mt-0.5">{email.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-muted group-hover:text-foreground transition-colors">
                      <MapPin size={14} className="text-primary/50" />
                      <span className="text-sm truncate max-w-xs">{email.property}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider w-fit ${email.isOpened ? 'bg-primary/10 text-primary border-primary/20' : 'bg-accent/50 text-muted border-accent'}`}>
                        {email.isOpened && <CheckCircle2 size={10} />}
                        {email.status}
                      </span>
                      <span className="text-[10px] text-muted/60 font-bold ml-1">{email.date}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-lg font-mono font-bold text-primary">{email.opens}</div>
                      <div className="text-[9px] text-muted uppercase font-black tracking-tighter">{email.lastOpen === 'N/A' ? 'Not Read' : `Last: ${email.lastOpen}`}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-muted hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-lg">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2 bg-primary/5 border border-primary/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 group"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Eye size={32} className="text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif font-bold text-primary mb-2">Maximize Engagement</h3>
            <p className="text-muted text-sm leading-relaxed max-w-lg">
              Our analysis shows that emails sent between <span className="text-foreground font-bold">9:00 AM and 10:30 AM</span> have a <span className="text-primary font-bold">24% higher</span> open rate for luxury listings.
            </p>
          </div>
          <button className="md:ml-auto w-full md:w-auto bg-background border border-primary/30 text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary hover:text-background transition-all whitespace-nowrap active:scale-95">
            Optimize Schedule
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface border border-accent rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-xl"></div>
          <div className="relative z-10">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary/70 mb-4">Quick Insight</h4>
            <p className="text-foreground font-bold leading-relaxed">Michael Ross has opened your pitch 5 times in the last hour.</p>
            <div className="mt-6 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest group cursor-pointer">
              <span>View suggested call script</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
