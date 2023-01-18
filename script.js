// Helper function - gets a random integer up to (but not including) the maximum
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Select the spans & divs where we'll display outputs.
const pointsSpan = document.querySelector("#points");
const scoreSpan = document.querySelector("#score");
const questionDiv = document.querySelector("#question");

// Select the buttons and input fields where users can provide inputs.
const randomButton = document.querySelector("#random");
const hardButton = document.querySelector("#hard");
const catPunsButton = document.querySelector("#catPuns");
const submitButton = document.querySelector("#submit");
const answerInputBox = document.querySelector("#userAnswer");

// Starting variables - we'll fill replace these with the API
let currentQuestion =
  "The Japanese name for this grass-type pokemon, Fushigidane, is a pun on the phrase 'strange seed.'";
let currentAnswer = "bulbasaur";
let currentPoints = 300;
let currentScore = 0;

// Function to update the text on the board to match our variables.
const updateBoard = () => {
  pointsSpan.innerHTML = currentPoints;
  scoreSpan.innerHTML = currentScore;
  questionDiv.innerHTML = currentQuestion;
};

// Populate the board on page load!
updateBoard();

// Function to check if answer is correct
const checkAnswer = () => {
  console.log("You guessed:", answerInputBox.value);
  console.log("Correct answer:", currentAnswer);
  if (answerInputBox.value === currentAnswer) {
    currentScore += currentPoints;
  } else {
    currentScore -= currentPoints;
  }
  updateBoard();
};
// Use the function when an answer is submitted
submitButton.addEventListener("click", checkAnswer);

// What to do when the random button is pressed!
const getRandomQuestion = async () => {
  const response = await fetch("https://jeopardy.wang-lu.com/api/random?count=1");
  const data = await response.json();
  console.log(data);
  // Update our variables with the new data
  currentQuestion = data[0].question;
  currentPoints = data[0].value;
  currentAnswer = data[0].answer;
  // Display that info on screen!
  updateBoard();
};
randomButton.addEventListener("click", getRandomQuestion);

// What to do when the hard button is pressed!
const getHardQuestion = async () => {
  const response = await fetch("https://jeopardy.wang-lu.com/api/clues?value=1000");
  const data = await response.json();
  const i = getRandomInt(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;
  currentPoints = data[i].value;
  currentAnswer = data[i].answer;
  updateBoard();
};
hardButton.addEventListener("click", getHardQuestion);

// What to do when the cat button is pressed
const getCatQuestion = async () => {
  const response = await fetch("https://jeopardy.wang-lu.com/api/clues?category=6");
  const data = await response.json();
  const i = getRandomInt(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;
  currentPoints = data[i].value;
  currentAnswer = data[i].answer;
  updateBoard();
};
catPunsButton.addEventListener("click", getCatQuestion);
