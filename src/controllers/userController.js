import { validateUser } from '../validations/userValidation.js';
import * as userService from '../services/userService.js';

async function register(req, res, next) {
    try {
        const invalidBody = validateUser(req.body);
        if (invalidBody) return res.status(400).send(invalidBody);

        const result = await userService.createUser(req.body);

        if (result) return result;

        return res.send();
    } catch (err) {
        if (err.name === 'UserError') return res.status(404).send(err.message);

        return next(err);
    }
}

async function login(req, res) {
    const result = await userService.createSession;
    res.send(result);
}

export {
    register,
    login,
};
