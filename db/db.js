const {Sequelize} = require('sequelize');
let db;

const initDb = async () => {
    if (!db) {
        db = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite3'
        });
        const models = [
            require('../models/user.js').User,
            require('../models/comm.js').Comm,
        ];
        for(const model of models) {
            model(db);
        }
        db.sync();
    }
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
}

