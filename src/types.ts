export interface Counselor {
  id: string;
  name: string;
  ign: string;
  role: string;
  specialty: string;
  bio: string;
}

export interface Donor {
  id: string;
  ign: string;
}

export type SessionTone = 'rp' | 'serious';

export interface BookingFormData {
  ign: string;
  discord: string;
  tone: SessionTone;
  counselorPreference: string;
  date: string;
  timeSlot: string;
  notes: string;
}

export interface SessionVibeOption {
  id: SessionTone | 'duo';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  defaultCounselorPref: string;
  defaultTone: SessionTone;
  imageUrl: string;
  highlights: string[];
}
