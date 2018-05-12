import db from '../models';

const { Reviews, Business } = db;

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
    Business
      .findOne({ where: { id: req.params.businessId } })
      .then((business) => {
        if (!business) {
          return res.status(404).send({ message: 'Business not found!' });
        }
        Reviews
          .create({
            review: req.body.review,
            userId: req.userData.id,
            businessId: req.params.businessId
          })
          .then((reviews) => {
            res.status(201).send({ message: 'Review accepted. Thanks a lot!', reviews });
          })
          .catch((err) => {
            res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
          });
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
    Business
      .findOne({ where: { id: req.params.businessId } })
      .then((business) => {
        if (!business) {
          return res.status(404).send({ message: 'Business not found!' });
        }
        Reviews
          .findAll({ where: { businessId: req.params.businessId } })
          .then((reviews) => {
            if (reviews.length > 0) {
              res.status(200).send({ message: 'All reviews delivered!', reviews });
            } else {
              res.status(404).send({ message: 'No reviews for this business YET!' });
            }
          })
          .catch((err) => {
            res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
          });
      });
  }
}

export default ReviewsController;
