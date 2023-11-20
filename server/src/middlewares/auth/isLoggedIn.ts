import { Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

const newSecret = 'secret';
export function isLoggedIn(req: any, res: Response, next: NextFunction) {


    if(req.cookies.jwt == 'loggedout' || req.cookies.jwt == '' || req.cookies.jwt == null){
       
        return next();
    }

    if(!req.cookies.jwt){
        console.log('You are not logged in and you have no token')
        return res.send('you are not logged in and you have no token');
    }

    try {
        const decoded: any = jwt.verify(req.cookies.jwt, newSecret);
        //console.log(decoded.user);
        req.user = decoded.user;
      //  console.log(req.user.id);
     // console.log('User is logged in with id: ' + req.user.id);
       next();
    } catch(err) {
        //res.status(401).json({ msg: 'Token is not valid' });
        console.log('Token is invalid');
       res.redirect('/login');
       return next();
}

   // next();
 
};