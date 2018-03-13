import request from 'supertest';
import router from '../../server/routes/router';

describe('/GET: /api/v1/ Tests for index routes', () => {
  it('should return status code 404 when user visit an unregistered route', (done) => {
    request(router)
      .get('/api/v1/unregisteredroute')
      .expect(404)
      .end(done);
  });
  it('should return status code 200 when user visits the index route', (done) => {
    request(router)
      .get('/api/v1/')
      .expect(200)
      .end(done);
  });
});
