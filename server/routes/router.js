import express from 'express';
import UserController from '../controllers/user';


// using router routes
const router = express.Router();

/** ********** My API ENDPOINTS **************** */

// Signup API
router.route('api/v1/auth/signup')
  .post(UserController.createUser);

export default router;
