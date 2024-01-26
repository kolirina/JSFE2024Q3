let gameArr;

const arrow = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 0]
];

const cup = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0]
];

const car = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0]
];

const tree = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1]
];

const lama = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 0]
];




gameArrs = [arrow, cup, car, tree, lama];


const getRandomArr = () => {
    gameArr = gameArrs[Math.floor(Math.random() * gameArrs.length)];
    console.log(gameArr);
  }
  
  getRandomArr();



cluesSide = [];
 
function calculateCluesSide(gameArr) {
let clue = 0; 
for (i = 0; i < gameArr.length; i += 1) {
    let clues = [];
    let clue = 0;
for (j = 0; j < gameArr.length; j += 1) {
        if (gameArr[i][j] !== 0) {
            clue += 1;
                } else if (clue !== 0) {
                    clues.push(clue);
                    clue = 0; // Reset clue after pushing the clue
                }   
            }
        if (clue !== 0) {
            clues.push(clue);
        }
        cluesSide.push(clues);
    }
}
calculateCluesSide (gameArr);


cluesTop = [];
 
function calculateCluesTop (gameArr) {
let clue = 0; 
for (i = 0; i < gameArr.length; i += 1) {
    let clues = [];
    let clue = 0;
for (j = 0; j < gameArr.length; j += 1) {
        if (gameArr[j][i] !== 0) {
            clue += 1;
                } else if (clue !== 0) {
                    clues.push(clue);
                    clue = 0; // Reset clue after pushing the clue
                }   
            }
        if (clue !== 0) {
            clues.push(clue);
        }
        cluesTop.push(clues);
    }
}
calculateCluesTop (gameArr);



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
notSoEasyButton.innerText = 'Not So Easy 🚀'
levels.appendChild(notSoEasyButton);

const crazyButton = document.createElement('button');
crazyButton.classList.add('button');
crazyButton.innerText = 'BANANAS 🍌'
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


//audio
const audioClickLeft = document.createElement('audio');
audioClickLeft.id = 'audioClickLeft';
const source = document.createElement('source');
source.src = 'assets/clickLeft.wav';
source.type = 'audio/wav';
audioClickLeft.appendChild(source);
document.body.appendChild(audioClickLeft);
function playAudio() {
    audioClickLeft.play();
    }
function pauseAudio() {
    audioClickLeft.pause();
    }
function setVolume(volume) {
    audioClickLeft.volume = volume;
    }


    const audioClickRight = document.createElement('audio');
    audioClickRight.id = 'audioClickRight';
    const sourceaudioClickRight = document.createElement('source');
    sourceaudioClickRight.src = 'assets/clickRight.wav';
    sourceaudioClickRight.type = 'audio/wav';
    audioClickRight.appendChild(sourceaudioClickRight);
    document.body.appendChild(audioClickRight);
    function playAudio() {
        audioClickRight.play();
        }
    function pauseAudio() {
        audioClickRight.pause();
        }
    function setVolume(volume) {
        audioClickRight.volume = volume;
        }

        

        const audioVictory = document.createElement('audio');
        audioVictory.id = 'audioVictory';
        const sourceaudioVictory = document.createElement('source');
        sourceaudioVictory.src = 'assets/victory.wav';
        sourceaudioVictory.type = 'audio/wav';
        audioVictory.appendChild(sourceaudioVictory);
        document.body.appendChild(audioVictory);
        function playAudio() {
                audioVictory.play();
            }
        function pauseAudio() {
            audioVictory.pause();
            }
        function setVolume(volume) {
            audioVictory.volume = volume;
            }
        
            function toggleMute() {
                if (audioClickLeft.muted && audioClickRight && audioVictory) {
                    audioClickLeft.muted = false;
                    audioClickRight.muted = false;
                    audioVictory.muted = false;

                    soundOff.textContent = 'Sound Off 🔈';
                } else {
                    audioClickLeft.muted =  true;
                    audioClickRight.muted =  true;
                    audioVictory.muted =  true;
                    soundOff.textContent = 'Sound On 🔊';
                }
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

// const playAgainButton = document.createElement('button');
// playAgainButton.classList.add('button');
// playAgainButton.innerText = 'Play Again'
// popUp.appendChild(playAgainButton);



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
soundOff.innerText = 'Sound Off 🔈';
footer.appendChild(soundOff);
soundOff.addEventListener('click', toggleMute); 


const darkMode = document.createElement('button');
darkMode.classList.add('button');
darkMode.innerText = '🌙🌞';
footer.appendChild(darkMode);






    function deepArrayCompare(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
    //берем i=1, а не 0, так как поля для подсказок сравнивать не будем, а они занимают всю первую строку и весь первый столбец, то есть 0ые елементы основного и вложенных массивов
        for (let i = 1; i < arr1.length; i++) {
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


        if (j === 0) {
    cell.innerHTML = cluesSide[i].join('    ');  
}
if (i === 0) {
    cell.innerHTML = cluesTop[j].join('<br>');
}


        cell.addEventListener("click", function () {
            audioClickLeft.play()
           cell.classList.toggle('clickedCell'); 
           timesClicked[i][j] += 1;
           chosenOrNotCell[i][j] = timesClicked[i][j] % 2;
        

        if (!winConditionMet && deepArrayCompare(chosenOrNotCell, gameArr)) {
            console.log('win!');
            if (!startTime) {
                startTime = new Date().getTime();
                setInterval(updateTimer, 1000);
            }
            updateTimer()
            popUpWrapper.classList.add('show');
            winConditionMet = true; // Set the flag to avoid repetitive logging
            popUpBottom.innerHTML = `You have solved the nonogram in ${minutes * 60 + seconds} seconds!`;
            audioVictory.play();
        }
      
            if (!startTime) {
            
            startTime = new Date().getTime(); // Set startTime only once on the first click
            setInterval(updateTimer, 1000); // Start the timer interval
        }
        });
        cell.addEventListener("contextmenu", function (event) {
            audioClickRight.play();
            event.preventDefault(); 
            cell.classList.toggle('crossedCell');
                  });

                //   reset.addEventListener("click", function () {
                //     cell.classList.remove('clickedCell');
                //     cell.classList.remove('crossedCell');
                // })
    }

    table.appendChild(row);
}
// console.log(timesClicked);


reset.addEventListener("click", function () {
    // Iterate over all cells and remove the classes
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            const cell = table.rows[i].cells[j];
            cell.classList.remove('clickedCell');
            cell.classList.remove('crossedCell');
            timesClicked = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ];
            
            chosenOrNotCell = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ];
        }
    }
});




