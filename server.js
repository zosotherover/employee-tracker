// require inquirer and console.table

// create a prompt when the app is started
// this will ask the user what they'd like to do
// choices: [
/* {
        name: 
        value: 
    }
] */

//if the user selects to view employess, it's going to call the getEmployees function down below.
// inside of that function call the findEmplyees query function in the Database class that we created

// require inquirer and console.table
const inquirer = require("inquirer");

// require the Database class
const Database = require("./db/Database");
const db = new Database();

const connection = require("./db/connection");

// Prompt the user how they would like to begin then execute the corresponding function

const startApp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "How would you like to start?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Role",
          "View all Employees By Manager",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update Employee Role",
          "View All Roles",
          "View All Departments",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      if (answer.choice === "View All Employees") {
        db.viewEmployees();
      } else if (answer.choice === "View All Employees By Department") {
        db.employeesByDepartment();
      } else if (answer.choice === "View All Employees By Role") {
        db.employeesByRole();
      } else if (answer.choice === "View all Employees By Manager") {
        db.employeesByManager();
      } else if (answer.choice === "Add Employee") {
        db.addEmployee();
      } else if (answer.choice === "Add Role") {
        db.addRole();
      } else if (answer.choice === "Add Department") {
        db.addDepartment();
      } else if (answer.choice === "Update Employee Role") {
        db.updateEmployeeRole();
      } else if (answer.choice === "View All Roles") {
        db.viewAllRoles();
      } else if (answer.choice === "View All Departments") {
        db.viewAllDepartments();
      } else {
        db.quitApp();
      }
    });
};

startApp();
