//variables in the global scope 
let timer; // Marks the timer
let score = 0; // Users starting score
let currentQuestionIndex = 0; // Tracks the questions index
let timeLeft = 90; // Starting time that will count down from
let userInitials;
let inputEl;
let currentQuestion;
const maxHighScore = 20;// max size of leaderboard
const timePenalty = 10;


// Created DOM elements by ID 
let timeEl = document.getElementById("timer");
let quizEl = document.getElementById("quiz_body");
let submissionScreenEl = document.getElementById("submission_screen");
let leaderBoardEl = document.getElementById("leaderboard_page");
const highscoreLink = document.getElementById("highscore_link");
const scoresContainer = document.createElement("div");
scoresContainer.setAttribute("id", "scoresContainer");
scoresContainer.classList.add("scores_container");

// Questions are stored in an Array with options and an answer
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
    answer: "quotes",
  },

  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is?",
    options: ["JavaScript", "Terminal Bash", "for loop", "console.log"],
    answer: "console.log",
  },
];

// Function to call initiate quiz //
function initiateQuiz() {
  //resets the quiz params. 
  currentQuestionIndex = 0;
  clearInterval(timer);
  score = 0;
  timeLeft = 90;

  // Hides the introduction section explaining the rules
  document.getElementById("introduction").classList.add("hide");

  // Clears the content of the initials and leaderboard screens
  submissionScreenEl.innerHTML = "";
  leaderBoardEl.innerHTML = "";

  // Shows the quiz question card
  quizEl.classList.remove("hide");
  // selects the timer and sets the time left
  timeEl.textContent = timeLeft + " seconds";

  // Starts the timer and updates every 1 second
  timer = setInterval(updateTimer, 1000);
  // selects the start button by id and adds the start_btn style
  document.getElementById("start").classList.add("start_btn");

  // First question is asked
  askQuestions();
}

// Function to call the update of timer.
function updateTimer() {
  // If time left is 0
  if (timeLeft <= 0) {
    // Stops the timer if time reaches 0, calls endQuiz
    endOfQuiz(); 
  } else {
    //Subtracts the time left by 1
    timeLeft--;
    // Updates the timer on html
    timeEl.textContent = timeLeft + " seconds";
  }
}
// Function to display asking questions when quiz starts
function askQuestions() {
  currentQuestion = questions[currentQuestionIndex];

  // create your element
  const h2El = document.createElement("h2");
  const questionDiv = document.createElement("div");
  const scoreInfo = document.createElement("p");

  quizEl.innerHTML = "";

  // add content to your question element
  h2El.textContent = currentQuestion.question;
  h2El.setAttribute("class", "quiz_question");

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const btnEl = document.createElement("button");

    btnEl.textContent = currentQuestion.options[i];
    btnEl.setAttribute("class", "btn_column");

    btnEl.addEventListener("click", choiceClick);

    questionDiv.append(btnEl);
  }

  // append your element to the parent element
  quizEl.append(h2El, questionDiv, scoreInfo);

  // add the content for the element
  scoreInfo.textContent = "Score: " + score;
  scoreInfo.classList.add("score_info");

  
}
//Function to resolve the users choice for answer and next question
function choiceClick(event) {
  //get the text content from the selected option
  const selectedAnswer = event.target.textContent;

  // checks if the answer that was selected is correct
  if (selectedAnswer === currentQuestion.answer) {
    //Increase the score if the answer is correct
    score += 10;

  } else {
      // Subtract time for the incorrect answer
      timeLeft -= timePenalty;

      // Subtract points for the incorrect answer
      score -= 5;
      // Ensure the score doesn't go below 0
      score = Math.max(0, score);

  }

  // Moves to the next question or can end the quiz
  currentQuestionIndex++;

  // if there are more questions they are asked other wise end the quiz
  if (currentQuestionIndex < questions.length) {
    askQuestions();
  } else {
    endOfQuiz();
  }
}

function endOfQuiz() {
  // stops the timer
  clearInterval(timer);
  // hides the quiz question card
  quizEl.classList.add("hide");

  //calls the submissionScreen function
  submissionScreen();
}

// Function to show submission screen
function submissionScreen() {
  // reveals the submission screen
  submissionScreenEl.classList.remove("hide");

  // create your element
  const h3El = document.createElement("h3");
  const scoreTotalEl = document.createElement("div");
  const inputContainerEl = document.createElement("div");
  const labelEl = document.createElement("label");
  inputEl = document.createElement("input");
  const btnSubmitEl = document.createElement("div");
  const buttonEl = document.createElement("button");

  // add contnet to your element
  h3El.textContent = "All Done!";
  scoreTotalEl.innerHTML = `<p>Your final score is ${score}</p>`;
  labelEl.textContent = "Enter Initials:";
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("id", "user_initials");
  btnSubmitEl.setAttribute("id", "btn_submit");
  buttonEl.textContent = "Submit";

  // Add class styles to the elements
  h3El.classList.add("done_prompt");
  scoreTotalEl.classList.add("score_total");
  buttonEl.classList.add("submission_btn");
  inputContainerEl.classList.add("input_container");

  // append your element to the parent element
  submissionScreenEl.append(h3El, scoreTotalEl, inputContainerEl, btnSubmitEl);
  inputContainerEl.append(labelEl, inputEl);
  btnSubmitEl.append(buttonEl);

  

  // Event listener for the submit button
  btnSubmitEl.addEventListener("click", submissionInput);
}

// Function for user input during submission
function submissionInput() {
  // getting this user initials , trim removes whitespace
  userInitials = inputEl.value.trim();

  // checks if user initials are NOT empty. 
  if (userInitials !== "") {
    // saves the users high scores and initials 
    saveHighScore(userInitials, score);
    //Displays the leaderboard
    leaderBoard();
  } else {
    alert("please enter name or initials. ");
  }
}

function printLeaderBoard(savedHighScores) {
  // Clear existing content before adding new scores
  scoresContainer.innerHTML = '';
  
  savedHighScores.forEach((highScore, index) => {
    // create element 
    const scoreEntry = document.createElement('p');
    // add content to element
    scoreEntry.textContent = `${index + 1}. ${highScore.initials}: ${highScore.score}`;
   
    // add style to element
    scoreEntry.classList.add('leaderboard_entry');
    scoresContainer.classList.add('leaderboard_entry');
    
    // append to parent element 
    scoresContainer.appendChild(scoreEntry);
 
    

  });  

  // updates the scoresContainer with the new info 
  return scoresContainer;
}


// Function to Display the leaderboard
function leaderBoard() {
  // 2 lines: hide submission screen, shows the leaderboard screen
  submissionScreenEl.classList.add("hide");
  leaderBoardEl.classList.remove("hide");

  

  // create your element
  const h4El = document.createElement("h4");
  returnBtn = document.createElement("button");
  clearBtn = document.createElement("button");
  
  // add content to your element
  h4El.textContent = "High scores";
  returnBtn.textContent = "Return";
  clearBtn.textContent = "Clear Scores";
  

  // Add class styles to the elements
  h4El.classList.add("high_score_title");
  returnBtn.classList.add("btn", "return_btn");
  clearBtn.classList.add("btn", "clear_btn");
  
  //Clear existing content in the leaderboard element 
  leaderBoardEl.innerHTML = ""; // 
  
  // Retrieve existing high scores from local storage
  const savedHighScores = JSON.parse(localStorage.getItem("highscores")) || [];
  
  // Display high scores using the printLeaderboard function
  const scoresContainer = printLeaderBoard(savedHighScores);
  
  // append your element to the parent element
  leaderBoardEl.append(h4El, scoresContainer, returnBtn, clearBtn, );

  // Event listeners for the return and clear buttons 
  document
    .querySelector(".return_btn")
    .addEventListener("click", returnToStart);
  document
    .querySelector(".clear_btn")
    .addEventListener("click", clearLeaderBoard);
}

function returnToStart() {
  // Hides the leaderboard and shows the introduction screen
  leaderBoardEl.classList.add("hide");
  document.getElementById("introduction").classList.remove("hide");
}

function clearLeaderBoard() {
  //clears the leaderboard scores
  document.getElementById("scoresContainer").innerHTML = "";
  
  localStorage.removeItem('highscores');


}

function viewHighScores() {
  // Hides the introduction and shows the leaderboard
  document.getElementById("introduction").classList.add("hide");
  document.getElementById("quiz_body").classList.add("hide");
  leaderBoardEl.classList.remove("hide");

  const savedHighScores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Display saved high scores
  displayHighScores(savedHighScores);
}

function saveHighScore(initials, score) {
    //Retrieve existing high scores from local storage
    const savedHighScores = JSON.parse(localStorage.getItem('highscores')) || [];

    // Create a new high score entrry
    const newHighScore = {
        initials: initials,
        score: score,
    
      };

  savedHighScores.push(newHighScore);

  savedHighScores.sort((a, b) => b.score - a.score);

  savedHighScores.splice(maxHighScore);

  localStorage.setItem('highscores', JSON.stringify(savedHighScores));



  }

function displayHighScores(savedHighScores) {
  const scoresContainer = document.getElementById('scoresContainer');

  scoresContainer.innerHTML = '';

  
  savedHighScores.forEach((highScore, index) => {
    
    // create an element
    const scoreEntry = document.createElement("p");
    // add content to the element
    scoreEntry.textContent = `${index + 1}. ${highScore.initials}: ${highScore.score}`;
    
    // style the element
    scoreEntry.classList.add('leaderboard_entry');
    
    //append the element 
    scoresContainer.appendChild(scoreEntry);
    
    

  
  });
}




document.querySelector(".start_btn").addEventListener("click", initiateQuiz);
highscoreLink.addEventListener("click", viewHighScores);

 


/*
TODO 2 questions have the wrong answer FIX!
TODO change score penalty to -5 and add disclaimer to intro
TODO add Media Queries. 


*/