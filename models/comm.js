const {DataTypes} = require("sequelize");

const Comm = sequelize => sequelize.define('Comm', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = {
    Comm
}