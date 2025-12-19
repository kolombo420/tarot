
import { TarotCard, DeckInfo, ReadingType, RitualCategoryInfo } from './types';

export const RITUAL_CATEGORIES: RitualCategoryInfo[] = [
  {
    id: 'TAROT',
    title: 'Арканы Судьбы',
    titleEn: 'Destiny Arcana',
    description: 'Анализ будущего и скрытых путей. Прояснение ситуации, поиск ответов и векторов личного успеха через 78 карт.',
    descriptionEn: 'Analysis of the future and hidden paths. Clarifying situations, finding answers and success vectors via 78 cards.',
    color: '#d4af37'
  },
  {
    id: 'HEX',
    title: 'Теневой Транзит',
    titleEn: 'Shadow Transit',
    description: 'Снятие негатива и мощная защита. Очищение от чужеродного влияния и восстановление кармической справедливости.',
    descriptionEn: 'Negative removal and powerful protection. Cleansing from external influence and restoring karmic justice.',
    color: '#ff4444'
  },
  {
    id: 'LOVE',
    title: 'Узы Афродиты',
    titleEn: 'Aphrodite\'s Bonds',
    description: 'Ритуалы притяжения и страсти. Усиление личного магнетизма, гармонизация отношений и создание неразрывных связей.',
    descriptionEn: 'Rituals of attraction and passion. Enhancing personal magnetism, harmonizing relations and creating unbreakable bonds.',
    color: '#ff007f'
  },
  {
    id: 'DIVINATION',
    title: 'Эфирный Шепот',
    titleEn: 'Ethereal Whispers',
    description: 'Прямые ответы от высших сфер. Точное прорицание будущего через зеркала времени и советы духовных наставников.',
    descriptionEn: 'Direct answers from higher spheres. Precise future divination through mirrors of time and guidance from spiritual mentors.',
    color: '#9d00ff'
  }
];

export const CATEGORY_READINGS: Record<string, ReadingType[]> = {
  TAROT: [
    { id: 't1', title: 'Солярный Транзит', titleEn: 'Solar Transit', count: 1, description: 'Энергия текущего воплощения.', descriptionEn: 'Current incarnation energy.' },
    { id: 't2', title: 'Сизигия Времени', titleEn: 'Syzygy of Time', count: 3, description: 'Переплетение прошлого и грядущего.', descriptionEn: 'Interweaving of past and future.' },
    { id: 't3', title: 'Великий Квинтиль', titleEn: 'Grand Quintile', count: 5, description: 'Фундаментальный анализ судьбы.', descriptionEn: 'Fundamental destiny analysis.' }
  ],
  HEX: [
    { id: 'h1', title: 'Венец Безбрачия', titleEn: 'Crown of Celibacy', count: 1, description: 'Анализ узла одиночества.', descriptionEn: 'Solitude node analysis.' },
    { id: 'h2', title: 'Черная Печать', titleEn: 'Black Seal', count: 3, description: 'Блокировка враждебных намерений.', descriptionEn: 'Blocking hostile intentions.' },
    { id: 'h3', title: 'Ритуал Забвения', titleEn: 'Ritual of Oblivion', count: 4, description: 'Удаление из ткани реальности.', descriptionEn: 'Removal from reality tissue.' }
  ],
  LOVE: [
    { id: 'l1', title: 'Кровная Привязка', titleEn: 'Blood Binding', count: 1, description: 'Пробуждение животной страсти.', descriptionEn: 'Awakening animal passion.' },
    { id: 'l2', title: 'Егильет', titleEn: 'Egillet', count: 3, description: 'Энергетический замок на верность.', descriptionEn: 'Energy lock for fidelity.' },
    { id: 'l3', title: 'Черное Венчание', titleEn: 'Black Wedding', count: 5, description: 'Посмертный союз душ.', descriptionEn: 'Posthumous soul union.' }
  ],
  DIVINATION: [
    { id: 'd1', title: 'Глас Бездны', titleEn: 'Voice of the Void', count: 1, description: 'Безапелляционный ответ судьбы.', descriptionEn: 'Fate\'s categorical answer.' },
    { id: 'd2', title: 'Оракул Стихий', titleEn: 'Oracle of Elements', count: 3, description: 'Мудрость четырех начал.', descriptionEn: 'Wisdom of the four beginnings.' },
    { id: 'd3', title: 'Колесо Сансары', titleEn: 'Wheel of Samsara', count: 4, description: 'Циклический прогноз года.', descriptionEn: 'Yearly cyclic forecast.' }
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
    description: 'Золотой Ренессанс и роскошь Милана. Самая древняя и аристократичная колода, пронизанная духом дворцовых интриг и мудрости.',
    descriptionEn: 'Golden Renaissance and Milanese luxury. The most ancient and aristocratic deck, imbued with palace intrigue and wisdom.',
    icon: 'crown',
    aiPromptStyle: '15th century Italian Renaissance, gold leaf, tempera'
  },
  {
    id: 'MARSEILLE',
    title: 'Марсельское Таро',
    titleEn: 'Tarot of Marseilles',
    description: 'Первозданный символизм народной гравюры. Прямолинейная мощь коллективного бессознательного и четкость ответов.',
    descriptionEn: 'Primal symbolism of folk engraving. The straightforward power of the collective unconscious and clarity of answers.',
    icon: 'sun',
    aiPromptStyle: '17th century woodcut print, bold primary colors, aged paper'
  },
  {
    id: 'PAPUS',
    title: 'Таро Папюса',
    titleEn: 'Papus Tarot',
    description: 'Герметические ключи Египта. Путь мага, проходящий сквозь тайны Сефирот и звездные врата древнего оккультизма.',
    descriptionEn: 'Hermetic keys of Egypt. The magician\'s path through the secrets of the Sephirot and the star gates of ancient occultism.',
    icon: 'eye',
    aiPromptStyle: 'Late 19th century occult etching, mystical sigils, cosmic dark background'
  }
];
