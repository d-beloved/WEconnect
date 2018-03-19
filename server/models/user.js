export default (sequelize. DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: { args: /^[A-Za-z_](\w|_|[0-9])*$/, msg: 'Firstname format is invalid! - make sure it is at least 2 characters' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: { args: /^[A-Za-z_](\w|_|[0-9])*$/, msg: 'Lastname format is invalid! - make sure it is at least 2 characters' },
      },
    },
  })
}
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    title: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};