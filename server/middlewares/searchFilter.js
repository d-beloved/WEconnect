import models from '../../dummyDataModel';

const { Business } = models;

/**
 * @description - This searches for business by location or category
 */
class SearchFilter {
  /**
   * @description Searches and gets business by Location
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @param{Function} next - next middleware
   *
   * @return{undefined}
   */
  static byLocation(req, res, next) {
    const { location } = req.query;
    const locate = [];
    if (location) {
      for (let i = 0; i < Business.length; i += 1) {
        if (location.toLowerCase() === Business[i].location.toLowerCase()) {
          locate.push(Business[i]);
        }
      }
      return res.status(200).json(locate);
    }
    next();
  }

  /**
   * @description Searches and gets business by Category
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @param{Function} next - next middleware
   *
   * @return{undefined}
   */
  static byCategory(req, res, next) {
    const { category } = req.query;
    const categories = [];
    if (category) {
      for (let i = 0; i < Business.length; i += 1) {
        if (category.toLowerCase() === Business[i].category.toLowerCase()) {
          categories.push(Business[i]);
        }
      }
      return res.status(200).json(categories);
    }
    next();
  }
}

export default SearchFilter;
