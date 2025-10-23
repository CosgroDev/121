# 🎯 121 Darts Game

A sleek, mobile-responsive web-based darts game for playing 121 - a challenging checkout progression game!

## 🎮 Game Rules

**Objective**: Reach checkout 170 by progressively completing higher checkouts.

### How to Play

1. **Start at checkout 121** - This is your base checkout
2. **You have 3 turns** (9 darts total) to finish each checkout
3. **Enter your score for each turn** (3 darts per turn)
4. **Win conditions**:
   - Finish the checkout exactly (hit the target number)
   - If finished on **Turn 1**: The checkout becomes your new **base checkout** (locked 🔒)
   - If finished on **Turn 2 or 3**: Move to the next checkout (+1) but base stays the same
5. **Fail conditions**:
   - Go over the target (bust)
   - Don't finish within 3 turns (9 darts)
   - If you fail: Return to your **base checkout**
6. **Victory**: Reach checkout 170!

### Example Game Flow

**Example 1: Lock Base**
- Start: Checkout 121, Base 121
- Turn 1: Score 121 → **Locked!** Base 121, move to Checkout 122

**Example 2: Progress Without Locking**
- Checkout 122, Base 121
- Turn 1: Score 60 → Remaining: 62
- Turn 2: Score 62 → Checkout complete! Base stays 121, move to Checkout 123

**Example 3: Fail and Return**
- Checkout 123, Base 121
- Turn 1: Score 40 → Remaining: 83
- Turn 2: Score 40 → Remaining: 43
- Turn 3: Score 40 → Failed! Return to Checkout 121 (base)

## 🚀 Getting Started

### Play Locally

1. **Download or clone this repository**
2. **Open `index.html`** in any modern web browser
3. **Start playing!** No installation or setup needed

### Deploy to GitHub Pages (FREE!)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/121-darts-game.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Click Save
   - Wait 1-2 minutes

3. **Your game is live!** 🎉
   - URL: `https://YOUR-USERNAME.github.io/121-darts-game`

## ✨ Features

- 🎯 **Turn-Based Scoring**: Enter your 3-dart turn scores
- 👤 **Player Management**: Track multiple players with persistent stats
- 💾 **Local Storage**: All data saved in your browser (no server needed)
- 📊 **Session History**: Review all attempts in your current session
- 🌓 **Dark/Light Theme**: Toggle between themes with one click
- 📱 **Mobile Responsive**: Perfect for phone, tablet, or desktop
- 🎨 **Forest Green Theme**: Sleek dark green design that's easy on the eyes
- ⚡ **Zero Cost**: Completely free to host and use
- 🔒 **Privacy**: No backend, no tracking - everything runs locally

## 📱 How to Use

### Starting a Game
1. Enter your name (or select existing player)
2. Press Enter or click "Start Game"

### During the Game
1. Throw your turn (3 darts)
2. Enter the total score for that turn
3. Press Enter or click "Submit"
4. View "Remaining" to see what you need
5. Repeat for up to 3 turns

### Controls
- **Submit**: Record your turn score (Enter key works!)
- **Miss (0)**: Quick button for a zero score
- **Theme Toggle** (🌙/☀️): Switch between dark/light mode
- **Change Player**: Switch to a different player
- **Reset Attempt**: Give up and return to base checkout
- **End Game**: Save stats and exit to player selection

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- Player names and statistics
- Games played and best checkouts
- Total wins (players who reached 170)
- Session history

**Note**: Data is specific to each browser/device. Clearing browser data will erase stats.

## 🎨 Browser Support

Works perfectly in all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## 🛠️ Project Structure

- **`index.html`**: Game structure and layout
- **`style.css`**: Theming, responsive design, and animations
- **`game.js`**: Game logic, turn tracking, and local storage
- **`README.md`**: This file

## 🎯 Tips for Playing

- **Locking Base**: Only Turn 1 completions lock your base - make them count!
- **Strategic Play**: Sometimes it's better to play safe and build your base slowly
- **Track Progress**: Watch your "Remaining" score to plan your next turn
- **Practice**: Start with consistent scoring to build a solid base
- **Challenge Friends**: Share your GitHub Pages link and compare stats!

## 🐛 Troubleshooting

**Stats not saving?**
- Ensure localStorage is enabled in your browser
- Use the same browser/device for consistent data

**Page not loading?**
- Clear browser cache and try again
- Open in incognito mode to test

**GitHub Pages not working?**
- Wait 2-5 minutes after enabling Pages
- Ensure repository is Public
- Check that `index.html` is in the root directory

---

**Created by Dale Cosgrove** 🎯

Good luck and may your arrows fly true!
