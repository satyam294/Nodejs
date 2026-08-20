const express = require("express");
const { connectDb } = require("./connectors/database");
const { urlRouter } = require("./routers/url");

const PORT = 8000;
const MONGO_URL = "mongodb://localhost:27017/short-url";
const app = express();

connectDb(MONGO_URL)
.then(() => {
  app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));
});

app.use(express.json());

// routes
app.use('/url', urlRouter);