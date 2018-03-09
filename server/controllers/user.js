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
        .then((users) => {
          const safeUser = users;
          safeUser.password = 'xxxxxxxxxxxxxxxxxxxxxxx';
          res.status(201).send({ message: 'The user has been created!', user: safeUser });
        })
        .catch((err) => {
          res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    }
  }

  /**
   * Allows a signed up user to login
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{string} login status
   */
  static loginUser(req, res) {
    Users
      .findOne({
        where: { email: req.body.email },
      })
      .then((users) => {
        if (users) { // i.e. if users exists
          // compare the hashed password
          bcrypt.compare(req.body.password, users.password).then((check) => {
            if (!check) { // If the password does not match
              res.status(401).send({ message: 'wrong password or email!' });
            } else {
              // lOgs the user in
              res.status(200).send({ message: 'You are logged in!' });
            }
          });
        } else {
          res.status(401).send({ message: 'wrong email or password' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }
}

export default UserController;
