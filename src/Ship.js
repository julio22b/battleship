const Ship = function(coordinatesArr) {
    const shipCoordinates = coordinatesArr;
    const getShipCoordinates = () => {
        return shipCoordinates;
    };
    const hit = index => {
        shipCoordinates[index] = 'hit';
    };
    const isSunk = () => shipCoordinates.every(coordinate => coordinate === 'hit');
    const updated = false;
    return { getShipCoordinates, isSunk, hit, updated };
};

export { Ship };
