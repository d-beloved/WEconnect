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
router.route('/')
  .get((req, res) => {
    res.status(200).send({ message: 'Welcome to WEconnect app! Your one stop place to get all your business needs answered' });
  });

// Signup
router.route('/auth/signup')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('firstName', 'lastName', 'email', 'password'),
    Validation.checkRequestEmailIsEmail,
    Validation.checkEmailNotExists,
    UserController.createUser
  );

// Login
router.route('/auth/login')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('email', 'password'),
    UserController.loginUser
  );

// Register a business
router.route('/businesses')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('name', 'phoneno', 'location', 'category', 'services'),
    BusinessController.createBusiness
  );

// Modify a Business
router.route('/businesses/:businessId')
  .put(
    Validation.trimBodyValues,
    BusinessController.modifyBusiness
  );

// Delete a Business
router.route('/businesses/:businessId')
  .delete(BusinessController.deleteBusiness);

// Get a Business details
router.route('/businesses/:businessId')
  .get(BusinessController.getOneBusiness);

// Get all BUsiness in the App
router.route('/businesses')
  .get(
    SearchFilter.byLocation,
    SearchFilter.byCategory,
    BusinessController.getAllBusiness
  );

// Post reviews for a business
router.route('/businesses/:businessId/reviews')
  .post(
    Validation.trimBodyValues,
    Validation.checkBodyContains('name', 'review'),
    ReviewsController.addReview
  );

// Get all Reviews for a business
router.route('/businesses/:businessId/reviews')
  .get(ReviewsController.getReviews);

// 404 route
router.route('*')
  .all((req, res) => {
    res.status(404).send({
      message: 'That route does not exist!'
    });
  });

export default router;
