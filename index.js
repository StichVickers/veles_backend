const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const userRouter = require("./routes/user");
const commRouter = require("./routes/comm");
const {initDb} = require("./db/db");

const app = express();
app.use(express.json());
app.use(cookies());
app.use(
    cors({
        credentials: true,
        origin: true 
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});

app.use("/user", userRouter);
app.use("/comm", commRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(async function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = process.env.PORT || 3001;
(async () => {
    await initDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    });
})();