
import { TarotCard, DeckInfo, ReadingType, RitualCategoryInfo } from './types';

export const RITUAL_CATEGORIES: RitualCategoryInfo[] = [
  { id: 'TAROT', title: 'Арканы Судьбы', titleEn: 'Destiny Arcana', description: 'Глубинный анализ будущего. Прояснение ситуации через 78 карт.', descriptionEn: 'Deep future analysis. Clarifying situations via 78 cards.', color: '#d4af37' },
  { id: 'HEX', title: 'Теневой Транзит', titleEn: 'Shadow Transit', description: 'Снятие негатива и мощная защита.', descriptionEn: 'Negative removal and powerful protection.', color: '#ff4444' },
  { id: 'LOVE', title: 'Узы Афродиты', titleEn: 'Aphrodite\'s Bonds', description: 'Ритуалы притяжения и страсти.', descriptionEn: 'Rituals of attraction and passion.', color: '#ff007f' },
  { id: 'DIVINATION', title: 'Эхо Бездны', titleEn: 'Echoes of the Void', description: 'Прямые ответы от высших сфер.', descriptionEn: 'Direct answers from higher spheres.', color: '#9d00ff' }
];

export const CATEGORY_READINGS: Record<string, ReadingType[]> = {
  TAROT: [
    { id: 't1', title: 'Вспышка Истины', titleEn: 'Flash of Truth', count: 1, description: 'Мгновенный ответ.', descriptionEn: 'Instant answer.' },
    { id: 't2', title: 'Триумвират', titleEn: 'Triumvirate', count: 3, description: 'Прошлое, настоящее, будущее.', descriptionEn: 'Past, present, future.' },
    { id: 't3', title: 'Крест Мага', titleEn: 'Mage\'s Cross', count: 5, description: 'Полный разбор ситуации.', descriptionEn: 'Full situation breakdown.' }
  ],
  HEX: [{ id: 'h1', title: 'Очищение Эфира', titleEn: 'Ether Cleansing', count: 3, description: 'Устранение мелких помех.', descriptionEn: 'Removing minor obstacles.' }],
  LOVE: [{ id: 'l1', title: 'Резонанс Сердец', titleEn: 'Heart Resonance', count: 3, description: 'Анализ связи.', descriptionEn: 'Connection analysis.' }],
  DIVINATION: [{ id: 'd1', title: 'Глас Оракула', titleEn: 'Oracle Voice', count: 1, description: 'Прямой совет.', descriptionEn: 'Direct advice.' }]
};

const MAJOR_ARCANA: TarotCard[] = [
  { name: 'The Fool', nameRu: 'Шут', suit: 'MAJOR', description: 'Начало пути, риск.', visualElements: 'Youth at cliff edge, white rose, dog, sun.' },
  { name: 'The Magician', nameRu: 'Маг', suit: 'MAJOR', description: 'Воля, мастерство.', visualElements: 'Magician with 4 elements, infinity symbol, red cloak.' },
  { name: 'The High Priestess', nameRu: 'Жрица', suit: 'MAJOR', description: 'Интуиция, тайна.', visualElements: 'Seated between B and J pillars, moon crown, scroll.' },
  { name: 'The Empress', nameRu: 'Императрица', suit: 'MAJOR', description: 'Изобилие, природа.', visualElements: 'Queen on cushion throne, wheat field, Venus shield.' },
  { name: 'The Emperor', nameRu: 'Император', suit: 'MAJOR', description: 'Власть, структура.', visualElements: 'King on ram throne, armor, red mountains.' },
  { name: 'The Hierophant', nameRu: 'Иерофант', suit: 'MAJOR', description: 'Традиция, обучение.', visualElements: 'Pope figure, crossed keys, two acolytes.' },
  { name: 'The Lovers', nameRu: 'Влюбленные', suit: 'MAJOR', description: 'Выбор, союз.', visualElements: 'Angel Raphael above man and woman, two trees.' },
  { name: 'The Chariot', nameRu: 'Колесница', suit: 'MAJOR', description: 'Победа, триумф.', visualElements: 'Warrior in chariot, black and white sphinxes.' },
  { name: 'Strength', nameRu: 'Сила', suit: 'MAJOR', description: 'Стойкость, мягкая мощь.', visualElements: 'Woman closing lion jaws, infinity symbol above.' },
  { name: 'The Hermit', nameRu: 'Отшельник', suit: 'MAJOR', description: 'Поиск, уединение.', visualElements: 'Old man on mountain, lantern with star, staff.' },
  { name: 'Wheel of Fortune', nameRu: 'Колесо Фортуны', suit: 'MAJOR', description: 'Удача, циклы.', visualElements: 'Wheel with sphinx, Anubis, Typhon, 4 creatures.' },
  { name: 'Justice', nameRu: 'Справедливость', suit: 'MAJOR', description: 'Баланс, истина.', visualElements: 'Seated figure, scales, upright sword, pillars.' },
  { name: 'The Hanged Man', nameRu: 'Повешенный', suit: 'MAJOR', description: 'Жертва, новый взгляд.', visualElements: 'Man hanging by foot from T-tree, halo.' },
  { name: 'Death', nameRu: 'Смерть', suit: 'MAJOR', description: 'Трансформация.', visualElements: 'Skeleton in armor on white horse, black banner.' },
  { name: 'Temperance', nameRu: 'Умеренность', suit: 'MAJOR', description: 'Баланс, гармония.', visualElements: 'Angel pouring water between cups, sun on forehead.' },
  { name: 'The Devil', nameRu: 'Дьявол', suit: 'MAJOR', description: 'Зависимость, материя.', visualElements: 'Baphomet on pedestal, chained man and woman.' },
  { name: 'The Tower', nameRu: 'Башня', suit: 'MAJOR', description: 'Крах, освобождение.', visualElements: 'Burning tower struck by lightning, falling figures.' },
  { name: 'The Star', nameRu: 'Звезда', suit: 'MAJOR', description: 'Надежда, вдохновение.', visualElements: 'Woman pouring water, 8-pointed star above.' },
  { name: 'The Moon', nameRu: 'Луна', suit: 'MAJOR', description: 'Страхи, иллюзии.', visualElements: 'Moon face, wolf and dog howling, crayfish in pool.' },
  { name: 'The Sun', nameRu: 'Солнце', suit: 'MAJOR', description: 'Успех, радость.', visualElements: 'Radiant sun, naked child on white horse, sunflowers.' },
  { name: 'Judgement', nameRu: 'Суд', suit: 'MAJOR', description: 'Возрождение, призыв.', visualElements: 'Angel with trumpet, people rising from coffins.' },
  { name: 'The World', nameRu: 'Мир', suit: 'MAJOR', description: 'Завершение, гармония.', visualElements: 'Dancing figure in wreath, 4 corners symbols.' }
];

const MINOR_ARCANA: TarotCard[] = [
  // Wands
  { name: 'Ace of Wands', nameRu: 'Туз Жезлов', suit: 'WANDS', description: 'Творческий импульс.', visualElements: 'Hand from cloud holding sprouting wand, castle on hill.' },
  { name: 'Two of Wands', nameRu: 'Двойка Жезлов', suit: 'WANDS', description: 'Планирование.', visualElements: 'Man on battlement holding globe and wand, looking at sea.' },
  { name: 'Three of Wands', nameRu: 'Тройка Жезлов', suit: 'WANDS', description: 'Ожидание успеха.', visualElements: 'Man watching ships from cliff, three wands planted.' },
  { name: 'Four of Wands', nameRu: 'Четверка Жезлов', suit: 'WANDS', description: 'Праздник, дом.', visualElements: 'Floral canopy between four wands, castle, dancers.' },
  { name: 'Five of Wands', nameRu: 'Пятерка Жезлов', suit: 'WANDS', description: 'Конкуренция.', visualElements: 'Five youths fighting/competing with wands.' },
  { name: 'Six of Wands', nameRu: 'Шестерка Жезлов', suit: 'WANDS', description: 'Признание.', visualElements: 'Man on horse with laurel wreath, holding wand with wreath.' },
  { name: 'Seven of Wands', nameRu: 'Семерка Жезлов', suit: 'WANDS', description: 'Защита позиций.', visualElements: 'Man on hill defending against six wands from below.' },
  { name: 'Eight of Wands', nameRu: 'Восьмерка Жезлов', suit: 'WANDS', description: 'Скорость, новости.', visualElements: 'Eight wands flying through clear sky towards land.' },
  { name: 'Nine of Wands', nameRu: 'Девятка Жезлов', suit: 'WANDS', description: 'Стойкость.', visualElements: 'Bandaged man leaning on wand, eight wands behind.' },
  { name: 'Ten of Wands', nameRu: 'Десятка Жезлов', suit: 'WANDS', description: 'Бремя, тяжесть.', visualElements: 'Man carrying ten wands towards distant city, heavy load.' },
  { name: 'Page of Wands', nameRu: 'Паж Жезлов', suit: 'WANDS', description: 'Инициатива.', visualElements: 'Youth in desert looking at wand, messenger clothes.' },
  { name: 'Knight of Wands', nameRu: 'Рыцарь Жезлов', suit: 'WANDS', description: 'Драйв, азарт.', visualElements: 'Knight in armor with salamander tunic on rearing horse.' },
  { name: 'Queen of Wands', nameRu: 'Королева Жезлов', suit: 'WANDS', description: 'Обаяние, энергия.', visualElements: 'Seated queen with sunflower and black cat, desert throne.' },
  { name: 'King of Wands', nameRu: 'Король Жезлов', suit: 'WANDS', description: 'Лидерство.', visualElements: 'Seated king with salamander patterns, holding wand, lions.' },

  // Cups
  { name: 'Ace of Cups', nameRu: 'Туз Кубков', suit: 'CUPS', description: 'Поток чувств.', visualElements: 'Hand from cloud holding cup with five streams, dove.' },
  { name: 'Two of Cups', nameRu: 'Двойка Кубков', suit: 'CUPS', description: 'Взаимность.', visualElements: 'Man and woman exchanging cups, caduceus of Hermes above.' },
  { name: 'Three of Cups', nameRu: 'Тройка Кубков', suit: 'CUPS', description: 'Праздник.', visualElements: 'Three women dancing, raising cups, harvest fruit.' },
  { name: 'Four of Cups', nameRu: 'Четверка Кубков', suit: 'CUPS', description: 'Апатия.', visualElements: 'Man under tree, arms crossed, ignoring offered cup.' },
  { name: 'Five of Cups', nameRu: 'Пятерка Кубков', suit: 'CUPS', description: 'Печаль.', visualElements: 'Cloaked figure looking at three spilled cups, two full behind.' },
  { name: 'Six of Cups', nameRu: 'Шестерка Кубков', suit: 'CUPS', description: 'Ностальгия.', visualElements: 'Children in garden, one giving cup with flowers to other.' },
  { name: 'Seven of Cups', nameRu: 'Семерка Кубков', suit: 'CUPS', description: 'Выбор, мечты.', visualElements: 'Silhouette looking at seven cups in clouds with symbols.' },
  { name: 'Eight of Cups', nameRu: 'Восьмерка Кубков', suit: 'CUPS', description: 'Уход.', visualElements: 'Man walking away from eight cups at night, moon above.' },
  { name: 'Nine of Cups', nameRu: 'Девятка Кубков', suit: 'CUPS', description: 'Удовлетворение.', visualElements: 'Jovial man sitting before nine cups on a shelf.' },
  { name: 'Ten of Cups', nameRu: 'Десятка Кубков', suit: 'CUPS', description: 'Семейное счастье.', visualElements: 'Family under rainbow with ten cups, house, green fields.' },
  { name: 'Page of Cups', nameRu: 'Паж Кубков', suit: 'CUPS', description: 'Предчувствие.', visualElements: 'Youth looking at fish jumping out of his cup, sea.' },
  { name: 'Knight of Cups', nameRu: 'Рыцарь Кубков', suit: 'CUPS', description: 'Признание.', visualElements: 'Knight on slow horse, holding cup forward, river background.' },
  { name: 'Queen of Cups', nameRu: 'Королева Кубков', suit: 'CUPS', description: 'Эмпатия.', visualElements: 'Queen looking at ornate closed cup by the sea edge.' },
  { name: 'King of Cups', nameRu: 'Король Кубков', suit: 'CUPS', description: 'Эмоциональный контроль.', visualElements: 'King on throne floating on sea, holding cup and scepter.' },

  // Swords
  { name: 'Ace of Swords', nameRu: 'Туз Мечей', suit: 'SWORDS', description: 'Ясность ума.', visualElements: 'Hand from cloud holding upright sword with crown and olive branch.' },
  { name: 'Two of Swords', nameRu: 'Двойка Мечей', suit: 'SWORDS', description: 'Тупик.', visualElements: 'Blindfolded woman with two crossed swords, sea behind.' },
  { name: 'Three of Swords', nameRu: 'Тройка Мечей', suit: 'SWORDS', description: 'Разрыв.', visualElements: 'Heart pierced by three swords, clouds and rain.' },
  { name: 'Four of Swords', nameRu: 'Четверка Мечей', suit: 'SWORDS', description: 'Отдых.', visualElements: 'Effigy of knight in church, three swords above, one below.' },
  { name: 'Five of Swords', nameRu: 'Пятерка Мечей', suit: 'SWORDS', description: 'Пиррова победа.', visualElements: 'Smirking man with three swords, two figures walking away.' },
  { name: 'Six of Swords', nameRu: 'Шестерка Мечей', suit: 'SWORDS', description: 'Переход.', visualElements: 'Ferryman rowing boat with passengers and six swords.' },
  { name: 'Seven of Swords', nameRu: 'Семерка Мечей', suit: 'SWORDS', description: 'Хитрость.', visualElements: 'Man stealing five swords from camp, two left behind.' },
  { name: 'Eight of Swords', nameRu: 'Восьмерка Мечей', suit: 'SWORDS', description: 'Ограничения.', visualElements: 'Bound and blindfolded woman surrounded by eight swords.' },
  { name: 'Nine of Swords', nameRu: 'Девятка Мечей', suit: 'SWORDS', description: 'Кошмары.', visualElements: 'Person sitting in bed, face in hands, nine swords on wall.' },
  { name: 'Ten of Swords', nameRu: 'Десятка Мечей', suit: 'SWORDS', description: 'Поражение.', visualElements: 'Man lying face down with ten swords in his back, dark sky.' },
  { name: 'Page of Swords', nameRu: 'Паж Мечей', suit: 'SWORDS', description: 'Любопытство.', visualElements: 'Youth on hill with sword, winds blowing, birds in sky.' },
  { name: 'Knight of Swords', nameRu: 'Рыцарь Мечей', suit: 'SWORDS', description: 'Натиск.', visualElements: 'Knight charging on white horse, sword raised, storm clouds.' },
  { name: 'Queen of Swords', nameRu: 'Королева Мечей', suit: 'SWORDS', description: 'Суровость.', visualElements: 'Queen on throne with sword, clouds, bird in distance.' },
  { name: 'King of Swords', nameRu: 'Король Мечей', suit: 'SWORDS', description: 'Интеллект.', visualElements: 'Seated king with sword, butterflies on throne, blue sky.' },

  // Pentacles
  { name: 'Ace of Pentacles', nameRu: 'Туз Пентаклей', suit: 'PENTACLES', description: 'Шанс на успех.', visualElements: 'Hand from cloud holding large golden coin, garden, arch.' },
  { name: 'Two of Pentacles', nameRu: 'Двойка Пентаклей', suit: 'PENTACLES', description: 'Баланс.', visualElements: 'Man juggling two coins linked by infinity symbol, ships.' },
  { name: 'Three of Pentacles', nameRu: 'Тройка Пентаклей', suit: 'PENTACLES', description: 'Мастерство.', visualElements: 'Mason working in cathedral with monk and architect.' },
  { name: 'Four of Pentacles', nameRu: 'Четверка Пентаклей', suit: 'PENTACLES', description: 'Скупость.', visualElements: 'Seated man clutching four coins, city behind him.' },
  { name: 'Five of Pentacles', nameRu: 'Пятерка Пентаклей', suit: 'PENTACLES', description: 'Нужда.', visualElements: 'Two beggars walking in snow past illuminated stained window.' },
  { name: 'Six of Pentacles', nameRu: 'Шестерка Пентаклей', suit: 'PENTACLES', description: 'Щедрость.', visualElements: 'Merchant with scales giving coins to the poor.' },
  { name: 'Seven of Pentacles', nameRu: 'Семерка Пентаклей', suit: 'PENTACLES', description: 'Ожидание плодов.', visualElements: 'Gardener resting, looking at seven coins on a bush.' },
  { name: 'Eight of Pentacles', nameRu: 'Восьмерка Пентаклей', suit: 'PENTACLES', description: 'Труд.', visualElements: 'Artisan carving coins at bench, focused on his work.' },
  { name: 'Nine of Pentacles', nameRu: 'Девятка Пентаклей', suit: 'PENTACLES', description: 'Достаток.', visualElements: 'Elegant woman in garden with falcon and nine coins.' },
  { name: 'Ten of Pentacles', nameRu: 'Десятка Пентаклей', suit: 'PENTACLES', description: 'Наследие.', visualElements: 'Elderly man, dogs, family in archway with ten coins.' },
  { name: 'Page of Pentacles', nameRu: 'Паж Пентаклей', suit: 'PENTACLES', description: 'Обучение.', visualElements: 'Youth in field carefully holding one large gold coin.' },
  { name: 'Knight of Pentacles', nameRu: 'Рыцарь Пентаклей', suit: 'PENTACLES', description: 'Стабильность.', visualElements: 'Knight on heavy dark horse, holding one coin, ploughed field.' },
  { name: 'Queen of Pentacles', nameRu: 'Королева Пентаклей', suit: 'PENTACLES', description: 'Забота, ресурс.', visualElements: 'Queen on throne with carvings of fruit and animals, coin.' },
  { name: 'King of Pentacles', nameRu: 'Король Пентаклей', suit: 'PENTACLES', description: 'Процветание.', visualElements: 'King on bull throne, holding coin and scepter, garden.' }
];

export const FULL_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export const DECKS: DeckInfo[] = [
  { id: 'VISCONTI', title: 'Висконти Сфорца', titleEn: 'Visconti Sforza', description: 'Золотой Ренессанс.', descriptionEn: 'Golden Renaissance.', icon: 'crown', aiPromptStyle: '15th century Italian Renaissance style, gold leaf backgrounds, tempera on wood.' },
  { id: 'MARSEILLE', title: 'Марсельское Таро', titleEn: 'Tarot of Marseilles', description: 'Первозданный символизм.', descriptionEn: 'Primal symbolism.', icon: 'sun', aiPromptStyle: '17th century woodcut style, bold black outlines, flat primary colors.' },
  { id: 'PAPUS', title: 'Таро Папюса', titleEn: 'Papus Tarot', description: 'Герметические ключи.', descriptionEn: 'Hermetic keys.', icon: 'eye', aiPromptStyle: 'Late 19th century esoteric engraving, fine line black and white art, occult symbols.' }
];
