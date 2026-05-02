import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type EmailType = 
  | 'buyer_follow_up' 
  | 'listing_pitch' 
  | 'offer_negotiation' 
  | 'open_house_invite' 
  | 'price_reduction_notice';

interface GenerateEmailParams {
  clientName: string;
  agentName: string;
  propertyAddress?: string;
  price?: string;
  situation: string;
  emailType: EmailType;
}

export async function generateEmail({
  clientName,
  agentName,
  propertyAddress,
  price,
  situation,
  emailType
}: GenerateEmailParams) {
  const systemPrompt = `You are an experienced, high-end real estate agent named ${agentName}. 
You are writing a personal email to a client named ${clientName}. 
Your tone is warm, professional, and confident, like a trusted friend. 

GOLDEN RULES:
1. NEVER use stiff formal language or AI clichés like 'I hope this email finds you well' or 'Please don't hesitate to contact me'.
2. NEVER use bullet points. Real agents rarely use them in personal follow-ups.
3. Use natural conversational language and occasional short, punchy sentences.
4. Use contractions (I'm, don't, can't) to sound more conversational.
5. Mix short and medium sentences. Avoid long, complex clauses.
6. NEVER start with 'I hope this finds you well'. Start with the purpose or a personal reference.
7. Sign off with only your first name (${agentName.split(' ')[0]}).
8. Use ${clientName} throughout the email naturally.
9. Every email must feel warm, confident and personal — like a trusted friend who happens to be an amazing agent. 
10. The client should never suspect automation was involved.`;

  const userPrompt = `
Email Type: ${emailType.replace(/_/g, ' ')}
Property Address: ${propertyAddress || 'N/A'}
Price: ${price || 'N/A'}
Situation: ${situation}

Write a personalized professional email based on these details.`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content;
  
  // Extract subject if AI included it, otherwise provide a fallback
  const subjectMatch = content?.match(/Subject: (.*)/i);
  const subject = subjectMatch ? subjectMatch[1] : `Following up on ${propertyAddress || 'our conversation'}`;
  const body = content?.replace(/Subject: .*\n?/i, '').trim() || '';

  return { subject, body };
}

export async function generateFollowUp(originalEmailBody: string, clientName: string, agentName: string) {
  const systemPrompt = `You are an experienced real estate agent named ${agentName}. 
Your client ${clientName} just opened your previous email. 
Suggest a perfect, short, and personal follow-up email to send now.
Follow the GOLDEN RULES: No bullet points, no 'I hope this finds you well', use contractions, sound like a trusted friend.`;

  const userPrompt = `Original Email sent to ${clientName}:
"${originalEmailBody}"

Write a short, natural follow-up email.`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content?.trim() || '';
}
