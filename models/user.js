const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
                              allowNull: false,
                              validate: {
                                  notEmpty: { msg: 'El nombre del usuario no puede estar vacío' }
                              }
    },
    email: {
        type: DataTypes.STRING(100),
                              allowNull: false,
                              unique: {
                                  msg: 'El email ya está registrado'
                              },
                              validate: {
                                  isEmail: { msg: 'Debe ser un correo válido' },
                              notEmpty: { msg: 'El email no puede estar vacío' }
                              }
    },
    role: {
        type: DataTypes.ENUM('admin', 'vendedor', 'cliente'),
                              allowNull: false,
                              defaultValue: 'cliente',
                                  validate: {
                                      isIn: {
                                          args: [['admin', 'vendedor', 'cliente']],
                                          msg: 'El rol debe ser admin, vendedor o cliente'
                                      }
                                  }
    }
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;
