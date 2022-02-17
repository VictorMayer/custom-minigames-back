import connection from '../database.js';

async function getGames() {
    const result = await connection.query('SELECT * FROM games');

    return result.rows;
}

export {
    // eslint-disable-next-line import/prefer-default-export
    getGames,
};
