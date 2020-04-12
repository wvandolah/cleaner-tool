import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import setGeneralMiddleware from './middleware/generalMiddleware';
// @ts-ignore
import companion from '@uppy/companion';
import verifyToken from './middleware/verifyToken';
import * as users from './controller/users';
import * as guests from './controller/guests';
import * as houses from './controller/houses';
import * as lists from './controller/lists';
import * as items from './controller/items';
import * as email from './controller/email';
import * as payments from './controller/payments';
import * as stays from './controller/stays';
import * as connect from './controller/connect';
import * as assistants from './controller/assistants';
import path from 'path';

const server = express();
setGeneralMiddleware(server);

server.use(express.static(path.resolve(path.join(__dirname, '../../frontend/build'))));


server
  .route('/api/users')
  .get(verifyToken, users.get)
  .post(users.post)
  .put(verifyToken, users.putByExtId);

// Authentication Middleware for *all* routes after this line
server.use(verifyToken);

server
  .route('/api/users/:id')
  .get(users.get)
  .put(users.put)
  .delete(users.deleteU);

server.route('/api/guests').post(guests.post);

server.route('/api/guests/:id').put(guests.put);

server
  .route('/api/houses')
  .get(houses.get)
  .post(houses.post);

server
  .route('/api/houses/:id')
  .get(houses.get)
  .put(houses.put)
  .delete(houses.deleteU);

server
  .route('/api/payments')
  .get(payments.get)
  .post(payments.post);

server
  .route('/api/connect')
  .post(verifyToken, connect.post)
  .delete(verifyToken, connect.deleteL);

server.route('/api/connect/createpayment').post(connect.createPayment);

server.route('/api/lists').post(lists.post);
/* this get route looks for a query. if `lists/1?stay=true`
the id should be for a stay. Anything else the id should be for a house
*/
server
  .route('/api/lists/:id')
  .get(lists.get)
  .delete(lists.deleteL);

server
  .route('/api/items')
  .get(items.get)
  .post(items.post);
server
  .route('/api/items/:id')
  .get(items.get)
  .put(items.put)
  .delete(items.deleteL);

server.route('/api/assistants').get(assistants.get);

server
  .route('/api/assistants/:id')
  .get(assistants.getId)
  .post(assistants.postAst)
  .delete(assistants.delAst);

server.route('/api/itemComplete').post(items.itemComplete);

server.route('/api/email').post(verifyToken, email.send);

server
  .route('/api/stays')
  .get(stays.getAll)
  .post(stays.post);

server
  .route('/api/stays/:id')
  .get(stays.get)
  .put(stays.put);

const options = {
  filePath: '../uploads',
  providerOptions: {
    s3: {
      bucket: 'cleaner-pos',
      key: process.env.AWS_Key,
      region: process.env.REGION,
      secret: process.env.AWS_SECRET,
    },
  },
  server: {
    host: 'localhost:3020',
    protocol: 'http',
  },
};
server.use(companion.app(options));

server.use(errorHandler);
export default server;
