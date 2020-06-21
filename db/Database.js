const connetion = require("./connection");
/*
const Database {

    constructor(connection) {
        this.connection = connection;
    }

    createDepartment() {
        return this.connection.query(
            SELECT 
        );
    }    
    createEmployee() {
        return this.connection.query(
            SELECT 
        );
    }        
    createRole() {
        return this.connection.query(
             SELECT  
        );
    }
}

module.exports = new Database(connetion); */

const connection = require("./connection");
const inquirer = require("inquirer");

class Database {
  constructor() {
    this.connection = connection;
  }

  viewEmployees() {
    this.connection.query(
      "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager from employees LEFT JOIN roles ON (employees.role_id = roles.id) LEFT JOIN departments ON (roles.department_id = departments.id)",
      (err, result) => {
        if (err) throw err;
        console.table(result);
      }
    );
  }

 
      inquirer
        .prompt({
          type: "list",
          name: "choice",
          message: `Which ${message}:`,
          choices: list,
        })
        .then((answer) => {
          console.log(answer);
        });
    });
  }

  employeesByDepartment() {
    this.connection.query(
      `SELECT department FROM departments`,
      (err, result) => {
        if (err) throw err;
        const list = [];
        result.forEach((item) => {
              list.push(item.department);
        });

        inquirer
          .prompt({
            type: "list",
            name: "choice",
            message: "Which Department:",
            choices: list,
          })
          .then((answer) => {
            console.log(answer);

            this.connection.query(
              `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees LEFT JOIN roles ON (employees.role_id = roles.id) LEFT JOIN departments ON (roles.department_id = departments.id) WHERE departments.department =?`,
              [answer.choice],
              (err, result) => {
                if (err) throw err;
                console.log("answer.choice: ", answer.choice);
                        console.table(result);
              }
            );
          });
      }
    );
  }

  employeesByRole() {
    this.connection.query(`SELECT title FROM roles`, (err, result) => {
      if (err) throw err;
      const list = [];
      result.forEach((item) => {
        list.push(item.title);
      });

      inquirer
        .prompt({
          type: "list",
          name: "choice",
          message: "Which Role:",
          choices: list,
        })
        .then((answer) => {
          console.log(answer);

          this.connection.query(
            `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees LEFT JOIN roles ON (employees.role_id = roles.id) LEFT JOIN departments ON (roles.department_id = departments.id) WHERE roles.title =?`,
            [answer.choice],
            (err, result) => {
              if (err) throw err;
              console.log("answer.choice: ", answer.choice);
              console.table(result);
            }
          );
        });
    });
  }

  
  employeesByManager() {
        this.connection.query(`SELECT manager FROM employees`, (err, result) => {
      if (err) throw err;
      const list = [];
      result.forEach((item) => {
                list.push(item.manager);
      });

      inquirer
        .prompt({
          type: "list",
          name: "choice",
          message: "Which Manager:",
          choices: list,
        })
        .then((answer) => {
          console.log(answer);

          this.connection.query(
            `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees LEFT JOIN roles ON (employees.role_id = roles.id) LEFT JOIN departments ON (roles.department_id = departments.id) WHERE employees.manager =?`,
            [answer.choice],
            (err, result) => {
              if (err) throw err;
              console.log("answer.choice: ", answer.choice);

              console.table(result);
            }
          );
        });
    });
  }
  addEmployee() {
    this.connection.query(
      `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees LEFT JOIN roles ON (employees.role_id = roles.id) LEFT JOIN departments ON (roles.department_id = departments.id)`,
      (err, result) => {
        if (err) throw err;

        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "Please enter the employee's first name:",
            },
            {
              type: "input",
              name: "last_name",
              message: "Please enter the employee's last name:",
            },
            {
              type: "choice",
              name: "manager",
              message: "Please enter the employee's manager:",
              choices: ["choice 1", "choice 2", "choice 3"],
            },
            {
              type: "choice",
              name: "title",
              message: "Please enter the employee's role:",
              choices: ["choice 1", "choice 2", "choice 3"],
            },
          ])
          .then((answers) => {
            console.log(answers);
          });
      }
    );
  }

  addRole() {
    this.connection.query(
      `SELECT id, department FROM departments`,
      (err, result) => {
        if (err) throw err;
        const departmentList = [];
        result.forEach((department) => {
          departmentList.push(department);
        });
        console.log("department list ", departmentList);
        const departmentsArray = [];
        departmentList.forEach((department) => {
          departmentsArray.push(department.department);
        });
        console.log(departmentsArray);

        inquirer
          .prompt([
            {
              type: "input",
              name: "role",
              message: "Which role are you adding?",
            },
            {
              type: "input",
              name: "salary",
              message: "Please enter the salary for that role:",
            },
            {
              type: "list",
              name: "department",
              message: "Which department does the role work in?",
              choices: departmentsArray,
            },
          ])
          .then((answer) => {
            let id;
            departmentList.forEach((item) => {
              if (item.department === answer.department) {
                id = item.id;
              }
            });
            const roleArray = [];
            this.connection.query(`SELECT title FROM roles`, (err, result) => {
              if (err) throw err;
              result.forEach((role) => {
                roleArray.push(role.title);
              });
              console.log("Role Array", roleArray);
              if (roleArray.includes(answer.role)) {
                console.log(
                  `That role ${answer.role} already exists.  Enter a different role.`
                );
                this.addRole();
              } else {
                this.connection.query(
                  `INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)`,
                  [answer.role, answer.salary, id],
                  (err, result) => {
                    if (err) throw err;
                    console.log(`${answer.role} was added`);
                  }
                );
              }
            });
                    });
      }
    );
  }

  addDepartment() {
    const departmentsArray = [];
    this.connection.query(
      `SELECT department FROM departments`,
      (err, result) => {
        if (err) throw err;
        result.forEach((department) => {
          departmentsArray.push(department.department);
        });
      }
    );
    inquirer
      .prompt({
        type: "input",
        name: "department",
        message: "Please enter the name of the department you're adding:",
      })
      .then((answer) => {
        if (departmentsArray.includes(answer.department)) {
          console.log(
            `${answer.department} --Sorry, that department already exisits. Enter a different department name:`
          );
          this.addDepartment();
        } else {
          this.connection.query(
            `INSERT INTO departments (department) VALUES (?)`,
            [answer.department],
            (err, result) => {
              if (err) throw err;
              console.log(`The deparment ${answer.department} was successfully added.`);
            }
          );
        }
      });
  }

 
  updateEmployeeRole() {
       this.connection.query(
      `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.id, roles.department_id, departments.department, departments.id, roles.salary, employees.manager FROM employees LEFT JOIN roles ON (employees.role_id = roles.id) LEFT JOIN departments ON (roles.department_id = departments.id)`,
      (err, result) => {
        if (err) throw err;
        console.table(result);
        const roleArray = [];
        const firstLastArray = [];
        const idFirstLastArray = [];
        result.forEach((row) => {
          roleArray.push(row.title);
          idFirstLastArray.push({
            id: row.id,
            first: row.first_name,
            last: row.last_name,
          });
          firstLastArray.push(row.first_name + " " + row.last_name);
        });
        console.log(firstLastArray);
        console.log(idFirstLastArray);

        inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Please select the employee you would like to update:",
              choices: firstLastArray,
            },
            {
              type: "list",
              name: "newRole",
              message: "Please enter the employee's new role:",
              choices: roleArray,
            },
          ])
          .then((answers) => {
            console.log(answers);

            this.connection.query(``);
          });
      }
    );
  }

  viewAllRoles() {
    this.connection.query("SELECT title FROM roles", (err, result) => {
      if (err) throw err;
      console.table(result);
    });
  }

  viewAllDepartments() {
    this.connection.query(
      "SELECT department FROM departments",
      (err, result) => {
        if (err) throw err;
        console.table(result);
      }
    );
  }
  quitApp() {
    console.log("Goodbye");
    this.connection.end();
  }
}

module.exports = Database;
