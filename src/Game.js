const Game = (() => {
    const GameOver = winner => {
        const mainScreen = document.querySelector('.main-screen');
        const gameOverScreen = document.querySelector('.game-over-screen');
        const span = document.querySelector('.winner');

        mainScreen.style.opacity = 0.4;
        gameOverScreen.style.display = 'flex';
        span.textContent = winner;
    };
    return { GameOver };
})();

export { Game };
