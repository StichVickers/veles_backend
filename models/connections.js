const createConnections = sequelize => {
    const {User,Comm} = sequelize.models;
    User.hasMany(Comm);
    Comm.belongsTo(User);
  }
  module.exports = createConnections;