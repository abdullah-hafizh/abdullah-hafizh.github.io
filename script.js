const quizData = [
      {
        question: 'Berapakah hasil dari 25 × 4?',
        options: ['80', '90', '100', '120'],
        answer: '100'
      },
      {
        question: 'Jika x = 5, maka nilai dari 2x + 3 adalah?',
        options: ['10', '12', '13', '15'],
        answer: '13'
      },
      {
        question: 'Berapakah hasil dari 144 ÷ 12?',
        options: ['10', '11', '12', '13'],
        answer: '12'
      },
      {
        question: 'Luas persegi dengan sisi 9 cm adalah?',
        options: ['18 cm²', '36 cm²', '72 cm²', '81 cm²'],
        answer: '81 cm²'
      },
      {
        question: 'Berapakah akar kuadrat dari 225?',
        options: ['13', '14', '15', '16'],
        answer: '15'
      },
      {
        question: 'Hasil dari 7² + 3² adalah?',
        options: ['49', '52', '58', '60'],
        answer: '58'
      },
      {
        question: 'Jika sebuah segitiga memiliki alas 10 cm dan tinggi 8 cm, luasnya adalah?',
        options: ['40 cm²', '60 cm²', '80 cm²', '90 cm²'],
        answer: '40 cm²'
      },
      {
        question: 'Berapakah hasil dari 3/4 + 1/4?',
        options: ['1/2', '1', '3/2', '2'],
        answer: '1'
      },
      {
        question: 'Sebuah mobil melaju 60 km/jam selama 2 jam. Jarak yang ditempuh adalah?',
        options: ['100 km', '110 km', '120 km', '130 km'],
        answer: '120 km'
      },
      {
        question: 'Berapakah nilai dari 5! (5 faktorial)?',
        options: ['25', '60', '100', '120'],
        answer: '120'
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let selectedAnswers = new Array(quizData.length).fill(null);

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const progressEl = document.getElementById('progress');
    const scoreEl = document.getElementById('score');
    const questionNumberEl = document.getElementById('question-number');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    function loadQuestion() {
      const currentQuiz = quizData[currentQuestion];

      questionNumberEl.textContent = `Pertanyaan ${currentQuestion + 1}`;
      questionEl.textContent = currentQuiz.question;
      progressEl.textContent = `Soal ${currentQuestion + 1} dari ${quizData.length}`;
      scoreEl.textContent = `Skor: ${score}`;

      optionsEl.innerHTML = '';

      currentQuiz.options.forEach(option => {
        const optionBtn = document.createElement('div');
        optionBtn.classList.add('option');
        optionBtn.textContent = option;

        if (selectedAnswers[currentQuestion] === option) {
          optionBtn.classList.add('selected');
        }

        optionBtn.addEventListener('click', () => selectOption(option, optionBtn));

        optionsEl.appendChild(optionBtn);
      });

      prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
      nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Selesai' : 'Selanjutnya';
    }

    function selectOption(option, element) {
      const allOptions = document.querySelectorAll('.option');
      allOptions.forEach(opt => opt.classList.remove('selected'));

      element.classList.add('selected');
      selectedAnswers[currentQuestion] = option;
    }

    nextBtn.addEventListener('click', () => {
      if (selectedAnswers[currentQuestion] === null) {
        alert('Silakan memilih jawaban terlebih dahulu!');
        return;
      }

      if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
      } else {
        showResults();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
      }
    });

    function calculateScore() {
      score = 0;
      quizData.forEach((quiz, index) => {
        if (selectedAnswers[index] === quiz.answer) {
          score += 10;
        }
      });
    }

    function showResults() {
      calculateScore();

      document.getElementById('quiz-container').style.display = 'none';
      document.getElementById('result-box').style.display = 'block';

      document.getElementById('final-score').textContent = `${score} / 100`;

      let message = '';

      if (score === 100) {
        message = 'Luar biasa! Semua jawaban benar!';
      } else if (score >= 70) {
        message = 'Bagus sekali! Pertahankan prestasimu!';
      } else if (score >= 50) {
        message = 'Cukup baik, terus berlatih ya!';
      } else {
        message = 'Jangan menyerah, terus belajar matematika!';
      }

      document.getElementById('message').textContent = message;

      const reviewEl = document.getElementById('review');
      reviewEl.innerHTML = '<h3>Review Jawaban:</h3><br>';

      quizData.forEach((quiz, index) => {
        const isCorrect = selectedAnswers[index] === quiz.answer;

        reviewEl.innerHTML += `
          <div class="review-item">
            <p><strong>${index + 1}. ${quiz.question}</strong></p>
            <p>Jawaban Kamu: <span class="${isCorrect ? 'correct' : 'wrong'}">${selectedAnswers[index]}</span></p>
            <p>Jawaban Benar: <span class="correct">${quiz.answer}</span></p>
          </div>
        `;
      });
    }

    function restartQuiz() {
      currentQuestion = 0;
      score = 0;
      selectedAnswers = new Array(quizData.length).fill(null);

      document.getElementById('quiz-container').style.display = 'block';
      document.getElementById('result-box').style.display = 'none';

      loadQuestion();
    }

    loadQuestion();