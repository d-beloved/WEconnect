import request from 'supertest';
// import jwtDecode from 'jwt-decode';
import { expect } from 'chai';
import server from '../../server/server';
import userSeed from '../seeders/userSeed';
import bizSeed from '../seeders/businessSeed';

// Tests for the Business route
describe('TEST SUITES FOR ALL BUSINESS ACTIONS', () => {
  before(userSeed.emptyUserTable);
  before(bizSeed.emptyBusinessTable);
  before(userSeed.addUser);
  before(userSeed.addUser1);
  before(bizSeed.addBusiness);

  let token;
  let token2;
  // let id;
  // let id2;
  before((done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userSeed.setLogin('amoronkeji@ihstowers.com', '1234567'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = `Bearer ${res.body.token}`;
        // id = jwtDecode(token).id;
        done();
      });
  });

  before((done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userSeed.setLogin('jaja23@ymail.com', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token2 = `Bearer ${res.body.token}`;
        // id2 = jwtDecode(token2).id;
        done();
      });
  });
  /**
   * TEST case for all the Business actions
   */
  describe('Register a Business', () => {
    /* Register a Business */
    describe('Test suite for checking the authentication of the user', () => {
      it('Should return 401 if user is not authenticated', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .send(bizSeed.setInput(
            'Likened',
            '9, akomoniwe str. Ilasamaja',
            'www.choralscream.com',
            '09086574323',
            'hbuvirbv vbeiobe ascbivbrpdbe  dvbr vbwre',
            'Lagos, Nigeria',
            'Ostrane',
            'Hunting, Beading'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('token is required!');
            done();
          });
      });
      it('Should return 401 if User token is invalid', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .set({ authorization: 'invalid' })
          .send(bizSeed.setInput(
            'Likened',
            '9, akomoniwe str. Ilasamaja',
            'www.choralscream.com',
            '09086574323',
            'hbuvirbv vbeiobe ascbivbrpdbe  dvbr vbwre',
            'Lagos, Nigeria',
            'Ostrane',
            'Hunting, Beading'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Authentication failed! Token is Invalid or expired. Please Login again');
            done();
          });
      });
    });
    describe('Test suites for Valid token but missing or empty fields', () => {
      it('Should return 400 for missing or empty name field', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .set({ authorization: token })
          .send(bizSeed.setInput(
            '',
            '9, holloway, Lagos Island',
            'www.idingesit.com',
            '2348575',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
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
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Hollowway',
            '',
            'www.resunt.com',
            '2348575',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
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
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Junta',
            '9, holloway, Lagos Island',
            'www.gutyc.com',
            '',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
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
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Tracis',
            '9, holloway, Lagos Island',
            'turune.com',
            '2348575',
            '',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
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
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Travis',
            '9, holloway, Lagos Island',
            'www.locate.ng',
            '2348575',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            '',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
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
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Train the trainer',
            '9, holloway, Lagos Island',
            'traines.com.ng',
            '2348575',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            'Ajah, Lagos',
            '',
            'fibre optic, end to end connections'
          ))
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
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Annas',
            '9, holloway, Lagos Island',
            'Annas.co.uk',
            '2348575',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            'Ajah, Lagos',
            'Telecommunications',
            ''
          ))
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('services required in body!');
            done();
          });
      });
    });
    describe('Test suites for Validating the business before creation', () => {
      it('Should return 409 if Business with same name and phone no already exists', (done) => {
        request(server)
          .post('api/v1/businesses')
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Monravian fall',
            '9, holloway, Lagos Island',
            'www.monrovia.com',
            '0706534233',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal('Business with same name and phone number already exists');
            done();
          });
      });
      it('Should return 409 if Business with same name already exists', (done) => {
        request(server)
          .post('api/v1/businesses')
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Monravian fall',
            '9, holloway, Lagos Island',
            'www.monrovia.com',
            '47637289',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal('Business with same name already exists');
            done();
          });
      });
      it('Should return 409 if Business with same phoneno already exists', (done) => {
        request(server)
          .post('api/v1/businesses')
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Monravian',
            '9, holloway, Lagos Island',
            'www.monrovia.com',
            '0706534233',
            'efcwkcbeivjkbrjkvb evbuebvjebvq',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal('Business with same phone number exists already');
            done();
          });
      });
    });
    describe('Test for successful creation of a business', () => {
      it('Should return 201 for successfully creating a business', (done) => {
        request(server)
          .post('/api/v1/businesses')
          .set({ authorization: token })
          .send(bizSeed.setInput(
            'Dave concepts',
            '9,tevbehcbe,evuewnjcwnc, Nigeria',
            'www.nscdc.com.',
            '+234 (0)7055439529',
            'bcevejvbw kbhvw nvasn betnefn kdj dsvjwr rjb rjdevhd',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Your business has been created!');
            done();
          });
      });
    });
  });

  describe('Modify a Business', () => {
    /* Modify a Business */
    describe('Test suite for checking the authentication of the user', () => {
      it('Should return 401 if user is not authenticated to update', (done) => {
        request(server)
          .put('/api/v1/businesses/:businessId')
          .send(bizSeed.setUpdateBusiness(
            'Likened',
            '9, akomoniwe str. Ilasamaja',
            'www.choralscream.com',
            '09086574323',
            'hbuvirbv vbeiobe ascbivbrpdbe  dvbr vbwre',
            'Lagos, Nigeria',
            'Ostrane',
            'Hunting, Beading'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('token is required!');
            done();
          });
      });
      it('Should return 401 if User that wants to update has an invalid token', (done) => {
        request(server)
          .put('/api/v1/businesses/:businessId')
          .set({ authorization: 'invalid' })
          .send(bizSeed.setUpdateBusiness(
            'Likened',
            '9, akomoniwe str. Ilasamaja',
            'www.choralscream.com',
            '09086574323',
            'hbuvirbv vbeiobe ascbivbrpdbe  dvbr vbwre',
            'Lagos, Nigeria',
            'Ostrane',
            'Hunting, Beading'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Authentication failed! Token is Invalid or expired. Please Login again');
            done();
          });
      });
    });
    describe('Test for when the Business is not found', () => {
      it('Should return 404 if business not found', (done) => {
        request(server)
          .put('/api/v1/businesses/0')
          .set({ authorization: token })
          .send(bizSeed.setUpdateBusiness(
            'Dave concepts',
            '9,tevbehcbe,evuewnjcwnc, Nigeria',
            'www.nscdc.com.dazall',
            '+234 (0)7055439529',
            'bcevejvbw kbhvw nvasn betnefn kdj dsvjwr rjb rjdevhd',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Business not found!');
            done();
          });
      });
    });
    describe('TEST for successful Update of the business', () => {
      it('Should return 200 if business was edited successfully', (done) => {
        request(server)
          .put('/api/v1/businesses/1')
          .set({ authorization: token })
          .send(bizSeed.setUpdateBusiness(
            'Dave concepts',
            '9,tevbehcbe,evuewnjcwnc, Nigeria',
            'www.nscdc.com.dazall',
            '+234 (0)7055439529',
            'bcevejvbw kbhvw nvasn betnefn kdj dsvjwr rjb rjdevhd',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Business updated successfully!');
            done();
          });
      });
    });
    describe('Test for Unauthorized update of an existing business', () => {
      it('Should return 403 for an update carried out by a wrong creator of a business', (done) => {
        request(server)
          .put('/api/v1/businesses/1')
          .set({ authorization: token2 })
          .send(bizSeed.setUpdateBusiness(
            'Dave concepts',
            '9,tevbehcbe,evuewnjcwnc, Nigeria',
            'www.nscdc.com.dazall',
            '+234 (0)7055439529',
            'bcevejvbw kbhvw nvasn betnefn kdj dsvjwr rjb rjdevhd',
            'Ajah, Lagos',
            'Telecommunications',
            'fibre optic, end to end connections'
          ))
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to.equal('You are not allowed to update this business');
            done();
          });
      });
    });
  });

  describe('Retrieve a User\'s business', () => {
    /* Get the businesses by A user */
    describe('Test suite for checking the authentication of the user', () => {
      it('Should return 401 if user is not authenticated to get the business', (done) => {
        request(server)
          .get('/api/v1/businesses/userBiz')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('token is required!');
            done();
          });
      });
      it('Should return 401 if User that wants to get business has an invalid token', (done) => {
        request(server)
          .get('/api/v1/businesses/userBiz')
          .set({ authorization: 'invalid' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Authentication failed! Token is Invalid or expired. Please Login again');
            done();
          });
      });
    });
    describe('Tests for getting user\'s businesses after authentication', () => {
      it('Should return 200 when business is found', (done) => {
        request(server)
          .get('/api/v1/businesses/userBiz')
          .set({ authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Your businesses were found');
            done();
          });
      });
      it('Should return 404 when business is not found', (done) => {
        request(server)
          .get('/api/v1/businesses/userBiz')
          .set({ authorization: token2 })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('No Businesses for you yet!');
            done();
          });
      });
    });
  });

  describe('Retrieve a Business', () => {
    /* Get One Business Detail */
    it('Should return 404 if business not found', (done) => {
      request(server)
        .get('/api/v1/businesses/0')
        .end((err, res) => {
          expect(res.status).to.equal(404);
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
          expect(res.body.message).to.equal('Business delivered');
          done();
        });
    });
  });

  describe('Retrieve all Businesses with specific location', () => {
    /* Get all businesses with specific location */
    it('Should return 200 if business with the location was found', (done) => {
      request(server)
        .get('/api/v1/businesses?location=Lagos')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Businesses with the location found');
          done();
        });
    });
    it('Should return 404 if business with location not found', (done) => {
      request(server)
        .get('/api/v1/businesses?location=Bauchi')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No Businesses with that location found!');
          done();
        });
    });
  });

  describe('Retrieve all Businesses in specific category', () => {
    /* Get all businesses with specific category */
    it('Should return 200 if business in the category was found', (done) => {
      request(server)
        .get('/api/v1/businesses?category=Praying')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Businesses with the category found');
          done();
        });
    });
    it('Should return 404 if business with category not found', (done) => {
      request(server)
        .get('/api/v1/businesses?category=Nutrition')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No Businesses with that category found');
          done();
        });
    });
    it('Should return 200 if business in the category and location was found', (done) => {
      request(server)
        .get('/api/v1/businesses?category=Praying&location=Lagos')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Businesses with the location and category found');
          done();
        });
    });
    it('Should return 404 if business with category not found', (done) => {
      request(server)
        .get('/api/v1/businesses?category=Nutrition&location=Dapchung')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No business with the specified category and location found!');
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
          expect(res.body.message).to.equal('All businesses delivered');
          done();
        });
    });
  });

  describe('Delete a Business', () => {
    /* Delete a Business */
    describe('Test suite for checking the authentication of the user', () => {
      it('Should return 401 if user is not authenticated to delete', (done) => {
        request(server)
          .delete('/api/v1/businesses/:businessId')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('token is required!');
            done();
          });
      });
      it('Should return 401 if User that wants to delete has an invalid token', (done) => {
        request(server)
          .delete('/api/v1/businesses/:businessId')
          .set({ authorization: 'invalid' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Authentication failed! Token is Invalid or expired. Please Login again');
            done();
          });
      });
    });
    describe('Test for an inexistent business', () => {
      it('Should return 404 if business not found', (done) => {
        request(server)
          .delete('/api/v1/businesses/0')
          .set({ authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Business not found!');
            done();
          });
      });
    });
    describe('Test for successful deletion', () => {
      it('Should return 200 if business was deleted successfully', (done) => {
        request(server)
          .delete('/api/v1/businesses/1')
          .set({ authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Business deleted successfully');
            done();
          });
      });
    });
    describe('Test for an unauthorized deletion', () => {
      it('Should return 403 if the business is not owned by the user', (done) => {
        request(server)
          .delete('/api/v1/businesses/2')
          .set({ authorization: token2 })
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to.equal('You are not Allowed to delete this business');
            done();
          });
      });
    });
  });
});
