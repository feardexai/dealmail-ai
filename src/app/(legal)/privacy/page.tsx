export default function PrivacyPage() {
  return (
    <div className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-serif font-bold text-primary mb-8">Privacy Policy</h1>
      <p className="text-muted leading-relaxed mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Introduction</h2>
        <p className="text-muted leading-relaxed">
          At DealMail AI, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Data We Collect</h2>
        <p className="text-muted leading-relaxed">
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 text-muted space-y-2 mt-4">
          <li>Identity Data: Includes first name, last name.</li>
          <li>Contact Data: Includes email address.</li>
          <li>Technical Data: Includes internet protocol (IP) address, login data, browser type and version.</li>
          <li>Usage Data: Includes information about how you use our website and services.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">How We Use Your Data</h2>
        <p className="text-muted leading-relaxed">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide the service you have requested, namely AI-powered email follow-ups for your real estate business.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Contact Us</h2>
        <p className="text-muted leading-relaxed">
          If you have any questions about this privacy policy or our privacy practices, please contact us at: <span className="text-primary">privacy@dealmail.ai</span>
        </p>
      </section>
    </div>
  );
}
