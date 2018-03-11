import models from '../../dummyDataModel';

const { Reviews, Business } = models;

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
    for (let i = 0; i < Business.length; i += 1) {
      if (Business[i].id === parseInt(req.params.Business.id, 10)) {
        Reviews.push({
          name: req.body.name,
          review: req.body.review
        });
        return res.status(201).json({
          message: 'Review accepted. Thanks a lot!',
          error: false
        });
      } 
    }
    return res.status(404).json({
      message: 'Business not found',
      error: true
    })
  }
}

export default ReviewsController;
