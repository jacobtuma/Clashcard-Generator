var fs = require("fs");
var inquirer = require("inquirer");

function BasicFlashcard(front, back) {

    this.front = front;
    this.back = back;
    this.upload = function () {
        fs.appendFileSync("flashcards.txt", "Basic\n Question: " + this.front + "\nAnswer: " + this.back + "\n");
    }

}

function ClozeFlashcard(cloze, question) {

    this.question = question;
    this.cloze = cloze;
    this.upload = function () {
        this.cloze = this
            .cloze
            .italics()
        fs.appendFileSync("flashcards.txt", "Cloze\n Question: " + cloze + question + "\n");
    }

}

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Basic or Cloze?",
            choices: [
                'Basic', 'Cloze'
            ],
                name: "bOc"
            }
        ])
        .then(function (start) {
            if (start.bOc === 'Basic') {
                createBasic()
            } else if (start.bOc === 'Cloze') {
                createCloze()
            }

        });
}

function again() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Make another card?",
                name: "confirm",
                default: true
            }
        ])
        .then(function (again) {
            if (again.confirm == true) {
                start()
            } else {
                console.log("Thanks!")
            }

        });
}

function createBasic() {

    inquirer.prompt([
        {
            type: "input",
            message: "What would you like the front to say?",
            name: "front"
        }, {
                type: "input",
                message: "The Back?",
                name: "back"
            }
        ])
        .then(function (response) {
            var newCard = new BasicFlashcard(response.front, response.back)
            newCard.upload();
            again()
        });

}

function createCloze() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the question?",
                name: "front"
            }
        ])
        .then(function (response) {
            var question = response.front;
            var splitQuestion = question.split(" ");

            inquirer
                .prompt([
                    {
                        type: "checkbox",
                        message: "Select the cloze.",
                        choices: splitQuestion,
                        name: "cloze"
                    }
                ])
                .then(function (response) {
                    cloze = response.cloze
                    clozeLength = cloze.length

                    
                        for (i = 0; i < clozeLength; i++) {

                        splitQuestion = splitQuestion.shift()

                    }


                    question = splitQuestion.join(" ")
                    cloze = cloze.join(" ")

                    var newCard = new ClozeFlashcard(cloze, question)

                    newCard.upload();
                    again()

                });

        });
}

start();