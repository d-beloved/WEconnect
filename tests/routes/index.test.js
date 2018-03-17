import request from 'supertest';
import server from '../../server/server';

describe('/GET: / Tests for index routes', () => {
  it('should return status code 404 when user visit an unregistered route', (done) => {
    request(server)
      .get('/unregisteredroute')
      .expect(404)
      .end(done);
  });
  it('should return status code 200 when user visits the index route', (done) => {
    request(server)
      .get('/api/v1')
      .expect(200)
      .end(done);
  });
});
