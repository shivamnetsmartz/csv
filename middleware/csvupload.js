const multer = require ("multer");

const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")){
        cb(null, true);
    } 
    else{
        cb("Only csv file is allowed.", false)
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, __basedir + "assests/uploads/");
    },
    filename: (req, file, cb) =>{
        console.log(file.originalname);
        cb(null, `${Date.now()}-shivam-${file.originalname}`);
    },
});


var uploadFile = multer({ storage:storage, fileFilter: csvFilter });
module.exports = uploadFile;