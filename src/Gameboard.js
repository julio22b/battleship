import { Ship } from './Ship';

const Gameboard = () => {
    const battleships = [];
    const missedShots = [];

    const getBattleships = () => battleships;
    const getMissedShots = () => missedShots;

    const placeShip = (...coordinates) => {
        const battleship = Ship(coordinates);
        battleships.push(battleship);
    };

    const receiveAttack = coordinate => {
        const attackedShip = battleships.find(battleship =>
            battleship.getShipCoordinates().includes(coordinate),
        );
        if (!attackedShip) {
            missedShots.push(coordinate);
        } else {
            attackedShip.hit(attackedShip.getShipCoordinates().indexOf(coordinate));
        }
    };

    const allShipsSunk = () => {
        const allSunk = battleships.map(battleship => battleship.isSunk());
        return allSunk.every(el => el === true);
    };
    return { getMissedShots, getBattleships, receiveAttack, placeShip, allShipsSunk };
};

export { Gameboard };
