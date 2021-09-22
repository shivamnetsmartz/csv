const db = require("../models/course.model");
const Course = db.courses;

const fs = require("fs");
const csv = require("fast-csv");


const upload = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload a csv file.");
        }

        let courses = [];
        let path = __basedir + "./public/uploads" + req.file.filename;

        fs.createReadStream(path)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                courses.push(row);
            })
            .on("end", () => {
                Course.bulkCreate(courses)
                    .then(() => {
                        res.status(200).send({
                            message: "file uploaded successfully: " + req.file.originalname,
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: "fail to import csv file in database ",
                            error: error.message,
                        });
                    });
            });
    }
    catch (error) {
        res.status(500).send({
            message: "file not uploaded:" + req.file.originalname,
        });
    }
};


// controller to fetch the all courses

const getCourses = (req, res) => {
    Course.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "error while getting the courses from database.",
            });
        });
};



module.exports = {
    upload,
    getCourses
};