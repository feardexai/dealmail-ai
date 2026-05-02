import { Send, MapPin, Mail as MailIcon, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-primary mb-8 text-center">Get in Touch</h1>
      <p className="text-muted text-center max-w-xl mx-auto mb-16 leading-relaxed">
        Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-10">
          <ContactMethod 
            icon={<MailIcon className="text-primary" />} 
            title="Email Us" 
            detail="hello@dealmail.ai" 
            description="Our support team usually responds within 2 hours." 
          />
          <ContactMethod 
            icon={<Phone className="text-primary" />} 
            title="Call Us" 
            detail="+1 (555) 123-4567" 
            description="Mon-Fri from 9am to 6pm EST." 
          />
          <ContactMethod 
            icon={<MapPin className="text-primary" />} 
            title="Office" 
            detail="Luxury Way, Suite 100" 
            description="Beverly Hills, CA 90210" 
          />
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70 mb-2 ml-1">Your Name</label>
            <input 
              type="text" 
              placeholder="John Smith"
              className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted/30"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="agent@luxury.com"
              className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted/30"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-black text-primary/70 mb-2 ml-1">Message</label>
            <textarea 
              rows={5}
              placeholder="How can we help you today?"
              className="w-full bg-background/50 border border-accent rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted/30 resize-none"
            ></textarea>
          </div>
          <button className="w-full bg-primary hover:bg-primary-light text-background px-8 py-5 rounded-2xl font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center group">
            Send Message
            <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function ContactMethod({ icon, title, detail, description }: { icon: React.ReactNode, title: string, detail: string, description: string }) {
  return (
    <div className="flex items-start space-x-6 group">
      <div className="w-12 h-12 bg-accent/40 rounded-xl flex items-center justify-center border border-primary/10 group-hover:border-primary/40 transition-colors shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">{title}</h3>
        <p className="text-primary font-bold mb-1">{detail}</p>
        <p className="text-muted text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
