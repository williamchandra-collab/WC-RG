# Fish Your Words 🎣

A fun and educational vocabulary fishing game for kids aged 4-8 years old, built with React.

**Created for English Academy by Ruangguru**

## Game Overview

Fish Your Words is an interactive word-spelling game where players cast a fishing line to catch fish with letters on their bodies. Players must catch the letters in the correct sequence to spell target words, earning stars and completing words before time runs out!

## Features

✅ **Cast & Drag Fishing Mechanic** - Intuitive click-and-drag controls  
✅ **Progressive Difficulty** - Fish swim faster and words get longer as you progress  
✅ **100-Second Timer** - Race against time to catch as many words as possible  
✅ **Heart System** - 3 hearts, lose one for each wrong letter  
✅ **Star Scoring** - +1 star per correct letter, +10 per completed word  
✅ **High Score Tracking** - Saves your best score using localStorage  
✅ **Sound Effects** - Bubble pops, splashes, and celebrations  
✅ **Beautiful Ocean Theme** - Realistic colors with animated waves and swaying boat  
✅ **Comprehensive Word List** - 400+ age-appropriate words across 15 categories  
✅ **Performance-Based Messages** - Encouraging feedback based on your score  
✅ **Pause Functionality** - Pause, resume, or restart anytime  

## How to Play

1. **Click and hold** near the boat area
2. **Drag** to aim your fishing hook
3. **Release** to cast the line
4. **Catch fish** with the correct letters in sequence to spell the target word
5. Complete as many words as possible in 100 seconds!

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Install Dependencies
```bash
cd fish-your-words
npm install
```

### Run Development Server
```bash
npm run dev
```

The game will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Adding Your Custom Assets

### Boat Sprite
Place your boat PNG image at:
```
/public/assets/boat.png
```

Then update the boat placeholder in:
- `src/screens/StartScreen.jsx` (line with `.boat-placeholder`)
- `src/screens/GameplayScreen.jsx` (line with `.boat-icon`)
- `src/screens/GameOverScreen.jsx` (line with `.boat-placeholder`)

Replace the emoji `🚤` with:
```jsx
<img src="/assets/boat.png" alt="Boat" />
```

### Fish Sprites
Place your fish PNG images at:
```
/public/assets/fish-1.png
/public/assets/fish-2.png
/public/assets/fish-3.png
```

Then update the fish rendering in:
- `src/screens/GameplayScreen.jsx` (`.fish-sprite` component)

Replace the emoji `🐟` with your image component.

## Project Structure

```
fish-your-words/
├── public/
│   └── assets/          # Place your PNG sprites here
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── InstructionsOverlay.jsx
│   │   └── PauseOverlay.jsx
│   ├── screens/         # Main game screens
│   │   ├── StartScreen.jsx
│   │   ├── GameplayScreen.jsx
│   │   └── GameOverScreen.jsx
│   ├── data/           # Word lists and game data
│   │   └── wordList.js
│   ├── utils/          # Utility functions
│   │   └── soundEffects.js
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
└── package.json
```

## Game Mechanics

### Scoring System
- **Correct Letter:** +1 star + bubble pop sound
- **Completed Word:** +10 stars + celebration animation
- **Wrong Letter:** -1 heart + red flash

### Difficulty Progression
- **Fish Speed:** +10% per word completed
- **Fish Count:** +1 every 3 words (max 15 fish)
- **Word Length:** Starts with 3-4 letters, progresses to 7+ letters

### Word Categories
The game includes 15 word categories:
- Animals, Nature, Food, Colors, Body Parts
- Home, School, Toys, Clothes, Actions
- Feelings, Weather, Time, Numbers, Places

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Web Audio API** - Sound effects
- **CSS3 Animations** - Smooth animations and transitions
- **localStorage** - High score persistence

## Customization

### Adding Background Music
You mentioned music will be provided later. To add it:

1. Place your music file in `/public/assets/background-music.mp3`
2. Update `src/utils/soundEffects.js` to include background music controls
3. Add a music toggle button to the settings

### Modifying Word Lists
Edit `/src/data/wordList.js` to:
- Add new categories
- Modify existing words
- Adjust difficulty levels

### Changing Colors
Update the ocean/beach color scheme in:
- `src/screens/*.css` files
- Look for gradient definitions and hex colors

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Tips

- Use hardware acceleration for smoother animations
- Close other browser tabs for best performance
- Recommended minimum screen size: 1024x768

## Future Enhancements

Some ideas for future updates:
- Multiplayer mode
- Daily challenges
- Achievement system
- More word categories
- Customizable difficulty settings
- Leaderboard integration

## Credits

**Game Design & Development:** Fish Your Words Team  
**Client:** English Academy by Ruangguru  
**Target Audience:** Kids aged 4-8 years old

## License

© 2024 English Academy by Ruangguru. All rights reserved.

---

Enjoy fishing for words! 🐟⭐🎣
