import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';

const { User } = db;

/**
 * @description - Creates the signup and login component.
 */
class UserController {
  /**
   * @description - Registers a new user with a hashed password.
   *
   * @param {Object} req - api request.
   *
   * @param {Object} res - route response.
   *
   * @return{json} registered user details.
   */
  static createUser(req, res) {
    // checks the length of the password and its validity
    if (
      req.body.password === undefined ||
      req.body.password === null ||
      req.body.password.length < 6
    ) {
      res.status(400).send({
        message: 'The password is too short! - make sure it is at least 6 characters',
      });
    } else {
      // Hash password to save in the database
      const password = bcrypt.hashSync(req.body.password, 10);
      User
        .create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password
        })
        .then((user) => {
          const safeUser = user;
          safeUser.password = 'xxxxxxxxxxxxxxx';
          res.status(201).send({
            message: 'The user has been created!', user: safeUser
          });
        })
        .catch((err) => {
          res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    }
  }

  /**
   * @description - Creates a session token for the user
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @return{string} login status
   */
  static loginUser(req, res) {
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decoded;
        if (req.userData !== null) {
          return res.status(200).json({ message: 'You are already logged in' });
        }
      } catch (errror) {
        return res.status(401).json({ message: 'Token is invalid or has expired, Please re-login' });
      }
    }
    User
      .findOne({
        where: { email: req.body.email },
      })
      .then((user) => {
        if (user) { // If the user exists
          // compare hashed password
          const signedInUser = user.id;
          bcrypt.compare(req.body.password, user.password).then((check) => {
            if (!check) { // IF the password does not match
              res.status(401).send({ message: 'wrong password!' });
            } else {
              // creates a token that lasts for an hour
              const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '60m' });
              res.status(200).send({ message: 'You are logged in!', token, signedInUser });
            }
          });
        } else {
          res.status(401).send({ message: 'Wrong email and/or Password!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }
}

export default UserController;
