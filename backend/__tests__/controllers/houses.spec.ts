import 'jest';
import request from 'supertest';
import app from '../../src/app';
import data from '../../data/seeds/data/housesData';
import knex from 'knex';
import knexConfig from '../../knexfile';

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));

describe('/house routes', () => {
  beforeAll(async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  test('GET request with no id returns all houses', (done) => {
    request(app)
      .get('/houses')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(data.length);
        done();
      });
  });

  test('Get request with id returns a specific user', (done) => {
    request(app)
      .get('/houses/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe('object');
        done();
      });
  });

  test('Get request with user query returns houses of which the user ID matches default_ast', (done) => {
    request(app)
      .get('/houses/1?user=true')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body[0].default_ast).toBe(1);
        expect(body[0].name).toBe('house name 1');
        done();
      });
  });

  test('Get request with invalid id returns a 404', (done) => {
    request(app)
      .get('/houses/69')
      .set('Accept', 'application/json')
      .expect(404, done);
  });

  test('POST test request is successful', (done) => {
    const newHouse = {
      address: 'See my test, see my test, made from real gorilla chest',
      cleaning_fee: 65,
      extra_guest_fee: 30,
      name: 'house name 55',
      price: 959.55,
    };
    request(app)
      .post('/houses?test=true')
      .send(newHouse)
      .set('Accept', 'application/json')
      .expect(201)
      .then(() => {
        request(app)
          .get(`/houses/${data.length + 1}`)
          .set('Accept', 'application/json')
          .expect(200)
          .then(({ body }) => {
            expect(body.address).toBe(
              'See my test, see my test, made from real gorilla chest',
            );
            done();
          });
      });
  });

  // TODO: Write more POST tests

  test('put request is successful', (done) => {
    const newHouse = {
      address: 'See my test, see my test, made from real gorilla chest',
      cleaning_fee: 65,
      extra_guest_fee: 30,
      name: 'house name 55',
      price: 959.55,
    };
    request(app)
      .put('/houses/1')
      .send(newHouse)
      .set('Accept', 'application/json')
      .expect(201)
      .then(() => {
        request(app)
          .get('/houses/1')
          .set('Accept', 'application/json')
          .expect(200)
          .then(({ body }) => {
            expect(body.address).toBe(
              'See my test, see my test, made from real gorilla chest',
            );
            done();
          });
      });
  });

  test('DELETE request is successful', (done) => {
    request(app)
      .delete('/houses/2')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(1);
        done();
      });
  });
});
