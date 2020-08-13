const Player = () => {
    let playerTurn = true;
    const getPlayerTurn = () => playerTurn;
    const setPlayerTurn = bool => (playerTurn = bool);

    const sendAttack = (Gameboard, coordinate) => {
        Gameboard.receiveAttack(coordinate);
    };
    return { sendAttack, getPlayerTurn, setPlayerTurn };
};

const ComputerPlayer = () => {
    const computer = {
        playerTurn: false,
        availableCoordinates: [
            'A1',
            'B1',
            'C1',
            'D1',
            'E1',
            'F1',
            'G1',
            'H1',
            'A2',
            'B2',
            'C2',
            'D2',
            'E2',
            'F2',
            'G2',
            'H2',
            'A3',
            'B3',
            'C3',
            'D3',
            'E3',
            'F3',
            'G3',
            'H3',
            'A4',
            'B4',
            'C4',
            'D4',
            'E4',
            'F4',
            'G4',
            'H4',
            'A5',
            'B5',
            'C5',
            'D5',
            'E5',
            'F5',
            'G5',
            'H5',
            'A6',
            'B6',
            'C6',
            'D6',
            'E6',
            'F6',
            'G6',
            'H6',
            'A7',
            'B7',
            'C7',
            'D7',
            'E7',
            'F7',
            'G7',
            'H7',
            'A8',
            'B8',
            'C8',
            'D8',
            'E8',
            'F8',
            'G8',
            'H8',
        ],
        maxLength: 63,
        getAvailableCoordinates: function() {
            return this.availableCoordinates;
        },
        setAvailableCoordinates: function(availableCoordinates, coordinateToDelete) {
            this.availableCoordinates = availableCoordinates.filter(
                coord => coord !== coordinateToDelete,
            );
            console.log(`pc available coords: ${this.availableCoordinates}`)
        },
        randomCoordinate: function() {
            const coordinate = this.availableCoordinates[
                Math.floor(Math.random() * (this.maxLength - 0 + 1)) + 0
            ];
            this.maxLength = this.maxLength - 1;
            const coordinateToDelete = this.getAvailableCoordinates().find(
                coord => coord === coordinate,
            );
            this.setAvailableCoordinates(this.getAvailableCoordinates(), coordinateToDelete);
            console.log(`coordinate: ${coordinate} | maxLength: ${this.maxLength} | delete:${coordinateToDelete}`)
            return coordinate;
        },
    };

    return Object.assign(Player(), computer);
};

export { Player, ComputerPlayer };
