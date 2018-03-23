import express from 'express';
import authenticate from '../middlewares/auth';
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
    Validation.validateEmail,
    Validation.checkEmailExistence,
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
    Validation.checkBodyContains('name', 'phoneno', 'details', 'location', 'category', 'services'),
    authenticate,
    BusinessController.createBusiness
  );

// Modify a Business
router.route('/api/v1/businesses/:businessId')
  .put(
    Validation.trimBodyValues,
    authenticate,
    BusinessController.modifyBusiness
  );

// Delete a Business
router.route('/api/v1/businesses/:businessId')
  .delete(
    authenticate,
    BusinessController.deleteBusiness
  );

// Get a Business details
router.route('/api/v1/businesses/:businessId')
  .get(BusinessController.getBusiness);

// Get all BUsiness in the App
router.route('/api/v1/businesses')
  .get(
    SearchFilter.byLocationOrCategory,
    BusinessController.getAllBusiness
  );

// Post reviews for a business
router.route('/api/v1/businesses/:businessId/reviews')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('review'),
    authenticate,
    ReviewsController.addReview
  );

// Get all Reviews for a business
router.route('/api/v1/businesses/:businessId/reviews')
  .get(ReviewsController.getReviews);

// 404 route
router.route('*')
  .all((req, res) => {
    res.status(404).send({
      message: 'That route does not exist!'
    });
  });

export default router;
