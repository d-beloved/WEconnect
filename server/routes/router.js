import express from 'express';
import UserController from '../controllers/user';
import BusinessController from '../controllers/business';


// using router routes
const router = express.Router();

/** ********** My API ENDPOINTS **************** */

// Welcome message route
router.route('/')
  .get((req, res) => {
    res.status(200).send({ message: 'Welcome to WEconnect app! Your one stop place to get all your business needs answered' });
  });

// Signup
router.route('/api/v1/auth/signup')
  .post(UserController.createUser);

// Login
router.route('/api/v1/auth/login')
  .post(UserController.loginUser);

// Register business
router.routes('/api/v1/businesses')
  .post(BusinessController.createBusiness);

// Modify Business
router.routes('/api/v1/businesses/<businessId>')
  .put(BusinessController.modifyBusiness);

export default router;
