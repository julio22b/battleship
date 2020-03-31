function checkShipPosition(
    shipInput,
    shipRect,
    boardRect,
    boardNumber,
    letter,
    number,
    shipLength,
    rotated,
) {
    const inBoard = shipIsInsideBoard(shipRect, boardRect, boardNumber);
    const crash = shipCrossesOtherShip(letter, number, shipLength, boardNumber, rotated);
    if (inBoard && !crash) {
        shipInput.setCustomValidity('');
    } else if (!inBoard || crash) {
        shipInput.setCustomValidity('Invalid coordinate');
    }
}

function shipIsInsideBoard(shipRect, boardRect) {
    const inside = boardRect.right > shipRect.right - 5 && boardRect.bottom > shipRect.bottom - 5;
    return inside;
}

function shipCrossesOtherShip(letter, number, shipLength, boardNumber, rotated) {
    const gameboardCells = Array.from(document.querySelectorAll(`.gameboard-${boardNumber} .cell`));
    const shipPartsCells = gameboardCells.filter(cell => cell.dataset.ship);
    let crash = false;
    if (!rotated) {
        const { firstCoord, secondCoord, thirdCoord, fourthCoord } = getNonRotatedCoords(
            letter,
            number,
            shipLength,
        );

        crash = shipPartsCells.some(
            cell =>
                cell.dataset.coordinate === firstCoord ||
                cell.dataset.coordinate === secondCoord ||
                cell.dataset.coordinate === thirdCoord ||
                cell.dataset.coordinate === fourthCoord,
        );
    } else if (rotated) {
        const { firstCoord, secondCoord, thirdCoord, fourthCoord } = getRotatedCoords(
            letter,
            number,
            shipLength,
        );
        crash = shipPartsCells.some(
            cell =>
                cell.dataset.coordinate === firstCoord ||
                cell.dataset.coordinate === secondCoord ||
                cell.dataset.coordinate === thirdCoord ||
                cell.dataset.coordinate === fourthCoord,
        );
    }
    return crash;
}

function getRotatedCoords(letter, number, shipLength) {
    if (shipLength === 4) {
        const firstCoord = `${letter}${number}`;
        const secondCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 1)}${number}`;
        const thirdCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 2)}${number}`;
        const fourthCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 3)}${number}`;
        return { firstCoord, secondCoord, thirdCoord, fourthCoord };
    } else if (shipLength === 3) {
        const firstCoord = `${letter}${number}`;
        const secondCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 1)}${number}`;
        const thirdCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 2)}${number}`;
        const fourthCoord = false;
        return { firstCoord, secondCoord, thirdCoord, fourthCoord };
    } else if (shipLength === 2) {
        const firstCoord = `${letter}${number}`;
        const secondCoord = `${String.fromCharCode(letter.charCodeAt(letter) + 1)}${number}`;
        const thirdCoord = false;
        const fourthCoord = false;
        return { firstCoord, secondCoord, thirdCoord, fourthCoord };
    }
}

function getNonRotatedCoords(letter, number, shipLength) {
    if (shipLength === 4) {
        const firstCoord = `${letter}${number}`;
        const secondCoord = `${letter}${parseInt(number) + 1}`;
        const thirdCoord = `${letter}${parseInt(number) + 2}`;
        const fourthCoord = `${letter}${parseInt(number) + 3}`;
        return { firstCoord, secondCoord, thirdCoord, fourthCoord };
    } else if (shipLength === 3) {
        const firstCoord = `${letter}${number}`;
        const secondCoord = `${letter}${parseInt(number) + 1}`;
        const thirdCoord = `${letter}${parseInt(number) + 2}`;
        const fourthCoord = false;
        return { firstCoord, secondCoord, thirdCoord, fourthCoord };
    } else if (shipLength === 2) {
        const firstCoord = `${letter}${number}`;
        const secondCoord = `${letter}${parseInt(number) + 1}`;
        const thirdCoord = false;
        const fourthCoord = false;
        return { firstCoord, secondCoord, thirdCoord, fourthCoord };
    }
}

export { checkShipPosition, getRotatedCoords, getNonRotatedCoords };
