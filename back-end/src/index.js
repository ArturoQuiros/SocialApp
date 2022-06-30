const express = require('express');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error')
const cors = require('cors');

const app = express();

const usersRouter = require("./routes/users.router");
const albumsRouter = require("./routes/albums.router");
const photosRouter = require("./routes/photos.router");

const port = 3333;

const url = 'mongodb+srv://panda:1234@cluster0.t8gjx.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());

//Allow requests only from google.com
app.use(cors({
  origin: 'https://www.google.com'
}));

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use("/api/users", usersRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/photos", photosRouter);

app.use((req, res) => {
  const error = new HttpError("Could not find this route...", 404);
  throw error;
});

app.use((error, req, res, next) =>{
  if(res.headerSent){
    return next(error)
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred!!'})
})

mongoose.connect(url).then(()=>{
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log(`Social app listening on port ${port}`);
  });
}).catch(() =>{
  console.log("Connection failed!");
});