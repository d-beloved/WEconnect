export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { args: true, msg: 'email format is invalid!' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [6, 100], msg: 'password is too short! - make sure it is at least 6 characters' },
      },
    },
  });

  // Association is defined here
  User.associate = (models) => {
    User.hasMany(models.Business, { foreignKey: 'userId', as: 'businesses' });
    User.hasMany(models.Reviews, { foreignKey: 'userId', as: 'reviews' });
  };
  return User;
};
