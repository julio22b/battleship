import { Player, ComputerPlayer } from './Player';
import { Gameboard } from './Gameboard';
import { Game } from './Game';
import { renderBoard } from './renderBoard';
import { renderShips } from './renderShips';
import { hideStartScreen, showMainScreen, openShipPlacements } from './changeScreenFuncs';
import { clickOnCellsToTypeInput } from './formButtons';
import { updateSunkShipsCounters } from './DOMutils';
import { computerPlacementChoices } from './computerChoices';

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
