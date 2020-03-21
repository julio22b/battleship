/* eslint-disable no-undef */
import { Gameboard } from './Gameboard';

const One = Gameboard();

test('gameboard One places ships', () => {
    One.placeShip('A2', 'A3', 'A4');
    const battleships = One.getBattleships();
    expect(battleships[0].getShipCoordinates()).toEqual(['A2', 'A3', 'A4']);

    One.placeShip('B5', 'B6');
    expect(battleships[1].getShipCoordinates()).toEqual(['B5', 'B6']);
});

const Two = Gameboard();

test('gameboard Two places ships', () => {
    Two.placeShip('C1', 'D1', 'E1');
    const battleships = Two.getBattleships();
    expect(battleships[0].getShipCoordinates()).toEqual(['C1', 'D1', 'E1']);

    Two.placeShip('C6');
    expect(battleships[1].getShipCoordinates()).toEqual(['C6']);
});

test('gameboard One receives an attack', () => {
    One.placeShip('D5', 'D6');
    One.receiveAttack('D5');
    const battleships = One.getBattleships();
    expect(battleships[2].getShipCoordinates()).toEqual(['hit', 'D6']);
});

test('gameboard One keeps track of missed hots', () => {
    One.receiveAttack('E2');
    One.receiveAttack('A8');
    const missedShotsOne = One.getMissedShots();
    expect(missedShotsOne[0]).toBe('E2');
    expect(missedShotsOne[1]).toBe('A8');
});

test('gameboard One reports that not all ships have been sunk', () => {
    expect(One.allShipsSunk()).toBe(false);
});

test('gameboard One reports that all ships have been sunk', () => {
    One.receiveAttack('A2');
    One.receiveAttack('A3');
    One.receiveAttack('A4');
    One.receiveAttack('B5');
    One.receiveAttack('B6');
    One.receiveAttack('D5');
    One.receiveAttack('D6');

    expect(One.allShipsSunk()).toBe(true);
});
