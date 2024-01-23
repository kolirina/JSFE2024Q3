
const gameArr = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

const gameArr1 = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0]
];

const wrapper = document.createElement('wrapper');
wrapper.classList.add('wrapper');
document.body.appendChild(wrapper);

const header = document.createElement('h1');
header.classList.add('header');
header.innerText = 'Welcome To The Nonogram Game😺';
wrapper.appendChild(header);

const mainContainer = document.createElement('main');
mainContainer.classList.add('main-container');
wrapper.appendChild(mainContainer);

const footer = document.createElement('footer');
footer.classList.add('footer');
wrapper.appendChild(footer);

const mainLeft = document.createElement('section');
mainLeft.classList.add('main-left');
mainContainer.appendChild(mainLeft);

const table = document.createElement('table');
table.classList.add('table');
mainContainer.appendChild(table);

const mainRight = document.createElement('section');
mainRight.classList.add('main-right');
mainContainer.appendChild(mainRight);

const levChoiceWrapper = document.createElement('div');
levChoiceWrapper.classList.add('lev-choice-wrapper');
mainLeft.appendChild(levChoiceWrapper);

const levChoiceText = document.createElement('p');
levChoiceText.innerHTML = 'Choose your level:';
levChoiceText.classList.add('lev-choice-text');
levChoiceText.classList.add('text');
levChoiceWrapper.appendChild(levChoiceText);

const levels = document.createElement('section');
levels.classList.add('levels');
levChoiceWrapper.appendChild(levels);

const easyButton = document.createElement('button');
easyButton.classList.add('button');
easyButton.innerText = 'Easy 🛴'
levels.appendChild(easyButton);

const notSoEasyButton = document.createElement('button');
notSoEasyButton.classList.add('button');
notSoEasyButton.innerText = 'Not So Easy 🚗'
levels.appendChild(notSoEasyButton);

const crazyButton = document.createElement('button');
crazyButton.classList.add('button');
crazyButton.innerText = 'CRAZY 🚀'
levels.appendChild(crazyButton);

// timer

let minutes = 0;
let seconds = 0;

const timer = document.createElement('div');
timer.classList.add('timer');
timer.textContent = '⏰ 00:00';
mainLeft.appendChild(timer);
let startTime;
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;
  minutes = Math.floor(elapsedTime / 60);
  seconds = Math.floor(elapsedTime % 60);
  timer.textContent = `⏰   ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

}

//pop-up

const popUpWrapper = document.createElement('div');
popUpWrapper.classList.add('pop-up-wrapper');
document.body.appendChild(popUpWrapper);

const popUp = document.createElement('div');
popUp.classList.add('pop-up');
popUpWrapper.appendChild(popUp);

const popUpTop = document.createElement('p');
popUpTop.classList.add('pop-up-top');
popUpTop.innerText = 'Great! 🎉'
popUp.appendChild(popUpTop);

const popUpBottom = document.createElement('p');
popUpBottom.classList.add('pop-up-bottom');
popUp.appendChild(popUpBottom);

const playAgainButton = document.createElement('button');
playAgainButton.classList.add('button');
playAgainButton.innerText = 'Play Again'
popUp.appendChild(playAgainButton);







    function deepArrayCompare(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
    
        for (let i = 0; i < arr1.length; i++) {
            if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
                // Recursively compare nested arrays
                if (!deepArrayCompare(arr1[i], arr2[i])) {
                    return false;
                }
            } else if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
    
        return true;
    }

// game canvas
let timesClicked = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

let chosenOrNotCell = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

let winConditionMet = false;
// Loop to create rows
for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    // Loop to create cells in each row
    for (let j = 0; j < 6; j++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
        
        cell.addEventListener("click", function () {
           cell.classList.toggle('clickedCell'); 
           timesClicked[i][j] += 1;
           chosenOrNotCell[i][j] = timesClicked[i][j] % 2;
           console.log(timesClicked);
           console.log(chosenOrNotCell);

        if (!winConditionMet && deepArrayCompare(chosenOrNotCell, gameArr1)) {
            console.log('win!');
            if (!startTime) {
                startTime = new Date().getTime();
                setInterval(updateTimer, 1000);
            }
            updateTimer()
            popUpWrapper.classList.add('show');
            winConditionMet = true; // Set the flag to avoid repetitive logging
            popUpBottom.innerHTML = `You have solved the nonogram in ${minutes} minutes ${seconds} seconds!`;
        }
      
            if (!startTime) {
            
            startTime = new Date().getTime(); // Set startTime only once on the first click
            setInterval(updateTimer, 1000); // Start the timer interval
        }
        });
        cell.addEventListener("contextmenu", function (event) {
            event.preventDefault(); 
            cell.classList.toggle('crossedCell');
                  });
    }

    table.appendChild(row);
}
console.log(timesClicked);


// footer buttons

const showAnswers = document.createElement('button');
showAnswers.classList.add('button');
showAnswers.innerText = 'Show answers';
footer.appendChild(showAnswers);

const save = document.createElement('button');
save.classList.add('button');
save.innerText = 'Save';
footer.appendChild(save);

const reset = document.createElement('button');
reset.classList.add('button');
reset.innerText = 'Reset';
footer.appendChild(reset);

const soundOff = document.createElement('button');
soundOff.classList.add('button');
soundOff.classList.add('sound-off');
soundOff.innerText = '🔈🔊';
footer.appendChild(soundOff);

const darkMode = document.createElement('button');
darkMode.classList.add('button');
darkMode.innerText = '🌙🌞';
footer.appendChild(darkMode);




