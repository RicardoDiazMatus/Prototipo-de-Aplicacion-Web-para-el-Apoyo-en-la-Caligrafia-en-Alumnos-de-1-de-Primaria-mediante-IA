const studentController = require('./student');
const profesorController = require('./professor');
const adminController = require('./admin');

module.exports = {
    ...studentController,
    ...profesorController,
    ...adminController,
}
