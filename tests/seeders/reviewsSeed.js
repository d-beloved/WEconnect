import db from '../../server/models';

const { Reviews } = db;

const reviewSeed = {
  emptyReviewTable(done) {
    Reviews.destroy({ truncate: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setInput(content) {
    return {
      content
    };
  },
  addReview(done) {
    Reviews.create({
      review: 'A very good business and nice customer services',
      userId: 1,
      businessId: 1
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default reviewSeed;
