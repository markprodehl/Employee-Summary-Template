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
            // Here validate ensures that ID NUmbers are not reused - only accept new office numbers  and no strings allowed
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
    //managerQuestions is passed ID_NUMBERS, OFFICE_NUMBERS
    //this prevents managers from resusing those numbers
    managerQuestions: (ID_NUMBERS, OFFICE_NUMBERS) => [
        // The below function is the same as line 1:        
        // const baseQuestions = function (title){
        //     return 
        // }    

        //Pass the "Manager" parameter into the baseQuestions function with an argument of (title) to use the manager title
        //Now use the ...Spread operator to import the baseQuestions into the managerQuestions object
        // ie pass the "Manager" parameter in for "title"

        // Also pass ID_Numbers [] to make sure that id numbers are not being reused
        ...baseQuestions(ID_NUMBERS, "Manager"),
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            // Here validate ensures that office numbers are not reused - only accept new office numbers (no strings)
            validate: function(val) {
                return !OFFICE_NUMBERS.includes(val) && !isNaN(val)
            }
        }
    ],
    //Engineers don't have office numbers so only include the ID_Numbers validator
    engineerQuestions: ID_NUMBERS => [
        //Same ..spread here and ID_NUMBERS also paseed to prevent reuse 
        ...baseQuestions(ID_NUMBERS, "Engineer"),
        {
            type: "input",
            name: "github",
            message: "What is the employee's GitHub username?"
        }
    ],
    //Interns don't have office numbers so only include the ID_Numbers validator
    internQuestions: ID_NUMBERS => [
        //Same ..spread here and ID_NUMBERS also paseed to prevent reuse 
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