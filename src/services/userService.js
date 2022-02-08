import bcrypt from 'bcrypt';
import UserError from '../errors/UserError.js';

import * as userRepository from '../repositories/userRepository.js';

async function createUser(user) {
    const { name, username, email, password, avatar } = user;

    const existentEmail = userRepository.checkEmail(email);
    const existentUsername = userRepository.checkUsername(username);

    if (existentEmail) throw new UserError('Email já utilizado');
    if (existentUsername) throw new UserError('Nome de usuário indisponível');

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        name,
        username,
        email,
        password: hashedPassword,
        avatar,
    };
    return userRepository.saveUser(newUser);
}

async function createSession() {
    return true;
}

export {
    createUser,
    createSession,
};
