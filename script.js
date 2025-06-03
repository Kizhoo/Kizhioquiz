// Data dan state aplikasi
const appState = {
    currentPage: 'mode-selection', // mode-selection, single-setup, duel-setup, game, results
    language: 'id',
    settings: {
        theme: 'dark',
        sound: false,
        animation: true
    },
    gameMode: null, // 'single', 'duel'
    roomCode: null,
    playerId: Math.random().toString(36).substring(2, 10),
    playerName: "Anda",
    opponent: null,
    difficulty: 'medium',
    questions: [],
    currentQuestion: 0,
    score: 0,
    playerAnswers: [],
    timer: null,
    timeLeft: 30
};

// Elemen DOM
const elements = {
    mainContent: document.getElementById('main-content'),
    settingsModal: document.getElementById('settings-modal'),
    closeModal: document.getElementById('close-modal'),
    saveSettings: document.getElementById('save-settings'),
    themeSelect: document.getElementById('theme-select'),
    soundToggle: document.getElementById('sound-toggle'),
    animationToggle: document.getElementById('animation-toggle'),
    languageBtn: document.querySelector('.language-btn'),
    languageDropdown: document.querySelector('.language-dropdown'),
    languageOptions: document.querySelectorAll('.language-option')
};

// Data bahasa
const languageData = {
    id: {
        chooseMode: "Pilih Mode Permainan",
        modeDescription: "Pilih antara bermain sendiri atau tantang teman dalam duel cepat-cepatan!",
        singlePlayer: "Single Player",
        singlePlayerDesc: "Bermain sendiri dengan tingkat kesulitan pilihan",
        duelMode: "Duel Mode",
        duelModeDesc: "Tantang teman dalam duel cepat menjawab",
        selectDifficulty: "Pilih Tingkat Kesulitan",
        easy: "Mudah",
        medium: "Menengah",
        hard: "Sulit",
        veryhard: "Sangat Sulit",
        startGame: "Mulai Permainan",
        duelSetup: "Setup Duel",
        createRoom: "Buat Room Baru",
        or: "ATAU",
        enterRoomCode: "Masukkan Kode Room",
        joinRoom: "Gabung Room",
        waitingForPlayers: "Menunggu Pemain",
        roomCode: "Kode Room",
        host: "Host",
        player: "Pemain",
        waitingForOpponent: "Menunggu lawan...",
        cancel: "Batalkan",
        startDuel: "Mulai Duel",
        question: "Pertanyaan",
        of: "dari",
        time: "Waktu",
        score: "Skor",
        correct: "Benar",
        progress: "Progress Permainan",
        leaderboard: "Peringkat Teratas",
        prev: "Sebelumnya",
        next: "Selanjutnya",
        finish: "Selesai",
        results: "Hasil Akhir",
        correctAnswers: "Jawaban Benar",
        timeRemaining: "Waktu Tersisa",
        timeBonus: "Bonus waktu",
        difficultyLabel: "Kesulitan",
        multiplier: "Multiplier",
        rank: "Peringkat",
        top: "Top",
        playAgain: "Main Lagi",
        changeDifficulty: "Ganti Kesulitan",
        settings: "Pengaturan",
        settingsTitle: "Pengaturan",
        finalScoreText: "Skor Anda"
    },
    en: {
        chooseMode: "Choose Game Mode",
        modeDescription: "Select between playing alone or challenging a friend in a fast-paced duel!",
        singlePlayer: "Single Player",
        singlePlayerDesc: "Play alone with your chosen difficulty",
        duelMode: "Duel Mode",
        duelModeDesc: "Challenge a friend in a fast-answer duel",
        selectDifficulty: "Select Difficulty",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        veryhard: "Very Hard",
        startGame: "Start Game",
        duelSetup: "Duel Setup",
        createRoom: "Create New Room",
        or: "OR",
        enterRoomCode: "Enter Room Code",
        joinRoom: "Join Room",
        waitingForPlayers: "Waiting for Players",
        roomCode: "Room Code",
        host: "Host",
        player: "Player",
        waitingForOpponent: "Waiting for opponent...",
        cancel: "Cancel",
        startDuel: "Start Duel",
        question: "Question",
        of: "of",
        time: "Time",
        score: "Score",
        correct: "Correct",
        progress: "Game Progress",
        leaderboard: "Top Leaderboard",
        prev: "Previous",
        next: "Next",
        finish: "Finish",
        results: "Final Results",
        correctAnswers: "Correct Answers",
        timeRemaining: "Time Remaining",
        timeBonus: "Time bonus",
        difficultyLabel: "Difficulty",
        multiplier: "Multiplier",
        rank: "Rank",
        top: "Top",
        playAgain: "Play Again",
        changeDifficulty: "Change Difficulty",
        settings: "Settings",
        settingsTitle: "Settings",
        finalScoreText: "Your Score"
    }
};

// Inisialisasi aplikasi
function initApp() {
    loadSettings();
    setupEventListeners();
    showPage('mode-selection');
}

// Tampilkan halaman
function showPage(pageId, data = {}) {
    appState.currentPage = pageId;
    
    switch(pageId) {
        case 'mode-selection':
            renderModeSelection();
            break;
        case 'single-setup':
            renderSingleSetup();
            break;
        case 'duel-setup':
            renderDuelSetup();
            break;
        case 'waiting-room':
            renderWaitingRoom(data);
            break;
        case 'game':
            renderGamePage(data);
            break;
        case 'results':
            renderResultsPage(data);
            break;
    }
}

// Render halaman pemilihan mode
function renderModeSelection() {
    const lang = languageData[appState.language];
    
    elements.mainContent.innerHTML = `
        <section class="mode-selection fade-in">
            <h2>${lang.chooseMode}</h2>
            <p>${lang.modeDescription}</p>
            
            <div class="mode-options">
                <div class="mode-card" id="single-player-btn">
                    <i class="fas fa-user"></i>
                    <h3>${lang.singlePlayer}</h3>
                    <p>${lang.singlePlayerDesc}</p>
                </div>
                
                <div class="mode-card" id="duel-mode-btn">
                    <i class="fas fa-users"></i>
                    <h3>${lang.duelMode}</h3>
                    <p>${lang.duelModeDesc}</p>
                </div>
            </div>
        </section>
    `;
    
    // Event listeners
    document.getElementById('single-player-btn').addEventListener('click', () => {
        appState.gameMode = 'single';
        showPage('single-setup');
    });
    
    document.getElementById('duel-mode-btn').addEventListener('click', () => {
        appState.gameMode = 'duel';
        showPage('duel-setup');
    });
}

// Render halaman setup single player
function renderSingleSetup() {
    const lang = languageData[appState.language];
    
    elements.mainContent.innerHTML = `
        <section class="difficulty-section fade-in">
            <h2 class="section-title">
                <i class="fas fa-chart-line"></i>
                ${lang.selectDifficulty}
            </h2>
            <div class="difficulty-options">
                <div class="difficulty-btn easy active" data-difficulty="easy">
                    <i class="fas fa-seedling"></i>
                    <h3>${lang.easy}</h3>
                    <p>${lang.easy} ${lang.difficultyLabel.toLowerCase()}</p>
                </div>
                <div class="difficulty-btn medium" data-difficulty="medium">
                    <i class="fas fa-feather-alt"></i>
                    <h3>${lang.medium}</h3>
                    <p>${lang.medium} ${lang.difficultyLabel.toLowerCase()}</p>
                </div>
                <div class="difficulty-btn hard" data-difficulty="hard">
                    <i class="fas fa-brain"></i>
                    <h3>${lang.hard}</h3>
                    <p>${lang.hard} ${lang.difficultyLabel.toLowerCase()}</p>
                </div>
                <div class="difficulty-btn veryhard" data-difficulty="veryhard">
                    <i class="fas fa-skull"></i>
                    <h3>${lang.veryhard}</h3>
                    <p>${lang.veryhard} ${lang.difficultyLabel.toLowerCase()}</p>
                </div>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <button class="btn btn-primary pulse" id="start-single-btn">
                    <i class="fas fa-play"></i>
                    ${lang.startGame}
                </button>
            </div>
        </section>
    `;
    
    // Event listeners untuk difficulty
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.difficulty = btn.dataset.difficulty;
        });
    });
    
    // Tombol mulai
    document.getElementById('start-single-btn').addEventListener('click', startSinglePlayerGame);
}

// Mulai permainan single player
function startSinglePlayerGame() {
    // Reset state permainan
    appState.currentQuestion = 0;
    appState.score = 0;
    appState.playerAnswers = [];
    appState.timeLeft = 30;
    
    // Ambil pertanyaan dari API
    fetchQuestions(appState.difficulty, 10)
        .then(questions => {
            appState.questions = questions;
            showPage('game', { mode: 'single' });
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            alert('Gagal memuat pertanyaan. Menggunakan pertanyaan sampel.');
            appState.questions = getSampleQuestions();
            showPage('game', { mode: 'single' });
        });
}

// Render halaman setup duel
function renderDuelSetup() {
    const lang = languageData[appState.language];
    
    elements.mainContent.innerHTML = `
        <section class="duel-section fade-in">
            <h2 class="section-title">
                <i class="fas fa-swords"></i>
                ${lang.duelSetup}
            </h2>
            
            <div style="text-align: center; margin: 30px 0;">
                <button class="btn btn-primary" id="create-room-btn">
                    <i class="fas fa-plus"></i>
                    ${lang.createRoom}
                </button>
                <p style="margin: 20px 0;">${lang.or}</p>
                <input type="text" class="room-code-input" id="room-code-input" placeholder="${lang.enterRoomCode}">
                <button class="btn btn-outline" id="join-room-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    ${lang.joinRoom}
                </button>
            </div>
        </section>
    `;
    
    // Event listeners
    document.getElementById('create-room-btn').addEventListener('click', createRoom);
    document.getElementById('join-room-btn').addEventListener('click', joinRoom);
}

// Buat room baru
function createRoom() {
    // Generate kode room unik (6 karakter)
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    appState.roomCode = roomCode;
    
    // Tampilkan halaman waiting room
    showPage('waiting-room', {
        roomCode: roomCode,
        isHost: true
    });
}

// Gabung ke room
function joinRoom() {
    const roomCode = document.getElementById('room-code-input').value.trim().toUpperCase();
    if (!roomCode || roomCode.length !== 6) {
        alert('Kode room harus 6 karakter!');
        return;
    }
    
    appState.roomCode = roomCode;
    
    // Tampilkan halaman waiting room
    showPage('waiting-room', {
        roomCode: roomCode,
        isHost: false
    });
}

// Render halaman waiting room
function renderWaitingRoom(data) {
    const lang = languageData[appState.language];
    
    elements.mainContent.innerHTML = `
        <section class="duel-section fade-in">
            <h2 class="section-title">
                <i class="fas fa-hourglass-half"></i>
                ${lang.waitingForPlayers}
            </h2>
            
            <div class="room-code-display">${data.roomCode}</div>
            <p>${lang.roomCode}: ${data.roomCode}</p>
            
            <div class="player-list">
                <div class="player-card active">
                    <div class="player-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="player-name">${appState.playerName}</div>
                    <div class="player-status">${data.isHost ? lang.host : lang.player}</div>
                </div>
                
                <div class="player-card">
                    <div class="player-avatar">
                        <i class="fas fa-user-clock"></i>
                    </div>
                    <div class="player-name">${lang.waitingForOpponent}</div>
                    <div class="player-status">-</div>
                </div>
            </div>
            
            <button class="btn btn-primary" id="start-duel-btn" style="${data.isHost ? '' : 'display: none;'}">
                <i class="fas fa-play"></i>
                ${lang.startDuel}
            </button>
            
            <button class="btn btn-danger" id="cancel-room-btn">
                <i class="fas fa-times"></i>
                ${lang.cancel}
            </button>
        </section>
    `;
    
    // Event listeners
    if (data.isHost) {
        document.getElementById('start-duel-btn').addEventListener('click', startDuelGame);
    }
    
    document.getElementById('cancel-room-btn').addEventListener('click', () => {
        showPage('duel-setup');
    });
}

// Mulai permainan duel
function startDuelGame() {
    // Reset state permainan
    appState.currentQuestion = 0;
    appState.score = 0;
    appState.playerAnswers = [];
    appState.timeLeft = 15; // Waktu lebih singkat untuk duel
    appState.opponent = {
        id: 'opponent-' + Math.random().toString(36).substring(2, 8),
        name: "Lawan",
        score: 0
    };
    
    // Ambil pertanyaan untuk duel
    fetchQuestions('medium', 5) // Duel lebih pendek, hanya 5 pertanyaan
        .then(questions => {
            appState.questions = questions;
            showPage('game', { mode: 'duel' });
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            appState.questions = getSampleQuestions();
            showPage('game', { mode: 'duel' });
        });
}

// Render halaman permainan
function renderGamePage(data) {
    const lang = languageData[appState.language];
    const isDuel = data.mode === 'duel';
    
    let gameContent = '';
    
    if (isDuel) {
        gameContent = `
            <div class="player-list">
                <div class="player-card active">
                    <div class="player-avatar" style="background: linear-gradient(45deg, #4361ee, #3f37c9);">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="player-name">${appState.playerName}</div>
                    <div class="player-score" id="player-score">${appState.score}</div>
                </div>
                
                <div class="player-card">
                    <div class="player-avatar" style="background: linear-gradient(45deg, #f72585, #b5179e);">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="player-name">${appState.opponent.name}</div>
                    <div class="player-score" id="opponent-score">${appState.opponent.score}</div>
                </div>
            </div>
        `;
    }
    
    elements.mainContent.innerHTML = `
        <div class="game-container">
            <div class="game-area fade-in">
                <div class="question-container">
                    <div class="question-header">
                        <div class="question-count" id="question-count">${lang.question} ${appState.currentQuestion + 1} ${lang.of} ${appState.questions.length}</div>
                        <div class="timer">
                            <i class="fas fa-clock"></i>
                            <span id="timer">${formatTime(appState.timeLeft)}</span>
                        </div>
                    </div>
                    <div class="question-text" id="question-text">
                        ${appState.questions[appState.currentQuestion]?.question || 'Memuat pertanyaan...'}
                    </div>
                    <div class="options-grid" id="options-grid">
                        ${renderOptions(appState.questions[appState.currentQuestion])}
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <button class="btn btn-outline" id="prev-btn" ${appState.currentQuestion === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left"></i>
                        <span>${lang.prev}</span>
                    </button>
                    <button class="btn btn-primary" id="next-btn">
                        <span>${appState.currentQuestion === appState.questions.length - 1 ? lang.finish : lang.next}</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
            
            <div class="sidebar">
                <div class="stats-card fade-in">
                    <h2 class="section-title">
                        <i class="fas fa-chart-bar"></i>
                        ${isDuel ? lang.score : lang.progress}
                    </h2>
                    
                    ${isDuel ? gameContent : `
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div>${lang.score}</div>
                                <div class="stat-value" id="current-score">${appState.score}</div>
                                <div>${lang.points}</div>
                            </div>
                            <div class="stat-item">
                                <div>${lang.correct}</div>
                                <div class="stat-value" id="correct-answers">0</div>
                                <div>${lang.of} <span id="total-questions">${appState.questions.length}</span></div>
                            </div>
                        </div>
                        <div class="progress-container">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span>${lang.progress}</span>
                                <span id="progress-percent">0%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                            </div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
    
    // Event listeners
    document.getElementById('prev-btn').addEventListener('click', showPrevQuestion);
    document.getElementById('next-btn').addEventListener('click', showNextQuestion);
    
    // Tambahkan event listeners untuk opsi jawaban
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedOption = e.currentTarget.dataset.option;
            selectAnswer(selectedOption);
            
            // Untuk duel, langsung ke pertanyaan berikutnya
            if (isDuel) {
                setTimeout(() => {
                    if (appState.currentQuestion < appState.questions.length - 1) {
                        showNextQuestion();
                    } else {
                        finishGame();
                    }
                }, 1000);
            }
        });
    });
    
    // Mulai timer
    startTimer();
}

// Fungsi untuk merender opsi jawaban
function renderOptions(question) {
    if (!question) return '';
    
    return question.answers.map(answer => `
        <button class="option-btn ${answer.id.toUpperCase()}" data-option="${answer.id}">
            <div class="option-letter">${answer.id.toUpperCase()}</div>
            <div class="option-text">${answer.text}</div>
        </button>
    `).join('');
}

// Pilih jawaban
function selectAnswer(optionId) {
    const currentQuestion = appState.questions[appState.currentQuestion];
    const selectedAnswer = currentQuestion.answers.find(a => a.id === optionId);
    
    // Simpan jawaban pemain
    appState.playerAnswers[appState.currentQuestion] = optionId;
    
    // Periksa apakah jawaban benar
    if (selectedAnswer.correct) {
        // Hitung skor berdasarkan waktu tersisa
        const timeBonus = Math.floor(appState.timeLeft * 2);
        appState.score += 100 + timeBonus;
        
        // Update skor
        document.getElementById('current-score').textContent = appState.score;
        
        // Untuk duel, update juga skor lawan (simulasi)
        if (appState.gameMode === 'duel') {
            // Lawan memiliki 70% kemungkinan menjawab benar
            const opponentCorrect = Math.random() < 0.7;
            if (opponentCorrect) {
                // Lawan menjawab dalam waktu 1-10 detik
                const opponentTime = 5 + Math.floor(Math.random() * 6);
                const opponentBonus = Math.floor(opponentTime * 2);
                appState.opponent.score += 100 + opponentBonus;
                document.getElementById('opponent-score').textContent = appState.opponent.score;
            }
        }
    }
    
    // Update progress
    updateProgress();
}

// Navigasi pertanyaan
function showPrevQuestion() {
    if (appState.currentQuestion > 0) {
        appState.currentQuestion--;
        renderGamePage({ mode: appState.gameMode });
    }
}

function showNextQuestion() {
    if (appState.currentQuestion < appState.questions.length - 1) {
        appState.currentQuestion++;
        appState.timeLeft = appState.gameMode === 'duel' ? 15 : 30;
        renderGamePage({ mode: appState.gameMode });
    } else {
        finishGame();
    }
}

// Mulai timer
function startTimer() {
    clearInterval(appState.timer);
    
    appState.timer = setInterval(() => {
        appState.timeLeft--;
        document.getElementById('timer').textContent = formatTime(appState.timeLeft);
        
        if (appState.timeLeft <= 0) {
            clearInterval(appState.timer);
            // Untuk single player, lanjut otomatis
            if (appState.gameMode === 'single') {
                showNextQuestion();
            }
        }
    }, 1000);
}

// Format waktu
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update progress
function updateProgress() {
    const answeredCount = appState.playerAnswers.filter(a => a !== null).length;
    const progress = (answeredCount / appState.questions.length) * 100;
    
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;
    
    // Update statistik
    const correctCount = appState.playerAnswers.reduce((count, answer, index) => {
        if (!answer) return count;
        const question = appState.questions[index];
        const selected = question.answers.find(a => a.id === answer);
        return count + (selected.correct ? 1 : 0);
    }, 0);
    
    document.getElementById('correct-answers').textContent = correctCount;
}

// Selesaikan permainan
function finishGame() {
    clearInterval(appState.timer);
    showPage('results');
}

// Render halaman hasil
function renderResultsPage() {
    const lang = languageData[appState.language];
    const isDuel = appState.gameMode === 'duel';
    
    // Hitung jawaban benar
    const correctAnswers = appState.playerAnswers.reduce((count, answer, index) => {
        if (!answer) return count;
        const question = appState.questions[index];
        const selected = question.answers.find(a => a.id === answer);
        return count + (selected.correct ? 1 : 0);
    }, 0);
    
    // Hitung bonus waktu
    const totalTimeBonus = appState.playerAnswers.reduce((bonus, answer, index) => {
        if (!answer) return bonus;
        const question = appState.questions[index];
        const selected = question.answers.find(a => a.id === answer);
        // Asumsikan setiap pertanyaan memiliki waktu 30 detik
        const timeUsed = 30 - appState.timeLeft; // Ini hanya simulasi
        const timeBonus = Math.floor((30 - timeUsed) * 2);
        return bonus + (selected.correct ? timeBonus : 0);
    }, 0);
    
    elements.mainContent.innerHTML = `
        <div class="results-screen">
            <h2><i class="fas fa-medal"></i> ${lang.results}</h2>
            
            ${isDuel ? `
                <div class="player-list">
                    <div class="player-card ${appState.score > appState.opponent.score ? 'active' : ''}">
                        <div class="player-avatar" style="background: linear-gradient(45deg, #4361ee, #3f37c9);">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="player-name">${appState.playerName}</div>
                        <div class="player-score">${appState.score}</div>
                        <div>${appState.score > appState.opponent.score ? '🏆 Pemenang!' : ''}</div>
                    </div>
                    
                    <div class="player-card ${appState.opponent.score > appState.score ? 'active' : ''}">
                        <div class="player-avatar" style="background: linear-gradient(45deg, #f72585, #b5179e);">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="player-name">${appState.opponent.name}</div>
                        <div class="player-score">${appState.opponent.score}</div>
                        <div>${appState.opponent.score > appState.score ? '🏆 Pemenang!' : ''}</div>
                    </div>
                </div>
            ` : `
                <div class="score-display">${appState.score}</div>
                <div class="score-text">${lang.finalScoreText}</div>
            `}
            
            <div class="result-stats">
                <div class="result-stat">
                    <div>${lang.correctAnswers}</div>
                    <div class="result-stat-value">${correctAnswers}</div>
                    <div>${lang.of} ${appState.questions.length} ${lang.question.toLowerCase()}</div>
                </div>
                
                <div class="result-stat">
                    <div>${lang.timeBonus}</div>
                    <div class="result-stat-value">+${totalTimeBonus}</div>
                    <div>${lang.points}</div>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <button class="btn btn-primary" id="play-again-btn">
                    <i class="fas fa-redo"></i>
                    ${lang.playAgain}
                </button>
                <button class="btn btn-outline" id="change-mode-btn" style="margin-left: 15px;">
                    <i class="fas fa-home"></i>
                    ${lang.changeDifficulty}
                </button>
            </div>
        </div>
    `;
    
    // Event listeners
    document.getElementById('play-again-btn').addEventListener('click', () => {
        if (appState.gameMode === 'single') {
            startSinglePlayerGame();
        } else {
            startDuelGame();
        }
    });
    
    document.getElementById('change-mode-btn').addEventListener('click', () => {
        showPage('mode-selection');
    });
}

// Setup event listeners
function setupEventListeners() {
    // Bahasa
    elements.languageBtn.addEventListener('click', () => {
        elements.languageDropdown.classList.toggle('show');
    });
    
    elements.languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            elements.languageOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            appState.language = option.dataset.lang;
            updateLanguageUI();
        });
    });
    
    // Pengaturan
    elements.settingsBtn.addEventListener('click', () => {
        elements.settingsModal.style.display = 'flex';
    });
    
    elements.closeModal.addEventListener('click', () => {
        elements.settingsModal.style.display = 'none';
    });
    
    elements.saveSettings.addEventListener('click', saveSettings);
    
    // Tutup modal saat klik di luar
    window.addEventListener('click', (e) => {
        if (e.target === elements.settingsModal) {
            elements.settingsModal.style.display = 'none';
        }
    });
}

// Update UI berdasarkan bahasa
function updateLanguageUI() {
    const lang = languageData[appState.language];
    
    // Update tombol bahasa
    elements.languageBtn.querySelector('span').textContent = 
        appState.language === 'id' ? 'Bahasa Indonesia' : 'English';
    
    // Update tombol pengaturan
    document.getElementById('settings-btn').querySelector('span').textContent = lang.settings;
    
    // Render ulang halaman saat ini
    showPage(appState.currentPage);
}

// Simpan pengaturan
function saveSettings() {
    appState.settings = {
        theme: elements.themeSelect.value,
        sound: elements.soundToggle.checked,
        animation: elements.animationToggle.checked
    };
    
    localStorage.setItem('quizSettings', JSON.stringify(appState.settings));
    elements.settingsModal.style.display = 'none';
    
    // Terapkan tema
    applyTheme();
}

// Muat pengaturan
function loadSettings() {
    const savedSettings = localStorage.getItem('quizSettings');
    if (savedSettings) {
        appState.settings = JSON.parse(savedSettings);
        elements.themeSelect.value = appState.settings.theme;
        elements.soundToggle.checked = appState.settings.sound;
        elements.animationToggle.checked = appState.settings.animation;
        applyTheme();
    }
}

// Terapkan tema
function applyTheme() {
    // Ini adalah contoh sederhana, implementasi nyata akan mengubah variabel CSS
    console.log('Theme applied:', appState.settings.theme);
}

// Pertanyaan sampel
function getSampleQuestions() {
    return [
        {
            id: 1,
            question: "Apa ibukota Indonesia?",
            answers: [
                { id: 'a', text: "Jakarta", correct: true },
                { id: 'b', text: "Bandung", correct: false },
                { id: 'c', text: "Surabaya", correct: false },
                { id: 'd', text: "Medan", correct: false }
            ],
            category: "Geography",
            difficulty: "easy"
        },
        {
            id: 2,
            question: "Berapa hasil dari 7 x 8?",
            answers: [
                { id: 'a', text: "54", correct: false },
                { id: 'b', text: "56", correct: true },
                { id: 'c', text: "64", correct: false },
                { id: 'd', text: "48", correct: false }
            ],
            category: "Math",
            difficulty: "easy"
        },
        {
            id: 3,
            question: "Siapa penemu lampu pijar?",
            answers: [
                { id: 'a', text: "Thomas Edison", correct: true },
                { id: 'b', text: "Nikola Tesla", correct: false },
                { id: 'c', text: "Alexander Graham Bell", correct: false },
                { id: 'd', text: "Albert Einstein", correct: false }
            ],
            category: "Science",
            difficulty: "medium"
        }
    ];
}

// Inisialisasi aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);
