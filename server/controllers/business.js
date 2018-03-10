import models from '../../dummyDataModel';

const { Business } = models;

/**
 * creates the BUsiness components for creation, updating and deleting businesses
 */
class BusinessController {
  /**
   * Creates a new Business
   * @param{Object} req - api reuest
   * @param{Object} res - route response
   * @return{json} registered business details
   */
  static createBusiness(req, res) {
    Business
      .create({
        name: req.body.name,
        address: req.body.address || null,
        website: req.body.website || null,
        phoneno: req.body.phoneno,
        details: req.body.details || null,
        location: req.body.details,
        category: req.body.category,
        services: req.body.services
      })
      .then((business) => {
        res.status(201).send({ message: 'Your business has been created!', business });
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Modifies an existing Business
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} edited Business response
   */
  static modifyBusiness(req, res) {
    Business
      .findOne({ where: { id: req.params.businessId } })
      .then((business) => {
        if (business) { // if the business exists
          business
            .update({
              name: req.body.name || business.name,
              address: req.body.address || business.address,
              website: req.body.website || business.website,
              phoneno: req.body.phoneno || business.phoneno,
              details: req.body.details || business.details,
              location: req.body.details || business.location,
              category: req.body.category || business.category,
              services: req.body.services || business.services
            })
            .then((modifiedBusiness) => {
              res.status(200).send({ message: 'Business has been updated successfully!', business: modifiedBusiness });
            });
        } else {
          res.status(404).send({ message: 'cannot find the specifies business!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Deletes a specific Business
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} status of the request
   */
  static deleteBusiness(req, res) {
    Business
      .findOne({ where: { id: req.param.businessId } })
      .then((business) => {
        if (business) {
          business.destroy().then(res.status(200).send({ message: 'Business deleted!' }));
        } else {
          res.status(404).send({ message: 'cannot find the specified event' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Get a Business' detail
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} Registered business details
   */
  static getOneBusiness(req, res) {
    Business
      .findById(req.params.businessId)
      .then((business) => {
        if (business) {
          res.status(200).send({ message: 'Business shown below...', business });
        } else {
          res.status(404).send({ message: 'Cannot find the specified business!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Get all Businesses
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} Details of all the business
   */
  static getAllBusiness(req, res) {
    Business
      .all()
      .then((business) => {
        if (business) {
          res.status(200).send({ message: 'All Business delivered!', business });
        } else {
          res.status(404).send({ message: 'cannot find any center!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }
}

export default BusinessController;
