
const {getDb} = require("./db");


const TABLE_NAME = "Users";

module.exports = {
    addUser: async (login, password,role) => {
        return await getDb().models.User.create({
            login,
            password,
            role
        });
    },
    getUsers: async () => {return await getDb().models.User.findAll()},
    getUserByLogin: async (login) => {return await getDb().models.User.findOne({where: {login}})},
    getUserById: async (id) => { return await getDb().models.User.findByPk(id)},
};