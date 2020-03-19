function renderBoard(gameboard) {
    const board = document.querySelector(`.gameboard-${gameboard}`);
    for (let i = 1; i <= 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (i <= 8) {
            cell.dataset.coordinate = `A${i}`;
        } else if (i > 8 && i <= 16) {
            cell.dataset.coordinate = `B${i - 8}`;
        } else if (i > 16 && i <= 24) {
            cell.dataset.coordinate = `C${i - 16}`;
        } else if (i > 24 && i <= 32) {
            cell.dataset.coordinate = `D${i - 24}`;
        } else if (i > 32 && i <= 40) {
            cell.dataset.coordinate = `E${i - 32}`;
        } else if (i > 40 && i <= 48) {
            cell.dataset.coordinate = `F${i - 40}`;
        } else if (i > 48 && i <= 56) {
            cell.dataset.coordinate = `G${i - 48}`;
        } else if (i > 56 && i <= 64) {
            cell.dataset.coordinate = `H${i - 56}`;
        }
        board.appendChild(cell);
    }
}

export { renderBoard };
