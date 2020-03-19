import { startGame } from "./changeScreenFuncs";

const test = new RegExp('[A-Ha-h]{1}[1-8]');
const placedShipsRectangles = [];

let globalCounter = 0;

function findShip(firstCoord, secondCoord = 'false', thirdCoord = 'false', fourthCoord = 'false') {
    const humanCells = document.querySelectorAll('.gameboard-one .cell');

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
    const inside = boardRect.right > shipRect.right - 30 && boardRect.bottom > shipRect.bottom - 50;
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

function biggestShipButtonEvents(game) {
    const gameboardOne = document.querySelector('.gameboard-one');
    const boardRect = gameboardOne.getBoundingClientRect();
    const biggestShipInput = document.getElementById('biggest-ship');
    const placeBiggest = document.getElementById('place-biggest');
    const rotateBiggest = document.getElementById('rotate-biggest');
    const biggestShipQuantity = document.getElementById('biggest-quantity');

    biggestShipInput.classList.add('jello-horizontal');
    biggestShipInput.focus();
    document.querySelector('.biggest-ship-container').classList.add('jello-horizontal');

    /* disable other inputs */
    document.getElementById('bigger-ship').disabled = true;
    document.getElementById('smaller-ship').disabled = true;
    document.getElementById('smallest-ship').disabled = true;
    // eslint-disable-next-line no-unused-vars
    let countBiggest = 0;

    biggestShipInput.addEventListener('input', () => {
        const humanCells = document.querySelectorAll('.gameboard-one .cell');
        if (!test.test(biggestShipInput.value)) {
            biggestShipInput.setCustomValidity('Invalid coordinate');
        } else if (test.test(biggestShipInput.value)) {
            biggestShipInput.setCustomValidity('');
        }

        humanCells.forEach(cell => {
            if (cell.dataset.coordinate === biggestShipInput.value.toUpperCase()) {
                const pastShips = document.querySelectorAll('.biggest-ship');
                pastShips.forEach(ship => ship.remove());
                const div = document.createElement('div');
                div.classList.add('ship-starting-point');
                div.classList.add('biggest-ship');
                cell.appendChild(div);

                checkShipPosition(biggestShipInput, div.getBoundingClientRect(), boardRect);
            }
        });
    });

    biggestShipInput.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            biggestShipInput.click();
        }
    });

    placeBiggest.addEventListener('click', e => {
        e.preventDefault();

        if (test.test(biggestShipInput.value) && biggestShipInput.checkValidity()) {
            const biggestShip = document.querySelector('.biggest-ship');
            const [letter, number] = biggestShipInput.value.toUpperCase();
            if (!biggestShip.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${letter}${parseInt(number) + 1}`;
                const thirdCoord = `${letter}${parseInt(number) + 2}`;
                const fourthCoord = `${letter}${parseInt(number) + 3}`;
                game.HumanGameboard.placeShip(firstCoord, secondCoord, thirdCoord, fourthCoord);
                biggestShip.dataset.first = firstCoord;
                biggestShip.dataset.second = secondCoord;
                biggestShip.dataset.third = thirdCoord;
                biggestShip.dataset.fourth = fourthCoord;
                findShip(firstCoord, secondCoord, thirdCoord, fourthCoord);
            } else if (biggestShip.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${String.fromCharCode(
                    letter.charCodeAt(letter) + 1,
                )}${number}`;
                const thirdCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 2)}${number}`;
                const fourthCoord = `${String.fromCharCode(
                    letter.charCodeAt(letter) + 3,
                )}${number}`;
                game.HumanGameboard.placeShip(firstCoord, secondCoord, thirdCoord, fourthCoord);
                biggestShip.dataset.first = firstCoord;
                biggestShip.dataset.second = secondCoord;
                biggestShip.dataset.third = thirdCoord;
                biggestShip.dataset.fourth = fourthCoord;
                findShip(firstCoord, secondCoord, thirdCoord, fourthCoord);
            }

            biggestShipInput.value = '';
            biggestShipInput.disabled = true;
            biggestShipQuantity.textContent = '1/1';
            biggestShipQuantity.style.color = 'green';
            rotateBiggest.disabled = true;
            countBiggest++;
            globalCounter++;
            document.querySelectorAll('.ship-container')[0].style.display = 'none';
            document.querySelectorAll('.ship-container')[1].classList.add('scale-in-hor-center');
            document.getElementById('bigger-ship').disabled = false;
            document.getElementById('bigger-ship').focus();
            placedShipsRectangles.push(biggestShip.getBoundingClientRect());
        }
    });

    rotateBiggest.addEventListener('click', e => {
        e.preventDefault();
        const biggestShip = document.querySelector('.biggest-ship');
        biggestShip.classList.toggle('rotated');
        biggestShipInput.focus();

        checkShipPosition(biggestShipInput, biggestShip.getBoundingClientRect(), boardRect);
    });
}

function biggerShipButtonEvents(game) {
    const gameboardOne = document.querySelector('.gameboard-one');
    const boardRect = gameboardOne.getBoundingClientRect();
    const biggerShipInput = document.getElementById('bigger-ship');
    const placeBigger = document.getElementById('place-bigger');
    const rotateBigger = document.getElementById('rotate-bigger');
    const biggerShipQuantity = document.getElementById('bigger-quantity');
    let countBigger = 0;

    biggerShipInput.addEventListener('input', e => {
        e.preventDefault();
        const humanCells = document.querySelectorAll('.gameboard-one .cell');
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

    biggerShipInput.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            placeBigger.click();
        }
    });

    placeBigger.addEventListener('click', e => {
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
                game.HumanGameboard.placeShip(firstCoord, secondCoord, thirdCoord);
                current.dataset.first = firstCoord;
                current.dataset.second = secondCoord;
                current.dataset.third = thirdCoord;
                findShip(firstCoord, secondCoord, thirdCoord);
            } else if (current.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${String.fromCharCode(
                    letter.charCodeAt(letter) + 1,
                )}${number}`;
                const thirdCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 2)}${number}`;
                game.HumanGameboard.placeShip(firstCoord, secondCoord, thirdCoord);
                current.dataset.first = firstCoord;
                current.dataset.second = secondCoord;
                current.dataset.third = thirdCoord;
                findShip(firstCoord, secondCoord, thirdCoord);
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
                document
                    .querySelectorAll('.ship-container')[2]
                    .classList.add('scale-in-hor-center');
                document.getElementById('smaller-ship').disabled = false;
                document.getElementById('smaller-ship').focus();
            }
        }
    });

    rotateBigger.addEventListener('click', e => {
        e.preventDefault();
        const currentBigger = document.querySelector('.bigger-ship.current');
        currentBigger.classList.toggle('rotated');
        biggerShipInput.focus();

        checkShipPosition(biggerShipInput, currentBigger.getBoundingClientRect(), boardRect);
    });
}

function smallerShipButtonEvents(game) {
    const gameboardOne = document.querySelector('.gameboard-one');
    const boardRect = gameboardOne.getBoundingClientRect();
    const smallerShipInput = document.getElementById('smaller-ship');
    const placeSmaller = document.getElementById('place-smaller');
    const rotateSmaller = document.getElementById('rotate-smaller');
    const smallerShipQuantity = document.getElementById('smaller-quantity');
    let countSmaller = 0;

    smallerShipInput.addEventListener('input', e => {
        e.preventDefault();
        const humanCells = document.querySelectorAll('.gameboard-one .cell');
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

    smallerShipInput.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            placeSmaller.click();
        }
    });

    placeSmaller.addEventListener('click', e => {
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
                game.HumanGameboard.placeShip(firstCoord, secondCoord);
                current.dataset.first = firstCoord;
                current.dataset.second = secondCoord;
                findShip(firstCoord, secondCoord);
            } else if (current.classList.contains('rotated')) {
                const firstCoord = `${letter}${number}`;
                const secondCoord = `${String.fromCharCode(
                    letter.charCodeAt(letter) + 1,
                )}${number}`;

                game.HumanGameboard.placeShip(firstCoord, secondCoord);
                current.dataset.first = firstCoord;
                current.dataset.second = secondCoord;
                findShip(firstCoord, secondCoord);
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
                document
                    .querySelectorAll('.ship-container')[3]
                    .classList.add('scale-in-hor-center');
                document.getElementById('smallest-ship').disabled = false;
                document.getElementById('smallest-ship').focus();
            }
        }
    });

    rotateSmaller.addEventListener('click', e => {
        e.preventDefault();
        const currentSmaller = document.querySelector('.smaller-ship.current');
        currentSmaller.classList.toggle('rotated');
        smallerShipInput.focus();

        checkShipPosition(smallerShipInput, currentSmaller.getBoundingClientRect(), boardRect);
    });
}

function smallestShipButtonEvents(game) {
    const smallestShipInput = document.getElementById('smallest-ship');
    const placeSmallest = document.getElementById('place-smallest');
    const smallestShipQuantity = document.getElementById('smallest-quantity');
    let countSmallest = 0;

    smallestShipInput.addEventListener('input', e => {
        e.preventDefault();
        const humanCells = document.querySelectorAll('.gameboard-one .cell');
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
            }
        });
    });

    smallestShipInput.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            placeSmallest.click();
        }
    });

    placeSmallest.addEventListener('click', e => {
        e.preventDefault();
        const test = new RegExp('[A-Ha-h]{1}[1-8]');
        if (
            test.test(smallestShipInput.value) &&
            countSmallest < 4 &&
            smallestShipInput.checkValidity()
        ) {
            const current = document.querySelector('.current');
            game.HumanGameboard.placeShip(smallestShipInput.value.toUpperCase());
            current.dataset.first = smallestShipInput.value;
            findShip(smallestShipInput.value.toUpperCase());
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
                if (globalCounter === 10) startGame();
            }
        }
    });
}

function addEventsToAllFormButtons(game) {
    biggestShipButtonEvents(game);
    biggerShipButtonEvents(game);
    smallerShipButtonEvents(game);
    smallestShipButtonEvents(game);
}

export { addEventsToAllFormButtons };
