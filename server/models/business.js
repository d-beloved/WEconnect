export default (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isUrl: { args: true, msg: 'Web address invalid. Enter a valid web address for your business' },
      },
    },
    phoneno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Telephone Number is required'
        },
        isInt: {
          msg: 'Enter a valid Telephone Number'
        },
        len: {
          args: [7, 11],
          msg: 'Telephone Number should be 7 to 11 characters'
        },
      }
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    services: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
  });

  Business.associate = (models) => {
    Business.hasMany(models.Reviews, {
      foreignKey: 'businessId',
      as: 'reviews'
    });
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Business;
};
