import { expect } from 'chai';
import request from 'supertest';
import server from '../../server/server';

describe('/GET: / Tests for index routes', () => {
  it('should return status code 404 when user visit an unregistered route', (done) => {
    request(server)
      .get('/unregisteredroute')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('That route does not exist!');
        done();
      });
  });
  it('should return status code 200 when user visits the index route', (done) => {
    request(server)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

describe('Tests for documentation route', () => {
  it('Should return the swagger documentation page when user visits the route', (done) => {
    request(server)
      .get('/api-docs')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
