const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

const questionElement = document.querySelector("h1.question");
const answerButtonsElement = document.querySelector("ul.answers");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
}

function renderQuestion() {
    answerButtonsElement.innerHTML = "";
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", checkAnswer);
        button.textContent = answer.text;
        answerButtonsElement.append(button);


});}

function checkAnswer(event) {
    const isCorrect = event.target.dataset.correct === "true";
    if (isCorrect) {
        score++;
    }
    nextQuestion();

}

function nextQuestion() {
        console.log(score);
        console.log(currentQuestionIndex);
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        
        renderQuestion();
    } else {
       return alert(`Quiz completed! Your score: ${score}/${quizQuestions.length}`);
    }
}
renderQuestion();