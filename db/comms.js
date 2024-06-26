const {getDb} = require("./db");

const TABLE_NAME = "Comms";

module.exports = {
    getAllComms: async () => {return await getDb().models.Comm.findAll();},
    getCommById: async (id) => { return await getDb().models.Comm.findByPk(id);},
    createComm: async (title, description) => {
        try {
            const newComm = await getDb().models.Comm.create({
                title,
                description,
            });
            return newComm;
        } catch (error) {
            // Можно добавить дополнительные действия при ошибке, например, логирование
            throw new Error(`Ошибка при создании отзыва: ${error.message}`);
        }
    },
}
