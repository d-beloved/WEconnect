import db from '../../server/models';

const { User } = db;

const userSeed = {
  emptyUserTable(done) {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(firstName, lastName, email, password) {
    return {
      firstName,
      lastName,
      email,
      password
    };
  },
  setLogin(email, password) {
    return { email, password };
  },
  addUser(done) {
    User.create({
      firstName: 'Ayodeji',
      lastName: 'Moronkeji',
      email: 'amoronkeji@ihstowers.com',
      password: '1234567'
    })
      .then(() => done())
      .catch(err => done(err));
  },
  addUser1(done) {
    User.create({
      firstName: 'morayo',
      lastName: 'Enitan',
      email: 'jaja23@ymail.com',
      password: 'password'
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default userSeed;
