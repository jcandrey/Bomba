const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('checkout', {
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
      },
    apartament: {
        type: DataTypes.STRING,
        allowNull: false
      },
    street: {
        type: DataTypes.STRING,
        allowNull: false
      },
    number: {
        type: DataTypes.STRING,
        allowNull: false
      },
    comentario: {
        type: DataTypes.STRING,
       // allowNull: true
      },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
      }
  });
};