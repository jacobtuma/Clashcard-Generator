var fs = require("fs");
var inquirer = require("inquirer")

function BasicFlashcard(front, back) {

    this.front = front;
    this.back = back;
    this.upload = function() {
 fs.appendFileSync("flashcards.txt", "Question: " + this.front + "\nAnswer: " + this.back + "\n");
    }

}


function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Basic or Cloze?",
            choices: ['Basic', 'Cloze' ],
                name: "bOc",
            
            }
        ])
        .then(function (start) {
            if (start.bOc === 'Basic') {
                createBasic()
            }

        });
}


function createBasic() {

    inquirer.prompt([
        {
            type: "input",
            message: "What would you like the front to say?",
            name: "front",
        }, {
                type: "input",
                message: "The Back?",
                name: "back",

            }
        ])
        .then(function (response) {
            var newCard = new BasicFlashcard(response.front, response.back)
            newCard.upload();
console.log("Thanks!")
        });

}

start();