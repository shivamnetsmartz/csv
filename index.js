const express = require("express");
const app = express();
const db = require("./models/server");
const csvRoutes = require("./routes/courseroute");

global.__basedir = __dirname +"/..";


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

csvRoutes(app);

// db.sequelize.sync();

db.sequelize.sync({ force: false}).then(() =>{
    console.log("drop and re-sync db. ");
});


let port = 3000;
app.listen(port, ()=>{
    console.log('Running at localhost:${port}.');
});