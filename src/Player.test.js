/* eslint-disable no-undef */
import { Player, ComputerPlayer } from './Player';
import { Gameboard } from './Gameboard';

const ComputerGameboard = Gameboard();
const Computer = ComputerPlayer();
ComputerGameboard.placeShip('A1', 'A2', 'A3');
const ComputerBattleships = ComputerGameboard.getBattleships();

const Human = Player();
const HumanGameboard = Gameboard();
HumanGameboard.placeShip('D1', 'D2');
const HumanBattleships = HumanGameboard.getBattleships();

test('Human attacks Computer gameboard', () => {
    Human.sendAttack(ComputerGameboard, 'A2');
    expect(ComputerBattleships[0].getShipCoordinates()).toEqual(['A1', 'hit', 'A3']);
});

test('Computer attacks Human gameboard', () => {
    Computer.sendAttack(HumanGameboard, 'D1');
    expect(HumanBattleships[0].getShipCoordinates()).toEqual(['hit', 'D2']);
});

test('Human destroys a Computer ship', () => {
    Human.sendAttack(ComputerGameboard, 'A1');
    Human.sendAttack(ComputerGameboard, 'A3');
    expect(ComputerBattleships[0].getShipCoordinates()).toEqual(['hit', 'hit', 'hit']);
});

test('Computer destroys a Human ship', () => {
    Computer.sendAttack(HumanGameboard, 'D2');
    expect(HumanBattleships[0].getShipCoordinates()).toEqual(['hit', 'hit']);
});
