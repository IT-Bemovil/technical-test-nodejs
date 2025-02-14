const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('toDo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //validar que pasword contenga minimo 6 caracteres
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pending'
        },

       
    }, {
        timestamps: true,
    });
};