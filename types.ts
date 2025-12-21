
export type RitualCategory = 'TAROT' | 'HEX' | 'LOVE' | 'DIVINATION';
export type DeckType = 'VISCONTI' | 'MARSEILLE' | 'PAPUS';
export type AppStyle = 'CELESTIAL' | 'VOID' | 'CHTHONIC';

import { Language } from './translations';

export interface ReadingHistoryItem {
  id: string;
  date: string;
  category: RitualCategory;
  typeTitle: string;
  outcome: string;
  cards: { name: string; imageUrl: string }[];
  style: AppStyle;
}

export interface TarotCard {
  name: string;
  nameRu: string;
  suit?: 'MAJOR' | 'WANDS' | 'CUPS' | 'SWORDS' | 'PENTACLES';
  description: string;
  visualElements: string;
  interpretation?: string;
  imageUrl?: string;
  revealed?: boolean;
}

export interface UserProfile {
  xp: number;
  level: number;
  rank: string;
  lastDailyUpdate: string | null;
  lastReadingTimestamp: number | null; 
  readingsCount: number;
  energy: number;
  maxEnergy: number;
  isPro: boolean;
  firstReadingDone: boolean;
  preferredStyle?: AppStyle;
  history: ReadingHistoryItem[];
}

export interface DeckInfo {
  id: DeckType;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  aiPromptStyle: string;
}

export interface ReadingType {
  id: string;
  title: string;
  titleEn: string;
  count: number;
  description: string;
  descriptionEn: string;
}

export interface RitualCategoryInfo {
  id: RitualCategory;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  color: string;
}

export interface ReadingState {
  lang: Language;
  appStyle: AppStyle;
  category: RitualCategory | null;
  cards: TarotCard[];
  readingOutcome: string | null;
  deck: DeckInfo | null;
  readingType: ReadingType | null;
  targetPhoto: string | null;
  targetPhoto2: string | null;
  spellQuery: string | null;
  selectedIndices: number[];
  loading: boolean;
  error: string | null;
  phase: 'CATEGORY' | 'DECK' | 'TYPE' | 'TARGET' | 'CONCENTRATE' | 'PICK' | 'RESULT' | 'PROFILE' | 'HISTORY';
  showLevelUp: boolean;
  soundEnabled: boolean;
  user: UserProfile;
}
