
import { TarotCard, DeckInfo, ReadingType, RitualCategoryInfo } from './types';

export const RITUAL_CATEGORIES: RitualCategoryInfo[] = [
  {
    id: 'TAROT',
    title: 'Арканы Судьбы',
    titleEn: 'Destiny Arcana',
    description: 'Классическая картография будущего через высшие архетипы.',
    descriptionEn: 'Classic cartography of the future through higher archetypes.',
    color: '#d4af37'
  },
  {
    id: 'HEX',
    title: 'Теневой Транзит',
    titleEn: 'Shadow Transit',
    description: 'Деструктивные техники (порча, сглаз). Коррекция враждебных линий.',
    descriptionEn: 'Destructive techniques (hexes, curses). Correction of hostile lines.',
    color: '#ff4444'
  },
  {
    id: 'LOVE',
    title: 'Узы Афродиты',
    titleEn: 'Aphrodite\'s Bonds',
    description: 'Любовная магия, привороты, привязки и сексуальный магнетизм.',
    descriptionEn: 'Love magic, enchantments, bindings, and sexual magnetism.',
    color: '#ff007f'
  },
  {
    id: 'DIVINATION',
    title: 'Эфирный Шепот',
    titleEn: 'Ethereal Whispers',
    description: 'Общее прорицание, ясновидение и поиск ответов в пустоте.',
    descriptionEn: 'General divination, clairvoyance, and seeking answers in the void.',
    color: '#9d00ff'
  }
];

export const CATEGORY_READINGS: Record<string, ReadingType[]> = {
  TAROT: [
    { id: 't1', title: 'Солярный Транзит', titleEn: 'Solar Transit', count: 1, description: 'Энергия дня.', descriptionEn: 'Daily energy.' },
    { id: 't2', title: 'Сизигия Времени', titleEn: 'Syzygy of Time', count: 3, description: 'Прошлое, настоящее, будущее.', descriptionEn: 'Past, present, future.' },
    { id: 't3', title: 'Великий Квинтиль', titleEn: 'Grand Quintile', count: 5, description: 'Полный расклад.', descriptionEn: 'Full layout.' }
  ],
  HEX: [
    { id: 'h1', title: 'Венец Безбрачия', titleEn: 'Crown of Celibacy', count: 1, description: 'Анализ одиночества.', descriptionEn: 'Solitude analysis.' },
    { id: 'h2', title: 'Черная Печать', titleEn: 'Black Seal', count: 3, description: 'Разрушение бизнес-линий.', descriptionEn: 'Destruction of business lines.' },
    { id: 'h3', title: 'Ритуал Забвения', titleEn: 'Ritual of Oblivion', count: 4, description: 'Полное стирание из памяти.', descriptionEn: 'Complete erasure from memory.' }
  ],
  LOVE: [
    { id: 'l1', title: 'Кровная Привязка', titleEn: 'Blood Binding', count: 1, description: 'Мгновенная страсть.', descriptionEn: 'Instant passion.' },
    { id: 'l2', title: 'Егильет', titleEn: 'Egillet', count: 3, description: 'Запрет на измену.', descriptionEn: 'Infidelity prohibition.' },
    { id: 'l3', title: 'Черное Венчание', titleEn: 'Black Wedding', count: 5, description: 'Связь до гроба.', descriptionEn: 'Bond until the grave.' }
  ],
  DIVINATION: [
    { id: 'd1', title: 'Глас Бездны', titleEn: 'Voice of the Void', count: 1, description: 'Прямой ответ Да/Нет.', descriptionEn: 'Direct Yes/No answer.' },
    { id: 'd2', title: 'Оракул Стихий', titleEn: 'Oracle of Elements', count: 3, description: 'Совет природы.', descriptionEn: 'Nature\'s advice.' },
    { id: 'd3', title: 'Колесо Сансары', titleEn: 'Wheel of Samsara', count: 4, description: 'Предсказание на год.', descriptionEn: 'Yearly prediction.' }
  ]
};

export const MAJOR_ARCANA: TarotCard[] = [
  { name: 'The Fool', nameRu: 'Шут', description: 'Начало пути, риск и свобода.' },
  { name: 'The Magician', nameRu: 'Маг', description: 'Воля, мастерство и действие.' },
  { name: 'The High Priestess', nameRu: 'Жрица', description: 'Интуиция, тайна и знание.' },
  { name: 'Death', nameRu: 'Смерть', description: 'Трансформация и конец старого.' },
  { name: 'The Devil', nameRu: 'Дьявол', description: 'Искушение, зависимость, материя.' },
  { name: 'The Sun', nameRu: 'Солнце', description: 'Успех, радость, ясность.' },
  { name: 'The Moon', nameRu: 'Луна', description: 'Иллюзии, страхи, подсознание.' },
  { name: 'The Tower', nameRu: 'Башня', description: 'Внезапный крах, очищение.' },
  { name: 'The Lovers', nameRu: 'Влюбленные', description: 'Выбор, союз, страсть.' },
  { name: 'Justice', nameRu: 'Справедливость', description: 'Баланс, карма, закон.' }
];

export const DECKS: DeckInfo[] = [
  {
    id: 'VISCONTI',
    title: 'Висконти — Сфорца',
    titleEn: 'Visconti-Sforza',
    description: 'Золотой Ренессанс. Богатые текстуры и историческая достоверность.',
    descriptionEn: 'Golden Renaissance. Rich textures and historical accuracy.',
    icon: 'crown',
    aiPromptStyle: '15th century Italian Renaissance, gold leaf, tempera'
  },
  {
    id: 'MARSEILLE',
    title: 'Марсельское Таро',
    titleEn: 'Tarot of Marseilles',
    description: 'Классическая гравюра. Строгость линий и символизм веков.',
    descriptionEn: 'Classic woodcut engraving. Strict lines and centuries of symbolism.',
    icon: 'sun',
    aiPromptStyle: '17th century woodcut print, bold colors'
  },
  {
    id: 'PAPUS',
    title: 'Таро Папюса',
    description: 'Оккультный Египет. Глубокие мистические связи и герметизм.',
    descriptionEn: 'Occult Egypt. Deep mystical connections and hermeticism.',
    titleEn: 'Papus Tarot',
    icon: 'eye',
    aiPromptStyle: 'Late 19th century occult etching, mystical sigils'
  }
];
