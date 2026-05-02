export default function TermsPage() {
  return (
    <div className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-serif font-bold text-primary mb-8">Terms of Service</h1>
      <p className="text-muted leading-relaxed mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Agreement to Terms</h2>
        <p className="text-muted leading-relaxed">
          By accessing our website at dealmail.ai, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Use License</h2>
        <p className="text-muted leading-relaxed">
          Permission is granted to temporarily use DealMail AI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Subscription</h2>
        <p className="text-muted leading-relaxed">
          DealMail AI is a subscription-based service. You agree to pay the monthly or annual fee for the service as described on our pricing page. You may cancel your subscription at any time.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Disclaimer</h2>
        <p className="text-muted leading-relaxed">
          The materials on DealMail AI's website are provided on an 'as is' basis. DealMail AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p> section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Contact</h2>
        <p className="text-muted leading-relaxed">
          For any questions regarding these terms, please contact us at: <span className="text-primary">legal@dealmail.ai</span>
        </p>
      </section>
    </div>
  );
}
