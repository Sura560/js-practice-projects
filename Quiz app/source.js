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

const startContainer = document.querySelector(".start-container");
const startButton = document.querySelector(".start-btn");

const questionElement = document.querySelector(".question");
const answerButtonsElement = document.querySelector(".answer-container");
const quizContainer = document.querySelector(".question-container");
const scoreContainer = document.querySelector(".current-score");
const currentQuestionElement = document.querySelector(".current-question");

const resultContainer = document.querySelector(".result-container");
const finalScoreElement = document.querySelector(".final-score");
const resetButton = document.querySelector(".restart-btn");

const progressBar = document.querySelector(".progress-bar .bar");



let currentQuestionIndex = 0;
let score = 0;

quizContainer.classList.add("hidden");
resultContainer.classList.add("hidden");

startButton.addEventListener("click", () => {
    startContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startQuiz();
});

resetButton.addEventListener("click", () => {
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startQuiz()
});

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
        answerButtonsElement.appendChild(button);
});

        scoreContainer.textContent = score;
        currentQuestionElement.textContent = currentQuestionIndex + 1;
}

function checkAnswer(event) {
    const allButtons = answerButtonsElement.querySelectorAll("button");
    const isCorrect = event.target.dataset.correct === "true";
    if (isCorrect) {
        score++;
    }
    
    allButtons.forEach(button => {
        const buttonIsCorrect = button.dataset.correct === "true";
        if(buttonIsCorrect) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }

        button.disabled = true;
    });

    setTimeout(() => {nextQuestion()}, 800);
    
    console.log(score);
}


function nextQuestion() {
    progressBar.style.width = `${((currentQuestionIndex) / quizQuestions.length) * 100}%`;
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        
        renderQuestion();
    } else {
        quizContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        finalScoreElement.textContent = `Your final score is ${score} out of ${quizQuestions.length}`;
    }
    
}