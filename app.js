const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//Moved questions to './lib/Prompts'
const Prompts = require('./lib/Prompts');
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//create an empty EMPLOYESS array to push our emplyees into
const EMPLOYEES = [];
// The list of taken office numbers
const OFFICE_NUMBERS = []
    // This is a list of taken ID numbers
const ID_NUMBERS = []

function start() {
    inquirer
    // call prompts managerQ functiontion passing taken office #s
        .prompt(Prompts.managerQuestions(ID_NUMBERS, OFFICE_NUMBERS))
        .then(a => {
            EMPLOYEES.push(new Manager(a.name, a.id, a.email, a.officeNumber))
                //push officeNumber into the OFFICE_NUMBER array so that we can compare them later
            OFFICE_NUMBERS.push(a.officeNumber)
                //push id into the ID_NUMBERS array so that we can compare them later
            ID_NUMBERS.push(a.id)
            SelectEmployeeType()
        })
}

function engineerQuestions() {
    inquirer
        .prompt(Prompts.engineerQuestions(ID_NUMBERS))
        .then(a => {
            EMPLOYEES.push(new Engineer(a.name, a.id, a.email, a.github))
                //push id into the ID_NUMBERS array so that we can compare them later
            ID_NUMBERS.push(a.id)
            SelectEmployeeType();
        })
}

function internQuestions() {
    inquirer
        .prompt(Prompts.internQuestions(ID_NUMBERS))
        .then(a => {
            EMPLOYEES.push(new Intern(a.name, a.id, a.email, a.school))
                //push id into the ID_NUMBERS array so that we can compare them later
            ID_NUMBERS.push(a.id)
            SelectEmployeeType()
        })
}

function SelectEmployeeType() {
    inquirer
        .prompt(Prompts.moreMemberQuestions)
        .then(answers => {
            console.log(answers)
            if (answers.type === "Engineer") {
                // call function to build Engineer here
                engineerQuestions();
                // *  after build employee, call SelectType again
            } else if (answers.type === "Intern") {
                // call function to build Intern here
                internQuestions()
                    // *  after build employee, call SelectType again
            } else {
                console.log(EMPLOYEES)
                const html = render(EMPLOYEES);
                console.log(html)
                    //write files to the output html path (see lines 7, 10, 11)
                fs.writeFile(outputPath, html, function(err) {
                    if (err) throw err;
                })
            }
        })
}

start();