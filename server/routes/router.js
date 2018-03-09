import express from 'express';
import UserController from '../controllers/user';


// using router routes
const router = express.Router();

/** ********** My API ENDPOINTS **************** */

// Welcome message route
router.route('/')
  .get((req, res) => {
    res.status(200).send({ message: 'Welcome to WEconnect app! Your one stop place to get all your business needs answered' });
  });

// Signup API
router.route('/api/v1/auth/signup')
  .post(UserController.createUser);

// Login API
router.route('/api/v1/auth/login')
  .post(UserController.loginUser);

export default router;
