const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const btnResetGame = document.querySelector('.btn__reset');
const startGameOverlay = document.querySelector('#overlay');
const ul = document.querySelector('#phrase ul');
//To track no. of Times user missed guessing correct letter.
var missed = 0; 
const phrases = [
    "a friend in need is a friend indeed",
    "do not count your chickens before the eggs have hatched",
    "burn the midnight oil",
    "kill two birds with one stone",
    "your guess is as good as mine"
]; 

//to hide the start screen overlay
btnResetGame.addEventListener('click', function() {
    startGameOverlay.style.display = 'none';
});

// function to select a phrase and return the new character array.
function getRandomPhraseAsArray(phraseArr) {
    const max = phraseArr.length; 
    // It will return 0, 1... (max-1), if max=4 then expected output: 0, 1 or 2 0r 3
    const randomIndex = Math.floor(Math.random() * max); 
    let randomPhrase = phraseArr[randomIndex];
    // convert array of string into array of char.
    randomPhrase = randomPhrase.split("");
    return randomPhrase;
}

//Function to create li node for ul.
function addPhraseToDisplay(phraseCharArr) {
    for (let i =0; i < phraseCharArr.length; i++ ) {
        const li = document.createElement('li');
        const liTextNode = document.createTextNode(phraseCharArr[i]);
        li.appendChild(liTextNode);
        
        
        const letter = phraseCharArr[i];
        if (letter.match(/[a-z]/i)) {
            li.classList.add('letter');
        }
        ul.appendChild(li);
    }     
}

//Compare user click with letter of phrases.
function checkLetter(btnGuesss) {
  const gg = 'a';

  //loop throught all lis.
  const lis = ul.querySelectorAll('li');
  for(let i = 0; i < lis.length; i++ ) {
      const lisLetterClass = lis[i].getAttribute("class");


  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);
addPhraseToDisplay(phraseArray);