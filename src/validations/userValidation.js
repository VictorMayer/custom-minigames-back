/* eslint-disable newline-per-chained-call */
import joi from 'joi';
import UserError from '../errors/UserError.js';

function specifyError(error) {
    switch (error) {
    case 'name': throw new UserError('Nome curto ou longo demais');
    case 'username': throw new UserError('Usuário inválido');
    case 'email': throw new UserError('Email inválido');
    case 'password': throw new UserError('Senha fraca demais');
    case 'avatar': throw new UserError('Imagem inválida');
    default: break;
    }
}

function validateUser(user) {
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

export {
    // eslint-disable-next-line import/prefer-default-export
    validateUser,
};
