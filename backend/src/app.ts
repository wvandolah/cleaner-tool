import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import setGeneralMiddleware from './middleware/generalMiddleware';
import * as users from './controller/users';
import * as houses from './controller/houses';
import * as lists from './controller/lists';

export const server = express();

setGeneralMiddleware(server);

server.get('/', (req, res) => {
  // TODO: Redirect to front-end site
  res.send('hello world');
});

server
  .route('/users')
  .get(users.get)
  .post(users.post);

server
  .route('/users/:id')
  .get(users.get)
  .put(users.put)
  .delete(users.deleteU);

server
  .route('/houses')
  .get(houses.get)
  .post(houses.post);

server
  .route('/houses/:id')
  .get(houses.get)
  .put(houses.put)
  .delete(houses.deleteU);

server.route('/lists/:houseId').get(lists.get);
server.use(errorHandler);

export default server;
