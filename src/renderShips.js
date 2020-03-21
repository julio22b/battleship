/* write this in a better way */

function renderShips(gameboard, gameboardClassNumber) {
    const allBoardCells = Array.from(
        document.querySelectorAll(`.gameboard-${gameboardClassNumber} .cell`),
    );
    const gameboardBattleships = gameboard.getBattleships();
    const shipCoordinates = gameboardBattleships.map(battleship => battleship.getShipCoordinates());
    const coordsToColor = [];

    for (let i = 0; i < shipCoordinates.length; i++) {
        for (let j = 0; j < shipCoordinates[i].length; j++) {
            coordsToColor.push(shipCoordinates[i][j]);
        }
    }
    const shipCells = [];
    for (let i = 0; i < allBoardCells.length; i++) {
        for (let j = 0; j < coordsToColor.length; j++) {
            if (allBoardCells[i].dataset.coordinate === coordsToColor[j]) {
                shipCells.push(allBoardCells[i]);
            }
        }
    }

    shipCells.forEach(cell => {
        cell.classList.add('ship');
        cell.dataset.ship = 'ship-part';
    });
}

export { renderShips };
