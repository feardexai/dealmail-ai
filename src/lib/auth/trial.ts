import { Profile } from '@/types';

export function getTrialStatus(profile: Profile) {
  if (profile.subscription_status === 'active') {
    return { isTrial: false, daysLeft: 0, status: 'active' };
  }

  const trialEnds = new Date(profile.trial_ends_at);
  const now = new Date();
  const diffTime = trialEnds.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isExpired = diffDays <= 0;

  return {
    isTrial: true,
    daysLeft: Math.max(0, diffDays),
    isExpired,
    status: profile.subscription_status
  };
}
