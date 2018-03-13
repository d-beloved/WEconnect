import express from 'express';
import UserController from '../controllers/user';
import BusinessController from '../controllers/business';
import ReviewsController from '../controllers/reviews';
import Validation from '../middlewares/validation';
import SearchFilter from '../middlewares/searchFilter';


// using router routes
const router = express.Router();

/** ********** My API ENDPOINTS **************** */

// Welcome message route
router.route('/api/v1')
  .get((req, res) => {
    res.status(200).send({ message: 'Welcome to WEconnect app! Your one stop place to get all your business needs answered' });
  });

// Signup
router.route('/api/v1/auth/signup')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('firstName', 'lastName', 'email', 'password'),
    Validation.checkRequestEmailIsEmail,
    Validation.checkEmailNotExists,
    UserController.createUser
  );

// Login
router.route('/api/v1/auth/login')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('email', 'password'),
    UserController.loginUser
  );

// Register a business
router.route('/api/v1/businesses')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('name', 'phoneno', 'location', 'category', 'services'),
    BusinessController.createBusiness
  );

// Modify a Business
router.route('/api/v1/businesses/:businessId')
  .put(
    Validation.trimBodyValues,
    BusinessController.modifyBusiness
  );

// Delete a Business
router.route('/api/v1/businesses/:businessId')
  .delete(BusinessController.deleteBusiness);

// Get a Business details
router.route('/api/v1/businesses/:businessId')
  .get(BusinessController.getOneBusiness);

// Get all BUsiness in the App
router.route('/api/v1/businesses')
  .get(
    SearchFilter.byLocation,
    SearchFilter.byCategory,
    BusinessController.getAllBusiness
  );

// Post reviews for a business
router.route('/api/v1/businesses/:businessId/reviews')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('name', 'review'),
    ReviewsController.addReview
  );

// Get all Reviews for a business
router.route('/api/v1/businesses/:businessId/reviews')
  .get(ReviewsController.getReviews);

export default router;
