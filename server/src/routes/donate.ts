import * as express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
// const braintree = require('braintree');

// var gateway = braintree.connect({
//     accessToken: 'AWvFzCx3RsmRgJzxNOGS1dmNvlDh3BvljMn45P9DETijVr6ESqEX9WREp2c16dJgzE7itWoamQjYjR0H'
//   });

router.get('/', (req: Request, res: Response) => {
    res.send('please Donate to help us improve our project'); 
});

// app.get("/client_token", function (req, res) {
//     gateway.clientToken.generate({}, function (err, response) {
//       res.send(response.clientToken);
//     });
// });

 

export default router;

//client id paypal
//AWvFzCx3RsmRgJzxNOGS1dmNvlDh3BvljMn45P9DETijVr6ESqEX9WREp2c16dJgzE7itWoamQjYjR0H
//sandboxaccount
//sb-43uzxo2417672@business.example.com