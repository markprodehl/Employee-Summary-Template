const baseQuestions = (ID_NUMBERS, title) => [{
        type: "input",
        name: "name",
        message: "What is the " + title + "'s name?"
    },
    {
        type: "input",
        name: "id",
        message: "What the " + title + "'s employee id?",
        validate: function(val) {
            return !ID_NUMBERS.includes(val) && !isNaN(val)
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the " + title + "'s email?"
    }
]

module.exports = {
    managerQuestions: (ID_NUMBERS, OFFICE_NUMBERS) => [
        // The below function is the same as line 1:        
        // const baseQuestions = function (title){
        //     return 
        // }    

        //Pass the "Manager" parameter into the baseQuestions function with an argument of (title)
        //Now use the ...Spread operator to import the baseQuestions into the managerQuestions object

        // ie pass the "Manager" parameter in for "title"
        ...baseQuestions(ID_NUMBERS, "Manager"),
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            // only accept new office numbers
            validate: function(val) {
                return !OFFICE_NUMBERS.includes(val) && !isNaN(val)
            }
        }
    ],
    engineerQuestions: ID_NUMBERS => [
        //Same ..spread here
        ...baseQuestions(ID_NUMBERS, "Engineer"),
        {
            type: "input",
            name: "github",
            message: "What is the employee's GitHub username?"
        }
    ],
    internQuestions: ID_NUMBERS => [
        // Same ..spread here
        ...baseQuestions(ID_NUMBERS, "Intern"),
        {
            type: "input",
            name: "school",
            message: "What school is the intern attending?"
        }
    ],
    moreMemberQuestions: {
        // no need to use ...spread here as these are seperate
        type: "list",
        name: "type",
        message: "Would you like to add another team member? If so, which kind?",
        choices: ["Intern", "Engineer", "No more members."]
    }
}