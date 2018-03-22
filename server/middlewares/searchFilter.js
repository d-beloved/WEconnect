import db from '../models';

const { Business } = db;

/**
 * @description - This searches for business by location or category
 */
class SearchFilter {
  /**
   * @description Searches and gets business by Location or by category
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @param{Function} next - next middleware
   *
   * @return{undefined}
   */
  static byLocationOrCategory(req, res, next) {
    const { location, category } = req.query;
    if (location) {
      Business
        .findAll({ where: { location: req.params.location } })
        .then((business) => {
          if (business) {
            res.status(200).send({ business });
          } else {
            res.status(404).send({ message: 'No Businesses with that location found!' });
          }
        });
    }

    if (category) {
      Business
        .findAll({ where: { category: req.params.location } })
        .then((business) => {
          if (business) {
            res.status(200).send({ business });
          } else {
            res.status(404).send({ message: 'No Businesses with that category found' });
          }
        });
    } else if (!location || !category) {
      next();
    }
  }
}

export default SearchFilter;
