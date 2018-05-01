import request from 'supertest';
import { expect } from 'chai';
import server from '../../server/server';
import seed from '../seeders/userSeed';


// Test for the Signup a user route
describe('POST TEST SUITES FOR AUTH USER SIGNUP', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);

  /* SIGN UP */
  describe('TEST suites for checking for missing and empty fields', () => {
    it('Should return 400 for missing lastName', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('Ayodeji', '', 'ayomideji@ihstowers.com', '1234567'))
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('lastName required in body!');
          done();
        });
    });
    it('Should return 400 for missing firstName', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('', 'Moronke', 'ayomideji@ihstowers.com', '1234567'))
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('firstName required in body!');
          done();
        });
    });
    it('Should return 400 for missing email', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('Ayodeji', 'Moronkeji', '', '1234567'))
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('email required in body!');
          done();
        });
    });
    it('Should return 400 for missing password', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('Ayodeji', 'Moronkeji', 'ayomideji@ihstowers.com', ''))
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('password required in body!');
          done();
        });
    });
  });

  describe('Test suite for checking signup email input validity', () => {
    it('Should return 400 if email is invalid', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('Ayodeji', 'Moronkeji', 'amoronkeji@ihstowers', '1234567'))
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Bad email format!');
          done();
        });
    });
  });

  describe('Test suite for checking signup email exixtence in db', () => {
    it('Should return 409 if email already exists in database', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('Ayodemideji', 'Omo Oluwa', 'amoronkeji@ihstowers.com', '3164888y'))
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Another user beat you to it. Email already taken! Sorry Champ!');
          done();
        });
    });
  });

  describe('Test suite for checking Signup password length', () => {
    it('Should return 400 if password is too short', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('Ayomi', 'Oluwaloni', 'eberythin@gmail.com', '12345'))
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('The password is too short! - make sure it is at least 6 characters');
          done();
        });
    });
  });

  describe('Test suite for successful signup', () => {
    it('Should return 201 for success', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('Oluwaleke', 'GraceofGOD', 'ay4realch@yahoo.com', 'wearegreat'))
        .end((err, res) => {
          expect(res.status).to.equal(201);
          if (err) return done(err);
          const user = seed.setInput;
          expect(res.body.message).to.equal('The user has been created!', user);
          done();
        });
    });
  });
});

describe('Login User', () => {
  before(seed.emptyUserTable);
  before(seed.addUser1);

  /* LOGIN */
  it('Should return 200 for successful login and user\'s token', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(seed.setLogin('jaja23@ymail.com', 'password'))
      .end((err, res) => {
        expect(res.status).to.equal(200);
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('You are logged in!');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  describe('Test suite for missing fields in Login', () => {
    it('Should return 400 for missing password field', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send(seed.setLogin('jaja23@ymail.com', ''))
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('password required in body!');
          done();
        });
    });
    it('Should return 400 for missing email field', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send(seed.setLogin('', 'password'))
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('email required in body!');
          done();
        });
    });
  });
  describe('Test suite for wrong inputs in Login', () => {
    it('Should return 401 for wrong password', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send(seed.setLogin('jaja23@ymail.com', 'passwordy'))
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('wrong password!');
          done();
        });
    });
    it('Should return 401 for wrong email', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send(seed.setLogin('jaja23@ymail.co.uk', 'password'))
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Wrong email and/or Password!');
          done();
        });
    });
  });

  // describe('Test suite for invalid or expired token', () => {
  //   it('Should return 401 when token is invalid or expired', (done) => {
  //     request(server)
  //       .post('api/v1/auth.login')
  //       .set('authorization', 'invalid')
  //       .send(seed.setLogin('jaja23@ymail.com', 'password'))
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         expect(res.body.message).to.equal('Token is invalid or has expired, Please re-login');
  //         done();
  //       });
  //   });
  // });
});
