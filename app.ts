interface Question {
    question: string;
    answer: any;
    type: 'string' | 'number' | 'array';
    userAnswer?: any;
}

let lives = 3;
let currentQuestionIndex = 0;
const appDiv = document.getElementById('app') as HTMLElement;
let timer: number;
 
const questions: Question[] = [
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

function createInput(questionObj: Question): HTMLInputElement | HTMLSelectElement {
    let input: HTMLInputElement | HTMLSelectElement;
// argument questionObj de type Question. Elle retourne soit un HTMLInputElement soit un HTMLSelectElement.
    if (questionObj.type === 'string' || questionObj.type === 'number') {
        // vérifie si le type de la question est soit 'string' soit number
        input = document.createElement('input');
        //Si la condition précédente est vraie, cela crée un nouvel élément <input> dans le document.
        input.type = questionObj.type === 'number' ? 'number' : 'text';
        //Ici, on définit le type de l'élément <input>. Si le type de question est 'number', alors le type de l'input sera 'number'. Sinon, par défaut, ce sera 'text'.
        input.value = questionObj.userAnswer || '';
        //On assigne à la propriété value de l'élément <input> la valeur de questionObj.userAnswer. Si questionObj.userAnswer est undefined ou null, alors '' (une chaîne de caractères vide) est utilisée comme valeur par défaut.
    } else if (questionObj.type === 'array') {
        //Si la condition initiale n'est pas satisfaite et que le type de la question est 'array' (tableau), alors on exécute ce bloc de code pour créer un élément <select>.
        input = document.createElement('select');
        //crée un nouvel élément <select> dans le document.
        input.multiple = true;
        //On définit la propriété multiple de l'élément <select> à true, ce qui permet à l'utilisateur de sélectionner plusieurs options en même temps.
       
        const selectInput = input as HTMLSelectElement;
        (questionObj.answer as string[]).forEach(option => {
            // il permet d'interer sur les option disponibles pour la question dans un cas où le type de la question est 'array'.
            const opt = document.createElement('option');
            //creation des option dans questionObj
            opt.value = option;
            //La propriété value de l'élément <option> est définie avec la valeur de l'option actuelle dans l'itération.
            opt.text = option;
            //La propriété text de l'élément <option> est également définie avec la valeur de l'option actuelle. Cela spécifie le texte visible pour l'option dans la liste déroulante
            selectInput.add(opt);
            //permet de construire dynamiquement les options disponibles dans le menu déroulant en fonction des valeurs spécifiées dans questionObj.answer
        });
    } else {
        //Si le type de la question (questionObj.type) n'est ni 'string' ni 'number' ni 'array', une erreur est lancée. Cela garantit que seuls les types de questions pris en charge sont traités par cette fonction.
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

function checkAnswer(questionObj: Question, input: HTMLInputElement | HTMLSelectElement) {
    if (questionObj.type === 'number') {
        questionObj.userAnswer = parseFloat(input.value);
    } else if (questionObj.type === 'string') {
        questionObj.userAnswer = input.value;
    } else if (questionObj.type === 'array') {
        questionObj.userAnswer = Array.from((input as HTMLSelectElement).selectedOptions).map(option => option.value);
    }

    if (JSON.stringify(questionObj.userAnswer) === JSON.stringify(questionObj.answer)) {
        currentQuestionIndex++;
    } else {
        lives--;
    }

    renderQuestion();
}
function startTimer() {
    const timeLimit = 10; // Limite de temps en secondes pour chaque question
    let timeLeft = timeLimit; // Temps restant initialisé à la limite de temps

    const timerDiv = document.createElement('div'); // Crée un nouvel élément 'div' pour afficher le minuteur
    timerDiv.innerHTML = `Time left: ${timeLeft}s`; // Affiche le temps restant dans le div
    appDiv.appendChild(timerDiv); // Ajoute le div du minuteur au conteneur principal 'appDiv'

    timer = setInterval(() => {
        timeLeft--; // Décrémente le temps restant à chaque intervalle (toutes les 1 seconde)

        timerDiv.innerHTML = `Time left: ${timeLeft}s`; // Met à jour l'affichage du temps restant dans le div

        if (timeLeft <= 0) {
            clearInterval(timer); // Arrête le minuteur lorsque le temps est écoulé
            lives--; // Réduit le nombre de vies car le temps est écoulé
            renderQuestion(); // Réaffiche la prochaine question ou termine le jeu si toutes les questions sont répondues
        }
    }, 1000); // Interval de 1 seconde (1000 millisecondes)
}
