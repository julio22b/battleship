function hideStartScreen() {
    const startScreen = document.querySelector('.start-screen');
    startScreen.classList.add('hide');
}

function showMainScreen() {
    const mainScreen = document.querySelector('.main-screen');
    mainScreen.style.display = 'flex';
}

function openShipPlacements() {
    const containerTwo = document.querySelector('.boards div#container-two.container');
    containerTwo.style.display = 'none';
}

function startGame() {
    const startGameBtn = document.querySelector('button.start-game');

    startGameBtn.addEventListener('click', e => {
        e.preventDefault();
        showComputerBoard();
    });
    startGameBtn.style.backgroundColor = '#087e8b';
    startGameBtn.style.color = 'white';
    startGameBtn.style.transform = 'scale(1.1)';
}

function showComputerBoard() {
    const containerTwo = document.querySelector('.boards div#container-two.container');
    const formContainer = document.querySelector('#form-container');
    const sunkShipsDivs = document.querySelectorAll('.sunk-ships');

    containerTwo.style.display = 'flex';
    formContainer.style.display = 'none';
    sunkShipsDivs.forEach(div => (div.style.display = 'flex'));
}

export { hideStartScreen, showMainScreen, openShipPlacements, startGame };
