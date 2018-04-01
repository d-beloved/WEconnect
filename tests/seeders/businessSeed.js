import db from '../../server/models';

const { Business } = db;

const businessSeed = {
  emptyBusinessTable(done) {
    Business.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(name, address, website, phoneno, details, location, category, services) {
    return {
      name,
      address,
      website,
      phoneno,
      details,
      location,
      category,
      services
    };
  },
  setUpdateBusiness(name, address, website, phoneno, details, location, category, services) {
    return {
      name,
      address,
      website,
      phoneno,
      details,
      location,
      category,
      services
    };
  },
  addBusiness(done) {
    Business.create({
      name: 'Monravian fall',
      address: '8, Alluvial, SanJose, Lagos',
      website: 'www.monravian.com',
      phoneno: '0706534233',
      details: 'All over the wormkbvdvubv iuvbizbdcud dvubbdbdicc',
      userId: 1,
      location: 'Lagos',
      category: 'Praying',
      services: 'Working, walking, singing, Helping'
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default businessSeed;
