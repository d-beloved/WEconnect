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
}

export default SearchFilter;
