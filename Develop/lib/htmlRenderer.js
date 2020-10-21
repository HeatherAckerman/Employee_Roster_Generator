const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");

const templatesDir = path.resolve(__dirname, "../templates");

//Require Employee, Engineer, Intern, and Manager
const Employee = require("./Employee");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");

//Create an empty array to push the Employees to
let employeeRoster = [];
//Create a counter to keep track of Employee ID
let employeeId = 1;
//There can only be one Manager per team so start by using prompts to get the Manager's info so there are less choices
function getManagerInfo() {

  inquirer
    .prompt([
      {
        message: "What is the name of the engineering team's manager?",
        name: "eTeamManager",
        type: "input"
      },
      {
        message: "What is the manager's email address?",
        name: "eTeamManagerEmail",
        type: "input"
      },
      {
        message: "What is the manager's office number?",
        name: "eTeamManagerOffice",
        type: "input"
      },
    ])
    .then(function (response) {
      let eTeamManager = response.eTeamManager;
      let eTeamManagerEmail = response.eTeamManagerEmail;
      let eTeamManagerOffice = response.eTeamManagerOffice;
      //Create new manager //ID has to go second!
      let manager = new Manager(
        eTeamManager,
        employeeId,
        eTeamManagerEmail,
        eTeamManagerOffice
      );
      console.log(manager)
      //Push Manager to the empty array AND INCREASE ID #
      employeeRoster.push(manager);
      employeeId++
      //Go to next set of prompts
      getEmployeeInfo()
    });
}

//Ask for the Employee's name and email and ask if they are an Engineer or Intern
function getEmployeeInfo() {
  inquirer
    .prompt([
      {
        message: "What is the name of the employee?",
        name: "employeeName",
        type: "input"
      },
      {
        message: "What is the employee's email address?",
        name: "employeeEmail",
        type: "input"
      },
      {
        message: "What is the employee's role?",
        name: "employeeRole",
        type: "list",
        choices: ["Engineer", "Intern"]
      },
    ])
    .then(function (response) {
      let employeeName = response.employeeName;
      let employeeEmail = response.employeeEmail;
      let employeeRole = response.employeeRole;

      //If they are an Engineer ask for thier Github info
      if (employeeRole === "Engineer") {
        inquirer
          .prompt([
            {
              message: "What is the engineer's GitHub username?",
              name: "githubInfo",
              type: "input"
            },
            //Ask if they want to add another employee before creating the engineer
            {
              message: "Would you like to add another employee?",
              name: "addAnotherEmployee",
              type: "list",
              choices: ["Yes", "No"]
            }
          ])
          .then(function (response) {
            let githubInfo = response.githubInfo;

            //Create new Engineer //ID has to go second!
            let engineer = new Engineer(
              employeeName,
              employeeId,
              employeeEmail,
              githubInfo,
              employeeRole
            )
            console.log(engineer)
            //Push the Employee to the array AND INCREASE ID #
            employeeRoster.push(engineer);
            employeeId++;

            //WHAT TO DO IF THEY WANT TO ADD ANOTHER EMPLOYEE





          });
      }
      //If they are an Intern ask for their School info
      else {
        inquirer
          .prompt([
            {
              message: "Where did the intern go to school?",
              name: "internSchool",
              type: "input"
            },
            {
              message: "Would you like to add another employee?",
              name: "addAnotherEmployee",
              type: "list",
              choices: ["Yes", "No"]
            }
          ])
          .then(function (response) {
            let internSchool = response.internSchool;
            //Create new Intern //ID has to go second!
            let intern = new Intern(
              employeeName,
              employeeId,
              employeeEmail,
              internSchool
            )
            console.log(intern)
            //Push the Intern to the array AND INCREASE ID #
            employeeRoster.push(intern);
            employeeId++;

            //WHAT TO DO IF THEY WANT TO ADD ANOTHER EMPLOYEE





          });

      }
    })
    console.log(employeeRoster)
}

getManagerInfo();

const render = employees => {
  const html = [];

  html.push(...employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
