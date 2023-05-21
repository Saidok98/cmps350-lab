const url="https://the-trivia-api.com/api/questions?category=science&limit=5&region=QA"
async response = await fetch(url);
// if (res.ok) {
facts = await response.json();

let questionsArray = [];
let correctAnswersArray = [];
let incorrectAnswersArray = [];

// Loop through the JSON data and populate the arrays
facts.forEach(questionObj => {
  questionsArray.push(questionObj.question);
  correctAnswersArray.push(questionObj.correctAnswer);
  incorrectAnswersArray.push(questionObj.incorrectAnswers);
});

// Display the arrays
console.log("Questions Array:", questionsArray);
console.log("Correct Answers Array:", correctAnswersArray);
console.log("Incorrect Answers Array:", incorrectAnswersArray);