import { Gameboard } from './Gameboard';
import { Player } from './Player';
import { hideStartScreen, showMainScreen, openShipPlacements } from './changeScreenFuncs';
import { renderBoard } from './renderBoard';
import { clickOnCellsToTypeInput } from './formButtons';

function twoPlayersGame() {
    hideStartScreen();
    showMainScreen();

    renderBoard('one');
    renderBoard('two');

    openShipPlacements();
    playerNames();

    const JackAubrey = Player();
    const HackFinch = Player();
    const AubreyGameboard = Gameboard();
    const FinchGameboard = Gameboard();

    clickOnCellsToTypeInput();

    return { JackAubrey, HackFinch, AubreyGameboard, FinchGameboard };
}

function playerNames() {
    document.querySelector('#player-one-name').textContent = 'Captain Jack Aubrey';
    document.querySelector('#player-two-name').textContent = 'Captain Hack Finch';
}

export { twoPlayersGame };
