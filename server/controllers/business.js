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
}

export default BusinessController;
