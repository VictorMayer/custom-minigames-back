class ScoreError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ScoreError';
        this.status = status;
    }
}

export default ScoreError;
