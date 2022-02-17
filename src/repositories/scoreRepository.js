import connection from '../database.js';

async function getLeaderboard(gameId) {
    const result = await connection.query('SELECT * FROM scores WHERE "gameId" = $1', [gameId]);

    return result.rows;
}

async function getUserScore({ gameId, userId }) {
    const result = await connection.query('SELECT * FROM scores WHERE "gameId" = $1 AND "userId" = $2', [gameId, userId]);

    return result.rows[0];
}

async function updateScore({ newScore, userId }) {
    return connection.query('UPDATE scores SET value = $1 WHERE "userId = $1', [newScore, userId]);
}

export {
    getLeaderboard,
    getUserScore,
    updateScore,
};
