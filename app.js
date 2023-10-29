const inquirer = require('inquirer');
const db = require('./db');

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View All Departments':
      return viewAllDepartments();
    case 'View All Roles':
      return viewAllRoles();
    case 'View All Employees':
      return viewAllEmployees();
    case 'Add a Department':
      return addDepartment();
    case 'Add a Role':
      return addRole();
    case 'Add an Employee':
      return addEmployee();
    case 'Update an Employee Role':
      return updateEmployeeRole();
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }
}

async function viewAllDepartments() {
  const departments = await db.viewAllDepartments();
  console.table(departments);
  return mainMenu();
}

async function viewAllRoles() {
  const roles = await db.viewAllRoles();
  console.table(roles);
  return mainMenu();
}

async function viewAllEmployees() {
  const employees = await db.viewAllEmployees();
  console.table(employees);
  return mainMenu();
}

async function addDepartment() {
    const { departmentName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
        validate: input => input ? true : "Please enter a valid department name."
      }
    ]);
    await db.addDepartment(departmentName);
    console.log(`Added ${departmentName} to the database`);
    return mainMenu();
  }
  
  async function addRole() {
    const departments = await db.viewAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
      name,
      value: id
    }));


  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:',
      validate: input => input ? true : "Please enter a valid role title."
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:',
      validate: input => !isNaN(input) ? true : "Please enter a valid salary."
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department:',
      choices: departmentChoices
    }
  ]);

  await db.addRole(title, salary, departmentId);
  console.log(`Added ${title} role to the database`);
  return mainMenu();
}

async function addEmployee() {
    const roles = await db.viewAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const employees = await db.viewAllEmployees();
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: 'None', value: null });
  
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
        validate: input => input ? true : "Please enter a valid first name."
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
        validate: input => input ? true : "Please enter a valid last name."
      },
      {
        type: 'list',
        name: 'roleId',
        message: "Select the employee's role:",
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Select the employee's manager:",
        choices: managerChoices
      }
    ]);
  
    await db.addEmployee(firstName, lastName, roleId, managerId);
    console.log(`Added ${firstName} ${lastName} to the database`);
    return mainMenu();
  }
  async function updateEmployeeRole() {
    const employees = await db.viewAllEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const roles = await db.viewAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Select the employee to update:",
        choices: employeeChoices
      },
      {
        type: 'list',
        name: 'roleId',
        message: "Select the employee's new role:",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
    console.log(`Updated employee's role in the database`);
    return mainMenu();
  }
  
  mainMenu();