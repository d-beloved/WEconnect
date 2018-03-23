import db from '../../server/models';

const { User } = db;

const userSeed = {
  User.destroy({ truncate: true, cascade: true, restartIdentity})
}