import joi from 'joi';
import UserError from '../errors/UserError';

function specifyError(error) {
    switch (error) {
    case 'name':
        break;
    case 'username': throw new UserError('Usuário inválido');
    case 'email':
    case 'password':
    case 'avatar':
    default:
        break;
    }
}

function validateUser(user) {
    const userSchema = joi.object({
        name: joi.string().required(),
        username: joi.string().required(),
        emai: joi.string().required(),
        password: joi.string().required(),
        avatar: joi.string().required(),
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
