// // TODO: Write code to define and export the Employee class

//REMEMBER: CREATE IT TO PASS ALL TESTS

// Create employee class with a constructor include name, id, and email
class Employee {

    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    };

    getName() {
        return this.name;
    };

    getId() {
        return this.id;
    };

    getEmail() {
        return this.email;
    };

    getRole() {
        return "Employee";
    };
};

// Make it a module.exports
module.exports = Employee;
