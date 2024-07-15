class Question {
  constructor(text, choices, answer) {
    this.text = text; // la question
    this.choices = choices; //Les choix dans un array
    this.answer = answer; //réponse
  }
  isAnswerCorrect(choice) {
    return choice === this.answer;
  }
}

const questions = [
  new Question( // Instance de objet "Question" dans un TABLEAU du nom de "questions"
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau", //question
    ["indexOf()", "map()", "filter()", "reduce()"], //array de choix
    "filter()" //Réponse
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

//La classe Quiz est conçue pour gérer une série de questions du quiz.
class Quiz {
  constructor(questions) {
    // constructor avec en paramètre les questions
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    // Méthode qui  return la question à l'index auquel  on en est
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isAnswerCorrect(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Affichage
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text; // Le text = la question
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choice: function () {
    let choices = quiz.getCurrentQuestion().choices; // Ceci est un [] des choix de la question

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        //onclick car dans un objet on ne peut pas use d'eventListener
        quiz.guess(guess);
        quizApp();
      };
    };
    //Affichage du choix + prise en compte du choix
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]); // chaine de caractère qui combine le mot "choice" et le tableaux de choix à l'index i
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      `${quiz.currentQuestionIndex + 1} sur ${quiz.questions.length}`
    );
  },
  endQuiz: function () {
    let endQuizHTML = `
    <h1>Quiz terminé !</h1>
    <h3>Votre score est de ${quiz.score} / ${quiz.questions.length}</h3>
   <button id="restart"> Recommencer? </button>
    `;
    this.elementShown("quiz", endQuizHTML);
    this.reboot(); // Ajout de l'événement de redémarrage
  },
  reboot: function () {
    const restartButton = document.getElementById("restart");
    if (restartButton) {
      restartButton.onclick = function () {
        console.log("Recommencer bouton cliqué");
        // Réinitialiser le contenu de l'élément "quiz" à sa structure de départ
        document.getElementById("quiz").innerHTML = `
          <h1><span>Q</span>uiz <i class="far fa-question-circle"></i></h1>
          <h2 id="question"></h2>
          <h3 id="score"></h3>
          <div class="choices">
            <button id="guess0" class="btn"><p id="choice0"></p></button>
            <button id="guess1" class="btn"><p id="choice1"></p></button>
            <button id="guess2" class="btn"><p id="choice2"></p></button>
            <button id="guess3" class="btn"><p id="choice3"></p></button>
          </div>
          <p id="progress"></p>
        `;
        quiz = new Quiz(questions);
        quizApp();
      };
    } else {
      console.error("Bouton #restart non trouvé!");
    }
  },
};

//Logique de jeu
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choice();
    display.progress();
  }
};

// Créée un nouveau quiz
let quiz = new Quiz(questions); // Initialiser le quiz
quizApp();
