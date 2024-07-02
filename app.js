"use strict";
let lives = 3;
let currentQuestionIndex = 0;
const appDiv = document.getElementById('app');
let timer;
const questions = [
    { question: "1. Quelle est la capitale de la France ?", answer: "Paris", type: 'string' },
    { question: "2. Quelle est la capitale de la Belgique ?", answer: "Bruxelles", type: 'string' },
    { question: "3. Quelle est la capitale de l'Italie ?", answer: "Rome", type: 'string' },
    { question: "4. Quelle est la capitale de l'Espagne ?", answer: "Madrid", type: 'string' },
    { question: "5. Quelle est la capitale de l'Allemagne ?", answer: "Berlin", type: 'string' },
    { question: "6. Quelle est la capitale de l'Autriche ?", answer: "Vienne", type: 'string' },
    { question: "7. Quelle est la capitale du Portugal ?", answer: "Lisbonne", type: 'string' },
    { question: "8. Quelle est la capitale de la Norvège ?", answer: "Oslo", type: 'string' },
    { question: "9. Quelle est la capitale de la Suisse ?", answer: "Berne", type: 'string' },
    { question: "10. Quelle est la capitale de la Finlande ?", answer: "Helsinki", type: 'string' }
];
function createInput(questionObj) {
    let input;
    if (questionObj.type === 'string' || questionObj.type === 'number') {
        input = document.createElement('input');
        input.type = questionObj.type === 'number' ? 'number' : 'text';
        input.value = questionObj.userAnswer || '';
    }
    else if (questionObj.type === 'array') {
        input = document.createElement('select');
        input.multiple = true;
        const selectInput = input;
        questionObj.answer.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.text = option;
            selectInput.add(opt);
        });
    }
    else {
        throw new Error(`Unsupported input type: ${questionObj.type}`);
    }
    return input;
}
function renderQuestion() {
    clearTimeout(timer);
    appDiv.innerHTML = '';
    if (lives <= 0) {
        appDiv.innerHTML = '<p>Game Over!</p>';
        return;
    }
    if (currentQuestionIndex >= questions.length) {
        appDiv.innerHTML = '<p>Congratulations! You have completed the quiz.</p>';
        return;
    }
    const questionObj = questions[currentQuestionIndex];
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${questionObj.question}</p>`;
    const input = createInput(questionObj);
    questionDiv.appendChild(input);
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.addEventListener('click', () => {
        checkAnswer(questionObj, input);
    });
    questionDiv.appendChild(submitButton);
    appDiv.appendChild(questionDiv);
    startTimer();
}
function checkAnswer(questionObj, input) {
    if (questionObj.type === 'number') {
        questionObj.userAnswer = parseFloat(input.value);
    }
    else if (questionObj.type === 'string') {
        questionObj.userAnswer = input.value;
    }
    else if (questionObj.type === 'array') {
        questionObj.userAnswer = Array.from(input.selectedOptions).map(option => option.value);
    }
    if (JSON.stringify(questionObj.userAnswer) === JSON.stringify(questionObj.answer)) {
        currentQuestionIndex++;
    }
    else {
        lives--;
    }
    renderQuestion();
}
function startTimer() {
    const timeLimit = 10; // 10 seconds for each question
    let timeLeft = timeLimit;
    const timerDiv = document.createElement('div');
    timerDiv.innerHTML = `Time left: ${timeLeft}s`;
    appDiv.appendChild(timerDiv);
    timer = setInterval(() => {
        timeLeft--;
        timerDiv.innerHTML = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            lives--;
            renderQuestion();
        }
    }, 1000);
}
function startQuiz() {
    renderQuestion();
}
document.addEventListener('DOMContentLoaded', (event) => {
    startQuiz();
});
