const connection = require('./db.js');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // View all departments
  async viewAllDepartments() {
    try {
      const [rows] = await this.connection.query('SELECT * FROM department');
      return rows;
    } catch (error) {
      console.error('Error in viewAllDepartments:', error.message);
      throw error;
    }
  }

  // View all roles
  async viewAllRoles() {
    try {
      const query = `
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        LEFT JOIN department ON role.department_id = department.id
      `;
      const [rows] = await this.connection.query(query);
      return rows;
    } catch (error) {
      console.error('Error in viewAllRoles:', error.message);
      throw error;
    }
  }

  // View all employees
  async viewAllEmployees() {
    try {
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
    } catch (error) {
      console.error('Error in viewAllEmployees:', error.message);
      throw error;
    }
  }

  // Add a department
  async addDepartment(departmentName) {
    try {
      const query = 'INSERT INTO department (name) VALUES (?)';
      const [result] = await this.connection.query(query, [departmentName]);
      return result;
    } catch (error) {
      console.error('Error in addDepartment:', error.message);
      throw error;
    }
  }

  // Add a role
  async addRole(title, salary, departmentId) {
    try {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      const [result] = await this.connection.query(query, [title, salary, departmentId]);
      return result;
    } catch (error) {
      console.error('Error in addRole:', error.message);
      throw error;
    }
  }

  // Add an employee
  async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const [result] = await this.connection.query(query, [firstName, lastName, roleId, managerId]);
      return result;
    } catch (error) {
      console.error('Error in addEmployee:', error.message);
      throw error;
    }
  }

  // Update an employee role
  async updateEmployeeRole(employeeId, roleId) {
    try {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      const [result] = await this.connection.query(query, [roleId, employeeId]);
      return result;
    } catch (error) {
      console.error('Error in updateEmployeeRole:', error.message);
      throw error;
    }
  }
}

module.exports = new DB(connection);
