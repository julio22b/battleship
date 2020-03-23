import { addEventsToAllFormButtons } from './formButtons';

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

function startTwoPlayers() {}

function switchGameboards() {
    const gameboardOne = document.querySelector('#container-one');
    gameboardOne.style.display = 'none';

    const blanket = document.querySelector('.cover-blanket');
    blanket.classList.remove('active');

    const gameboardTwo = document.querySelector('#container-two');
    gameboardTwo.style.display = 'flex';
    document.querySelector('.main-screen').style.display = 'flex';
    document.querySelector('#player-two-name').textContent = 'Captain Hack Finch';

    addEventsToAllFormButtons('two');
}

function openCoverBlanket() {
    const blanket = document.querySelector('.cover-blanket');
    blanket.classList.add('active');
    document.querySelector('.main-screen').style.display = 'none';

    const passDeviceBtn = document.querySelector('.pass-device-btn');
    passDeviceBtn.addEventListener('click', switchGameboards);
}

function checkMobileDevice() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        const formTitle = document.querySelector('#form-title');
        formTitle.textContent = 'Tap on a cell';

        const inputs = document.querySelectorAll('.ship-container input');
        inputs.forEach(input => input.setAttribute('readonly', 'readonly'));
    }
}

export {
    hideStartScreen,
    showMainScreen,
    openShipPlacements,
    startGame,
    switchGameboards,
    openCoverBlanket,
    checkMobileDevice,
};
