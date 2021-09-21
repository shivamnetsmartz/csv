const express = require("express");
const router = express.Router();
const csvControll= require("../controller/csvcontroller");
const upload = require("../middleware/csvupload");

let routes = (app) =>{
    router.post("/uploadcsv", upload.single("file"), csvControll.upload);
    router.get("/getCourses", csvControll.getCourses);

    app.use("/api/csv", router);
};

module.exports = routes;