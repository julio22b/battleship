const placedShipsRectangles = [];

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

export { checkShipPosition, placedShipsRectangles };
