const quizData = [
    {
      question: 'Justice T. S. Sivagnana has been appointed as the Chief Justice of which of the following High Courts?',
      options: ['Bombay High Court', 'Patna High Court', 'Calcutta High Court', 'Delhi High Court'],
      answer: 'Calcutta High Court',
    },
    {
      question: 'According to the ICC ranking released on May 2, 2023, India has surpassed which men’s cricket team to become the number one Test team?',
      options: ['England', 'South Africa', 'New Zealand', 'Australia'],
      answer: 'Australia',
    },
    {
      question: 'which of the following countries received financial support of 2.25 billion dollars for its five projects – ACCESS, BEST, GCRD, SMART, and RIVER?',
      options: ['India', 'Sri Lanka', 'Bangladesh', 'Pakistan'],
      answer: 'Bangladesh',
    },
    {
      question: 'Bharti Airtel and which mobile telecommunication firm signed a binding term sheet for the merger of their Sri Lankan subsidiaries?',
      options: ['Hutchinson', 'Mobitel', 'Dialog Axiata', 'Jio'],
      answer: 'Dialog Axiata',
    },
    {
      question: 'what is the unemployment rate of India for April 2023?',
      options: [
        '6.23%',
        '8.11%',
        '10.9%',
        '7.14%',
      ],
      answer: '8.11%',
    },
    {
      question: 'Along with COVID-19, the WHO has declared the end of the public health emergency of international concern of which disease?',
      options: ['mpox', 'Kivu Ebola', 'Zika Virus', 'Swine flu'],
      answer: 'mpox',
    },
    {
      question: 'which of the following state government has launched the Facial Recognition System (FRS) for Inner Line Permit (ILP) system for effective checking of ILP holders?',
      options: [
        'Arunachal Pradesh',
        'Mizoram',
        'Nagaland',
        'Manipur',
      ],
      answer: 'Manipur',
    },
    {
      question: 'The International Museum Expo 2023 will be inaugurated by Prime Minister Narendra Modi in ______________.',
      options: ['Mumbai', 'New Delhi', 'Lucknow', 'Indore'],
      answer: 'New Delhi',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();