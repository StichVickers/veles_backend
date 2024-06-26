const express = require('express');
const {getAllComms, createComm, getCommById} = require("../db/comms");
const {NotFoundError} = require("../errors");
const commRouter = express.Router();

commRouter.get("/", async (req, res, next) => {
    try {
        const comms = await getAllComms();
        res.status(200).json(comms);
    } catch (err) {
        next(err);
    }
});

commRouter.get("/:id", async (req, res, next) => {
    try {


        const comm = await getCommById(req.params.id);

        if (!comm) {
            throw new NotFoundError("Отзыв не найден");
        }

        res.status(200).json(comm);
    } catch (err) {
        next(err);
    }
});


commRouter.post("/", async (req, res, next) => {
    try {
        const { title, description } = req.body;

        // Проверка наличия необходимых данных
        if (!title || !description) {
            return res.status(400).json({ message: "Отсутствуют необходимые данные для создания отзыва." });
        }

        // Создание нового отзыва в базе данных
        const newComm = await createComm(title, description);

        res.status(201).json(newComm); // Возвращаем созданный отзыв с кодом 201 Created
    } catch (err) {
        next(err);
    }
});



module.exports = commRouter;