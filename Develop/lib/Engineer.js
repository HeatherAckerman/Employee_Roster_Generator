// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

//REMEMBER: CREATE IT TO PASS ALL TESTS

//Require Employee
const Employee = require('./Employee');

//Make constructor that takes info from Employee and asks for GitHub username and replaces Employee with Engineer
class Engineer extends Employee {

    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    };

    getGithub() {
        return this.github;
    };

    getRole() {
        return 'Engineer';
    };
};

//Turn it into a module.exports
module.exports = Engineer;