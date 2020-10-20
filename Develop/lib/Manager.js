// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

//REMEMBER: CREATE IT TO PASS ALL TESTS

//Require Employee
const Employee = require('./Employee');

//Create constructor that adds officeNumber to Employee info and replaces the Employee with Manager
class Manager extends Employee {

    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };

    getOfficeNumber() {
        return this.officeNumber;
    };

    getRole() {
        return 'Manager';
    };
};

//Turn it into a module.exports
module.exports = Manager;