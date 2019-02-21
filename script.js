let dehaze = document.querySelector('.material-icons');
let headerTitel= document.querySelector('h1');
let main = document.querySelector('main');
let button = document.querySelector('button');
function getRandom(){
  let req = new XMLHttpRequest();
  req.open('GET', 'https://opentdb.com/api.php?amount=10'); //hämta datan från länken
  req.addEventListener('load',parseRandom);//parsa datan vi fått.
  req.send();
}
getRandom();

function parseRandom(){ //skapa functionen som parsar.
  let parsedData = JSON.parse(this.responseText);// parsedData
  console.log(parsedData.results);
let h1 = document.createElement('h1');

for(let i = 0; i< parsedData.results.length; i++){
  const questionOb = parsedData.results[i];
  let question= document.createElement('div');
  question.classList.add('question');

let questionText = document.createElement('p');
questionText.textContent=questionOb.question;
question.appendChild(questionText);

  const answers = questionOb.incorrect_answers.slice(0);
  answers.push(questionOb.correct_answer);

  console.log(answers);
// radio buttons rätta svar


  main.appendChild(question);

  for(let j = 0; j< answers.length;j++){
    let radioB = document.createElement('input');
    let label = document.createElement('label');
    radioB.type='radio';

    radioB.setAttribute("name", "radio-" + i);
    question.appendChild(radioB);
    question.appendChild(label);
    label.textContent=answers[j];
    label.setAttribute('for','radio-' + i + "-" + j);
    radioB.id = 'radio-' + i + "-" + j;
  }
}
let renderDiv = document.querySelector('main');
renderDiv.appendChild(h1);
}
