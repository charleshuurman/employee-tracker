const connection = require('./db.js');

class DB {
  // *** query functions:

  //View all departaments
  async viewAllDepartments() {
    const [rows] = await this.connection.query('SELECT * FROM department');
    return rows;
  }
  
  //View all roles
  async viewAllRoles() {
    const query = `
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      LEFT JOIN department ON role.department_id = department.id
    `;
    const [rows] = await this.connection.query(query);
    return rows;
  }

  // View All Employees
  async viewAllEmployees() {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, 
             role.title, department.name AS department, role.salary, 
             CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;
    const [rows] = await this.connection.query(query);
    return rows;
  }

  //Add a Department
  async addDepartment(departmentName) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    const [result] = await this.connection.query(query, [departmentName]);
    return result;
  }

  //Add a Role
  async addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const [result] = await this.connection.query(query, [title, salary, departmentId]);
    return result;
  }

  //Add an Employee
  async addEmployee(firstName, lastName, roleId, managerId) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const [result] = await this.connection.query(query, [firstName, lastName, roleId, managerId]);
    return result;
  }

  //Update an Employee Role
  async updateEmployeeRole(employeeId, roleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const [result] = await this.connection.query(query, [roleId, employeeId]);
    return result;
  }


  
}

module.exports = new DB(connection);
