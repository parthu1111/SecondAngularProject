require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors=require('cors');
const app= express();
const PORT = process.env.PORT || process.env.APP_PORT;

const userRouter=require('./routes/user.route');


require('./controller/user.controller');
app.use(cors());


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to parth application." });
  });

app.use('/auth',userRouter);

app.listen(PORT,(err)=>{

    if(err){
        throw err;
    }
    console.log("server running on port " + PORT);
});