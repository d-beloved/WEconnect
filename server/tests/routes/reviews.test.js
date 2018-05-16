import { expect } from 'chai';
import request from 'supertest';
import server from '../../../app';
import userSeed from '../seeders/userSeed';
import bizSeed from '../seeders/businessSeed';
import reviewSeed from '../seeders/reviewsSeed';

// Tests for the review of businesses
describe('TEST Suites for the REVIEW ACTIONS', () => {
  before(userSeed.emptyUserTable);
  before(bizSeed.emptyBusinessTable);
  before(reviewSeed.emptyReviewTable);
  before(userSeed.addUser);
  before(bizSeed.addBusiness);
  before(bizSeed.addBusiness1);
  before(reviewSeed.addReview);

  let token;
  before((done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userSeed.setLogin('amoronkeji@ihstowers.com', '1234567'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = `Bearer ${res.body.token}`;
        done();
      });
  });

  describe('ADD Review to a Business', () => {
    /* Review a Business */
    describe('Test suite for checking the authentication of the user', () => {
      it('Should return 401 if user is not authenticated', (done) => {
        request(server)
          .post('/api/v1/businesses/1/reviews')
          .send(reviewSeed.setInput('I am a lover of your services'))
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('token is required!');
            done();
          });
      });
      it('Should return 401 if User token is invalid', (done) => {
        request(server)
          .post('/api/v1/businesses/1/reviews')
          .set({ authorization: 'invalid' })
          .send(reviewSeed.setInput('I love the way you deliver services'))
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Authentication failed! Token is Invalid or expired. Please Login again');
            done();
          });
      });
    });

    describe('Test suites for Valid token but missing or empty fields', () => {
      it('Should return 400 for missing or empty review field', (done) => {
        request(server)
          .post('/api/v1/businesses/1/reviews')
          .set({ authorization: token })
          .send(reviewSeed.setInput(''))
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('review required in body!');
            done();
          });
      });
    });

    describe('When User is authenticated, Add Review to a Business', () => {
      /* Add a review to a business */
      it('Should return 404 if Business to be reviewed not found', (done) => {
        request(server)
          .post('/api/v1/businesses/0/reviews')
          .set({ authorization: token })
          .send({
            review: 'The food at your restaurant was heavenly',
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Business not found!');
            done();
          });
      });
      it('Should return 201 if Business was reviewed successfully', (done) => {
        request(server)
          .post('/api/v1/businesses/1/reviews')
          .set({ authorization: token })
          .send({
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
  });

  describe('GET Reviews for a Business', () => {
    /* Get all reviews for a business */
    it('Should return 404 if Business not found', (done) => {
      request(server)
        .get('/api/v1/businesses/0/reviews')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business not found!');
          done();
        });
    });
    it('Should return 404 if No reviews for Business found', (done) => {
      request(server)
        .get('/api/v1/businesses/2/reviews')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No reviews for this business YET!');
          done();
        });
    });
    it('Should return 200 if reviews for the Business was retrieved successfully', (done) => {
      request(server)
        .get('/api/v1/businesses/1/reviews')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('All reviews delivered!');
          done();
        });
    });
  });
});

