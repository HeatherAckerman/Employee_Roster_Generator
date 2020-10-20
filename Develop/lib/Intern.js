// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

//REMEMBER: CREATE IT TO PASS ALL TESTS

//Require Employee
const Employee = require('./Employee');

//Create constructor that takes Employee and adds School info then overrides Employee with Intern
class Intern extends Employee {

    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    };

    getSchool() {
        return this.school;
    };

    getRole() {
        return 'Intern';
    };
};

//Turn into a module.exports
module.exports = Intern;