# Employee Tracker

## Description

Employee Tracker is a command-line application designed to manage a company's employee database. Developed using Node.js, Inquirer, and MySQL, this application provides an easy-to-use interface for business owners to view and interact with their employee data, helping to organize and plan their business more effectively.

- **Motivation**: The motivation behind creating this application was to provide a simple yet powerful tool for managing employee information, which is a crucial aspect of any business.
- **Why**: This project was built to solve the challenge of managing complex employee data in a structured and user-friendly manner.
- **Problem it Solves**: It simplifies the process of viewing and updating employee information, handling departments, roles, and employee data seamlessly.
- **What I Learned**: Through the development of this application, I gained a deeper understanding of SQL databases, Node.js, and command-line interactions, enhancing my skills in backend development.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [How to contribute](#how-to-contribute)

## Installation

To get started, follow these steps:

1. Ensure that Node.js and MySQL are installed on your machine.
2. Clone the repository to your local machine.
3. Run `npm install` to install the necessary dependencies.
4. Create a `.env` file in the root directory of the project, and add your MySQL credentials:

    ```env
    DB_HOST=your_mysql_host
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=employee_db
    ```

5. Run the schema and seeds SQL scripts in MySQL to set up the database.

## Usage

To start the application, run: node index.js

Navigate through the menu and follow the prompts to view, add, or update information in the employee database:

![Screenshot](images/screenshot.png)

## Demo

[Click here](https://youtu.be/0ZamdH_5OH4) to view the demo video. 

## Credits

- [Inquirer.js](https://www.npmjs.com/package/inquirer)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Node.js](https://nodejs.org/en)

## License

This project is licensed under the MIT License

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

## Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles

## How to Contribute

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Ensure to update tests as appropriate.
