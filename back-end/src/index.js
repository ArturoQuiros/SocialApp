const express = require('express');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error')
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();

const usersRouter = require("./routes/users.router");
const albumsRouter = require("./routes/albums.router");
const photosRouter = require("./routes/photos.router");

const port = process.env.PORT;

const url = process.env.DB_CNN;

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials:true,
  exposedHeaders: ["token"]
}));

// app.use(cors({
//   origin: ['https://mern-photos-app.herokuapp.com'],
//   credentials:true,
//   exposedHeaders: ["token"]
// }));

app.use(express.static('public'));

app.use(express.json());

app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/photos", photosRouter);

app.get('*', (req, res) => {
  //console.log(__dirname.substring(0, __dirname.length-4));
  res.sendFile( __dirname.substring(0, __dirname.length-4) + '/public/index.html'); //sin /src
})

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