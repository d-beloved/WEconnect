import { expect } from 'chai';
import request from 'supertest';
import server from '../../server/server';

describe('Add Reviews to a Business', () => {
  /* Add a review to a business */
  it('Should return 400 if review has missing fields', (done) => {
    request(server)
      .post('/api/v1/businesses/1/reviews')
      .send({
        review: 'The food at your restaurant was heavenly',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('name required in body!');
        done();
      });
  });
  it('Should return 404 if Business to be reviewed not found', (done) => {
    request(server)
      .post('/api/v1/businesses/50/reviews')
      .send({
        name: 'Aromire',
        review: 'The food at your restaurant was heavenly',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Business not found');
        done();
      });
  });
  it('Should return 201 if Business was reviewed successfully', (done) => {
    request(server)
      .post('/api/v1/businesses/1/reviews')
      .send({
        name: 'Aromire',
        review: 'The food at your restaurant was heavenly',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Review accepted. Thanks a lot!');
        done();
      });
  });
});

describe('Get Reviews for a Business', () => {
  /* Get all reviews for a business */
  it('Should return 404 if Business not found', (done) => {
    request(server)
      .get('/api/v1/businesses/50/reviews')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Business not found!');
        done();
      });
  });
  it('Should return 200 if reviews for the Business was retrieved successfully', (done) => {
    request(server)
      .get('/api/v1/businesses/1/reviews')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
