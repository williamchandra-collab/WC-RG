// Comprehensive word list for kids aged 4-8 years old
// Organized by length and category

export const WORD_CATEGORIES = {
  animals: {
    easy: ['CAT', 'DOG', 'PIG', 'COW', 'BEE', 'ANT', 'BAT', 'FOX'],
    medium: ['FISH', 'BIRD', 'BEAR', 'LION', 'DUCK', 'FROG', 'GOAT', 'CRAB', 'SEAL', 'DEER'],
    hard: ['SHARK', 'WHALE', 'TIGER', 'ZEBRA', 'SNAKE', 'MOUSE', 'HORSE', 'SHEEP', 'BUNNY', 'PUPPY'],
    expert: ['RABBIT', 'MONKEY', 'TURTLE', 'SPIDER', 'KITTEN', 'GIRAFFE', 'ELEPHANT', 'PENGUIN', 'DOLPHIN']
  },
  
  nature: {
    easy: ['SUN', 'SKY', 'SEA', 'TREE', 'LEAF', 'STAR', 'MOON', 'RAIN'],
    medium: ['WIND', 'SNOW', 'SAND', 'ROCK', 'HILL', 'LAKE', 'WAVE', 'WOOD', 'ROSE', 'POND'],
    hard: ['OCEAN', 'RIVER', 'BEACH', 'CLOUD', 'STORM', 'PLANT', 'GRASS', 'STONE', 'SHORE', 'WATER'],
    expert: ['FLOWER', 'FOREST', 'GARDEN', 'RAINBOW', 'MOUNTAIN', 'VOLCANO', 'SUNSHINE']
  },
  
  food: {
    easy: ['EGG', 'PIE', 'JAM', 'NUT', 'TEA', 'BUN', 'HAM', 'PEA'],
    medium: ['CAKE', 'MILK', 'FISH', 'RICE', 'CORN', 'SOUP', 'TACO', 'PLUM', 'PEAR', 'BEAN'],
    hard: ['APPLE', 'BREAD', 'PIZZA', 'JUICE', 'HONEY', 'LEMON', 'MANGO', 'MELON', 'PEACH', 'GRAPE'],
    expert: ['BANANA', 'COOKIE', 'ORANGE', 'CARROT', 'TOMATO', 'POTATO', 'CHICKEN', 'YOGURT', 'NOODLES']
  },
  
  colors: {
    easy: ['RED', 'BLUE', 'PINK', 'GOLD', 'GRAY'],
    medium: ['GREEN', 'BLACK', 'WHITE', 'BROWN'],
    hard: ['YELLOW', 'ORANGE', 'PURPLE', 'SILVER'],
    expert: []
  },
  
  body: {
    easy: ['EYE', 'EAR', 'ARM', 'LEG', 'TOE', 'LIP', 'JAW'],
    medium: ['HAND', 'FOOT', 'HEAD', 'FACE', 'NOSE', 'NECK', 'BACK', 'KNEE', 'CHIN', 'BONE'],
    hard: ['MOUTH', 'TOOTH', 'HEART', 'THUMB', 'CHEST', 'ELBOW', 'ANKLE'],
    expert: ['FINGER', 'SHOULDER', 'STOMACH']
  },
  
  home: {
    easy: ['BED', 'CUP', 'PAN', 'POT', 'MOP', 'RUG', 'BOX', 'KEY'],
    medium: ['DOOR', 'LAMP', 'SOFA', 'DESK', 'SINK', 'BATH', 'ROOM', 'ROOF', 'WALL', 'CLOCK'],
    hard: ['TABLE', 'CHAIR', 'HOUSE', 'SPOON', 'PLATE', 'TOWEL', 'PHONE', 'BRUSH', 'COUCH', 'SHELF'],
    expert: ['WINDOW', 'KITCHEN', 'BEDROOM', 'BLANKET', 'PILLOW', 'CABINET', 'DRESSER']
  },
  
  school: {
    easy: ['PEN', 'BAG', 'MAP', 'ART', 'GYM'],
    medium: ['BOOK', 'DESK', 'PAGE', 'LINE', 'BELL', 'MATH', 'TEST', 'TAPE', 'GLUE', 'RULER'],
    hard: ['PAPER', 'CHAIR', 'CHALK', 'CLASS', 'LUNCH', 'STUDY', 'LEARN', 'PAINT', 'ERASER'],
    expert: ['PENCIL', 'TEACHER', 'STUDENT', 'LIBRARY', 'READING', 'SCIENCE', 'NOTEBOOK']
  },
  
  toys: {
    easy: ['TOY', 'CAR', 'TOP', 'BAT', 'GUN'],
    medium: ['BALL', 'DOLL', 'GAME', 'KITE', 'BIKE', 'SLED', 'ROPE', 'CLAY', 'BOAT', 'TRAIN'],
    hard: ['BLOCK', 'TRUCK', 'ROBOT', 'PLANE', 'WAGON', 'SLIDE', 'SWING', 'SKATE', 'PUZZLE'],
    expert: ['BALLOON', 'BICYCLE', 'SCOOTER', 'DINOSAUR']
  },
  
  clothes: {
    easy: ['HAT', 'TIE', 'BIB', 'CAP', 'VEST', 'BELT'],
    medium: ['COAT', 'SOCK', 'SHOE', 'BOOT', 'JEAN', 'SUIT', 'SCARF', 'DRESS', 'SHIRT', 'SKIRT'],
    hard: ['PANTS', 'SHORTS', 'JACKET', 'MITTEN', 'BUTTON', 'ZIPPER', 'POCKET'],
    expert: ['SWEATER', 'UNIFORM', 'SNEAKER', 'SLIPPERS']
  },
  
  actions: {
    easy: ['RUN', 'SIT', 'HOP', 'DIG', 'HUG', 'CRY', 'EAT', 'SEE'],
    medium: ['JUMP', 'WALK', 'PLAY', 'SING', 'DRAW', 'READ', 'HIDE', 'TALK', 'LOOK', 'SWIM'],
    hard: ['DANCE', 'CLIMB', 'SLEEP', 'LAUGH', 'SMILE', 'THROW', 'CATCH', 'THINK', 'WRITE', 'DREAM'],
    expert: ['RUNNING', 'PLAYING', 'SINGING', 'JUMPING', 'WALKING', 'READING']
  },
  
  feelings: {
    easy: ['SAD', 'MAD', 'SHY', 'GLAD'],
    medium: ['HAPPY', 'ANGRY', 'TIRED', 'BRAVE', 'PROUD', 'SORRY'],
    hard: ['SCARED', 'EXCITED', 'WORRIED'],
    expert: []
  },
  
  weather: {
    easy: ['HOT', 'WET', 'DRY', 'ICE', 'FOG'],
    medium: ['COLD', 'COOL', 'WARM', 'WIND', 'RAIN', 'SNOW', 'HAIL'],
    hard: ['SUNNY', 'WINDY', 'RAINY', 'SNOWY', 'CLOUD', 'STORM'],
    expert: ['THUNDER', 'LIGHTNING', 'RAINBOW']
  },
  
  time: {
    easy: ['DAY', 'WEEK', 'YEAR', 'HOUR', 'TIME'],
    medium: ['NIGHT', 'TODAY', 'MONTH', 'CLOCK', 'WATCH'],
    hard: ['MORNING', 'EVENING', 'SUNDAY', 'MONDAY', 'FRIDAY'],
    expert: ['YESTERDAY', 'TOMORROW', 'WEEKEND', 'BIRTHDAY']
  },
  
  numbers: {
    easy: ['ONE', 'TWO', 'TEN', 'SIX'],
    medium: ['THREE', 'FOUR', 'FIVE', 'NINE', 'ZERO', 'EIGHT', 'SEVEN'],
    hard: ['ELEVEN', 'TWELVE', 'TWENTY', 'THIRTY', 'FIFTY'],
    expert: ['HUNDRED', 'THOUSAND']
  },
  
  places: {
    easy: ['ZOO', 'PARK', 'FARM', 'CITY', 'TOWN'],
    medium: ['STORE', 'BEACH', 'WOODS', 'FIELD', 'YARD'],
    hard: ['SCHOOL', 'MARKET', 'STREET', 'FOREST', 'ISLAND', 'CASTLE', 'BRIDGE'],
    expert: ['HOSPITAL', 'AIRPORT', 'LIBRARY', 'MUSEUM', 'THEATER', 'RESTAURANT']
  }
};

// Helper function to get all words from a category
export const getWordsByCategory = (category) => {
  const cat = WORD_CATEGORIES[category];
  if (!cat) return [];
  
  return [
    ...cat.easy,
    ...cat.medium,
    ...cat.hard,
    ...cat.expert.filter(w => w) // Filter out empty strings
  ];
};

// Helper function to get all words
export const getAllWords = () => {
  const allWords = [];
  Object.keys(WORD_CATEGORIES).forEach(category => {
    allWords.push(...getWordsByCategory(category));
  });
  return allWords;
};

// Helper function to get word by difficulty based on game progress
export const getWordByDifficulty = (wordsCompleted) => {
  const allWords = getAllWords();
  
  // Difficulty progression based on words completed
  if (wordsCompleted < 3) {
    // Start with easy words (3-4 letters)
    return allWords.filter(w => w.length >= 3 && w.length <= 4);
  } else if (wordsCompleted < 6) {
    // Move to medium words (4-5 letters)
    return allWords.filter(w => w.length >= 4 && w.length <= 5);
  } else if (wordsCompleted < 10) {
    // Progress to harder words (5-6 letters)
    return allWords.filter(w => w.length >= 5 && w.length <= 6);
  } else {
    // Expert level (6+ letters)
    return allWords.filter(w => w.length >= 6);
  }
};

// Get random word from difficulty pool
export const getRandomWord = (wordsCompleted = 0, previousWords = []) => {
  const wordPool = getWordByDifficulty(wordsCompleted);
  
  // Filter out previously used words
  const availableWords = wordPool.filter(w => !previousWords.includes(w));
  
  // If all words used, reset and use full pool
  const finalPool = availableWords.length > 0 ? availableWords : wordPool;
  
  return finalPool[Math.floor(Math.random() * finalPool.length)];
};
