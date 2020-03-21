/* eslint-disable no-undef */
import { Ship } from './Ship';

const obj = Ship(['A2', 'A3', 'A4']);
test('properly defines length', () => {
    expect(obj.getShipCoordinates()).toEqual(['A2', 'A3', 'A4']);
});

test('hits the correct position', () => {
    obj.hit(2);
    expect(obj.getShipCoordinates()).toEqual(['A2', 'A3', 'hit']);
});

test('marks as sunk when all positions are hit', () => {
    obj.getShipCoordinates().forEach((coordinate, index) => {
        obj.hit(index);
    });
    expect(obj.isSunk()).toBe(true);
});
