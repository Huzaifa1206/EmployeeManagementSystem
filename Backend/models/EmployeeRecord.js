const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema(
    {
        name : { type : String, required : true},
        email : { type: String, required : true, unique : true},
        number : { type : String, required : true},
        job_title : { type : String, required : true},
        department : { type: String, required : true},
        salary : { type: String, required : true}
    }
);
const model = mongoose.model('EmplyeeData', EmployeeSchema) 
module.exports = model