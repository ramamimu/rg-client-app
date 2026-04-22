export interface Couple {
  shortName: string;
  fullName: string;
  photoUrl: string;
  parents: {
    father: string;
    mother: string;
  };
}

export interface Quote {
  enabled: boolean;
  text: string;
  source: string;
}

export interface Story {
  title: string;
  description: string;
  photoUrl: string;
}

export interface LoveStory {
  enabled: boolean;
  stories?: Story[];
}

export interface Livestream {
  enabled: boolean;
  url: string;
  platform: string;
  startTime: Date;
}

export interface Event {
  title: string;
  timeStart: Date;
  timeEnd: Date | null;
  venue: string;
  address: string;
  mapsUrl: string;
  dresscode?: string;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface Gift {
  enabled: boolean;
  address?: string;
  bankAccounts: BankAccount[];
}

export interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export interface Gallery {
  enabled: boolean;
  photos: string[]; // array of photo URLs
}

export interface Invitation {
  createdAt: Date;
  type: string; // e.g., "lineart-v1", "minimalist-v1".
  bride: Couple;
  groom: Couple;
  weddingDate: Date;
  events: Event[];
  quote: Quote;
  loveStories: LoveStory;
  livestream: Livestream;
  gallery: Gallery;
  gift: Gift;
  music?: string; // music URL
  rsvpEnabled: boolean;
  commentsEnabled: boolean;
  notes?: string;
}
