const qwertyKey = document.querySelector('#qwerty');
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
        else if (letter.match(/[\s]/)) {
            li.classList.add('space');
        }

        ul.appendChild(li);
    }     
}

//compare user click with letter of phrases.
function checkLetter(btnGuesss) {
    let phraseLetter = '';
//   extract button text from button element.
  const letterBtnGuess = btnGuesss.textContent;
  //loop throught all lis.
  const lis = ul.querySelectorAll('li');
  for(let i = 0; i < lis.length; i++ ) {
     const attrValue = (lis[i].getAttribute('class'));

     if (attrValue === "letter") {
        
         phraseLetter = lis[i].textContent;
         //  match found in pharse char with user selected char.
         if (lis[i].textContent === letterBtnGuess) {
             lis[i].classList.add("show");
         } 
     } 
  }
  
    if (phraseLetter !== undefined && phraseLetter !== null) {
        return phraseLetter;
    }
    //  no match found
    else {
        return null;
    }
  

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
        
        //selecteBtn.disabled = true;

        const letterFound = checkLetter(selecteBtn);

    }

})

const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);
addPhraseToDisplay(phraseArray);


