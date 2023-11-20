import { Request, Response, NextFunction} from 'express';
import { Document } from 'mongoose';
import * as jwt from 'jsonwebtoken';
const newSecret = 'secret';
import config from '../../config';

interface UserDocument extends Document{
  name: string
}

export const auth = (req: any, res: Response, next: NextFunction) => {
    // Get token from the header
    // const token = req.header('x-auth-token');
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({ "msg": "Not authorized" });
    }

    try {
        const decoded: any = jwt.verify(token, config.auth.jwt_secret);
        req.user = decoded.user;
        console.log('middleware executed...');
       next();
    } catch (err) {
        console.log('AuthError: ', err)
        res.status(500).json({ "msg": "Server error" });
    }

};