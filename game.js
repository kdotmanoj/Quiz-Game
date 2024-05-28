document.addEventListener("DOMContentLoaded", function() {
    let questions = [
        {
            question: 'Which rock band was the first to pioneer live surround sound?',
            choice1: 'The Beatles',
            choice2: 'Pink Floyd',
            choice3: 'The Rolling Stones',
            choice4: 'Led Zeppelin',
            answer: 2,
        },
        {
            question: 'Which historical event led to the term "bugs" being used in programming?',
            choice1: 'A programmer accidentally creating an error in code',
            choice2: 'The discovery of an error in early punch card systems',
            choice3: 'A software glitch in the first personal computer',
            choice4: 'A malfunction caused by an actual insect found in a vacuum-tube computer',
            answer: 4,
        },
        {
            question: 'At one point in history, what was the estimated range of the human population, suggesting we came close to extinction?',
            choice1: 'Between 1,000 and 10,000 individuals',
            choice2: 'Between 50,000 and 100,000 individuals',
            choice3: 'Between 100,000 and 1,000,000 individuals',
            choice4: 'Between 1,000,000 and 10,000,000 individuals',
            answer: 1,
        },
        {
            question: 'What is the mitochondria often referred to as in biology?',
            choice1: 'The brain of the cell',
            choice2: 'The powerhouse of the cell',
            choice3: 'The digestive system of the cell',
            choice4: 'The transport system of the cell',
            answer: 2,
        },
        {
            question: 'Which is the smallest number that is the sum of two positive cubes in two different ways?',
            choice1: '64',
            choice2: '216',
            choice3: '1729',
            choice4: '4096',
            answer: 3,
        }
    ];    

    let currentQuestion = {};
    let acceptingAnswers = false;
    let questionCounter = 0;
    let score = 0;
    const SCORE_POINTS = 10;
    const MAX_QUESTIONS = questions.length;
    let availableQuestions = [...questions];

    const questionElement = document.getElementById('question');
    const choiceElements = Array.from(document.getElementsByClassName('choice-text'));
    const progressText = document.getElementById('progressText');
    const scoreText = document.getElementById('score');
    const progressBarFull = document.getElementById('progressBarFull');

    const startGame = () => {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        getNewQuestion();
    };

    const getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score);
            return window.location.assign('end.html');
        }

        questionCounter++;
        progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        questionElement.innerText = currentQuestion.question;

        choiceElements.forEach(choice => {
            const number = choice.parentElement.getAttribute('data-number');
            choice.innerText = currentQuestion['choice' + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    };

    const incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    };

    choiceElements.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.parentElement.getAttribute('data-number');

            const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === 'correct') {
                incrementScore(SCORE_POINTS);
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });
    });

    startGame();
});
