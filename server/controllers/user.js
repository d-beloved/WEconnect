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
        message: 'the password is too short! - make sure it is at least 6 characters',
        error: true
      });
    }
    // Hash password to save in the dummydatabase
    const password = bcrypt.hashSync(req.body.password, 10);
    Users.push(req.body);
    return res.status(201).json({
      message: 'The user has been created!',
      error: false
    });
  }
}

export default UserController;
