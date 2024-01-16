const mainContainer = document.createElement('main');
mainContainer.classList.add('main-container');
document.body.appendChild(mainContainer);

const leftContainer = document.createElement('section');
leftContainer.classList.add('left-container');
mainContainer.prepend(leftContainer);

const gallows = document.createElement('div');
gallows.classList.add('gallows');

const hangman0 = document.createElement('img');
hangman0.src = 'assets/hangman-0.svg';
gallows.appendChild(hangman0);

leftContainer.appendChild(gallows);

const title = document.createElement('h1');
title.classList.add('title');
title.innerHTML = 'HANGMAN game'
leftContainer.appendChild(title);

const rightContainer = document.createElement('section');
rightContainer.classList.add('right-container');
mainContainer.append(rightContainer);

const dashes = document.createElement('ul');
dashes.classList.add('dashes');
rightContainer.appendChild(dashes);

const hint = document.createElement('p');
hint.classList.add('hint');
rightContainer.appendChild(hint);

const incorrectGuesses = document.createElement('p');
incorrectGuesses.innerHTML = 'Incorrect guesses:'
incorrectGuesses.classList.add('incorrect-guesses');
rightContainer.appendChild(incorrectGuesses);

const wordList = [
  {
      word: "silence",
      hint: "Hint: What can you break just by saying its name?"
  }, 
  {
      word: "candle",
      hint: "Hint: I start out tall, but the longer I stand, the shorter I grow. What am I?"
  },
  {
      word: "needle",
      hint: "Hint: What has one eye but cannot see anything at all?"
  },
  {
      word: "noise",
      hint: "Hint: What can you make that no one — not even you — can see?"
  },
  {
      word: "widow",
      hint: "Hint: What do you call a woman who knows where her husband is all the time?"
  },
  {
      word: "window",
      hint: "Hint: Thanks to me, you can see straight through the wall. What am I?"
  },
  {
      word: "secret",
      hint: "Hint: If you have one, you want to share it. But once you share it, you do not have it. What is it?"
  },
  {
      word: "bottle",
      hint: "Hint: What has a neck but no head?"
  },
  {
      word: "dreams",
      hint: "Hint: What can you see with your eyes closed?"
  },
  {
      word: "tomorrow",
      hint: "Hint: What always comes but never stays?"
  }
];


const popUpWrapper = document.createElement('div');
popUpWrapper.classList.add('pop-up-wrapper');
document.body.appendChild(popUpWrapper);

const popUp = document.createElement('div');
popUp.classList.add('pop-up');
popUpWrapper.appendChild(popUp);

const popUpTop = document.createElement('p');
popUpTop.classList.add('pop-up-top');
popUp.appendChild(popUpTop);

const popUpBottom = document.createElement('p');
hint.classList.add('pop-up-bottom');
popUp.appendChild(popUpBottom);

const playAgainButton = document.createElement('button');
playAgainButton.classList.add('play-again-button');
playAgainButton.innerText = 'Play Again'
popUp.appendChild(playAgainButton);

const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard-container');
  
    for (let i = 97; i <= 122; i++) {
      const letterButton = document.createElement('button');
      letterButton.innerText = String.fromCharCode(i);
      letterButton.id = String.fromCharCode(i);
      letterButton.classList.add('letter-button'); 
      letterButton.classList.add(`${String.fromCharCode(i)}`); 
      keyboardContainer.appendChild(letterButton);
      letterButton.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));  
    }
  
rightContainer.appendChild(keyboardContainer);


const handleKeyDown = (event) => {
    const clickedLetter = event.key.toLowerCase();
    const letterButton = document.querySelector(`.${clickedLetter}`);
    if ('abcdefghigklmnopqrstuvwxyz'.includes(clickedLetter.toLowerCase())) {
      initGame(letterButton, clickedLetter)}; 
};




let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
  document.addEventListener('keydown', handleKeyDown);
  correctLetters = [], 
  wrongGuessCount = 0;
  dashes.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  incorrectGuesses.innerHTML = `Incorrect guesses: <b>${wrongGuessCount} / ${maxGuesses}</b>`;
  hangman0.src = `assets/hangman-${wrongGuessCount}.svg`
  keyboardContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
  popUpWrapper.classList.remove('show');
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint").innerText = hint;
  resetGame();
}

getRandomWord();


const gameOver = (isVictory) => {
  document.removeEventListener('keydown', handleKeyDown);
  setTimeout(() => {
     popUpTop.innerText = isVictory ? `Wow! Great job! 🎉` : `There is always another chance! 😉`;
    popUpBottom.innerHTML = isVictory ? `You found the word: <b>${currentWord}</b>` : `The word was: <b>${currentWord}</b>`;
    popUpWrapper.classList.add('show');
  }, 300);
}


const initGame = (letterButton, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        dashes.querySelectorAll("li")[index].innerText = letter;
        dashes.querySelectorAll("li")[index].classList.add("guessed");
      }
    })
  }  else {
    wrongGuessCount++;
    hangman0.src = `assets/hangman-${wrongGuessCount}.svg`
  }
  // if (letterButton) {
  //   letterButton.disabled = true;
  // }
  // letterButton = document.querySelector(`${clickedLetter}`);
  letterButton.disabled = true;
  incorrectGuesses.innerHTML = `Incorrect guesses: <b>${wrongGuessCount} / ${maxGuesses}</b>`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}


playAgainButton.addEventListener('click', getRandomWord); 