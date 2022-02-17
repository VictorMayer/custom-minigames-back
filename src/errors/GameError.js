class GameError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'GameError';
        this.status = status;
    }
}

export default GameError;
