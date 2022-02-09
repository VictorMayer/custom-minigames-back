import connection from '../database.js';
import UserError from '../errors/UserError.js';

async function saveUser(user) {
    const { name, username, email, password, avatar } = user;
    const result = await connection.query(`
        INSERT INTO
            users (name, username, email, password, avatar)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING IDENTITY;
    `, [name, username, email, password, avatar]);

    if (!result.rows.length) throw new UserError('Não foi possivel cadastrar seu usuário', 400);

    return result;
}

async function checkEmail(email) {
    const result = await connection.query('SELECT * FROM users WHERE email = $1 LIMIT BY 1', [email]);

    if (!result.rows.length) return true;

    return false;
}

async function checkUsername(username) {
    const result = await connection.query('SELECT * FROM users WHERE username = $1 LIMIT BY 1', [username]);

    if (!result.rows.length) return true;

    return false;
}

async function checkSession(id) {
    const result = await connection.query('SELECT * FROM sessions WHERE "userId" = $1 LIMIT BY 1', [id]);

    if (!result.rows.length) return false;

    return result.rows[0];
}

async function getUser(data) {
    const result = await connection.query('SELECT * FROM users WHERE username = $1 OR email = $1 LIMIT BY 1', [data]);

    if (!result.rows.length) return false;

    return result.rows[0];
}

async function createSession({ userId, token }) {
    return connection.query(`
        INSERT INTO
            sessions ("userId", token)
        VALUES
            ($1, $2)
    `, [userId, token]);
}

export {
    getUser,
    saveUser,
    checkEmail,
    checkSession,
    checkUsername,
    createSession,
};
