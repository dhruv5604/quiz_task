import questions from "./questions.js";

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit");
const retryBtn = document.getElementById("retry");
const showAns = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectQue = [];
let questionTimer;
let countdownTimer;
let timeLeft = 15;

function displayQuestion() {
    clearTimeout(questionTimer);
    clearInterval(countdownTimer);
    timeLeft = 15;

    const queData = questions[currentQuestion];

    const queEle = document.createElement("div");
    queEle.className = 'question';
    queEle.innerHTML = queData.question;

    const optionEle = document.createElement("div");
    optionEle.classList = 'options';

    const optionsList = queData.options;

    for (let i = 0; i < optionsList.length; i++) {
        const option = document.createElement("label");
        option.classList = 'option';

        const radio = document.createElement("input");
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = optionsList[i].title;

        const optionText = document.createTextNode(optionsList[i].title);
        option.appendChild(radio);
        option.appendChild(optionText);
        optionEle.appendChild(option);
    }

    quiz.innerHTML = '';
    quiz.appendChild(queEle);
    quiz.appendChild(optionEle);

    const countdownEle = document.createElement("div");
    countdownEle.id = "countdown";
    countdownEle.className = "countdown";
    countdownEle.innerHTML = `Time Left: ${timeLeft}s`;
    quiz.appendChild(countdownEle);

    startCountdown();

    questionTimer = setTimeout(() => {
        checkAnswer(true);
    }, 15000);
}

function startCountdown() {
    countdownTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("countdown").innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
        }
    }, 1000);
}

function checkAnswer(autoSubmit = false) {
    clearTimeout(questionTimer);
    clearInterval(countdownTimer);

    const selectedOption = document.querySelector("input[name='quiz']:checked");
    let answer = selectedOption ? selectedOption.value : null;

    if (answer === questions[currentQuestion].answer) {
        score++;
    } else {
        incorrectQue.push({
            question: questions[currentQuestion].question,
            incorrectAnswers: answer || "No answer selected",
            correctAnswer: questions[currentQuestion].answer
        });
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    quiz.style.display = 'none';
    submitBtn.style.display = 'none';
    retryBtn.style.display = 'inline-block';
    showAns.style.display = 'inline-block';
    result.innerHTML = `You scored ${score} out of ${questions.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectQue = [];
    quiz.style.display = 'block';
    submitBtn.style.display = 'inline-block';
    retryBtn.style.display = 'none';
    showAns.style.display = 'none';
    result.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quiz.style.display = 'none';
    submitBtn.style.display = 'none';
    retryBtn.style.display = 'none';
    showAns.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectQue.length; i++) {
        incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectQue[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectQue[i].incorrectAnswers}<br>
          <strong>Correct Answer:</strong> ${incorrectQue[i].correctAnswer}
        </p>
      `;
    }

    result.innerHTML = `
    <p>You scored ${score} out of ${questions.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitBtn.addEventListener("click", () => checkAnswer(false));
retryBtn.addEventListener("click", retryQuiz);
showAns.addEventListener("click", showAnswer);

displayQuestion();
