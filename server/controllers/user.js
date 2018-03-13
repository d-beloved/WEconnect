import bcrypt from 'bcrypt';
import models from '../../dummyDataModel';

const { Users } = models;

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
      res.status(400).json({
        message: 'The password is too short! - make sure it is at least 6 characters',
        error: true
      });
    } else {
      // Hash password to save in the dummydatabase
      const password = bcrypt.hashSync(req.body.password, 10);
      Users.push({
        id: Users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password
      });
      return res.status(201).json({
        message: 'The user has been created!',
        error: false
      });
    }
  }

  /**
   * @description - Allows a signed up user to login
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @return{string} login status
   */
  static loginUser(req, res) {
    for (let i = 0; i < Users.length; i += 1) {
      if (Users[i].email === req.body.email) {
        // compare the password with the hashed one
        if (bcrypt.compareSync(req.body.password, Users[i].password)) {
          return res.status(200).json({
            message: 'You are logged in!',
            error: false
          });
        }
        return res.status(401).json({
          message: 'Wrong password!',
          error: true
        });
      }
    }
    return res.status(401).json({
      message: 'Wrong email and/or Password!',
      error: true
    });
  }
}

export default UserController;
