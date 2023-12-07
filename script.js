//variables in the global scope 
let timer; // Marks the timer
let score = 0; // Users starting score
let currentQuestionIndex = 0; // Tracks the questions index
let timeLeft = 90; // Starting time that will count down from
let userInitials; // contains the user initials 
let inputEl; // contains the inpit for the initials 
let currentQuestion; // 
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
  // prints the current question from the question at the current index
  currentQuestion = questions[currentQuestionIndex];

  // create question page elements
  const h2El = document.createElement("h2");
  const questionDiv = document.createElement("div");
  const scoreInfo = document.createElement("p");

  /* clears old question when the array moves */
  quizEl.innerHTML = "";

  // adds content to the question element
  h2El.textContent = currentQuestion.question;
  h2El.setAttribute("class", "quiz_question");
  
  // loops goes through the options for the respective current question  
  for (let i = 0; i < currentQuestion.options.length; i++) {
    // create button element for each option
    const btnEl = document.createElement("button");

    // sets the text content of the button for each current option
    btnEl.textContent = currentQuestion.options[i];
    // sets css class for the buttons 
    btnEl.setAttribute("class", "btn_column");
    // appends the button to the div 
    questionDiv.append(btnEl);
    // adds click event listener option buttons and calls choice click function
    btnEl.addEventListener("click", choiceClick);
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

  // create submission screen elements
  const h3El = document.createElement("h3");
  const scoreTotalEl = document.createElement("div");
  const inputContainerEl = document.createElement("div");
  const labelEl = document.createElement("label");
  inputEl = document.createElement("input");
  const btnSubmitEl = document.createElement("div");
  const buttonEl = document.createElement("button");

  // add content to the submission element
  h3El.textContent = "All Done!";
  scoreTotalEl.innerHTML = `<p>Your final score is ${score}</p>`;
  labelEl.textContent = "Enter Initials:";
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("id", "user_initials");
  btnSubmitEl.setAttribute("id", "btn_submit");
  buttonEl.textContent = "Submit";

  // Add class styles to the submission elements
  h3El.classList.add("done_prompt");
  scoreTotalEl.classList.add("score_total");
  buttonEl.classList.add("submission_btn");
  inputContainerEl.classList.add("input_container");

  // append th elements to the parent submissionScreenEl
  submissionScreenEl.append(h3El, scoreTotalEl, inputContainerEl, btnSubmitEl);
  inputContainerEl.append(labelEl, inputEl);
  btnSubmitEl.append(buttonEl);

  

  // Event listener for the submit button
  btnSubmitEl.addEventListener("click", submissionInput);
}

// Function for user input during submission
function submissionInput() {
  // getting the user initials , trim removes whitespace
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

// function prints the leaderboard with the saved highscore data
function printLeaderBoard(savedHighScores) {
  // Clear existing content before adding new scores
  scoresContainer.innerHTML = '';
  
  //Using foreach loop method in sHS array and adding entires to scoresContainer
  savedHighScores.forEach((highScore, index) => {
    
    // create scoreEntry element for the leaderboard entries 
    const scoreEntry = document.createElement('p');
    
    // sets the text content of scoreEntry to the initials, score and position of the highscore.
    scoreEntry.textContent = `${index + 1}. ${highScore.initials}: ${highScore.score}`;
   
    // add style to the scoreEntry element 
    scoreEntry.classList.add('leaderboard_entry');
    // scoresContainer.classList.add('leaderboard_entry');
    
    // append scoreEntry element to parent element scoresContainer 
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

  
  // creates elements for the leaderboard 
  const h4El = document.createElement("h4");
  returnBtn = document.createElement("button");
  clearBtn = document.createElement("button");
  
  // sets content for the leaderboard elements
  h4El.textContent = "High scores";
  returnBtn.textContent = "Return";
  clearBtn.textContent = "Clear Scores";
  

  // Add class styles to the elements
  h4El.classList.add("high_score_title");
  returnBtn.classList.add("btn", "return_btn");
  clearBtn.classList.add("btn", "clear_btn");
  
  //Clear existing content in the leaderboard element 
  leaderBoardEl.innerHTML = ""; // 
  
  // gets the value associated with the key highscores , JSON.parse method converts string into JS object.
  const savedHighScores = JSON.parse(localStorage.getItem("highscores")) || [];
  
  // calls the printLB func that makes the savedHS argument. The data is stored in scoresContainer. 
  // scoresContaienr now holds the HTML elements of the high scores. 
  const scoresContainer = printLeaderBoard(savedHighScores);
  
  // append the element to the parent leaderBoard element
  leaderBoardEl.append(h4El, scoresContainer, returnBtn, clearBtn, );

  // Event listeners for the return and clear buttons each calling the respective function.
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
  // uses removeItem function to remove the key highscores from local storage.
  // clears all the previously saved high scores.
  localStorage.removeItem('highscores');


}

//function to Display the highscores 
function viewHighScores() {
  // Hides the introduction and quiz body and shows the leaderboard
  document.getElementById("introduction").classList.add("hide");
  document.getElementById("quiz_body").classList.add("hide");
  leaderBoardEl.classList.remove("hide");

  //use getitem function to get stored info from the highscores key
  // parse function is used to convert the string data to JS object. 
  // if data retrieved does not exist (null) , default to empty array. 
  const savedHighScores = JSON.parse(localStorage.getItem("highscores")) || [];

  // calls the displayHS function that is passing savedHS as argument
  printLeaderBoard(savedHighScores);
}
//Function to save a new high score 
function saveHighScore(initials, score) {
    //Retrieve existing high scores from local storage or starts an empty array if null
    const savedHighScores = JSON.parse(localStorage.getItem('highscores')) || [];

    // Create a new high score entrry with the initials and score params
    const newHighScore = {
        initials: initials,
        score: score,
    
      };
    
    // uses push function to add new highscores to existing list of highscores
    savedHighScores.push(newHighScore);

    // uses sort property to sort the savedHighScores array
    // sorts in descending order based on score so highest score is first 
    savedHighScores.sort((a, b) => b.score - a.score);
    
    // Uses splice property to limit the high scores to maxHS value 
    savedHighScores.splice(maxHighScore);

    //setitem property stores highscores key in local storage
    // stringify property is used to convert JS object data into string
    // allows the leaderboard to exist even when page is closed
    localStorage.setItem('highscores', JSON.stringify(savedHighScores));

  }



// event listener attached to start button, it will call initiate Quiz 
document.querySelector(".start_btn").addEventListener("click", initiateQuiz);
// Calls the viewhighscore function when highscore link is clicked 
highscoreLink.addEventListener("click", viewHighScores);

 


/*
TODO 2 questions have the wrong answer FIX!
TODO change score penalty to -5 and add disclaimer to intro
TODO add Media Queries. 
TODO add printLeaderBoard function to README explain line 250 and 256
TODO add function leaderboard line 301 to README explain them.
TODO Add viewhighscores function to README explain like 345
TODO add savedhighscores function to README explain line 374
TODO explain line 367-375
TODO  


*/