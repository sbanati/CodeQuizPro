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
            options: (a, b, c, d)
            answer: "C"
        }

    ]
b) each question will be in its own array. 
    -apart of the original block defined by 
    "let questions = ["

    *!might need help with the syntax here!*
    
    - Again the idea is let question = [
        {
            (question, options, answer for #1)
        }
        { 
            (question, options, answer for #2)
        }
    ]


3. A function to call start quiz when start quiz btn pressed/
a) something like function initiateQuiz() {}
    - I will need to hide the intro section 
      (use the ids and hide them. )
    - Show the quiz section 
    - Initialize the timer 
    - Show the first question. 

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
   - reflect penalty for unanswered questions

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


    


    