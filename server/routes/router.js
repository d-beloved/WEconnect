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

// Register a business
router.route('/api/v1/businesses')
  .post(BusinessController.createBusiness);

// Modify a Business
router.route('/api/v1/businesses/:businessId')
  .put(BusinessController.modifyBusiness);

// Delete a Business
router.route('/api/v1/businesses/:businessId')
  .delete(BusinessController.deleteBusiness);

// Get a Business details
router.route('/api/v1/businesses/:businessId')
  .get(BusinessController.getOneBusiness);

// Get all BUsiness in the App
router.route('/api/v1/businesses')
  .get(BusinessController.getAllBusiness);

export default router;
