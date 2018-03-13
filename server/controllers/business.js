import models from '../../dummyDataModel';

const { Business } = models;

/**
 * @description - creates the BUsiness components for creation, updating and deleting businesses
 */
class BusinessController {
  /**
   * @description - Creates a new Business
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @return{json} registered business details
   */
  static createBusiness(req, res) {
    Business.push({
      id: Business.length + 1,
      name: req.body.name,
      address: req.body.address || null,
      website: req.body.website || null,
      phoneno: req.body.phoneno,
      details: req.body.details || null,
      location: req.body.details,
      category: req.body.category,
      services: req.body.services
    });
    return res.status(201).json({
      message: 'Your business has been created!',
      error: false
    });
  }

  /**
   * @description - Modifies an existing Business
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @return{json} edited Business response
   */
  static modifyBusiness(req, res) {
    for (let i = 0; i < Business.length; i += 1) {
      if (Business[i].id === parseInt(req.params.businessId, 10)) {
        Business[i].name = req.body.name || Business[i].name;
        Business[i].address = req.body.address || Business[i].address;
        Business[i].website = req.body.website || Business[i].website;
        Business[i].phoneno = req.body.phoneno || Business[i].phoneno;
        Business[i].details = req.body.details || Business[i].details;
        Business[i].location = req.body.details || Business[i].location;
        Business[i].category = req.body.category || Business[i].category;
        Business[i].services = req.body.services || Business[i].services;
        return res.status(200).json({
          message: 'Business updated successfully!',
          error: false
        });
      }
    }
    return res.status(404).json({
      message: 'Business not found!',
      error: true
    });
  }

  /**
   * @description - Deletes a specific Business
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @return{json} status of the request
   */
  static deleteBusiness(req, res) {
    for (let i = 0; i < Business.length; i += 1) {
      if (Business[i].id === parseInt(req.params.businessId, 10)) {
        Business.splice(i, 1);
        return res.status(200).json({
          message: 'Business deleted successfully',
          error: false
        });
      }
    }
    return res.status(404).json({
      message: 'Business not found!',
      error: true
    });
  }

  /**
   * @description - Get a Business' detail
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @return{json} Registered business details
   */
  static getOneBusiness(req, res) {
    for (let i = 0; i < Business.length; i += 1) {
      if (Business[i].id === parseInt(req.params.businessId, 10)) {
        return res.status(200).json(Business[i]);
      }
    }
    return res.status(404).json({
      message: 'Business not found!',
      error: true
    });
  }

  /**
   * @description - Get all Businesses
   *
   * @param{Object} req - api request
   *
   * @param{Object} res - route response
   *
   * @return{json} Details of all the business
   */
  static getAllBusiness(req, res) {
    return res.status(200).json({
      Business,
      error: false
    });
  }
}

export default BusinessController;
