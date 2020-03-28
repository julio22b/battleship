import { Gameboard } from './Gameboard';
import { Player } from './Player';
import {
    hideStartScreen,
    showMainScreen,
    openShipPlacements,
    switchVisibilityOfShips,
    changeTurn,
} from './changeScreenFuncs';
import { renderBoard } from './renderBoard';
import { updateSunkShipsCounters } from './DOMutils';
import { Game } from './Game';

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

    playerOnePlay(JackAubrey, HackFinch, FinchGameboard);
    playerTwoPlay(HackFinch, JackAubrey, AubreyGameboard);

    return { JackAubrey, HackFinch, AubreyGameboard, FinchGameboard };
}

function playerOnePlay(PlayerOne, PlayerTwo, PlayerTwoGameboard) {
    const playerOneCells = document.querySelectorAll('.gameboard-one .cell');
    const playerTwoCells = document.querySelectorAll('.gameboard-two .cell');

    playerTwoCells.forEach(cell => {
        cell.addEventListener('click', e => {
            if (!e.target.dataset.hit && !e.target.classList.contains('disabled')) {
                PlayerOne.sendAttack(PlayerTwoGameboard, e.target.dataset.coordinate);
                playerTwoCells.forEach(cell => cell.classList.add('disabled'));
                if (!e.target.dataset.ship && PlayerOne.getPlayerTurn()) {
                    e.target.classList.add('sea');
                    cell.dataset.hit = 'true';
                    PlayerOne.setPlayerTurn(false);
                    PlayerTwo.setPlayerTurn(true);
                    playerOneCells.forEach(cell => cell.classList.remove('disabled'));
                    setTimeout(() => {
                        changeTurn('one', 0);
                        changeTurn('two', 1, 'Hack Finch');
                    }, 1000);
                } else if (
                    e.target.dataset.ship &&
                    PlayerOne.getPlayerTurn() &&
                    !e.target.dataset.hit
                ) {
                    e.target.classList.add('explosion');
                    cell.dataset.hit = 'true';
                    playerTwoCells.forEach(cell => cell.classList.remove('disabled'));
                    updateSunkShipsCounters(PlayerTwoGameboard, 'player2');
                }
                if (PlayerTwoGameboard.allShipsSunk()) {
                    Game.GameOver('Jack Aubrey');
                    document
                        .querySelectorAll('.cell')
                        .forEach(cell => cell.classList.add('disabled'));
                }
            }
        });
    });
}

function playerTwoPlay(PlayerTwo, PlayerOne, PlayerOneGameboard) {
    const playerOneCells = document.querySelectorAll('.gameboard-one .cell');
    const playerTwoCells = document.querySelectorAll('.gameboard-two .cell');

    playerOneCells.forEach(cell => {
        cell.addEventListener('click', e => {
            if (!e.target.dataset.hit && !e.target.classList.contains('disabled')) {
                PlayerTwo.sendAttack(PlayerOneGameboard, e.target.dataset.coordinate);
                playerOneCells.forEach(cell => cell.classList.add('disabled'));
                if (!e.target.dataset.ship && PlayerTwo.getPlayerTurn()) {
                    e.target.classList.add('sea');
                    cell.dataset.hit = 'true';
                    PlayerTwo.setPlayerTurn(false);
                    PlayerOne.setPlayerTurn(true);
                    playerTwoCells.forEach(cell => cell.classList.remove('disabled'));
                    setTimeout(() => {
                        changeTurn('two', 0);
                        changeTurn('one', 1, 'Jack Aubrey');
                    }, 1000);
                } else if (
                    e.target.dataset.ship &&
                    PlayerTwo.getPlayerTurn() &&
                    !e.target.dataset.hit
                ) {
                    e.target.classList.add('explosion');
                    cell.dataset.hit = 'true';
                    playerOneCells.forEach(cell => cell.classList.remove('disabled'));
                    updateSunkShipsCounters(PlayerOneGameboard, 'player1');
                }
                if (PlayerOneGameboard.allShipsSunk()) {
                    Game.GameOver('Hack Finch');
                    document
                        .querySelectorAll('.cell')
                        .forEach(cell => cell.classList.add('disabled'));
                }
            }
        });
    });
}

function playerNames() {
    document.querySelector('#player-one-name').textContent = 'Captain Jack Aubrey';
    document.querySelector('#player-two-name').textContent = 'Captain Hack Finch';
}

export { twoPlayersGame };
