
// Question: What can you break just by saying its name?
// Answer: Silence.

// Question: What always comes but never stays?
// Answer: Tomorrow.

// Question: What can you see with your eyes closed?
// Answer: Dreams.
// Question: What has a neck but no head?
// Answer: Bottle.
// If you have one, you want to share it. But once you share it, you do not have it. What is it?

// A secret

// What starts with “e” and ends with “e” but only has one letter in it?

// An envelope

// I start out tall, but the longer I stand, the shorter I grow. What am I?

// A candle

// Thanks to me, you can see straight through the wall. What am I?

// A window

// A little bit of dark humour. What do you call a woman who knows where her husband is all the time?

// A widow

// What can you make that no one—not even you—can see?

// Noise

// What has one eye but can’t see anything at all?

// A needle


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

const dashes = document.createElement('section');
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

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard-container');
  
    for (let letter of alphabet) {
      const letterButton = document.createElement('button');
      letterButton.id = letter.toLowerCase();
      letterButton.textContent = letter;
      letterButton.classList.add('letter-button');
    //   button.addEventListener('click', function () {
    //     handleGuess(letter);
    //   });
  
      keyboardContainer.appendChild(letterButton);
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
