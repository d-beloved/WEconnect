import db from '../models';

const { Reviews } = db;

/**
 * @description - Manages the reviews for each business
 */
class ReviewsController {
  /**
   * @description - Adds a review for a business
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
  static addReview(req, res) {
    Reviews
      .create({
        review: req.body.review,
        userId: req.user.id,
        businessId: req.body.business.id
      })
      .then((reviews) => {
        res.status(201).send({ message: 'Review accepted. Thanks a lot!', reviews });
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * @description - Get all reviews for a business
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
  static getReviews(req, res) {
    Reviews
      .findAll({ where: { businessId: req.business.id } })
      .then((reviews) => {
        if (reviews) {
          res.status(200).send({ message: 'All reviews delivered!', reviews });
        } else {
          res.status(404).send({ message: 'Reviews not found!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }
}

export default ReviewsController;
