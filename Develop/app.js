const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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
            )
           
            //Push the Employee to the array AND INCREASE ID #
            employeeRoster.push(engineer);
            employeeId++;

            //WHAT TO DO IF THEY WANT TO ADD ANOTHER EMPLOYEE
            if (response.addAnotherEmployee === "Yes") {
              getEmployeeInfo();
            }else {
              //RENDERPAGE
              renderHtml();
            }
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
            //Push the Intern to the array AND INCREASE ID #
            employeeRoster.push(intern);
            employeeId++;

            //WHAT TO DO IF THEY WANT TO ADD ANOTHER EMPLOYEE
            if (response.addAnotherEmployee === "Yes") {
              getEmployeeInfo();
            }else {
              //RENDERPAGE
              renderHtml();
            }
          });

      }
    })
    console.log(employeeRoster)
}

function renderHtml() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employeeRoster), "utf-8");
}
getManagerInfo();
