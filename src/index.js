// global modules
const path = require("path");
// npm modules
const express = require("express");
// within project
require("./db/mongoose")
const userRouter = require("./routers/userRouter")
const postsRouter = require("./routers/postsRouter")

const app = express();

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));
app.use(express.json());
app.use(userRouter)
app.use(postsRouter)


app.listen(port, () => {
  console.log(`Listening on port ${3000}`);
});
