
export type RitualCategory = 'TAROT' | 'HEX' | 'LOVE' | 'DIVINATION';
export type DeckType = 'VISCONTI' | 'MARSEILLE' | 'PAPUS';
import { Language } from './translations';

export interface TarotCard {
  name: string;
  nameRu: string;
  description: string;
  imageUrl?: string;
  revealed?: boolean;
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
  category: RitualCategory | null;
  cards: TarotCard[];
  deck: DeckInfo | null;
  readingType: ReadingType | null;
  targetPhoto: string | null;
  targetPhoto2: string | null; // Второе фото для любовных ритуалов
  spellQuery: string | null;
  positiveQuery: string | null;
  selectedIndices: number[];
  loading: boolean;
  error: string | null;
  phase: 'CATEGORY' | 'DECK' | 'TYPE' | 'TARGET' | 'PICK' | 'RESULT';
}
