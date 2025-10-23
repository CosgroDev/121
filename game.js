// Game State
let gameState = {
    currentPlayer: null,
    currentCheckout: 121,
    baseCheckout: 121,
    turnsUsed: 0,
    currentTurnScore: 0,
    sessionHistory: [],
    gameActive: false
};

// LocalStorage Keys
const STORAGE_KEYS = {
    PLAYERS: 'darts121_players'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadExistingPlayers();
    setupEventListeners();
    loadThemePreference();
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('start-game-btn').addEventListener('click', startNewGame);
    document.getElementById('change-player-btn').addEventListener('click', changePlayer);
    document.getElementById('submit-score-btn').addEventListener('click', submitScore);
    document.getElementById('miss-btn').addEventListener('click', submitMiss);
    document.getElementById('reset-attempt-btn').addEventListener('click', resetAttempt);
    document.getElementById('end-game-btn').addEventListener('click', endGame);
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Enter key to submit score (works on mobile keyboards)
    const scoreInput = document.getElementById('score');
    scoreInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitScore();
        }
    });
    scoreInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitScore();
        }
    });

    // Enter key to start game
    const nameInput = document.getElementById('player-name');
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            startNewGame();
        }
    });
    nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            startNewGame();
        }
    });
}

// Theme Management
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');

    if (isDark) {
        body.classList.remove('dark-theme');
        document.querySelector('.theme-icon').textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        document.querySelector('.theme-icon').textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.querySelector('.theme-icon').textContent = '🌙';
    } else {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-icon').textContent = '☀️';
    }
}

// Player Management
function loadExistingPlayers() {
    const players = getPlayers();
    if (players.length > 0) {
        const existingPlayersSection = document.getElementById('existing-players-section');
        const playersList = document.getElementById('existing-players-list');

        existingPlayersSection.style.display = 'block';
        playersList.innerHTML = '';

        players.forEach(player => {
            const button = document.createElement('button');
            button.className = 'player-button';
            button.innerHTML = `
                <span class="player-button-name">${player.name}</span>
                <span class="player-button-stats">
                    Games: ${player.gamesPlayed} | Best: ${player.bestCheckout} | Wins: ${player.totalWins}
                </span>
            `;
            button.addEventListener('click', () => selectExistingPlayer(player.name));
            playersList.appendChild(button);
        });
    }
}

function getPlayers() {
    const stored = localStorage.getItem(STORAGE_KEYS.PLAYERS);
    return stored ? JSON.parse(stored) : [];
}

function savePlayers(players) {
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
}

function getPlayer(name) {
    const players = getPlayers();
    return players.find(p => p.name.toLowerCase() === name.toLowerCase());
}

function savePlayer(playerData) {
    const players = getPlayers();
    const existingIndex = players.findIndex(p => p.name.toLowerCase() === playerData.name.toLowerCase());

    if (existingIndex !== -1) {
        players[existingIndex] = playerData;
    } else {
        players.push(playerData);
    }

    savePlayers(players);
}

function createNewPlayer(name) {
    return {
        name: name,
        gamesPlayed: 0,
        bestCheckout: 0,
        totalWins: 0,
        history: []
    };
}

// Game Flow
function startNewGame() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();

    if (!name) {
        alert('Please enter your name');
        return;
    }

    selectExistingPlayer(name);
}

function selectExistingPlayer(name) {
    let player = getPlayer(name);

    if (!player) {
        player = createNewPlayer(name);
        savePlayer(player);
    }

    gameState.currentPlayer = player;
    gameState.currentCheckout = 121;
    gameState.baseCheckout = 121;
    gameState.turnsUsed = 0;
    gameState.currentTurnScore = 0;
    gameState.sessionHistory = [];
    gameState.gameActive = true;

    showGameInterface();
    updateUI();
}

function changePlayer() {
    if (confirm('Are you sure you want to change player? Current game progress will be saved.')) {
        endGame();
    }
}

function endGame() {
    if (gameState.gameActive && gameState.sessionHistory.length > 0) {
        // Update player stats
        const player = gameState.currentPlayer;
        player.gamesPlayed++;

        // Check if they reached 170
        if (gameState.currentCheckout >= 170) {
            player.totalWins++;
        }

        // Update best checkout
        if (gameState.currentCheckout > player.bestCheckout) {
            player.bestCheckout = gameState.currentCheckout;
        }

        // Add session to history
        player.history.push({
            date: new Date().toISOString(),
            finalCheckout: gameState.currentCheckout,
            attempts: gameState.sessionHistory.length,
            completed: gameState.currentCheckout >= 170
        });

        savePlayer(player);
    }

    showPlayerSetup();
    loadExistingPlayers();
}

function showPlayerSetup() {
    document.getElementById('player-setup').style.display = 'block';
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('player-name').value = '';
}

function showGameInterface() {
    document.getElementById('player-setup').style.display = 'none';
    document.getElementById('game-interface').style.display = 'block';
}

// Game Logic
function submitScore() {
    const scoreInput = document.getElementById('score');
    const score = parseInt(scoreInput.value);

    if (isNaN(score) || score < 0 || score > 180) {
        alert('Please enter a valid score between 0 and 180');
        return;
    }

    processScore(score);
    scoreInput.value = '';
    scoreInput.focus();
}

function submitMiss() {
    processScore(0);
    document.getElementById('score').focus();
}

function processScore(turnScore) {
    gameState.currentTurnScore += turnScore;
    gameState.turnsUsed++;

    // Check if checkout is finished
    if (gameState.currentTurnScore === gameState.currentCheckout) {
        // Turn 1 = 3 darts or fewer (lock base)
        // Turn 2 or 3 = more than 3 darts (don't lock base)
        const lockBase = (gameState.turnsUsed === 1);
        finishCheckout(true, lockBase);
    }
    // Check if they've busted (gone over)
    else if (gameState.currentTurnScore > gameState.currentCheckout) {
        finishCheckout(false, false);
    }
    // Check if they've used all 3 turns (9 darts)
    else if (gameState.turnsUsed >= 3) {
        finishCheckout(false, false);
    }
    else {
        updateUI();
    }
}

function finishCheckout(success, lockBase) {
    const checkout = gameState.currentCheckout;
    const total = gameState.currentTurnScore;
    const turnsUsed = gameState.turnsUsed;

    let result = {
        checkout: checkout,
        turnsUsed: turnsUsed,
        success: success,
        locked: false,
        total: total
    };

    if (success) {
        // Lock base only if finished on Turn 1 (3 darts or fewer)
        if (lockBase) {
            gameState.baseCheckout = checkout;
            result.locked = true;
        }

        // Move to next checkout
        gameState.currentCheckout = checkout + 1;

        // Check if they've won (reached 170)
        if (gameState.currentCheckout > 170) {
            result.won = true;
            addToHistory(result);
            updateUI();
            showVictory();
            return;
        }
    } else {
        // Failed - go back to base checkout
        gameState.currentCheckout = gameState.baseCheckout;
    }

    addToHistory(result);
    resetAttemptData();
    updateUI();
}

function showVictory() {
    setTimeout(() => {
        alert(`🎉 Congratulations! You've reached 170 and won the game!\n\nFinal Checkout: ${gameState.currentCheckout}\nAttempts: ${gameState.sessionHistory.length}`);
        endGame();
    }, 100);
}

function resetAttempt() {
    if (gameState.turnsUsed === 0) {
        return;
    }

    if (confirm('Reset this attempt and lose progress?')) {
        gameState.currentCheckout = gameState.baseCheckout;

        addToHistory({
            checkout: gameState.currentCheckout,
            turnsUsed: gameState.turnsUsed,
            success: false,
            reset: true,
            total: gameState.currentTurnScore
        });

        resetAttemptData();
        updateUI();
    }
}

function resetAttemptData() {
    gameState.currentTurnScore = 0;
    gameState.turnsUsed = 0;
}

function addToHistory(result) {
    gameState.sessionHistory.unshift(result);
}

// UI Updates
function updateUI() {
    updatePlayerInfo();
    updateGameStatus();
    updateCurrentAttempt();
    updateHistory();
}

function updatePlayerInfo() {
    const player = gameState.currentPlayer;
    document.getElementById('current-player-name').textContent = player.name;
    document.getElementById('games-played').textContent = player.gamesPlayed;
    document.getElementById('best-checkout').textContent = player.bestCheckout;
    document.getElementById('total-wins').textContent = player.totalWins;
}

function updateGameStatus() {
    document.getElementById('current-checkout').textContent = gameState.currentCheckout;
    document.getElementById('base-checkout').textContent = gameState.baseCheckout;

    // Update remaining value
    const remaining = gameState.currentCheckout - gameState.currentTurnScore;
    document.getElementById('remaining-value').textContent = remaining;

    // Update turns display (show 3 turns as dart icons)
    const dartsDisplay = document.getElementById('darts-display');
    const darts = dartsDisplay.querySelectorAll('.dart');
    darts.forEach((dart, index) => {
        if (index < gameState.turnsUsed) {
            dart.classList.add('used');
        } else {
            dart.classList.remove('used');
        }
    });
}

function updateCurrentAttempt() {
    // This function is no longer needed but kept for compatibility
}

function updateHistory() {
    const historyList = document.getElementById('history-list');

    if (gameState.sessionHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No attempts yet - good luck!</p>';
        return;
    }

    historyList.innerHTML = gameState.sessionHistory.map((item, index) => {
        let statusClass = 'failed';
        let badge = 'Failed';
        let badgeClass = 'badge-failed';

        if (item.won) {
            statusClass = 'success';
            badge = '🏆 WON!';
            badgeClass = 'badge-success';
        } else if (item.success && item.locked) {
            statusClass = 'locked';
            badge = '🔒 Locked';
            badgeClass = 'badge-locked';
        } else if (item.success) {
            statusClass = 'success';
            badge = '✓ Success';
            badgeClass = 'badge-success';
        } else if (item.reset) {
            badge = 'Reset';
        }

        const detailsText = item.won
            ? `Completed the game!`
            : item.success
                ? `Turn ${item.turnsUsed} - Finished with ${item.total}`
                : `${item.turnsUsed} turn${item.turnsUsed !== 1 ? 's' : ''} - Score: ${item.total}/${item.checkout}`;

        return `
            <div class="history-item ${statusClass}">
                <div class="history-item-header">
                    <span class="history-checkout">Checkout ${item.checkout}</span>
                    <span class="history-badge ${badgeClass}">${badge}</span>
                </div>
                <div class="history-details">
                    ${detailsText}
                </div>
            </div>
        `;
    }).join('');
}

// Initialize focus
setTimeout(() => {
    document.getElementById('player-name').focus();
}, 100);
