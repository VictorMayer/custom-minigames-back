import { validateNewUser, validateUser } from '../validations/userValidation.js';
import * as userService from '../services/userService.js';

async function register(req, res, next) {
    try {
        validateNewUser(req.body);

        await userService.createUser(req.body);

        return res.sendStatus(201);
    } catch (err) {
        if (err.name === 'UserError') return res.status(409).send(err.message);

        return next(err);
    }
}

async function login(req, res, next) {
    try {
        validateUser(req.body);

        const authenticatedUser = await userService.checkLoginInfo(req.body);

        const result = await userService.upsertUserSession(authenticatedUser);

        return res.send(result);
    } catch (err) {
        if (err.name === 'UserError') return res.status(err.status).send(err.message);

        return next(err);
    }
}

export {
    register,
    login,
};
