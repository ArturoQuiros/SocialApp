const express = require('express');
const app = express();

const usersRouter = require("./routes/users.router");
const albumsRouter = require("./routes/albums.router");
const photosRouter = require("./routes/photos.router");

const port = 3333;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use("/", usersRouter);
app.use("/", albumsRouter);
app.use("/", photosRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});