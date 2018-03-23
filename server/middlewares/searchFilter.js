import models from '../../dummyDataModel';

const { Business } = models;

/**
 * @description - This searches for business by location or category
 */
class SearchFilter {
  /**
   * @description Searches and gets business by Location and category
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @param{Function} next - next middleware
   *
   * @return{undefined}
   */
  static byLocationORCategory(req, res, next) {
    const { location, category } = req.query;
    const locate = [];
    const categories = [];

    if (location) {
      for (let i = 0; i < Business.length; i += 1) {
        if (location.toLowerCase() === Business[i].location.toLowerCase()) {
          locate.push(Business[i]);
        }
      }
      if (locate.length === 0) {
        return res.status(404).json({
          message: 'There is no business with that location',
          error: true
        });
      }
      return res.status(200).json(locate);
    }

    if (category) {
      for (let i = 0; i < Business.length; i += 1) {
        if (category.toLowerCase() === Business[i].category.toLowerCase()) {
          categories.push(Business[i]);
        }
      }
      if (categories.length === 0) {
        return res.status(404).json({
          message: 'There is no business in that category',
          error: true
        });
      }
      return res.status(200).json(categories);
    }
    next();
  }
}

export default SearchFilter;
