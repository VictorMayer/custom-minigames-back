import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import UserError from '../errors/UserError.js';

import * as userRepository from '../repositories/userRepository.js';

async function createUser(user) {
    const { name, username, email, password, avatar } = user;

    const existentEmail = userRepository.checkEmail(email);
    const existentUsername = userRepository.checkUsername(username);

    if (existentEmail) throw new UserError('Email já utilizado', 409);
    if (existentUsername) throw new UserError('Nome de usuário indisponível', 409);

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

async function checkLoginInfo(user) {
    const data = user.username || user.email;

    const result = await userRepository.getUser(data);

    if (bcrypt.compareSync(result.password, user.password)) return result.rows[0];

    throw new UserError('User and/or password are invalid', 404);
}

async function upsertUserSession(user) {
    const existentSession = await userRepository.checkSession(user.id);

    if (existentSession) return existentSession.rows[0].token;

    const token = uuid();

    return userRepository.createSession({ userId: user.id, token });
}

export {
    createUser,
    checkLoginInfo,
    upsertUserSession,
};
