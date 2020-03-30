import { Player, ComputerPlayer } from './Player';
import { Gameboard } from './Gameboard';
import { Game } from './Game';
import { renderBoard } from './renderBoard';
import { renderShips } from './renderShips';
import { hideStartScreen, showMainScreen, openShipPlacements } from './changeScreenFuncs';
import { clickOnCellsToTypeInput } from './formButtons';
import { updateSunkShipsCounters } from './DOMutils';

const computerPlacementChoices = [
    [
        ['A3', 'A4', 'A5', 'A6'],
        ['CD', 'D2', 'E2'],
        ['H5', 'H6', 'H7'],
        ['D7', 'D8'],
        ['A1', 'B1'],
        ['G1', 'G2'],
        ['C5'],
        ['F8'],
        ['H3'],
        ['F5'],
    ],
    [
        ['E2', 'F2', 'G2', 'H2'],
        ['B5', 'B6', 'B7'],
        ['F6', 'F7', 'F8'],
        ['A2', 'A3'],
        ['C3', 'D3'],
        ['H5', 'H6'],
        ['C1'],
        ['D5'],
        ['D7']['F4'],
    ],
    [
        ['D8', 'E8', 'F8', 'G8'],
        ['A6', 'A7', 'A8'],
        ['H5', 'H6', 'H7'],
        ['A2', 'A3'],
        ['C1', 'D1'],
        ['F1', 'G1'],
        ['D3'],
        ['D6'],
        ['F3'],
        ['F6'],
    ],
    [
        ['B3', 'C3', 'D3', 'E3'],
        ['G2', 'G3', 'G4'],
        ['B5', 'B6', 'B7'],
        ['D5', 'E5'],
        ['F6', 'F7'],
        ['H7', 'H8'],
        ['A4'],
        ['B1'],
        ['E1'],
        ['D8'],
    ],
    [
        ['C1', 'D1', 'E1', 'F1'],
        ['C6', 'C7', 'C8'],
        ['F6', 'F7', 'F8'],
        ['A4', 'A5'],
        ['H4', 'H5'],
        ['D6', 'E6'],
        ['C3'],
        ['D4'],
        ['E4'],
        ['F3'],
    ],
];

const computerChoice = computerPlacementChoices[Math.floor(Math.random() * (4 + 1))];

function onePlayerGame() {
    hideStartScreen();
    showMainScreen();

    renderBoard('one');
    renderBoard('two');

    const Human = Player();
    const HumanGameboard = Gameboard();
    const Computer = ComputerPlayer();
    const ComputerGameboard = Gameboard();

    computerChoice.forEach(ship => {
        ComputerGameboard.placeShip(...ship);
        console.log(...ship);
    });

    renderShips(ComputerGameboard, 'two');
    playerPlay(Human, ComputerGameboard, Computer, HumanGameboard);

    openShipPlacements();
    clickOnCellsToTypeInput();

    return { Human, HumanGameboard, Computer, ComputerGameboard };
}

function playerPlay(Human, ComputerGameboard, Computer, HumanGameboard) {
    const computerCells = document.querySelectorAll('.gameboard-two .cell');

    computerCells.forEach(cell => {
        cell.addEventListener('click', e => {
            if (!e.target.dataset.hit && !e.target.classList.contains('disabled')) {
                Human.sendAttack(ComputerGameboard, e.target.dataset.coordinate);
                computerCells.forEach(cell => cell.classList.add('disabled'));
                if (!e.target.dataset.ship && Human.getPlayerTurn()) {
                    e.target.classList.add('sea');
                    cell.dataset.hit = 'true';

                    Human.setPlayerTurn(false);
                    Computer.playerTurn = true;
                    setTimeout(() => {
                        computerPlay(Computer, HumanGameboard, Human);
                        computerCells.forEach(cell => cell.classList.remove('disabled'));
                    }, 1000);
                } else if (
                    e.target.dataset.ship &&
                    Human.getPlayerTurn() &&
                    !e.target.dataset.hit
                ) {
                    e.target.classList.add('explosion');
                    cell.dataset.hit = 'true';
                    computerCells.forEach(cell => cell.classList.remove('disabled'));
                    updateSunkShipsCounters(ComputerGameboard, 'player2');
                }
                if (ComputerGameboard.allShipsSunk()) {
                    Game.GameOver('Human');
                    computerCells.forEach(cell => {
                        cell.classList.add('disabled');
                    });
                }
            }
        });
    });
}

function computerPlay(Computer, HumanGameboard, Human, attackThis = false) {
    const humanCells = document.querySelectorAll('.gameboard-one .cell');
    const computerCells = document.querySelectorAll('.gameboard-two .cell');
    const randomCoord = attackThis || Computer.randomCoordinate();
    Computer.sendAttack(HumanGameboard, randomCoord);

    humanCells.forEach(cell => {
        if (!cell.classList.contains('disabled')) {
            if (cell.dataset.coordinate === randomCoord && cell.dataset.ship && !cell.dataset.hit) {
                cell.classList.add('explosion');
                cell.dataset.hit = 'true';
                Human.setPlayerTurn(false);
                updateSunkShipsCounters(HumanGameboard, 'player1');
                setTimeout(() => {
                    computerPlay(
                        Computer,
                        HumanGameboard,
                        Human,
                        computerSuccessiveHits(randomCoord, cell),
                    );
                }, 500);
                return;
            } else if (!cell.dataset.ship && cell.dataset.coordinate === randomCoord) {
                cell.classList.add('sea');
                cell.dataset.hit = 'true';
            }
        }

        if (HumanGameboard.allShipsSunk()) {
            Game.GameOver('Computer');
            computerCells.forEach(cell => {
                cell.classList.add('disabled');
            });
        }
    });

    Human.setPlayerTurn(true);
}

function computerSuccessiveHits(randomCoord, attackedCell) {
    const humanShipsDivs = document.querySelectorAll('.ship-starting-point');
    const humanCells = document.querySelectorAll('.gameboard-one .cell');
    let [letter, number] = randomCoord;
    let [letterTwo, numberTwo] = randomCoord;

    humanShipsDivs.forEach(ship => {
        if (
            attackedCell.dataset.ship &&
            (ship.dataset.first === attackedCell.dataset.coordinate ||
                ship.dataset.second === attackedCell.dataset.coordinate ||
                ship.dataset.third === attackedCell.dataset.coordinate ||
                ship.dataset.fourth === attackedCell.dataset.coordinate)
        ) {
            if (ship.classList.contains('rotated') && letter < `H`) {
                letter = String.fromCharCode(letter.charCodeAt(letter) + 1);
            } else if (!ship.classList.contains('rotated') && number < 8) {
                number = parseInt(number) + 1;
            }
        }
    });

    humanShipsDivs.forEach(ship => {
        if (
            attackedCell.dataset.ship &&
            (ship.dataset.first === attackedCell.dataset.coordinate ||
                ship.dataset.second === attackedCell.dataset.coordinate ||
                ship.dataset.third === attackedCell.dataset.coordinate ||
                ship.dataset.fourth === attackedCell.dataset.coordinate)
        ) {
            if (ship.classList.contains('rotated') && letter > 'A') {
                letterTwo = String.fromCharCode(letterTwo.charCodeAt(letterTwo) - 1);
            } else if (!ship.classList.contains('rotated') && numberTwo > 1) {
                numberTwo = parseInt(numberTwo) - 1;
            }
        }
    });

    const attackRightOrBot = `${letter}${number}`;
    const attackLeftOrTop = `${letterTwo}${numberTwo}`;

    const cellToAttackRightOrBot = Array.from(humanCells).find(
        cell => cell.dataset.coordinate === attackRightOrBot,
    );
    const cellToAttackLeftOrTop = Array.from(humanCells).find(
        cell => cell.dataset.coordinate === attackLeftOrTop,
    );

    let successiveHit;

    if (cellToAttackRightOrBot.dataset.hit) {
        if (!cellToAttackLeftOrTop.dataset.hit) {
            successiveHit = `${letterTwo}${numberTwo}`;
            return successiveHit;
        } else {
            successiveHit = false;
            console.log(successiveHit);
            return successiveHit;
        }
    } else if (!cellToAttackRightOrBot.dataset.hit) {
        successiveHit = `${letter}${number}`;
        console.log(successiveHit);
        return successiveHit;
    }
}

export { onePlayerGame };
