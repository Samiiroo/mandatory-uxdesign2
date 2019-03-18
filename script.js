// document.querySelectorAll("input[data-correct=true]:checked").length
let dehaze = document.querySelector('.material-icons');
let dialog = document.getElementById('right-answer');
let headerTitel= document.querySelector('h1');
let main = document.querySelector('main');
let button = document.querySelector('button');
let quiz = document.getElementById('quiz');
let start = document.getElementById('start');
let done = document.getElementById('done');
let restart= document.getElementById('restart');
let score= 0;
let wrongAnswers= 0;
let answersLength = 0;
function getRandom(){
  let req = new XMLHttpRequest();
  req.open('GET', 'https://opentdb.com/api.php?amount=5'); //hämta datan från länken
  req.addEventListener('load',parseRandom);//parsa datan vi fått.
  req.send();
}
getRandom();

function parseRandom(){ //skapa functionen som parsar.
  quiz.innerHTML="";
  let parsedData = JSON.parse(this.responseText);// parsedData
  console.log(parsedData.results);
let h1 = document.createElement('h1');

for(let i = 0; i< parsedData.results.length; i++){
  const questionOb = parsedData.results[i];
  let question= document.createElement('div');
  question.classList.add('question');

  let questionNumber = document.createElement('p');
  questionNumber.setAttribute('id','questNum')
  question.appendChild(questionNumber)
  questionNumber.textContent= 'Question' + '-' + (i + 1)
let questionText = document.createElement('p');
questionText.textContent=questionOb.question;
question.appendChild(questionText);

  const answers = questionOb.incorrect_answers.slice(0);
  answers.push(questionOb.correct_answer);
  answersLength = answers.length;
  quiz.appendChild(question);

    for(let j = 0; j< answers.length;j++){
      let radioB = document.createElement('input');
      let label = document.createElement('label');
      radioB.type='radio';

      radioB.setAttribute("name", "radio-" + i);
      radioB.dataset.correct = answers[j] === questionOb.correct_answer;
      question.appendChild(radioB);
      question.appendChild(label);
      label.textContent=answers[j];
      label.setAttribute('for','radio-' + i + "-" + j);
      radioB.id = 'radio-' + i + "-" + j;
      console.log(document.querySelectorAll("input[data-correct=true]:checked").length);

    }
  }
  done.addEventListener('click',checkAnswer);
      function checkAnswer(answers){
        score= document.querySelectorAll("input[data-correct=true]:checked").length;
        wrongAnswers = answersLength - score;
        console.log(answersLength );
        console.log(score);
        dialog.style.display= 'block';
        document.getElementById("number-correct").textContent = score;
        
        }
  
}
start.addEventListener('click',startQuiz);
function startQuiz(){

  quiz.style.display = 'block';
  start.style.display ='none';
  done.style.display ='block';
}
restart.addEventListener('click',restartQuiz);
function restartQuiz(){
  quiz.style.display = 'none';
  start.style.display ='block';
  done.style.display ='none';
  dialog.style.display='none';
  getRandom();
}

