const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const staffArray = [];

function createMngr() {
    inquirer.prompt([{
        message: "Please enter the name of the manager...",
        name: "mngrName"
    },
    {
        message: "Please enter the name of the manager's id...",
        name: "mngrId"
    },
    {
        message: "Please enter the manager's email...",
        name: "mngrEmail"
    },
    {
        message: "Please enter the manager's contact details...",
        name: "mngrNumber"
    },
    ])
        .then(function (response) {
            manager = new Manager(response.mngrName, response.mngrId, response.mngrEmail, response.mngrNumber)
            staffArray.push(manager);
            selectRole()
        });
}

function selectRole() {
    inquirer.prompt({
        type: "list",
        message: "Which type of staff would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "Stop, we're full!"
        ],
        name: "staffRole"
    })
        .then((selectedRole) => {
            if (selectedRole.staffRole === "Engineer") {
                createEngineer();
            } else if (selectedRole.staffRole === "Intern") {
                createIntern();
            } else {
                createHTML();
            };

        });
};

function createEngineer() {
    inquirer.prompt([{
        message: "Please enter the name of engineer...",
        name: "engineerName"
    },
    {
        message: "Please enter the engineer's id...",
        name: "engineerId"
    },
    {
        message: "Please enter the engineer's email...",
        name: "engineerEmail"
    },
    {
        message: "Please enter engineer's github details...",
        name: "engineerGitHub"
    },
    ])
        .then(function (response) {
            engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGitHub);
            staffArray.push(engineer);
            selectRole()
        });
};

function createIntern() {
    inquirer.prompt([{
        message: "Please enter the name of intern...",
        name: "internName"
    },
    {
        message: "Please enter the intern's id...",
        name: "internId"
    },
    {
        message: "Please enter the intern's email...",
        name: "internEmail"
    },
    {
        message: "Please enter the intern's school...",
        name: "internSchool"
    },
    ])

        .then((response) => {
            intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            staffArray.push(intern);
            selectRole();
        });
}

async function createHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.copyFile(`templates/style.css`, `${OUTPUT_DIR}/style.css`, (err) => {
        if (err) throw err;
    });
    const renderStaff = render(staffArray);
    fs.writeFileSync(outputPath, renderStaff);
    console.log(`HTML page created ${OUTPUT_DIR}/team.html`)
}

createMngr();