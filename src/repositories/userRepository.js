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

    if (!result.rows.length) throw new UserError('Não foi possivel cadastrar seu usuário');

    return result;
}

async function getUser(id) {
    return id;
}

export {
    saveUser,
    getUser,
};
