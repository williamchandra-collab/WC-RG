# Assets Integration Guide

This guide will help you replace the emoji placeholders with your custom PNG sprites.

## Asset Specifications

### Boat Sprite
- **Recommended Size:** 200x150px (or similar ratio)
- **Format:** PNG with transparency
- **File Name:** `boat.png`
- **Location:** `/public/assets/boat.png`

### Fish Sprites
- **Recommended Size:** 80x60px (or similar ratio)
- **Format:** PNG with transparency
- **File Names:** `fish-1.png`, `fish-2.png`, `fish-3.png`, etc.
- **Location:** `/public/assets/fish-*.png`

## Step-by-Step Integration

### 1. Add Boat Sprite

After placing your `boat.png` in `/public/assets/`, update these files:

#### `src/screens/StartScreen.jsx` (Line ~36)
Replace:
```jsx
<div className="boat-placeholder">🚤</div>
```

With:
```jsx
<img src="/assets/boat.png" alt="Boat" className="boat-image" />
```

Then add to `src/screens/StartScreen.css`:
```css
.boat-image {
  width: 200px;
  height: auto;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
}
```

#### `src/screens/GameplayScreen.jsx` (Line ~372)
Replace:
```jsx
<div className="boat-icon">🚤</div>
```

With:
```jsx
<img src="/assets/boat.png" alt="Boat" className="boat-image" />
```

Then add to `src/screens/GameplayScreen.css`:
```css
.boat-image {
  height: 80px;
  width: auto;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
}
```

#### `src/screens/GameOverScreen.jsx` (Similar to StartScreen)

### 2. Add Fish Sprites

#### For Ambient Fish (Background decoration)

In `src/screens/StartScreen.jsx` (Lines ~39-41):
Replace:
```jsx
<div className="ambient-fish fish-1">🐟</div>
<div className="ambient-fish fish-2">🐠</div>
<div className="ambient-fish fish-3">🐡</div>
```

With:
```jsx
<img src="/assets/fish-1.png" alt="" className="ambient-fish fish-1" />
<img src="/assets/fish-2.png" alt="" className="ambient-fish fish-2" />
<img src="/assets/fish-3.png" alt="" className="ambient-fish fish-3" />
```

Then update `src/screens/StartScreen.css`:
```css
.ambient-fish {
  position: absolute;
  width: 60px;
  height: auto;
  z-index: 2;
  opacity: 0.7;
}
```

#### For Game Fish (Interactive with letters)

In `src/screens/GameplayScreen.jsx` (Lines ~395-405):
Replace:
```jsx
<div
  key={f.id}
  className="fish-sprite"
  style={{
    left: `${f.x}px`,
    top: `${f.y}%`,
    fontSize: `${f.size}px`,
    transform: `scaleX(${f.direction})`
  }}
>
  <span className="fish-body">🐟</span>
  <span className="fish-letter">{f.letter}</span>
</div>
```

With:
```jsx
<div
  key={f.id}
  className="fish-sprite"
  style={{
    left: `${f.x}px`,
    top: `${f.y}%`,
    width: `${f.size}px`,
    height: 'auto',
    transform: `scaleX(${f.direction})`
  }}
>
  <img 
    src="/assets/fish-1.png" 
    alt="" 
    className="fish-body"
  />
  <span className="fish-letter">{f.letter}</span>
</div>
```

Then update `src/screens/GameplayScreen.css`:
```css
.fish-sprite {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
  transition: transform 0.1s linear;
}

.fish-body {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}

.fish-letter {
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-shadow: 
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000,
    2px 2px 0 #000;
  pointer-events: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

### 3. Multiple Fish Variations

If you have multiple fish sprites and want variety, update the spawn function:

In `src/screens/GameplayScreen.jsx`, modify the `createFish` function:
```jsx
const createFish = (letter) => {
  const fishVariants = [
    '/assets/fish-1.png',
    '/assets/fish-2.png',
    '/assets/fish-3.png'
  ];
  
  return {
    id: Math.random(),
    letter,
    x: Math.random() * window.innerWidth,
    y: 25 + Math.random() * 60,
    direction: Math.random() > 0.5 ? 1 : -1,
    speed: 1 + Math.random() * 0.5,
    size: 40 + Math.random() * 20,
    sprite: fishVariants[Math.floor(Math.random() * fishVariants.length)]
  };
};
```

Then use `f.sprite` in the render:
```jsx
<img 
  src={f.sprite}
  alt="" 
  className="fish-body"
/>
```

## Testing Your Assets

After adding your assets:

1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Restart the dev server: `npm run dev`
3. Check console for any 404 errors
4. Verify images load correctly in all screens

## Troubleshooting

### Images not loading?
- Check file paths are correct: `/public/assets/filename.png`
- Ensure file names match exactly (case-sensitive)
- Verify PNG files are valid and not corrupted

### Images too large/small?
- Adjust width/height in CSS
- Use `object-fit: contain` or `object-fit: cover`

### Images not animating properly?
- Ensure `transform` styles are maintained
- Check that parent container has proper positioning

### Letter text not visible on fish?
- Adjust `.fish-letter` font size and positioning
- Change text color or add more text-shadow contrast

## Need Help?

If you encounter any issues integrating your assets, check:
1. Browser developer console for errors
2. Network tab to verify files are loading
3. Element inspector to check applied styles

---

Happy asset integration! 🎨🐟
