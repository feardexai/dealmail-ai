export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled';
export type EmailStatus = 'draft' | 'sent';
export type SuggestionStatus = 'pending' | 'sent' | 'dismissed';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  stripe_customer_id: string | null;
  subscription_status: SubscriptionStatus;
  trial_ends_at: string;
  created_at: string;
}

export interface Email {
  id: string;
  user_id: string;
  client_name: string;
  client_email: string;
  property_address: string | null;
  price: string | null;
  situation: string | null;
  email_type: string;
  subject: string;
  body: string;
  status: EmailStatus;
  tracking_id: string;
  open_count: number;
  last_opened_at: string | null;
  created_at: string;
}

export interface TrackingLog {
  id: string;
  email_id: string;
  opened_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

export interface FollowUpSuggestion {
  id: string;
  parent_email_id: string;
  suggested_body: string;
  status: SuggestionStatus;
  created_at: string;
}
