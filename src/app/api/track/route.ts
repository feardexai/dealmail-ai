import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { generateFollowUp } from '@/lib/openai/prompts';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trackingId = searchParams.get('id');

  // Return 1x1 transparent GIF immediately
  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );

  const response = new NextResponse(pixel, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    },
  });

  if (!trackingId) return response;

  // Background processing of the track event
  (async () => {
    try {
      // 1. Get email details
      const { data: email, error: emailError } = await supabaseAdmin
        .from('emails')
        .select('id, user_id, client_name, body, open_count')
        .eq('tracking_id', trackingId)
        .single();

      if (emailError || !email) return;

      // 2. Log the interaction
      await supabaseAdmin.from('tracking_logs').insert({
        email_id: email.id,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown',
      });

      // 3. Update email open count and last_opened_at
      await supabaseAdmin
        .from('emails')
        .update({
          open_count: (email.open_count || 0) + 1,
          last_opened_at: new Date().toISOString(),
        })
        .eq('id', email.id);

      // 4. If it's the first open, suggest a follow-up
      if (email.open_count === 0) {
        // Get agent name (from profile)
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('full_name')
          .eq('id', email.user_id)
          .single();

        const agentName = profile?.full_name || 'Agent';
        
        const suggestedBody = await generateFollowUp(
          email.body,
          email.client_name,
          agentName
        );

        await supabaseAdmin.from('follow_up_suggestions').insert({
          parent_email_id: email.id,
          suggested_body: suggestedBody,
          status: 'pending',
        });
      }
    } catch (err) {
      console.error('Tracking Error:', err);
    }
  })();

  return response;
}
