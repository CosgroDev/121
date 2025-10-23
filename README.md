# 🎯 121 Darts Game

A simple, beautiful web-based darts game for playing 121 - a challenging checkout progression game!

## 🎮 Game Rules

**Objective**: Reach checkout 170 by progressively completing higher checkouts.

### How to Play

1. **Start at checkout 40** - This is your base checkout
2. **You have 9 darts** to finish each checkout
3. **Enter your score** after each dart throw
4. **Win conditions**:
   - Finish the checkout exactly (hit the target number)
   - If finished within **3 darts**: The checkout becomes your new **base checkout** (locked 🔒)
   - If finished within **9 darts**: Move to the next checkout (+1)
5. **Fail conditions**:
   - Go over the target (bust)
   - Don't finish within 9 darts
   - If you fail: Return to your **base checkout**
6. **Victory**: Reach checkout 170!

### Example Game Flow

- Start: Checkout 40, Base 40
- Finish 40 in 2 darts → **Locked!** Checkout 41, Base 40 (new)
- Finish 41 in 5 darts → Checkout 42, Base 41
- Fail 42 → Return to Checkout 41 (base)
- Finish 41 in 1 dart → **Locked!** Checkout 42, Base 41 (new)
- Continue until you reach 170!

## 🚀 Getting Started

### Local Testing

1. **Download the files** or clone this repository
2. **Open `index.html`** in any modern web browser
3. **Start playing!** No installation or setup needed

### Hosting on GitHub Pages (FREE!)

1. **Create a GitHub account** (if you don't have one): https://github.com/signup

2. **Create a new repository**:
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name it `121-darts-game`
   - Make it **Public**
   - Click "Create repository"

3. **Upload your files**:
   - Click "uploading an existing file"
   - Drag and drop all files: `index.html`, `style.css`, `game.js`, `README.md`
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to repository "Settings"
   - Click "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Wait 1-2 minutes

5. **Your game is live!** 🎉
   - URL: `https://[your-username].github.io/121-darts-game`
   - Share this link with anyone!

## 📊 Features

- ✅ **Player Management**: Add your name and track stats
- ✅ **Persistent Stats**: All data saved in browser (localStorage)
- ✅ **Session History**: See all your attempts in the current session
- ✅ **Multiple Players**: Switch between different players
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Beautiful UI**: Clean, modern interface with smooth animations
- ✅ **No Cost**: Completely free to host and use
- ✅ **No Backend**: Everything runs in your browser

## 📱 Usage

### Starting a Game
1. Enter your name
2. Click "Start Game" (or press Enter)
3. If you've played before, click your name to continue

### During the Game
1. Throw a dart in real life
2. Enter the score in the input field
3. Click "Submit Score" (or press Enter)
4. Continue until checkout is finished or you run out of darts

### Buttons
- **Submit Score**: Record the dart score
- **Miss (0)**: Quick button for a miss
- **Reset Attempt**: Give up on current checkout and return to base
- **End Game**: Save stats and return to player selection
- **Change Player**: Switch to a different player

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- Player names
- Games played
- Best checkouts achieved
- Total wins (reached 170)
- Game history

**Note**: Data is specific to each browser/device. If you clear browser data, stats will be lost.

## 🛠️ Customization

Want to modify the game? Here's what each file does:

- **`index.html`**: Game structure and layout
- **`style.css`**: All styling, colors, and design
- **`game.js`**: Game logic, rules, and data management

### Easy Modifications

Change starting checkout (line 3-4 in `game.js`):
```javascript
currentCheckout: 40,  // Change this number
baseCheckout: 40,     // And this number
```

Change dart limit (line 294 in `game.js`):
```javascript
else if (gameState.dartsUsed >= 9) {  // Change 9 to another number
```

Change winning target (lines 310-315 in `game.js`):
```javascript
if (gameState.currentCheckout > 170) {  // Change 170 to another number
```

## 🎨 Browser Support

Works in all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 🐛 Troubleshooting

**Stats not saving?**
- Make sure you're using the same browser/device
- Check that cookies/localStorage is enabled
- Try a different browser

**Page not loading?**
- Clear browser cache
- Try opening in incognito/private mode
- Check browser console for errors (F12)

**GitHub Pages not working?**
- Wait 2-5 minutes after enabling Pages
- Make sure repository is Public
- Check that files are in the main branch root

## 📝 License

This project is free to use, modify, and distribute. Have fun!

## 🎯 Tips for Playing

- Practice consistency with easier checkouts before attempting higher ones
- Remember: Finishing in 3 darts locks your progress
- Use the "Miss (0)" button for quick entries
- Track your best checkout and try to beat it
- Challenge friends and compare stats!

---

**Created for dart enthusiasts who love a challenge!** 🎯

Good luck and may your arrows fly true!
