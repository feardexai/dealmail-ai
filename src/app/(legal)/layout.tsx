import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/" className="text-2xl font-serif font-bold text-primary flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Mail className="text-background" size={22} />
          </div>
          <span className="tracking-tight">DealMail AI</span>
        </Link>
        
        <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted hover:text-primary transition-colors flex items-center">
          <ArrowLeft size={14} className="mr-2" />
          Back to Home
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="bg-surface rounded-[40px] border border-accent p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Ornaments */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted/40">
        &copy; {new Date().getFullYear()} DealMail AI. All rights reserved.
      </footer>
    </div>
  );
}
