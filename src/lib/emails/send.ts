import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase/client';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailWithTracking(emailId: string) {
  // 1. Fetch email details
  const { data: email, error: fetchError } = await supabaseAdmin
    .from('emails')
    .select('*')
    .eq('id', emailId)
    .single();

  if (fetchError || !email) throw new Error('Email not found');

  const trackingPixelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/track?id=${email.tracking_id}`;
  const trackedBody = `${email.body}<br/><img src="${trackingPixelUrl}" width="1" height="1" style="display:none;" />`;

  // 2. Send via Resend
  const { data, error: sendError } = await resend.emails.send({
    from: 'DealMail AI <onboarding@resend.dev>', // Should be a verified domain in production
    to: [email.client_email],
    subject: email.subject,
    html: trackedBody,
  });

  if (sendError) throw sendError;

  // 3. Update status to 'sent'
  await supabaseAdmin
    .from('emails')
    .update({ status: 'sent' })
    .eq('id', emailId);

  return data;
}
