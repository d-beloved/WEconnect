import bcrypt from 'bcrypt';
import models from '../../dummyDataModel';

const { Users } = models;

/**
 * creates the signup and login component.
 */
class UserController {
  /**
   * Registers a new user with a hashed password.
   * @param {Object} req - api request.
   * @param {Object} res - route response.
   * @return{json} registered user details.
   */
  static createUser(req, res) {
    if (
      req.body.password === undefined ||
      req.body.password === null ||
      req.body.password.length < 6
    ) {
      res.status(400).send({ message: 'the password is too short! - make sure it is at least 6 characters' });
    } else {
      // HAsh password to save in the dummydatabase
      const password = bcrypt.hashSync(req.body.password, 10);
      Users
        .create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password
        })
        .then((user) => {
          const safeUser = user;
          safeUser.password = 'xxxxxxxxxxxxxxxxxxxxxxx';
          res.status(201).send({ message: 'The user has been created!', user: safeUser });
        })
        .catch((err) => {
          res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    }
  }
}

export default UserController;
