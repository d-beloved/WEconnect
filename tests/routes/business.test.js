import request from 'supertest';
import jwtDecode from 'jwt-decode';
import { expect } from 'chai';
import server from '../../server/server';
import userSeed from '../seeders/userSeed';
import bizSeed from '../seeders/businessSeed';

// Tests for the Business route
describe('TEST SUITES FOR ALL BUSINESS ACTIONS', () => {
  before(userSeed.emptyUserTable);
  before(bizSeed.emptyBusinessTable);
  before(userSeed.addUser);
  before(bizSeed.addBusiness);

  let token;
  let id;
  before((done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userSeed.setLogin('anorexia@andela.com', 'arthropod'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        id = jwtDecode(token).id;
        done();
      });
  });
  /**
   * TEST case for all the Business actions
   */
  describe('Register a Business', () => {
    /* Register a Business */
    describe('Test suites for missing or empty fields', () => {
      it('Should return 400 for missing or empty name field', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send({
            name: '',
            address: '9, holloway, Lagos Island',
            phoneno: '2348575',
            details: 'efcwkcbeivjkbrjkvb evbuebvjebvq',
            location: 'Ajah, Lagos',
            category: 'Telecommunications',
            services: 'fibre optic, end to end connections'
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('name required in body!');
            done();
          });
      });
      it('Should return 400 for missing or empty address field', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send({
            name: 'Hollowway',
            address: '',
            phoneno: '2348575',
            details: 'efcwkcbeivjkbrjkvb evbuebvjebvq',
            location: 'Ajah, Lagos',
            category: 'Telecommunications',
            services: 'fibre optic, end to end connections'
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('address required in body!');
            done();
          });
      });
      it('Should return 400 for missing or empty phoneno field', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send({
            name: 'Junta',
            address: '9, holloway, Lagos Island',
            phoneno: '',
            details: 'efcwkcbeivjkbrjkvb evbuebvjebvq',
            location: 'Ajah, Lagos',
            category: 'Telecommunications',
            services: 'fibre optic, end to end connections'
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('phoneno required in body!');
            done();
          });
      });
      it('Should return 400 for missing or empty details field', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send({
            name: 'Tracis',
            address: '9, holloway, Lagos Island',
            phoneno: '2348575',
            details: '',
            location: 'Ajah, Lagos',
            category: 'Telecommunications',
            services: 'fibre optic, end to end connections'
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('details required in body!');
            done();
          });
      });
      it('Should return 400 for missing or empty location field', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send({
            name: 'Travis',
            address: '9, holloway, Lagos Island',
            phoneno: '2348575',
            details: 'efcwkcbeivjkbrjkvb evbuebvjebvq',
            location: '',
            category: 'Telecommunications',
            services: 'fibre optic, end to end connections'
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('location required in body!');
            done();
          });
      });
      it('Should return 400 for missing or empty category field', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send({
            name: 'Train the trainer',
            address: '9, holloway, Lagos Island',
            phoneno: '2348575',
            details: 'efcwkcbeivjkbrjkvb evbuebvjebvq',
            location: 'Ajah, Lagos',
            category: '',
            services: 'fibre optic, end to end connections'
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('category required in body!');
            done();
          });
      });
      it('Should return 400 for missing or empty services field', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send({
            name: 'Annas',
            address: '9, holloway, Lagos Island',
            phoneno: '2348575',
            details: 'efcwkcbeivjkbrjkvb evbuebvjebvq',
            location: 'Ajah, Lagos',
            category: 'Telecommunications',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('services required in body!');
            done();
          });
      });
    });
    describe('Test suite for checking the authentication of the user', () => {
      
    })
    it('Should return 201 for successfully creating a business', (done) => {
      request(server)
        .post('/api/v1/businesses')
        .send({
          name: 'Dave concepts',
          address: '9,tevbehcbe,evuewnjcwnc, Nigeria',
          website: 'ww.nscdc.com.dazall',
          phoneno: '+234 (0)7055439529',
          details: 'bcevejvbw kbhvw nvasn betnefn kdj dsvjwr rjb rjdevhd',
          location: 'Ajah, Lagos',
          category: 'Telecommunications',
          services: 'fibre optic, end to end connections',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your business has been created!');
          done();
        });
    });
  });

  describe('Modify a Business', () => {
    /* Modify a Business */
    it('Should return 404 if business not found', (done) => {
      request(server)
        .put('/api/v1/businesses/100')
        .send({
          name: 'Dave concepts',
          address: '9,tevbehcbe,evuewnjcwnc, Nigeria',
          website: 'ww.nscdc.com.dazall',
          phoneno: '+234 (0)7055439529',
          details: 'bcevejvbw kbhvw nvasn betnefn kdj dsvjwr rjb rjdevhd',
          location: 'Ajah, Lagos',
          category: 'Telecommunications',
          services: 'fibre optic, end to end connections',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Business not found!');
          done();
        });
    });
    it('Should return 200 if business was edited successfully', (done) => {
      request(server)
        .put('/api/v1/businesses/3')
        .send({
          name: 'Dave concepts',
          address: '9,tevbehcbe,evuewnjcwnc, Nigeria',
          website: 'ww.nscdc.com.dazall',
          phoneno: '+234 (0)7055439529',
          details: 'bcevejvbw kbhvw nvasn betnefn kdj dsvjwr rjb rjdevhd',
          location: 'Ajah, Lagos',
          category: 'Telecommunications',
          services: 'fibre optic, end to end connections',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Business updated successfully!');
          done();
        });
    });
  });

  describe('Delete a Business', () => {
    /* Delete a Business */
    it('Should return 404 if business not found', (done) => {
      request(server)
        .delete('/api/v1/businesses/100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Business not found!');
          done();
        });
    });
    it('Should return 200 if business was deleted successfully', (done) => {
      request(server)
        .delete('/api/v1/businesses/2')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Business deleted successfully');
          done();
        });
    });
  });

  describe('Retrieve a Business', () => {
    /* Get One Business Detail */
    it('Should return 404 if business not found', (done) => {
      request(server)
        .get('/api/v1/businesses/100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          // expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Business not found!');
          done();
        });
    });
    it('Should return 200 if business was found', (done) => {
      request(server)
        .get('/api/v1/businesses/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Retrieve all Businesses with specific location', () => {
    /* Get all businesses with specific location */
    it('Should return 200 if business with the location was found', (done) => {
      request(server)
        .get('/api/v1/businesses?location=lagos')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Should return 404 if business with location not found', (done) => {
      request(server)
        .get('/api/v1/businesses?location=Bauchi')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('There is no business with that location');
          done();
        });
    });
  });

  describe('Retrieve all Businesses in specific category', () => {
    /* Get all businesses with specific category */
    it('Should return 200 if business in the category was found', (done) => {
      request(server)
        .get('/api/v1/businesses?category=fashion')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Should return 404 if business with category not found', (done) => {
      request(server)
        .get('/api/v1/businesses?category=Nutrition')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('There is no business in that category');
          done();
        });
    });
  });

  describe('Retrieve all Businesses', () => {
    /* Get all Business in the App */
    it('Should return 200 if businesses were found', (done) => {
      request(server)
        .get('/api/v1/businesses')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
