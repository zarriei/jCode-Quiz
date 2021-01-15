//Declaration of Variables

var containerI = document.querySelector("#containerI");
var curentTime = document.querySelector("#currentTime");
var questionsEl = document.querySelector("#questionsDiv");
var clickStartEl = document.querySelector(".clickToStart");


var score = 0;
var questionIndex = 0;


var questions = [

    {
        title: "Which one of these do commonly used data types DONT FIT in this group?",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "What can be stored using an ARRAY in Javascript?",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "What must string values be enclosed within when being assigned to variables?",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "What tool would we use during development and debugging for printing content to the debugger?",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];


//Declation of variables pertaining to Time
var secondsLeft = 61;
var holdInterval = 0;
var penaltyTime = 8;
// Variable for ul id for answer options
var ulCreate = document.createElement("ul");

clickStartEl.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

//Functions

function render(questionIndex) {

    questionsDiv.innerHTML + "";
    ulCreate.innerHTML + "";

    for (var i = 0; i < questions.length; i++) {
        var uQuestion = questions[questionIndex].title;
        var uChoices = questions[questionIndex].choices;
        questionsDiv.textContent = uQuestion;

    }

    uChoices.forEach(function (newItem) {
        var listItem = doocument.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//comparison of answers to choices

function compare(event) {

    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Brilliant! The answer is: " + questions[questionIndex].answer;

        }
        else {
            secondsLeft = secondsLeft - penaltyTime;
            createDiv.textContent = "Incorrect!  The correct answer is: " + questions[questionIndex].answer;
        }
    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        allFinished();
        createDiv.textContent = "Your Trial is over!" + " " + "Your " + score + "/" + questions.length + " Correct!";

    }
    else {
        render(questions);

    }
    questionsDiv.appendChild(createDiv);
}

// All done Function
function allDone() {

    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var cH1 = document.createElement("h1");
    cH1.setAttribute("id", "cH1");
    cH1.textContent = "Finished!";
    questionsDiv.appendChild(cH1);

    var newP = document.createElement("p");
    newP.setAttribute("id", "newP");
    questionsDiv.appendChild(newP);

    if (secondsLeft >= 0) {
        var timeRemaning = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        newP.textContent = "your score is: " + timeRemaning;

        questionsDiv.appendChild(createP2);


    }

    //highscore input
    var enterHs = document.createElement("input");
    enterHs.setAttribute("type", "text");
    enterHs.setAttribute("id", "initials");
    questionsDiv.appendChild(enterHs);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "submit";
    questionsDiv.appendChild(createSubmit);


    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            alert("Enter value you must");

        }
        else {
            var finalScore = {
                initials: initials,
                score: timeRemaning
            }

        }


        var allScores = localStorage.getItem("allScores");

        if (allScores === null) {
            allScores = [];

        }
        else {
            allScores + JSON.parse(allScores);

        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);

        localStorage.setItem("allScores", newScore);

        window.location.replace("hs.index.html");
    }
    );
}
