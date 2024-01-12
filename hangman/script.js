const mainContainer = document.createElement('main');
mainContainer.classList.add('main-container');
document.body.appendChild(mainContainer);

const leftContainer = document.createElement('section');
leftContainer.classList.add('left-container');
mainContainer.prepend(leftContainer);

const gallows = document.createElement('section');
gallows.classList.add('gallows');
// Create an img element
const gallowsImage = document.createElement('img');

// Set the src attribute to the path of your PNG image
gallowsImage.src = 'assets/gallows.png';

// Append the img element to the gallows section
gallows.appendChild(gallowsImage);
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
hint.innerHTML = 'What can you break just by saying its name?'
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
      hint: "Hint: A little bit of dark humour. What do you call a woman who knows where her husband is all the time?"
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

let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint").innerText = hint;
  dashes.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

getRandomWord();


const initGame = (letterButton, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        dashes.querySelectorAll("li")[index].innerText = letter;
        dashes.querySelectorAll("li")[index].classList.add("guessed");
      }
    })
  }  else {
    wrongGuessCount++;
  }
  incorrectGuesses.innerText = `Incorrect guesses: ${wrongGuessCount} / ${maxGuesses}`;
}

const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard-container');
  
    for (let i = 97; i <= 122; i++) {
      const letterButton = document.createElement('button');
      letterButton.innerText = String.fromCharCode(i);
      letterButton.classList.add('letter-button'); 
      keyboardContainer.appendChild(letterButton);
      letterButton.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));  
    }
  
rightContainer.appendChild(keyboardContainer);

  
//   // Function to handle letter guesses
//   function handleGuess(letter) {
//     // Implement your logic to check if the letter is correct or incorrect
//     console.log(`Letter guessed: ${letter}`);
//   }
  
//   // Call the function to create the virtual keyboard
//   createVirtualKeyboard();
  
//   // Add event listener for physical keyboard input
//   document.addEventListener('keydown', function (event) {
//     // Check if the pressed key is a letter
//     if (/^[a-zA-Z]$/.test(event.key)) {
//       const letter = event.key.toUpperCase();
//       handleGuess(letter);
//     }
//   });

  console.log(keyboardContainer.children);
