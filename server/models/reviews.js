export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    review: {
      allownull: false,
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Businesses',
        key: 'id'
      },
    },
  });

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'CASCADE'
    });
    Reviews.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });
  };

  return Reviews;
};
