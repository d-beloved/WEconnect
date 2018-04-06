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
    if (location && !category) {
      Business
        .findAll({ where: { location: req.query.location } })
        .then((business) => {
          if (business.length > 0) {
            res.status(200).send({ message: 'Businesses with the location found', business });
          } else {
            res.status(404).send({ message: 'No Businesses with that location found!' });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    }

    if (category && !location) {
      Business
        .findAll({ where: { category: req.query.category } })
        .then((business) => {
          if (business.length > 0) {
            res.status(200).send({ message: 'Businesses with the category found', business });
          } else {
            res.status(404).send({ message: 'No Businesses with that category found' });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    }

    if (location && category) {
      Business
        .findAll({
          where: {
            category: req.query.category,
            location: req.query.location
          }
        })
        .then((business) => {
          if (business.length > 0) {
            res.status(200).send({ message: 'Businesses with the location and category found', business });
          } else {
            res.status(404).send({ message: 'No business with the specified category and location found!' });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    } else if (!location && !category) {
      next();
    }
  }
}

export default SearchFilter;
