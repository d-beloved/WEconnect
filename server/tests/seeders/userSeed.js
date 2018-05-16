import bcrypt from 'bcrypt';
import db from '../../models';

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
      password: bcrypt.hashSync('1234567', bcrypt.genSaltSync(10))
    })
      .then(() => done())
      .catch(err => done(err));
  },
  addUser1(done) {
    User.create({
      firstName: 'morayo',
      lastName: 'Enitan',
      email: 'jaja23@ymail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10))
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default userSeed;
