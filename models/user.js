const { DataTypes } = require("sequelize");

const User = (sequelize) => sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type:DataTypes.STRING,
            allowNull: false
        }
    });

module.exports = {
    User
};
