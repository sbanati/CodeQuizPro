let timer; // Marks the timer
let score = 0; // Users score
let currentQuestionIndex = 0; // Tracks the questions index
let timeLeft = 90; // Starting time that will count down from
const timePenalty = 10;
let highScore = [];
const maxHighScore = 5;

let timeEl = document.getElementById("timer");
let quizEl = document.getElementById("quiz_body");


// Questions are stored in an Array

const questions = [
  {
    question: "Commonly used data types DO Not include",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "booleans",
  },

  {
    question: "The condition in an if / else statement is enclosed with _____",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis",
  },

  {
    question: "Arrays in JavaScript can be used to store ____",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },

  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "curly brackets",
  },

  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is?",
    options: ["JavaScript", "Terminal Bash", "for loop", "console.log"],
    answer: "for loop",
  },
];

// Function to call start quiz //
function initiateQuiz() {
  // Hides the introduction section explaining the rules
  document.getElementById("introduction").classList.add("hide");
  

  // Shows the quiz question card
  quizEl.classList.remove("hide");

  timeEl.textContent = timeLeft + " seconds";

  // Starts the timer and updates every 1 second
  timer = setInterval(updateTimer, 1000);

  document.getElementById("start").classList.add("start_btn");
  

  
  // First question
  askQuestions();

  






}

// Function to call the update of timer.

function updateTimer() {
  // If time left is 0

  if (timeLeft <= 0) {
    // Stops the timer if time reaches 0

    endOfQuiz(); // Will call endQuiz
  } else {
    //Subtracts the time left by 1
    timeLeft--;
    // Updates the timer on html
    timeEl.textContent = timeLeft + "seconds";
  }
}

function askQuestions() {
  let currentQuestion = questions[currentQuestionIndex];
  
  // create your element
  const h2El = document.createElement("h2");
  const questionDiv = document.createElement("div");
  quizEl.innerHTML = '';
  
  // add content to your element
  h2El.textContent = currentQuestion.question;
  h2El.setAttribute("class", "quiz_question");
  
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const btnEl = document.createElement("button");

    btnEl.textContent = currentQuestion.options[i];
    btnEl.setAttribute("class", "btn_column")

    btnEl.addEventListener("click", choiceClick);

    questionDiv.append(btnEl);
  }

 
  // append your element to the parent element
  quizEl.append(h2El, questionDiv);

}

 function choiceClick() {
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
      endOfQuiz();
    } else {
      askQuestions();
    }
  }

function endOfQuiz() {
  clearInterval(timer);
}

document.querySelector(".start_btn").addEventListener("click", initiateQuiz);

/* Psuedo code of what I think I need to do.
1.✅ Set up the global variables for the Quiz App:
a)✅ Timer
    -variable to keep track of the time during the quiz.
    -Countdown timer that counts down from the limit.
    -something like "let timer;"
b)✅ Score
    -variable to keep track of the users score as 
    they answer questions

c)✅ The question index
    - I am already thinking of using an array.
    - Question index will be updated as the user
    progresses through the questions. 
    -This variable will update the question index.
    - Something like let questionIndex = 0.
    *!not sure about this one!*

2.✅ I need to define the quiz questions and the answers.
a) The questions will need to be stored in an array.
    - Each question will need to be broken down into 
      3 parts. 
    - let questions = [
        {
            question: "bla blah blah ?"
            options or choices: (a, b, c, d)
            answer: "C"
        }

    ]

3.✅ A function to call start quiz when start quiz btn pressed/
a) something like function initiateQuiz() {}
    - I will need to hide the quiz elements  
      (use the classes or ids and hide them. )
    - Show the quiz section 
    - Initialize the timer 
    - Show the first question. 
    - gelElementID and setInterval for timer i think.

4. ✅A function to go through the question array
a) something like function showQuestion() {} 
    - shows the question and answer 
    - let the user click on the options
    - check if the answer is correct 
    - update the score 
    - pull up the next question

5.✅ A function to update the timer:
a) function updateTimer() {}
   - decrease the timer 
   - show the timer as it updates
   *!reflect penalty for incorrect answered questions!*

6. ✅Create a function to end the quiz 
a) function endOfQuiz() {}
    - Stop the timer
    - display the users score 
    - ill need to make a screen for user initials.
    - On submit, takes user to screen where the 
    highscore is displayed and go back or clear scores 
    btns are there. 
    - go back btn will take user back to intro screen.

*! Side note, ill need to make event listeners for 
* start quiz button , go back button, clear score button,
* submit button  

/* Penalty for wrong answers = timer-- 
function for Input screen for initals 
function for leaderboard screen 
function to resolve correct / incorrect answers */
