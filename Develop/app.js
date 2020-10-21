const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeRoster = [];
let employeeId = 1;

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

      let manager = new Manager(
        eTeamManager,
        employeeId,
        eTeamManagerEmail,
        eTeamManagerOffice
      );

      employeeRoster.push(manager);
      employeeId++;

      getEmployeeInfo();
    });
}

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

      if (employeeRole === "Engineer") {
        inquirer
          .prompt([
            {
              message: "What is the engineer's GitHub username?",
              name: "githubInfo",
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
            let githubInfo = response.githubInfo;

            let engineer = new Engineer(
              employeeName,
              employeeId,
              employeeEmail,
              githubInfo,
            )

            employeeRoster.push(engineer);
            employeeId++;

            if (response.addAnotherEmployee === "Yes") {
              getEmployeeInfo();
            } else {
              renderHtml();
            }
          });
      } else {
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
         
            let intern = new Intern(
              employeeName,
              employeeId,
              employeeEmail,
              internSchool
            )

            employeeRoster.push(intern);
            employeeId++;

            if (response.addAnotherEmployee === "Yes") {
              getEmployeeInfo();
            } else {
              renderHtml();
            }
          });

      };
    });
};

function renderHtml() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(employeeRoster), "utf-8");
};

getManagerInfo();
