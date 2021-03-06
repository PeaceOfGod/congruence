const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { sendError } = require('./lib/responseHandler');
 
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

const Artisan = require("./resources/Artisan");
const Project = require("./resources/Project");

app.use("/api/v1/artisans", Artisan);
app.use("/api/v1/projects", Project);

//Connect to mongodb
mongoose.connect("mongodb+srv://Wisdom:DShX5RERA6OTTG0O@cluster0-zh4ss.mongodb.net/congruence?retryWrites=true", {
        useNewUrlParser: true
})
.then(() => { console.log("Connected to online db") })
.catch(err => { console.log("Error connection to online db" , err)});

app.use((error, req, res, next) => {
  let code = error.code || 'SERVER_ERROR',
    status = error.status || 500,
    errors = error.errors || (error.message ? [error.message] : []);

  res.status(status)
    .json({
      status: status,
      code: code,
      errors: errors
    });
});


app.listen(PORT, () => {
	console.log("Application listening at port " + PORT);
})