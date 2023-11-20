import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index';

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
export const verifyPassword = async (password: string, passwordDB: string) => {
    const result = await bcrypt.compare(password, passwordDB);
    return result;
};
type Payload = {
    user: {
      id: string,
    },
};
export const generateToken = async (payload: Payload) => {
    return await jwt.sign(payload, config.auth.jwt_secret, {
        expiresIn: '90d'
    });
};
export const verifyToken = async (token: string) => {
    return await jwt.verify(token, config.auth.jwt_secret);
};
