import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-primary/5 blur-[140px] rounded-full -z-10 pointer-events-none opacity-60"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex flex-col items-center group">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500 mb-6">
            <Mail className="text-background" size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary tracking-tight">DealMail AI</h2>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-surface py-10 px-6 shadow-2xl sm:rounded-[32px] border border-accent sm:px-12 backdrop-blur-xl relative overflow-hidden group">
          {/* Subtle gold shine in corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
          
          {children}
        </div>
        
        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted/60">
          The Gold Standard for Real Estate Follow-up
        </p>
      </div>
    </div>
  );
}
