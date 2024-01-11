console.log('Script loaded!')

const mainContainer = document.createElement('main');
const leftContainer = document.createElement('section');

mainContainer.prepend(leftContainer);

const gallows = document.createElement('section');
leftContainer.appendChild(gallows);

const title = document.createElement('p');
title.innerHTML = 'HANGMAN game'
leftContainer.appendChild(title);

const rightContainer = document.createElement('section');
mainContainer.append(rightContainer);

const dashes = document.createElement('section');
rightContainer.appendChild(dashes);

const hint = document.createElement('p');
rightContainer.appendChild(hint);

const incorrectGuesses = document.createElement('p');
rightContainer.appendChild(incorrectGuesses);

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const keyboardContainer = document.createElement('div');
keyboardContainer.id = 'keyboard';
  
    for (let letter of alphabet) {
      const button = document.createElement('button');
      button.id = letter.toLowerCase();
      button.textContent = letter;
    //   button.addEventListener('click', function () {
    //     handleGuess(letter);
    //   });
  
      keyboardContainer.appendChild(button);
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
