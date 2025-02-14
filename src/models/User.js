const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'El correo electrónico debe tener un formato válido.'
                }
            }
        },
        //validar que pasword contenga minimo 6 caracteres
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 50],
                    msg: 'La contraseña debe tener al menos 6 caracteres.'
                }
            }
        },

      
       
    }, {
        timestamps: true,
    });
};