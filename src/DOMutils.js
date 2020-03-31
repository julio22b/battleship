function updateSunkShipsCounters(Gameboard, playerId) {
    const biggestSunkCount = document.querySelector(`#${playerId}-sunk-ships .biggest-sunk`);
    const biggerSunkCount = document.querySelector(`#${playerId}-sunk-ships .bigger-sunk`);
    const smallerSunkCount = document.querySelector(`#${playerId}-sunk-ships .smaller-sunk`);
    const smallestSunkCount = document.querySelector(`#${playerId}-sunk-ships .smallest-sunk`);
    const figures = document.querySelectorAll(`#${playerId}-sunk-ships figure`);
    const gameboardShips = Gameboard.getBattleships();
    const sunkShips = gameboardShips.filter(ship => {
        if (ship.isSunk()) return ship;
    });

    figures.forEach(figure => figure.classList.remove('blink-1'));

    sunkShips.forEach(ship => {
        if (ship.updated === false) {
            if (ship.getShipCoordinates().length === 1) {
                setTimeout(() => {
                    figures[3].classList.add('blink-1');
                }, 250);
            } else if (ship.getShipCoordinates().length === 2) {
                figures[2].classList.add('blink-1');
            } else if (ship.getShipCoordinates().length === 3) {
                figures[1].classList.add('blink-1');
            } else if (ship.getShipCoordinates().length === 4) {
                figures[0].classList.add('blink-1');
            }
            ship.updated = true;
        }
    });
    let biggest = 0;
    let bigger = 0;
    let smaller = 0;
    let smallest = 0;
    /* removed blink-1 animation cause didn't know how to fix it running every time*/

    const sunkShipsCoordinates = sunkShips.map(ship => ship.getShipCoordinates());
    sunkShipsCoordinates.forEach(ship => {
        if (ship.length === 1) {
            smallest++;
            smallestSunkCount.textContent = `${smallest}/4`;
            if (smallest === 4) figures[3].classList.add('all-sunk');
        } else if (ship.length === 2) {
            smaller++;
            smallerSunkCount.textContent = `${smaller}/3`;
            if (smaller === 3) figures[2].classList.add('all-sunk');
        } else if (ship.length === 3) {
            bigger++;
            biggerSunkCount.textContent = `${bigger}/2`;
            if (bigger === 2) figures[1].classList.add('all-sunk');
        } else if (ship.length === 4) {
            biggest++;
            biggestSunkCount.textContent = `${biggest}/1`;
            if (biggest === 1) figures[0].classList.add('all-sunk');
        }
    });
}

function disableAllCells() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.add('disabled'));
}

function enableGbTwoCells() {
    const cells = document.querySelectorAll('.gameboard-two .cell');
    cells.forEach(cell => cell.classList.remove('disabled'));
}

export { updateSunkShipsCounters, disableAllCells, enableGbTwoCells };
