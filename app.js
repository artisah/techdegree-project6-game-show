const qwertyKey = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const btnResetGame = document.querySelector('.btn__reset');
const startGameOverlay = document.querySelector('#overlay');
const ul = document.querySelector('#phrase ul');
const ol = document.querySelector('#scoreboard ol');
const title = document.querySelector('.title');
const h3 = document.createElement('h3');
var missed = 0; 
let startOver = document.createElement('a');



const phrases = [
    "all is well",
    "shoot the moon",
    "now or never",
    "never give up",
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

    for (let i = 0; i < phraseCharArr.length; i++ ) {
        const li = document.createElement('li');
        const letter = phraseCharArr[i];
        li.textContent = letter;
        ul.appendChild(li);
        
        // add letter class to li.
        if (letter.match(/[a-z]/i)) {
            li.classList.add('letter');
        } 
        // add space class to li.
        else if (letter.match(/[\s]/)) {
            li.classList.add('space');
        }    
    }     
}

//compare user click with letter of phrases.
function checkLetter(btnGuesss) {
  let guess = null;
  const lis = ul.children;
  const letterBtnGuess = btnGuesss.textContent;
  
  for(let i = 0; i < lis.length; i++ ) {
     const attrValue = (lis[i].getAttribute('class'));
     const phraseLetter = lis[i].textContent;

     if (attrValue === "letter") {
         //  match found in pharse char with user selected char.
         if (phraseLetter.toLowerCase() === letterBtnGuess.toLowerCase()) 
         {
             lis[i].classList.add("show");
             guess = lis[i];
         } 
      }    
   }
    return guess;
}

//function to check whether player wins or lose  game.
function checkWin() {
    const lisCountClassLetter = ul.querySelectorAll('.letter');
    const lisCountClassShow = ul.querySelectorAll('.show');

        if (lisCountClassLetter.length === lisCountClassShow.length) {
            gameWin();
        } else if(missed >= 5){
            gameLose();
        }

}

//Style for h3 element, to display win or lose text at end of game.
function createStyleHeading3() {
    h3.style.fontFamily = 'Open Sans', 'sans-serif';
    h3.style.fontSize = '30px';
    h3.style.textTransform = 'capitalize';
    h3.style.margin = 0;
    startGameOverlay.appendChild(h3);
}

function gameWin() {
   startGameOverlay.style.display = '';
   title.style.zIndex = 100;
   startGameOverlay.className = 'win';
   startGameOverlay.removeChild(btnResetGame);
   startGameOverlay.appendChild(startOver);
   createStyleHeading3();
   startOver.textContent = 'Play Again'
   startOver.classList.add('btn__reset');
   h3.textContent = "You Win!"
   
}

function gameLose() {
    startGameOverlay.style.display = '';
    title.style.zIndex = 100;
    startGameOverlay.className = 'lose';
    startGameOverlay.removeChild(btnResetGame);
    startGameOverlay.appendChild(startOver);
    createStyleHeading3();
    startOver.textContent = 'Try Again'
    startOver.classList.add('btn__reset');
    h3.textContent = "You Lose!"
  
}

startOver.addEventListener('click', function(){
    missed = 0;
    window.location.reload(true);     
});

// ************************************ //
//  Events and events delegations
// ************************************ //

//to hide the start screen overlay
btnResetGame.addEventListener('click', function() {
    startGameOverlay.style.display = 'none';
    const phraseArray = getRandomPhraseAsArray(phrases);
    console.log(phraseArray);
    addPhraseToDisplay(phraseArray);
});


// Keypress Event on qwery keyboard
qwertyKey.addEventListener("click", function(event) {
    const ol = document.querySelector('#scoreboard ol');
   
    if (event.target.matches('button')) {
        const selectBtn = event.target;
        selectBtn.classList.add('chosen');
        
        selectBtn.disabled = true;
        const letterFound = checkLetter(selectBtn);

        //player has guessed the wrong letter
        if (letterFound === null) {
            missed += 1;
            const liveHeart = ol.querySelectorAll('li img[src="images/liveHeart.png"]');
            if (liveHeart.length > 0) {
                liveHeart[0].setAttribute("src", "images/lostHeart.png");    
            }    
        }
    }
    checkWin();
});




