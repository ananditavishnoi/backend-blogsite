const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT || 3006;
const blogRouter = require("./api/routes/blog");
const userRouter = require("./api/routes/user");

mongoose.connect('mongodb+srv://admin:12345@blog-website.zwzwd.mongodb.net/blog-website?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use("/blog", blogRouter);
app.use("/user", userRouter);
app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
});

app.listen(port, () => {
    console.log("server started")
});