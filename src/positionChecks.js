const placedShipsRectangles = [];

function checkShipPosition(shipInput, shipRect, boardRect, boardNumber) {
    const inBoard = shipIsInsideBoard(shipRect, boardRect, boardNumber);
    const { horizontalCrash, verticalCrash } = shipCrossesOtherShip(shipRect);
    if (inBoard && !(horizontalCrash || verticalCrash)) {
        shipInput.setCustomValidity('');
    } else if (!inBoard || horizontalCrash || verticalCrash) {
        shipInput.setCustomValidity('Invalid coordinate');
    }
}

function shipIsInsideBoard(shipRect, boardRect, boardNumber = false) {
    if (boardNumber === 'two') {
        const inside =
            boardRect.right > shipRect.right - 5 && boardRect.bottom / 2 > shipRect.bottom - 5;
        console.log(boardRect.bottom, shipRect.bottom - 5);
        console.log(inside);
        return inside;
    } else {
        const inside =
            boardRect.right > shipRect.right - 5 && boardRect.bottom > shipRect.bottom - 5;
        console.log(boardRect.bottom, shipRect.bottom - 5);
        console.log(inside);
        return inside;
    }
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

export { checkShipPosition, placedShipsRectangles };
