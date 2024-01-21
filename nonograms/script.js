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

const timer = document.createElement('div');
timer.classList.add('timer');
timer.textContent = '⏰ 00:00';
mainLeft.appendChild(timer);
let startTime;
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime % 60);
  timer.textContent = `⏰   ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

    // Example: Call clearInterval when the game is completed
    // This could be triggered by completing the nonogram
    // Replace this with the actual condition that indicates game completion
    // setTimeout(() => {
    //   clearInterval(timerInterval);
    //   alert('Game completed!');
    // }, 60000);



// game canvas

// Loop to create rows
for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    // Loop to create cells in each row
    for (let j = 0; j < 6; j++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
        
        cell.addEventListener("click", function () {
           cell.classList.toggle('clickedCell'); 
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

// Append the table to a container in your HTML (e.g., document.body)
// canvas.appendChild(table);

// const canvasContent = [];

// const gameSize = 5;
// const cellSize = canvas.width / 6;
// canvas.width = 300;
// canvas.height = 300;

// // Initialize canvasContent array
// for (let i = 0; i <= gameSize; i++) {
//     canvasContent[i] = [];
// }

// function draw() {
//     if (canvas.getContext) {
//         const canvasContext = canvas.getContext("2d");

//         for (let i = 0; i <= gameSize; i++) {
//             for (let j = 0; j <= gameSize; j++) {
//                 canvasContext.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
//                 const cell = document.createElement("div");
//                 cell.classList.add("canvas-cell");

//                 // Assign unique IDs to each cell
//                 const cellId = `cell_${i}_${j}`;
//                 cell.id = cellId;

//                 // Add click event listener to change color and start the timer
//                 cell.addEventListener("click", function () {
//                     cell.style.backgroundColor = "blue"; // Change the color as needed
//                     updateTimer();
//                 });

//                 canvasContent[i][j] = cell;
//                 mainContainer.appendChild(cell); // Append the cell to the main container
//             }
//         }
//     }
// }
// draw();



// const canvasContent = [];

// const gameSize = 5;
// const cellSize = canvas.width / 6;
// canvas.width = 300;
// canvas.height = 300;

// // Initialize canvasContent array
// for (let i = 0; i <= gameSize; i++) {
//     canvasContent[i] = [];
// }

// function draw() {
//     if (canvas.getContext) {
//         const canvasContext = canvas.getContext("2d");

//         for (let i = 0; i <= gameSize; i++) {
//             for (let j = 0; j <= gameSize; j++) {
//                 canvasContext.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
//                 const cell = document.createElement("div");
//                 cell.classList.add("canvas-cell");

//                 // Add click event listener to change color and start the timer
//                 cell.addEventListener("click", function () {
//                     cell.style.backgroundColor = "blue"; // Change the color as needed
//                     updateTimer();
//                 });-+

//                 canvasContent[i][j] = cell;
//                 canvas.appendChild(cell); // Append the cell to the 
//             }
//         }
//     }
// }
// draw();


// const gameSize = 5;
// const cellSize = canvas.width / 6;
// canvas.width = 300;
// canvas.height = 300;


// function draw() {
//     if (canvas.getContext) {
//       const canvasContext = canvas.getContext("2d");

    
//     for (let i = 0; i <= gameSize; i++) {
//         for (let j = 0; j <= gameSize; j++) {
//             canvasContext.strokeRect(i * cellSize,  j * cellSize, cellSize, cellSize);
//         };
//     };

//     };
// }
// draw();








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

