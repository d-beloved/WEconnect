import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import { expect } from 'chai';
import request from 'supertest';
import server from '../../server/server';
import seed from '../seeders/userSeed';

dotEnv.config();


// Test for the Signup a user route
describe('POST Test suites for Auth User SignUp', () => {
  before(seed.emptyUserTable);
  before(seed.addUser);

  /* SIGN UP */
  describe('Test suites for checking user signup inputs', () => {
    it('should return status code 422 and a message when firstName does not consist of alphabetic characters', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput(1233, 'Ademola', 'runtown@gmail.com', 'password'))
        .expect(422)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message.firstName[0], 'The firstName field must contain only alphabetic characters.');
          done();
        });
    });
    it('should return status code 422 and a message when lastName does not consist of alphabetic characters', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(seed.setInput('Ayomideji', 123456, 'runtown@gmail.com', 'password'))
        .expect(422)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message.lastName[0], 'The lastName field must contain only alphabetic characters.');
          done();
        });
    });
  });

  describe('Test suites for checking for missing and empty fields', () => {
    
  })
  it('Should return 400 for missing fields', (done) => {
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
  it('Should return 409 if email already exists in database', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .send(seed.setInput('Ayodemideji', 'Omo Oluwa', 'amoronkeji@ihstowers.com', '3164888y'))
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Someone beat you to it. Email already taken! Sorry Champ!');
        done();
      });
  });
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
  it('Should return 201 for success and a token', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .send(seed.setInput('Oluwaleke', 'GraceofGOD', 'ay4realch@yahoo.com', 'wearegreat'))
      .end((err, res) => {
        expect(res.status).to.equal(201);
        if (err) return done(err);
        const decodedToken = jwtDecode(res.body.token);
        expect(res.body).to.equal(decodedToken.id, 2);
        expect(res.body.message).to.equal('The user has been created!', decodedToken.firstName);
        done();
      });
  });
});

describe('SignUp User', () => {
  before(seed.emptyUserTable);
  before(seed.addUser1);

  /* LOGIN */
  it('Should return 400 for missing fields', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(seed.setLogin('jaja23@ymail.com'))
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('password required in body!');
        done();
      });
  });
  it('Should return 401 for wrong password', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(seed.setLogin('jaja23@ymail.com', 'passwordy'))
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Wrong password!');
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
  it('Should return 200 for successful login and user\'s token', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(seed.setLogin('jaja23@ymail.com', 'password'))
      .end((err, res) => {
        expect(res.status).to.equal(200);
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('You are logged in!');
        done();
      });
  });
});
