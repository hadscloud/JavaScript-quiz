// quiz questions, answer options, and correct answer in an array
var questions = [
    {
        title: "What is JavaScript?",
        options: ["A type of coffee", "A language used to add style to webpages", "A language used to add interaction to webpages", "A coffee shop webpage"],
        answer: "A language used to add interaction to webpages"
    },
    {
        title: "Arrays in JavaScript can be used to store:",
        options: ["Numbers and Booleans", "Strings", "Booleans", "All of the above"],
        answer: "All of the above"
    },
    {
        title: "How to delare a variable using Javascript?",
        options: ["var", "let", "const", "All 3 are correct"],
        answer: "All 3 are correct"
    },
    {
        title: "What can you create with Javascript?",
        options: ["Movies", "Stucture", "Styling", "None of these"],
        answer: "None of the above"
    },
    {
        title: "How do you get a Funtion to stop executing?",
        options: ["stop-function", "end", "return", "stop"],
        answer: "return"
    }
]

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// when start is clicked, the timer begins 
function start() {
    timeLeft = 90;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

        // If timer hits below 0, the game ends
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    
    }, 1000);
    
    next();
}

// game ends when the timer is stopped or they've answered all of the questions
function endGame() {
    clearInterval(timer);

    var quizContent = `
        <h2>Game over</h2>
        <h3>You got a ` + score + ` /100!</h3>
        <h3>You answered ` + score / 20 + ` questions correct!</h3>
        <input type="text" id="name" placeholder="Please enter your initals">
        <button onclick="setScore()">Set Score</button>`;

        document.getElementById("quizBody").innerHTML = quizContent;
}
//Adds score to local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br>
    <button onclick="resetGame()">Play again!</button>
     `;

    document.getElementById("quizBody").innerHTML = quizContent;
}


//This function resets the quiz
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        Coding Quiz!
    </h1>
    <h3>
        Click Start Quiz to begin!
    </h3>
    <button onclick="start()">Start Quiz</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;

}

//takes away 10 seconds from the timer for wrong answers
function incorrect() {
    timeLeft -=10;
    next();
}

//Increases the score by 20 if the user guesses right 
function correct() {
    score += 20;
    next()
}
// This function loops through the questions
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].options.length; buttonLoop++) {        
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";         
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].options[buttonLoop]);        
        
        if (questions[currentQuestion].options[buttonLoop] == questions[currentQuestion].answer) {           
             buttonCode = buttonCode.replace("[ANS]", "correct()");        
        }   else { 
                buttonCode = buttonCode.replace("[ANS]", "incorrect()");       
             }        
             quizContent += buttonCode   
    }
    
    document.getElementById("quizBody").innerHTML = quizContent;
}