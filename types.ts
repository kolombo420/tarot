
export type DeckType = 'VISCONTI' | 'MARSEILLE' | 'PAPUS';

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
  description: string;
  icon: string;
  aiPromptStyle: string;
}

export interface ReadingType {
  id: string;
  title: string;
  count: number;
  description: string;
}

export interface ReadingState {
  cards: TarotCard[];
  deck: DeckInfo | null;
  readingType: ReadingType | null;
  selectedIndices: number[];
  loading: boolean;
  error: string | null;
  phase: 'DECK' | 'TYPE' | 'PICK' | 'RESULT';
}
