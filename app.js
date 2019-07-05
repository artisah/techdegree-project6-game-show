const qwertyKey = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const btnResetGame = document.querySelector('.btn__reset');
const startGameOverlay = document.querySelector('#overlay');
const ul = document.querySelector('#phrase ul');
//const scoreboard = document.querySelector('#scoreboard');
const ol = document.querySelector('#scoreboard ol');
//To track no. of Times user missed guessing correct letter.
var missed = 0; 

const phrases = [
    "a friend in need is a friend indeed",
    "do not count your chickens before the eggs have hatched",
    "burn the midnight oil",
    "kill two birds with one stone",
    "your guess is as good as mine"
]; 


// ************************************ //
//  functions
// ************************************ //

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
        // add letter class to li.
        if (letter.match(/[a-z]/i)) {
            li.classList.add('letter');
        } 
        // add space class to li.
        else if (letter.match(/[\s]/)) {
            li.classList.add('space');
        }
        ul.appendChild(li);
    }     
}

//compare user click with letter of phrases.
function checkLetter(btnGuesss) {
  let phraseLetter = '';
  let letterFound = false;
//   extract button text from button element.
  const letterBtnGuess = btnGuesss.textContent;
  //loop throught all lis.
  const lis = ul.querySelectorAll('li');
  for(let i = 0; i < lis.length; i++ ) {
     const attrValue = (lis[i].getAttribute('class'));
     phraseLetter = lis[i].textContent;

     if (attrValue === "letter") {
         
         //  match found in pharse char with user selected char.
         if (phraseLetter === letterBtnGuess) {
             lis[i].classList.add("show");
             letterFound = true;
         } 
     } 
  }
   
     if (letterFound) {
        return phraseLetter;
    }
    //  no match found
    else {
        letterFound = false;
        return null;
    }
}

//function to check whether player wins or lose  game.
function checkWin() {
    

}

// ************************************ //
//  Events and events delegations
// ************************************ //

//to hide the start screen overlay
btnResetGame.addEventListener('click', function() {
    startGameOverlay.style.display = 'none';
});


// Keypress Event on qwery keyboard

qwertyKey.addEventListener("click", function(event) {

    if (event.target.matches('button')) {
        const selecteBtn = event.target;
        selecteBtn.classList.add('chosen');
        
        selecteBtn.disabled = true;
        const letterFound = checkLetter(selecteBtn);

        //player has guessed the wrong letter
        if (letterFound === null) {
            missed += 1;

            // remove li containg Liveheart.png, if exists.
            if (ol.hasChildNodes()) {
                ol.removeChild(ol.childNodes[0]);
              }  
        }
    }
});

const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);
addPhraseToDisplay(phraseArray);


