'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reviews = sequelize.define('Reviews', {
    title: DataTypes.STRING
  }, {});
  Reviews.associate = function(models) {
    // associations can be defined here
  };
  return Reviews;
};