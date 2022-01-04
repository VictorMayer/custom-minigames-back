import bcrypt from 'bcrypt';

import * as userRepository from '../repositories/userRepository.js';

async function createUser(user) {
    const { name, username, email, password, avatar } = user;
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

export {
    // eslint-disable-next-line import/prefer-default-export
    createUser,
};
