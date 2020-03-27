import {
    startGame,
    openCoverBlanket,
    replaceOldFormWithNewOne,
    hideGameboardTwo,
    startTwoPlayers,
} from './changeScreenFuncs';

const test = new RegExp('[A-Ha-h]{1}[1-8]');
const inputEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
});
const placedShipsRectangles = [];
let globalCounter = 0;

function findShip(
    firstCoord,
    secondCoord = 'false',
    thirdCoord = 'false',
    fourthCoord = 'false',
    boardNumber,
) {
    const humanCells = document.querySelectorAll(`.gameboard-${boardNumber} .cell`);

    humanCells.forEach(cell => {
        if (cell.dataset.coordinate === firstCoord.toUpperCase()) {
            cell.dataset.ship = 'ship-part';
        }
        if (cell.dataset.coordinate === secondCoord.toUpperCase()) {
            cell.dataset.ship = 'ship-part';
        }
        if (cell.dataset.coordinate === thirdCoord.toUpperCase()) {
            cell.dataset.ship = 'ship-part';
        }
        if (cell.dataset.coordinate === fourthCoord.toUpperCase()) {
            cell.dataset.ship = 'ship-part';
        }
    });
}

function checkShipPosition(shipInput, shipRect, boardRect) {
    const inBoard = shipIsInsideBoard(shipRect, boardRect);
    const { horizontalCrash, verticalCrash } = shipCrossesOtherShip(shipRect);
    if (inBoard && !(horizontalCrash || verticalCrash)) {
        shipInput.setCustomValidity('');
    } else if (!inBoard || horizontalCrash || verticalCrash) {
        shipInput.setCustomValidity('Invalid coordinate');
    }
}

function shipIsInsideBoard(shipRect, boardRect) {
    const inside = boardRect.right > shipRect.right - 20 && boardRect.bottom > shipRect.bottom - 30;
    return inside;
}

function shipCrossesOtherShip(shipRect) {
    const bot = placedShipsRectangles.some(ship => ship.bottom === shipRect.bottom);
    const top = placedShipsRectangles.some(ship => ship.top === shipRect.top);
    const right = placedShipsRectangles.some(ship => ship.right === shipRect.left);
    const left = placedShipsRectangles.some(ship => ship.left === shipRect.right);
    const verticalCrash = placedShipsRectangles.some(
        ship => ship.bottom >= shipRect.top && ship.top <= shipRect.bottom && (right || left),
    );
    const horizontalCrash = placedShipsRectangles.some(
        ship => ship.right >= shipRect.left && ship.left <= shipRect.right && (bot || top),
    );
    return { horizontalCrash, verticalCrash };
}

function biggestShipButtonEvents(boardNumber, Gameboard, boardRect) {
    const biggestShipInput = document.getElementById('biggest-ship');
    const placeBiggest = document.getElementById('place-biggest');
    const rotateBiggest = document.getElementById('rotate-biggest');
    const biggestShipQuantity = document.getElementById('biggest-quantity');

    biggestShipInput.focus();
    document.querySelector('.biggest-ship-container').classList.add('jello-horizontal');

    /* disable other inputs */
    document.getElementById('bigger-ship').disabled = true;
    document.getElementById('smaller-ship').disabled = true;
    document.getElementById('smallest-ship').disabled = true;
    // eslint-disable-next-line no-unused-vars
    let countBiggest = 0;

    biggestShipInput.addEventListener('input', function inputEvent() {
        const humanCells = document.querySelectorAll(`.gameboard-${boardNumber} .cell`);
        if (!test.test(biggestShipInput.value)) {
            biggestShipInput.setCustomValidity('Invalid coordinate');
        } else if (test.test(biggestShipInput.value)) {
            biggestShipInput.setCustomValidity('');
        }

        humanCells.forEach(cell => {
            if (cell.dataset.coordinate === biggestShipInput.value.toUpperCase()) {
                const pastShips = document.querySelectorAll(
                    `.gameboard-${boardNumber} .biggest-ship`,
                );
                pastShips.forEach(ship => ship.remove());
                const div = document.createElement('div');
                div.classList.add('ship-starting-point');
                div.classList.add('biggest-ship');
                cell.appendChild(div);

                checkShipPosition(biggestShipInput, div.getBoundingClientRect(), boardRect);
            }
        });
    });

    biggestShipInput.addEventListener('keyup', function keyUp(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            biggestShipInput.click();
        }
    });

    placeBiggest.addEventListener('click', function place(e) {
        e.preventDefault();

        if (test.test(biggestShipInput.value) && biggestShipInput.checkValidity()) {
            const biggestShip = document.querySelector(`.gameboard-${boardNumber} .biggest-ship`);
            const [letter, number] = biggestShipInput.value.toUpperCase();
            if (!biggestShip.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${letter}${parseInt(number) + 1}`;
                const thirdCoord = `${letter}${parseInt(number) + 2}`;
                const fourthCoord = `${letter}${parseInt(number) + 3}`;
                Gameboard.placeShip(firstCoord, secondCoord, thirdCoord, fourthCoord);
                datasetCoordinates(biggestShip, firstCoord, secondCoord, thirdCoord, fourthCoord);
                findShip(firstCoord, secondCoord, thirdCoord, fourthCoord, boardNumber);
            } else if (biggestShip.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${String.fromCharCode(
                    letter.charCodeAt(letter) + 1,
                )}${number}`;
                const thirdCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 2)}${number}`;
                const fourthCoord = `${String.fromCharCode(
                    letter.charCodeAt(letter) + 3,
                )}${number}`;
                Gameboard.placeShip(firstCoord, secondCoord, thirdCoord, fourthCoord);
                datasetCoordinates(biggestShip, firstCoord, secondCoord, thirdCoord, fourthCoord);
                findShip(firstCoord, secondCoord, thirdCoord, fourthCoord, boardNumber);
            }

            biggestShipInput.value = '';
            biggestShipInput.disabled = true;
            biggestShipQuantity.textContent = '1/1';
            biggestShipQuantity.style.color = 'green';
            rotateBiggest.disabled = true;
            countBiggest++;
            globalCounter++;
            document.querySelectorAll('.ship-container')[0].style.display = 'none';
            document.querySelectorAll('.ship-container')[1].style.display = 'flex';
            document.querySelectorAll('.ship-container')[1].classList.toggle('scale-in-hor-center');
            document.getElementById('bigger-ship').disabled = false;
            document.getElementById('bigger-ship').focus();
            placedShipsRectangles.push(biggestShip.getBoundingClientRect());
        }
    });

    rotateBiggest.addEventListener('click', function rotate(e) {
        e.preventDefault();
        const biggestShip = document.querySelector(`.gameboard-${boardNumber} .biggest-ship`);
        biggestShip.classList.toggle('rotated');
        biggestShipInput.focus();
        checkShipPosition(biggestShipInput, biggestShip.getBoundingClientRect(), boardRect);
    });
}

function biggerShipButtonEvents(boardNumber, Gameboard, boardRect) {
    const biggerShipInput = document.getElementById('bigger-ship');
    const placeBigger = document.getElementById('place-bigger');
    const rotateBigger = document.getElementById('rotate-bigger');
    const biggerShipQuantity = document.getElementById('bigger-quantity');
    let countBigger = 0;

    biggerShipInput.addEventListener('input', function inputEvent(e) {
        e.preventDefault();
        const humanCells = document.querySelectorAll(`.gameboard-${boardNumber} .cell`);
        if (!test.test(biggerShipInput.value)) {
            biggerShipInput.setCustomValidity('Invalid coordinate');
        } else if (test.test(biggerShipInput.value)) {
            biggerShipInput.setCustomValidity('');
        }
        humanCells.forEach(cell => {
            if (cell.dataset.coordinate === biggerShipInput.value.toUpperCase()) {
                const notCurrent = document.querySelector('.current') || 0;
                if (notCurrent) notCurrent.remove();

                const div = document.createElement('div');
                div.classList.add('ship-starting-point');
                div.classList.add('bigger-ship');
                div.classList.add('current');
                cell.appendChild(div);

                checkShipPosition(biggerShipInput, div.getBoundingClientRect(), boardRect);
            }
        });
    });

    biggerShipInput.addEventListener('keyup', function keyUp(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            placeBigger.click();
        }
    });

    placeBigger.addEventListener('click', function place(e) {
        e.preventDefault();
        const test = new RegExp('[A-Ha-h]{1}[1-8]');
        if (
            test.test(biggerShipInput.value) &&
            countBigger < 2 &&
            biggerShipInput.checkValidity()
        ) {
            const [letter, number] = biggerShipInput.value.toUpperCase();
            const current = document.querySelector('.bigger-ship.current');

            if (!current.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${letter}${parseInt(number) + 1}`;
                const thirdCoord = `${letter}${parseInt(number) + 2}`;
                Gameboard.placeShip(firstCoord, secondCoord, thirdCoord);
                datasetCoordinates(current, firstCoord, secondCoord, thirdCoord);
                findShip(firstCoord, secondCoord, thirdCoord, 'false', boardNumber);
            } else if (current.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${String.fromCharCode(
                    letter.charCodeAt(letter) + 1,
                )}${number}`;
                const thirdCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 2)}${number}`;
                Gameboard.placeShip(firstCoord, secondCoord, thirdCoord);
                datasetCoordinates(current, firstCoord, secondCoord, thirdCoord);
                findShip(firstCoord, secondCoord, thirdCoord, 'false', boardNumber);
            }

            biggerShipInput.value = '';
            biggerShipQuantity.textContent = `${++countBigger}/2`;
            current.classList.remove('current');
            biggerShipInput.focus();
            globalCounter++;
            placedShipsRectangles.push(current.getBoundingClientRect());
            if (countBigger === 2) {
                biggerShipInput.disabled = true;
                biggerShipQuantity.style.color = 'green';
                document.querySelectorAll('.ship-container')[1].style.display = 'none';
                document.querySelectorAll('.ship-container')[2].style.display = 'flex';
                document
                    .querySelectorAll('.ship-container')[2]
                    .classList.toggle('scale-in-hor-center');
                document.getElementById('smaller-ship').disabled = false;
                document.getElementById('smaller-ship').focus();
            }
        }
    });

    rotateBigger.addEventListener('click', function rotate(e) {
        e.preventDefault();
        const currentBigger = document.querySelector('.bigger-ship.current');
        currentBigger.classList.toggle('rotated');
        biggerShipInput.focus();
        checkShipPosition(biggerShipInput, currentBigger.getBoundingClientRect(), boardRect);
    });
}

function smallerShipButtonEvents(boardNumber, Gameboard, boardRect) {
    const smallerShipInput = document.getElementById('smaller-ship');
    const placeSmaller = document.getElementById('place-smaller');
    const rotateSmaller = document.getElementById('rotate-smaller');
    const smallerShipQuantity = document.getElementById('smaller-quantity');
    let countSmaller = 0;

    smallerShipInput.addEventListener('input', function inputEvent(e) {
        e.preventDefault();
        const humanCells = document.querySelectorAll(`.gameboard-${boardNumber} .cell`);
        if (!test.test(smallerShipInput.value)) {
            smallerShipInput.setCustomValidity('Invalid coordinate');
        } else if (test.test(smallerShipInput.value)) {
            smallerShipInput.setCustomValidity('');
        }
        humanCells.forEach(cell => {
            if (cell.dataset.coordinate === smallerShipInput.value.toUpperCase()) {
                const notCurrent = document.querySelector('.current') || 0;
                if (notCurrent) notCurrent.remove();

                const div = document.createElement('div');
                div.classList.add('ship-starting-point');
                div.classList.add('smaller-ship');
                div.classList.add('current');
                cell.appendChild(div);

                checkShipPosition(smallerShipInput, div.getBoundingClientRect(), boardRect);
            }
        });
    });

    smallerShipInput.addEventListener('keyup', function keyUp(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            placeSmaller.click();
        }
    });

    placeSmaller.addEventListener('click', function place(e) {
        e.preventDefault();
        const test = new RegExp('[A-Ha-h]{1}[1-8]');
        if (
            test.test(smallerShipInput.value) &&
            countSmaller < 3 &&
            smallerShipInput.checkValidity()
        ) {
            const [letter, number] = smallerShipInput.value.toUpperCase();
            const current = document.querySelector('.current');

            if (!current.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${letter}${parseInt(number) + 1}`;
                Gameboard.placeShip(firstCoord, secondCoord);
                datasetCoordinates(current, firstCoord, secondCoord);
                findShip(firstCoord, secondCoord, 'false', 'false', boardNumber);
            } else if (current.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${String.fromCharCode(
                    letter.charCodeAt(letter) + 1,
                )}${number}`;

                Gameboard.placeShip(firstCoord, secondCoord);
                datasetCoordinates(current, firstCoord, secondCoord);
                findShip(firstCoord, secondCoord, 'false', 'false', boardNumber);
            }

            smallerShipInput.value = '';
            smallerShipQuantity.textContent = `${++countSmaller}/3`;
            current.classList.remove('current');
            smallerShipInput.focus();
            globalCounter++;
            placedShipsRectangles.push(current.getBoundingClientRect());
            if (countSmaller === 3) {
                smallerShipInput.disabled = true;
                smallerShipQuantity.style.color = 'green';
                document.querySelectorAll('.ship-container')[2].style.display = 'none';
                document.querySelectorAll('.ship-container')[3].style.display = 'flex';
                document
                    .querySelectorAll('.ship-container')[3]
                    .classList.toggle('scale-in-hor-center');
                document.getElementById('smallest-ship').disabled = false;
                document.getElementById('smallest-ship').focus();
            }
        }
    });

    rotateSmaller.addEventListener('click', function rotate(e) {
        e.preventDefault();
        const currentSmaller = document.querySelector('.smaller-ship.current');
        currentSmaller.classList.toggle('rotated');
        smallerShipInput.focus();
        checkShipPosition(smallerShipInput, currentSmaller.getBoundingClientRect(), boardRect);
    });
}

function smallestShipButtonEvents(boardNumber, Gameboard, gameType, GameboardTwo) {
    const smallestShipInput = document.getElementById('smallest-ship');
    const placeSmallest = document.getElementById('place-smallest');
    const smallestShipQuantity = document.getElementById('smallest-quantity');
    let countSmallest = 0;

    smallestShipInput.addEventListener('input', function inputEvent(e) {
        e.preventDefault();
        const humanCells = document.querySelectorAll(`.gameboard-${boardNumber} .cell`);
        if (!test.test(smallestShipInput.value)) {
            smallestShipInput.setCustomValidity('Invalid coordinate');
        } else if (test.test(smallestShipInput.value)) {
            smallestShipInput.setCustomValidity('');
        }
        humanCells.forEach(cell => {
            if (cell.dataset.coordinate === smallestShipInput.value.toUpperCase()) {
                const notCurrent = document.querySelector('.current') || 0;
                if (notCurrent) notCurrent.remove();

                const div = document.createElement('div');
                div.classList.add('ship-starting-point');
                div.classList.add('smallest-ship');
                div.classList.add('current');
                cell.appendChild(div);
                if (cell.dataset.ship) {
                    smallestShipInput.setCustomValidity('Invalid coordinate');
                }
            }
        });
    });

    smallestShipInput.addEventListener('keyup', function keyUp(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            placeSmallest.click();
        }
    });

    placeSmallest.addEventListener('click', function place(e) {
        e.preventDefault();
        const test = new RegExp('[A-Ha-h]{1}[1-8]');
        if (
            test.test(smallestShipInput.value) &&
            countSmallest < 4 &&
            smallestShipInput.checkValidity()
        ) {
            const current = document.querySelector('.current');
            Gameboard.placeShip(smallestShipInput.value.toUpperCase());
            current.dataset.first = smallestShipInput.value;
            findShip(smallestShipInput.value, 'false', 'false', 'false', boardNumber);
            smallestShipInput.value = '';
            smallestShipQuantity.textContent = `${++countSmallest}/4`;
            current.classList.remove('current');
            smallestShipInput.focus();
            globalCounter++;
            placedShipsRectangles.push(current.getBoundingClientRect());

            if (countSmallest === 4) {
                smallestShipInput.disabled = true;
                smallestShipQuantity.style.color = 'green';
                document.getElementById('smallest-ship').blur();
                /* check logic */
                if (globalCounter === 10 && gameType === 'one-player') {
                    startGame();
                } else if (gameType === 'two-players' && GameboardTwo !== false) {
                    globalCounter = 0;
                    placedShipsRectangles.length = 0;
                    openCoverBlanket(true);
                    replaceOldFormWithNewOne();
                    clickOnCellsToTypeInput(); /* gameboards have 2 events */
                    addEventsToAllFormButtons('two', GameboardTwo, 'two-players');
                    hideGameboardTwo();
                } else if (
                    globalCounter === 10 &&
                    gameType === 'two-players' &&
                    GameboardTwo === false
                ) {
                    startTwoPlayers();
                }
            }
        }
    });
}

function datasetCoordinates(ship, first, second = false, third = false, fourth = false) {
    ship.dataset.first = first;
    if (second) ship.dataset.second = second;
    if (third) ship.dataset.third = third;
    if (fourth) ship.dataset.fourth = fourth;
}

function addEventsToAllFormButtons(boardNumber, Gameboard, gameType, GameboardTwo = false) {
    const board = document.querySelector(`.gameboard-${boardNumber}`);
    const boardRect = board.getBoundingClientRect();
    biggestShipButtonEvents(boardNumber, Gameboard, boardRect);
    biggerShipButtonEvents(boardNumber, Gameboard, boardRect);
    smallerShipButtonEvents(boardNumber, Gameboard, boardRect);
    smallestShipButtonEvents(boardNumber, Gameboard, gameType, GameboardTwo);
}

function clickOnCellsToTypeInput() {
    const allCells = document.querySelectorAll('.cell');
    const inputs = Array.from(document.querySelectorAll('.ship-container input'));

    allCells.forEach(cell => {
        cell.addEventListener('click', e => {
            const [enabledInput] = inputs.filter(input => input.disabled === false);
            enabledInput.value = e.target.dataset.coordinate;
            enabledInput.dispatchEvent(inputEvent);
            enabledInput.focus();
        });
    });
}

export { addEventsToAllFormButtons, clickOnCellsToTypeInput };
