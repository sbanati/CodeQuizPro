let timer; // Marks the timer 
let score = 0; // Users score 
let currentQuestionIndex = 0; // Tracks the questions index
let timeLeft = 90; // Starting time that will count down from
const timePenalty = 10
let highScore = []
const maxHighScore = 5


// Questions are stored in an Array

const questions = [
    {
      question: 'Commonly used data types DO Not include',
      options: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'booleans'
    },

    {
        question:'The condition in an if / else statement is enclosed with _____',
        options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        answer:'parenthesis'
    },

    {
        question:'Arrays in JavaScript can be used to store ____',
        options: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above',

    },   

    {
        question:'String values must be enclosed within ____ when being assigned to variables.',
        options:['commas', 'curly brackets', 'quotes', 'parenthesis'],
        answer: 'curly brackets',

    },

    { 
        question: 'A very useful tool used during development and debugging for printing content to the debugger is?',
        options:['JavaScript','Terminal Bash','for loop','console.log' ],
        answer:'for loop',

    },

];
// Function to call start quiz //
function initiateQuiz() {
    
    // Hides the introduction section explaining the rules 
    document.getElementById('introduction').classList.add('hide');
    
    // Hides the start btn after pressing it
    document.querySelector('.start_btn').classList.add('hide');
    
    
    // Starts the timer and updates every 1 second 
    timer = setInterval(updateTimer, 1000);

    // First question 
    askQuestions();

}

// Function to call the update of timer.

function updateTimer() {

    // If time left is 0 
    
    if (timeLeft <=0) {
        clearInterval(timer); // Stops the timer if time reaches 0

        endQuiz(); // Will call endQuiz

    } else {
        
        // Updates the timer on html 
        document.getElementById('timer').textContent = timeLeft + 'seconds';
        
        //Subtracts the time left by 1
        timeLeft--;
    }
}

function askQuestions() {

    // Shows the quiz question card
    document.getElementById('quiz_body').classList.remove('hide');

    // for loop goes through each question in the array 
    for (var i = 0; i < questions.length; i++) {
        
        // Shows the current question
        showQuestion(i);
        /* Now Im stuck, I feel like once the question is shown I need another 
        function to go through the current question = question index ?? 

        i do know we will use getElementId on questions and answer_buttons ids 
        i do know if i want questions actual text to display i use .textContent. */



    }
        


/* for each question 
    - show the question and answer 
    - let user interact 
    - onclick update score [could be separate function]
    - loops again to show next question until we run through all of them */

}









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

4. A function to go through the question array
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

6. Create a function to end the quiz 
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
*/ 
/* Maybe instead of function showQuestion, I can add two functions.
1 for showing the question and displaying answers 
The other function will be soemthing like function usersAnswer
and this will check if the question is correct. Something like 
if (userAnswer === the questions answer then its correct and 
    score++  else wrong and timeLeft --) */
/*If i do this method do i use for loop? dont i also need to write something
like if (questionIndex < questions.legnth) {
    showQuestion() 
} else {
    endQuiz(); 
}
I am confused on how I should approach the main question logic and 
where the penalty should go. This is why I am thinking do I need to do
function - display question 
function - resolve answer (or penalty)
function - end quiz , if so, where does the forloop go */ 

    


    