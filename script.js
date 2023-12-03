let timer; 
let score = 0;
let questionIndex = 0;

let questions = [
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

function initiateQuiz() {
    
    document.getElementById('introduction').style.display='none';
    
    document.getElementById('quiz_body').classList.remove('hide');

    document.querySelector('.start_btn').style.display='none';
    
    
    
    timer = setInterval(updateTimer, 1000);

    showQuestion();



}













/* Psuedo code of what I think I need to do. 
1. Set up the global variables for the Quiz App:
a) Timer
    -variable to keep track of the time during the quiz.
    -Countdown timer that counts down from the limit.
    -something like "let timer;"
b) Score
    -variable to keep track of the users score as 
    they answer questions

c) The question index
    - I am already thinking of using an array.
    - Question index will be updated as the user
    progresses through the questions. 
    -This variable will update the question index.
    - Something like let questionIndex = 0. 
    *!not sure about this one!*

2. I need to define the quiz questions and the answers.
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



3. A function to call start quiz when start quiz btn pressed/
a) something like function initiateQuiz() {}
    - I will need to hide the quiz elements  
      (use the ids and hide them. )
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

5. A function to update the timer:
a) function updateTimer() {}
   - decrease the timer 
   - show the timer as it updates
   - reflect penalty for incorrect answered questions

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


    


    