import { expect } from 'chai';
import request from 'supertest';
import bcrypt from 'bcrypt';
import server from '../../server/server';
import models from '../../dummyDataModel';

const { Users } = models;

const hash = bcrypt.hashSync;

const createUser = () => {
  Users.push({
    firstName: 'John',
    lastName: 'Mark',
    email: 'andela@gmail.com',
    password: hash('markdem', 10),
  });
};

// Test for the Signup a user route
describe('SignUp User', () => {
  /* SIGN UP */
  it('Should return 400 for missing fields', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'David',
        email: 'morayodeji@gmail.com',
        password: '123456',
      })
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
      .send({
        firstName: 'David',
        lastName: '\'Keji',
        email: 'morayodejigmail.com',
        password: '123456',
      })
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
      .send({
        firstName: 'David',
        lastName: '\'Keji',
        email: 'ay4realch@yahoo.com',
        password: '123456',
      })
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
      .send({
        firstName: 'David',
        lastName: '\'Keji',
        email: 'morayodeji@gmail.com',
        password: '12345',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('The password is too short! - make sure it is at least 6 characters');
        done();
      });
  });
  it('Should return 201 for success', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'David',
        lastName: '\'Keji',
        email: 'morayodeji@gmail.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('The user has been created!');
        done();
      });
  });
});

describe('Login User', () => {
  before((done) => {
    createUser();
    done();
  });

  /* LOGIN */
  it('Should return 400 for missing fields', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'andela@gmail.com',
      })
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
      .send({
        email: 'andela@gmail.com',
        password: 'maxame',
      })
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
      .send({
        email: 'anjela@gmail.com',
        password: 'markdem',
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Wrong email and/or Password!');
        done();
      });
  });
  it('Should return 200 for successful login', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'andela@gmail.com',
        password: 'markdem',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('You are logged in!');
        done();
      });
  });
});
