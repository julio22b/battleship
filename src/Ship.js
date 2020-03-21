const Ship = function(coordinatesArr) {
    const shipCoordinates = coordinatesArr;
    const getShipCoordinates = () => {
        return shipCoordinates;
    };
    const hit = index => {
        shipCoordinates[index] = 'hit';
    };

    const isSunk = () => shipCoordinates.every(coordinate => coordinate === 'hit');

    return { getShipCoordinates, isSunk, hit };
};

export { Ship };
