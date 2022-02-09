/* eslint-disable newline-per-chained-call */
import joi from 'joi';
import UserError from '../errors/UserError.js';

function specifyError(error) {
    switch (error) {
    case 'name': throw new UserError('Nome curto ou longo demais', 400);
    case 'username': throw new UserError('Usuário inválido', 400);
    case 'email': throw new UserError('Email inválido', 400);
    case 'password': throw new UserError('Senha fraca demais', 400);
    case 'avatar': throw new UserError('Imagem inválida', 400);
    default: break;
    }
}

function validateNewUser(user) {
    const userSchema = joi.object({
        name: joi.string().min(3).max(50).required(),
        username: joi.string().alphanum().min(3).max(30).required(),
        emai: joi.email().required(),
        password: joi.string().min(4).required(),
        avatar: joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg))/i),
    });

    if (userSchema.validate(user).error) {
        const error = userSchema.validate(user).error.details[0].context.key;
        return specifyError(error);
    }

    return false;
}

function validateUser(user) {
    const emailSchema = joi.object({
        email: joi.email().required(),
        password: joi.string().min(4).required(),
    });

    const usernameSchema = joi.object({
        username: joi.string().alphanum().min(3).max(30).required(),
        password: joi.string().min(4).required(),
    });

    if (usernameSchema.validate(user).error || emailSchema.validate(user).error) {
        throw new UserError('Insuficcient data!', 400);
    }

    return false;
}

export {
    validateNewUser,
    validateUser,
};
