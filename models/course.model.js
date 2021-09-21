module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
        courseName: {
            type: Sequelize.STRING
        },
        courseDescription: {
            type: Sequelize.STRING
        },
        coursePublished: {
            type: Sequelize.BOOLEAN
        }
    });
    return Course
};