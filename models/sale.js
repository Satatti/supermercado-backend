const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
                              allowNull: false,
                              defaultValue: 0,
                                  validate: {
                                      min: {
                                          args: [0],
                              msg: 'El total no puede ser negativo'
                                      }
                                  }
    }
}, {
    tableName: 'sales',
    timestamps: true
});

module.exports = Sale;
