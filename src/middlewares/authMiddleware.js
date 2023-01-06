import connection from '../database.js';
import UserError from '../errors/UserError.js';

export default async function tokenAuthorizationMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];

        const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);

        if (!result.rows.length) throw new UserError('Unauthorized', 401);

        req.locals.id = result.rows[0].userId;

        return next();
    } catch (error) {
        if (error.name === 'UserError') return res.status(error.status).send(error.message);

        return res.send(error.message);
    }
}
