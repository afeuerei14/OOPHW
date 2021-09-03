const fs = require('fs');
const inquirer = require('inquirer');
const Engineer = require("./data/engineer");
const Intern = require("./data/intern");
const Manager = require("./data/manager");
const teamMembers = [];
let manager;
let teamTitle;
function managerData() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "teamTitle"
        },
        { 
            type: "input",
            message: "Who is the manager of this project?",
            name: "managerName"
        },
        {  
            type: "input",
            message: "What is yourID?",
            name: "managerID"
        },
        {  
            type: "input",
            message: "What is your email?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber"
        }]).then(managerAnswers => {
            manager = new Manager(managerAnswers.managerName, managerAnswers.managerID, managerAnswers.managerEmail, managerAnswers.officeNumber);
            teamTitle = managerAnswers.teamTitle;
            console.log("Now we will ask for employee information.")
            otherEmployeesData();
        });
}

function otherEmployeesData() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is your role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },
        {
            type: "input",
            message: "What is your name?",
            name: "employeeName"
        },
        {
            type: "input",
            message: "What is your id?",
            name: "employeeId"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "employeeEmail"
        },
        {
            type: "input",
            message: "What is the engineer's Github?",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        {
            type: "input",
            message: "What's the intern's school?",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another team member?"
        }
    ]).then(answers => {
 
        if (answers.employeeRole === "Intern") {
            const employee = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
            teamMembers.push(employee);
        } else if (answers.employeeRole === "Engineer") {
            teamMembers.push(new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github));
        }
        if (answers.newEmployee === true) {
            otherEmployeesData();
        } else {
        
            var main = fs.readFileSync('./index.html', 'utf8');
    
            var managerCard = fs.readFileSync('./index.html', 'utf8');
            managerCard = managerCard.replace('{{name}}', manager.getName());
            managerCard = managerCard.replace('{{role}}', manager.getRole());
            managerCard = managerCard.replace('{{id}}', manager.getId());
            managerCard = managerCard.replace('{{email}}', manager.getEmail());
            managerCard = managerCard.replace('{{officeNumber}}', manager.getOfficeNumber());

            var cards = managerCard; 
            for (var i = 0; i < teamMembers.length; i++) {
                var employee = teamMembers[i];
                cards += renderEmployee(employee);
            }
            main = main.replace('{{cards}}', cards);

            fs.writeFileSync('.index.html', main);
        }
    });
}

function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('index.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./index.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}

managerData();