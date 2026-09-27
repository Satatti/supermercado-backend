const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provider = sequelize.define('Provider', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
                                  allowNull: false,
                                  validate: {
                                      notEmpty: { msg: 'El nombre del proveedor no puede estar vacío' }
                                  }
    },
    phone: {
        type: DataTypes.STRING(20),
                                  allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
                                  allowNull: true,
                                  validate: {
                                      isEmail: { msg: 'Debe ser un correo válido' }
                                  }
    },
    city: {
        type: DataTypes.STRING(100),
                                  allowNull: true
    }
}, {
    tableName: 'providers',
    timestamps: true
});

module.exports = Provider;
