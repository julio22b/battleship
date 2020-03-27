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

function startTwoPlayers() {
    openCoverBlanket();
    const passDeviceBtn = document.querySelector('.pass-device-btn');
    const thirdPara = document.querySelector('.cover-blanket div p:nth-child(3)');
    const name = document.querySelector('#name');
    name.textContent = 'Jack Aubrey';
    passDeviceBtn.textContent = 'Start Game';
    passDeviceBtn.style.color = 'white';
    thirdPara.textContent = 'shoots first';

    replaceOldGameboardsWithNewOnes();

    document.querySelectorAll('.gameboard-two .ship-starting-point').forEach(ship => {
        ship.style.opacity = 0;
    });

    passDeviceBtn.addEventListener('click', () => {
        document.querySelector('#form-container').style.display = 'none';
        document.querySelector('#container-two').style.display = 'flex';
        document.querySelector('#container-one').style.display = 'flex';
        document.querySelectorAll('.sunk-ships').forEach(div => (div.style.display = 'inherit'));
        closeCoverBlanket();
    });
}

function hideGameboardOne() {
    const gameboardOne = document.querySelector('#container-one');
    gameboardOne.style.display = 'none';
    document.querySelector('#player-two-name').textContent = 'Captain Hack Finch';
}

function hideGameboardTwo() {
    const gameboardTwo = document.querySelector('#container-two');
    gameboardTwo.style.display = 'none';
}

function openCoverBlanket(placements = false) {
    const blanket = document.querySelector('.cover-blanket');
    blanket.classList.add('active');
    document.querySelector('#container-two').style.display = 'flex';
    if (placements) {
        const passDeviceBtn = document.querySelector('.pass-device-btn');
        passDeviceBtn.addEventListener('click', function playerTwoPlace() {
            hideGameboardOne();
            closeCoverBlanket();
            document.querySelector('#container-two').style.display = 'flex';
            passDeviceBtn.removeEventListener('click', playerTwoPlace);
        });
    }
}

function closeCoverBlanket() {
    const blanket = document.querySelector('.cover-blanket');
    blanket.classList.remove('active');
}

function replaceOldFormWithNewOne() {
    const form = document.querySelector('#form-container');
    const clonedForm = form.cloneNode(true);

    form.parentNode.replaceChild(clonedForm, form);

    const inputs = Array.from(document.querySelectorAll('.ship-container input'));
    inputs.forEach(input => {
        if (input.getAttribute('name') === 'biggest') {
            input.disabled = false;
        }
    });

    const shipFormContainers = Array.from(document.querySelectorAll('.ship-container'));
    shipFormContainers.forEach(container => {
        container.classList.remove('scale-in-hor-center');
        if (container.classList.contains('biggest-ship-container')) {
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    });

    const labels = Array.from(document.querySelectorAll('.ship-container span span'));
    labels.forEach((label, index) => {
        label.style.color = '#272727';
        label.textContent = `0/${index + 1}`;
    });

    const btns = Array.from(document.querySelectorAll('button'));
    btns.forEach(btn => (btn.disabled = false));
}

function replaceOldGameboardsWithNewOnes() {
    const gameboardOne = document.querySelector('.gameboard-one');
    const clonedGameboardOne = gameboardOne.cloneNode(true);
    gameboardOne.parentNode.replaceChild(clonedGameboardOne, gameboardOne);

    const gameboardTwo = document.querySelector('.gameboard-two');
    const clonedGameboardTwo = gameboardTwo.cloneNode(true);
    gameboardTwo.parentNode.replaceChild(clonedGameboardTwo, gameboardTwo);
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
    startTwoPlayers,
    hideGameboardOne,
    hideGameboardTwo,
    openCoverBlanket,
    checkMobileDevice,
    replaceOldFormWithNewOne,
};
