const express = require("express");
const path = require("path");
const { connectDb } = require("./connectors/database");
const cookieParser = require("cookie-parser");
const { forceAuth, checkAuth, restrictTo } = require("./middleware/auth")

const { urlRouter } = require("./routers/url");
const { staticRouter } = require("./routers/static");
const { userRouter } = require("./routers/user")

const PORT = 8000;
const MONGO_URL = "mongodb://localhost:27017/short-url";
const app = express();

connectDb(MONGO_URL)
.then(() => {
  app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

// routes
app.use('/url', forceAuth, restrictTo(["NORMAL"]), urlRouter);
app.use('/user', userRouter);
app.use('/', checkAuth, staticRouter);