let gameArr = [];

const arrow = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 0]
];

const batman = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 0]
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



const ship = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],    
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], 
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
];

const giraffes = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],    
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0], 
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0]
];

const cat = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],    
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
];

const cherries = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],    
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1], 
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0]
];

const doggie = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],    
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], 
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
];

const castle = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
];

const dining = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1]
];

const duck = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0]
];

const moose = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
];

const stairs = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


gameArrs = [arrow, batman, car, tree, lama, ship, giraffes, cat, cherries, doggie, castle, dining, duck, moose, stairs];
gameArrNameString = ['Arrow', 'Batman', 'Car', 'Tree', 'Lama', 'Ship', 'Giraffes', 'Cat', 'Cherries', 'Doggie', 'Castle', 'Dining', 'Duck', 'Moose', 'Stairs'];
gameArrLevel = ['🛴', '🛴', '🛴', '🛴', '🛴', '🚀', '🚀', '🚀', '🚀', '🚀', '🍌🍌', '🍌🍌', '🍌🍌', '🍌🍌', '🍌🍌']


const wrapper = document.createElement('wrapper');
wrapper.classList.add('wrapper');
document.body.appendChild(wrapper);

const headerWrapper = document.createElement('div');
headerWrapper.classList.add('headerWrapper');
wrapper.appendChild(headerWrapper);

const header = document.createElement('h1');
header.classList.add('header');
header.innerText = 'Welcome To The Nonogram Game😺';
headerWrapper.appendChild(header);

const burger = document.createElement('div');
burger.classList.add('burger');
headerWrapper.appendChild(burger);

const burgerLine1 = document.createElement('span');
burgerLine1.classList.add('burger__line');
burgerLine1.classList.add('burger__line_first');
burger.appendChild(burgerLine1);

const burgerLine2 = document.createElement('span');
burgerLine2.classList.add('burger__line');
burgerLine2.classList.add('burger__line_second');
burger.appendChild(burgerLine2);

const burgerLine3 = document.createElement('span');
burgerLine3.classList.add('burger__line');
burgerLine3.classList.add('burger__line_third');
burger.appendChild(burgerLine3);

const burgerClose = document.createElement('div');
burgerClose.classList.add('burger__close');
headerWrapper.appendChild(burgerClose);

const burgerCloseLine1 = document.createElement('span');
burgerCloseLine1.classList.add('burger__close_line');
burgerCloseLine1.classList.add('burger__close_line_first');
burgerClose.appendChild(burgerCloseLine1);

const burgerCloseLine2 = document.createElement('span');
burgerCloseLine2.classList.add('burger__close_line');
burgerCloseLine2.classList.add('burger__close_line_second');
burgerClose.appendChild(burgerCloseLine2);

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



// timer

let minutes = 0;
let seconds = 0;
let elapsedTime = 0;

const timer = document.createElement('div');
timer.classList.add('timer');
timer.textContent = '⏰ 00:00';
mainLeft.appendChild(timer);
let startTime;

let timerInterval;// Переменная для хранения интервала таймера
let isTimerRunning = false; 

function updateTimer() {
    if (!isTimerRunning) return;
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;
  minutes = Math.floor(elapsedTime / 60);
  seconds = Math.floor(elapsedTime % 60);
  timer.textContent = `⏰   ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    isTimerRunning = true;
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000); // Обновление таймера каждую секунду
}

function stopTimer() {
    isTimerRunning = false; 
  clearInterval(timerInterval); // Остановка интервала
}



let levelName;
const easyLevelNames = [arrow, car, batman, tree, lama];

 
const easyButton = document.createElement('select');
easyButton.classList.add('button');
levels.appendChild(easyButton);
// Set the label of the first option as the button text
easyButton.options.add(new Option('Easy 🛴', 'easy-label', true, true));

// Create options and append them to the select element
const optionArrow = document.createElement('option');
optionArrow.value = 0;
optionArrow.text = 'Arrow';
easyButton.appendChild(optionArrow);

const optionCar = document.createElement('option');
optionCar.value = 1;
optionCar.text = 'Car';
easyButton.appendChild(optionCar);

const optionBatman = document.createElement('option');
optionBatman.value = 2;
optionBatman.text = 'Batman';
easyButton.appendChild(optionBatman);

const optionTree = document.createElement('option');
optionTree.value = 3;
optionTree.text = 'Tree';
easyButton.appendChild(optionTree);

const optionLama = document.createElement('option');
optionLama.value = 4;
optionLama.text = 'Lama';
easyButton.appendChild(optionLama);




  easyButton.addEventListener('change', function () {
    audioClickLeft.play();
    const selectedOptionValue = easyButton.value;
    if (selectedOptionValue >= 0) {
      gameArr = easyLevelNames[selectedOptionValue];
      regenerateGame();
    }
  });

  function regenerateGame() {
    table.innerHTML = '';
    stopTimer();
    startTime = null;
    timer.textContent = '⏰ 00:00';
    initGame(gameArr);
}


const notSoEasyLevelNames = [ship, giraffes, cat, cherries, doggie];  

const notSoEasyButton = document.createElement('select');
notSoEasyButton.classList.add('button');
levels.appendChild(notSoEasyButton);
notSoEasyButton.options.add(new Option('Not So Easy 🚀', 'not-so-easy-label', true, true));

const optionShip = document.createElement('option');
optionShip.value = 0;
optionShip.text = 'Ship';
notSoEasyButton.appendChild(optionShip);

const optionGiraffes = document.createElement('option');
optionGiraffes.value = 1;
optionGiraffes.text = 'Giraffes';
notSoEasyButton.appendChild(optionGiraffes);

const optionCat = document.createElement('option');
optionCat.value = 2;
optionCat.text = 'Cat';
notSoEasyButton.appendChild(optionCat);

const optionCherries = document.createElement('option');
optionCherries.value = 3;
optionCherries.text = 'Cherries';
notSoEasyButton.appendChild(optionCherries);

const optionDoggie = document.createElement('option');
optionDoggie.value = 4;
optionDoggie.text = 'Doggie';
notSoEasyButton.appendChild(optionDoggie);

notSoEasyButton.addEventListener('change', function () {
    audioClickLeft.play();
    const selectedOptionValue = notSoEasyButton.value;
    if (selectedOptionValue >= 0) {
      gameArr = notSoEasyLevelNames[selectedOptionValue];
      regenerateGame();
    }
  });



const bananasLevelNames = [castle, dining, duck, moose, stairs];

const bananasButton = document.createElement('select');
bananasButton.classList.add('button');
levels.appendChild(bananasButton);
bananasButton.options.add(new Option('BANANAS 🍌🍌', 'bananas-label', true, true));

const optionCastle = document.createElement('option');
optionCastle.value = 0;
optionCastle.text = 'Castle';
bananasButton.appendChild(optionCastle);

const optionDining = document.createElement('option');
optionDining.value = 1;
optionDining.text = 'Dining';
bananasButton.appendChild(optionDining);

const optionDuck = document.createElement('option');
optionDuck.value = 2;
optionDuck.text = 'Duck';
bananasButton.appendChild(optionDuck);

const optionMoose = document.createElement('option');
optionMoose.value = 3;
optionMoose.text = 'Moose';
bananasButton.appendChild(optionMoose);

const optionStairs = document.createElement('option');
optionStairs.value = 4;
optionStairs.text = 'Stairs';
bananasButton.appendChild(optionStairs);

bananasButton.addEventListener('change', function () {
    const selectedOptionValue = bananasButton.value;
    audioClickLeft.play();
    if (selectedOptionValue >= 0) {
      gameArr = bananasLevelNames[selectedOptionValue];
      regenerateGame();
    }
  });



const randomButton = document.createElement('button');
randomButton.classList.add('button');
randomButton.innerText = 'Random 🎲';
levels.appendChild(randomButton);
randomButton.addEventListener('click', function() {
    audioClickLeft.play();
    table.innerHTML = '';
    gameArr = gameArrs[Math.floor(Math.random() * gameArrs.length)];
    isTimerRunning = false; 
    startTime = null;
    stopTimer(); 
    timer.textContent = '⏰ 00:00';
    initGame(gameArr);
});


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

// footer buttons

const showAnswers = document.createElement('button');
showAnswers.classList.add('button');
showAnswers.classList.add('footerButton');
showAnswers.innerText = 'Show answers';
footer.appendChild(showAnswers);

const save = document.createElement('button');
save.classList.add('button');
save.classList.add('footerButton');
save.innerText = 'Save Game';
footer.appendChild(save);

const continueGame = document.createElement('button');
continueGame.classList.add('button');
continueGame.classList.add('footerButton');
continueGame.innerText = 'Continue Last Game';
footer.appendChild(continueGame);

const reset = document.createElement('button');
reset.classList.add('button');
reset.classList.add('footerButton');
reset.innerText = 'Reset';
footer.appendChild(reset);

const soundOff = document.createElement('button');
soundOff.classList.add('button');
soundOff.classList.add('footerButton');
soundOff.classList.add('sound-off');
soundOff.innerText = 'Sound Off 🔈';
footer.appendChild(soundOff);
soundOff.addEventListener('click', function() {
    toggleMute();
    audioClickLeft.play();
});


const darkMode = document.createElement('button');
darkMode.classList.add('button');
darkMode.classList.add('footerButton');
darkMode.innerText = 'Dark Mode🌙🌞';
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


function generateNestedArray(size) {
    const nestedArray = [];
    
    for (let i = 0; i < size; i += 1) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(0);
        }
        nestedArray.push(row);
    }

    return nestedArray;
}

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
    };

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


function initGame(gameArr) {

    let timesClicked = generateNestedArray(gameArr.length);
    let chosenOrNotCell = generateNestedArray(gameArr.length);
    let timesCrossed = generateNestedArray(gameArr.length);
    let crossedOrNotCell = generateNestedArray(gameArr.length);
    cluesSide = [];
    calculateCluesSide (gameArr);
    cluesTop = [];   
    calculateCluesTop (gameArr);
    let winConditionMet = false;
    // Loop to create rows
    for (let i = 0; i < gameArr.length; i++) { 
        const row = document.createElement("tr");
    // Loop to create cells in each row
    for (let j = 0; j < gameArr.length; j++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
        if (j === 0) {
            cell.innerHTML = cluesSide[i].join('    ');  
            };
        if (i === 0) {
            cell.innerHTML = cluesTop[j].join('<br>');
        };

    cell.addEventListener("click", function () {
        if (!startTime) {
            startTimer();
         }
        audioClickLeft.play();
        if (wrapper.classList.contains('wrapper_darkMode')) {
            cell.classList.toggle('clickedCell')
            cell.classList.toggle('clickedCell_darkMode')
        } else {
        cell.classList.toggle('clickedCell')
        };
     
        timesClicked[i][j] += 1;
        chosenOrNotCell[i][j] = timesClicked[i][j] % 2;
        
        if (!winConditionMet && deepArrayCompare(chosenOrNotCell, gameArr)) {
      
        popUpWrapper.classList.add('show');
        winConditionMet = true; // Set the flag to avoid repetitive logging
        popUpBottom.innerHTML = `You have solved the nonogram in ${minutes * 60 + seconds} seconds!`;
        audioVictory.play();
        stopTimer();
        currentTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        currentSeconds = minutes * 60 + seconds;
        currentGameArrName = gameArrNameString[gameArrs.indexOf(gameArr)];
        currentLevel = gameArrLevel[gameArrs.indexOf(gameArr)];
        saveWin(currentTime, currentSeconds, currentGameArrName, currentLevel);
        displayLastFiveWins();

        popUpWrapper.addEventListener('click', function (event) {
                audioClickLeft.play();
            if (popUpWrapper.classList.contains('show')) {
                popUpWrapper.classList.remove('show');
                audioVictory.pause();
                };
        });
            
        }
        });


    cell.addEventListener("contextmenu", function (event) {
        audioClickRight.play();
        event.preventDefault(); 
        if (wrapper.classList.contains('wrapper_darkMode')) {
            cell.classList.toggle('crossedCell')
            cell.classList.toggle('crossedCell_darkMode')
        } else {
        cell.classList.toggle('crossedCell')
        };
        timesCrossed[i][j] += 1;
         crossedOrNotCell[i][j] = timesCrossed[i][j] % 2;
            if (!startTime) {
                startTimer();
                }
        });

    }


    table.appendChild(row);
        const sixthRows = document.querySelectorAll('tr:nth-child(5n + 1) td');
    sixthRows.forEach(function (cell) {cell.classList.add('lightModeSixthRows');
        if (wrapper.classList.contains('wrapper_darkMode')) {
cell.classList.add('darkModeSixthRows')
       
        } 
    });
}

    save.addEventListener('click', function () {
        audioClickLeft.play();
        const savedData = {
            gameArr: gameArr,
            gameArrName: gameArrNameString[gameArrs.indexOf(gameArr)],
            level: gameArrLevel[gameArrs.indexOf(gameArr)],
            chosenOrNotCell: chosenOrNotCell,
            crossedOrNotCell: crossedOrNotCell,
            minutes: minutes,
            seconds: seconds,
            gameDuration: elapsedTime * 1000,
            timesClicked: timesClicked,
            timesCrossed: timesCrossed,
       };
        stopTimer();
        startTime = null;
        localStorage.setItem('savedGame', JSON.stringify(savedData));
    });

    darkMode.addEventListener('click', function () {
        for (let i = 0; i < gameArr.length; i++) {
            for (let j = 0; j < gameArr.length; j++) {
                const cell = table.rows[i].cells[j];
                if (chosenOrNotCell[i][j] === 1) {
                    cell.classList.toggle ('clickedCell_darkMode');
                } 
                if (crossedOrNotCell[i][j] === 1) {
                    cell.classList.toggle ('crossedCell_darkMode');
                } 
            }
        }
    });

};

continueGame.addEventListener('click', function () {
    darkMode.addEventListener('click', function () {
        for (let i = 0; i < gameArr.length; i++) {
            for (let j = 0; j < gameArr.length; j++) {
                const cell = table.rows[i].cells[j];
                if (chosenOrNotCell[i][j] === 1) {
                    cell.classList.toggle ('clickedCell_darkMode');
                } 
                if (crossedOrNotCell[i][j] === 1) {
                    cell.classList.toggle ('crossedCell_darkMode');
                } 
            }
        }
    });
    audioClickLeft.play();
    stopTimer();
    const savedDataString = localStorage.getItem('savedGame');

    if (savedDataString) {
        const savedData = JSON.parse(savedDataString);
        gameArr = savedData.gameArr;
        gameArrName = savedData.gameArrName;
        level = savedData.level;
        chosenOrNotCell = savedData.chosenOrNotCell;
        // startTime = savedData.startTime;
        minutes = savedData.minutes;
        seconds = savedData.seconds;
    
        gameDuration = savedData.gameDuration;
        timesClicked = savedData.timesClicked;
        timesCrossed = savedData.timesCrossed;
        crossedOrNotCell = savedData.crossedOrNotCell;
        
        timer.textContent = `⏰   ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
        cluesSide = [];
        calculateCluesSide (gameArr);
        cluesTop = [];   
        calculateCluesTop (gameArr);
        let winConditionMet = false;




        if (table.hasChildNodes()) {
            table.innerHTML = '';
        }
        for (let i = 0; i < gameArr.length; i++) { 
            const row = document.createElement("tr");
           for (let j = 0; j < gameArr.length; j++) {
            const cell = document.createElement("td");
            row.appendChild(cell);
            if (chosenOrNotCell[i][j] === 1) {
                if (wrapper.classList.contains('wrapper_darkMode')) {
                    cell.classList.add('clickedCell_darkMode')
                } else {
                      cell.classList.add('clickedCell')
                }
            };
            if (crossedOrNotCell[i][j] === 1) {
                if (wrapper.classList.contains('wrapper_darkMode')) {
                    cell.classList.add('crossedCell_darkMode')
                } else {
                      cell.classList.add('crossedCell')
                }
            };
            if (j === 0) {
                cell.innerHTML = cluesSide[i].join('    ');  
                };
            if (i === 0) {
                cell.innerHTML = cluesTop[j].join('<br>');
            };

        cell.addEventListener("click", function () {
            if (!startTime) {
                let currentTime = new Date().getTime();
                startTime = currentTime - minutes * 60 * 1000 - seconds * 1000;
                isTimerRunning = true;
                timerInterval = setInterval(updateTimer, 1000);
                 }
            audioClickLeft.play()

            if (wrapper.classList.contains('wrapper_darkMode')) {
                cell.classList.toggle('clickedCell')
                cell.classList.toggle('clickedCell_darkMode')
            } else {
            cell.classList.toggle('clickedCell')
            };

            timesClicked[i][j] += 1;
            chosenOrNotCell[i][j] = timesClicked[i][j] % 2;
         
            if (!winConditionMet && deepArrayCompare(chosenOrNotCell, gameArr)) {
          
                popUpWrapper.classList.add('show');
                winConditionMet = true; // Set the flag to avoid repetitive logging
                popUpBottom.innerHTML = `You have solved the nonogram in ${minutes * 60 + seconds} seconds!`;
                audioVictory.play();
                stopTimer();
                currentTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                currentSeconds = minutes * 60 + seconds;
                currentGameArrName = gameArrName;
                currentLevel = level;

                saveWin(currentTime, currentSeconds, currentGameArrName, currentLevel);
                displayLastFiveWins();
                console.log(currentGameArrName);
    
                popUpWrapper.addEventListener('click', function (event) {
                    audioClickLeft.play();
                    if (popUpWrapper.classList.contains('show')) {
                      popUpWrapper.classList.remove('show');
                      audioVictory.pause();
                      };
                 });
                
             }
                });

    cell.addEventListener("contextmenu", function (event) {
        audioClickRight.play();
        event.preventDefault(); 
        if (wrapper.classList.contains('wrapper_darkMode')) {
            cell.classList.toggle('crossedCell')
            cell.classList.toggle('crossedCell_darkMode')
        } else {
            cell.classList.toggle('crossedCell')
        };
        timesCrossed[i][j] += 1;
        crossedOrNotCell[i][j] = timesCrossed[i][j] % 2;
        if (!isTimerRunning) {
            let currentTime = new Date().getTime();
            startTime = currentTime - minutes * 60 * 1000 - seconds * 1000;
            isTimerRunning = true;
            timerInterval = setInterval(updateTimer, 1000);
         }
    });
    
        };
    
        table.appendChild(row);
    }
    
    };

    
   });


reset.addEventListener("click", function () {
    audioClickLeft.play();
    timesClicked = generateNestedArray(gameArr.length);
    chosenOrNotCell = generateNestedArray(gameArr.length);
    startTime = null;
    stopTimer(); 
    timer.textContent = '⏰ 00:00';
    table.innerHTML = '';


             
    initGame (gameArr);
});

showAnswers.addEventListener('click', function () {
    audioClickLeft.play();
    startTime = null;
    stopTimer(); 
    timer.textContent = '⏰ 00:00';
    for (let i = 0; i < gameArr.length; i++) {
        for (let j = 0; j < gameArr.length; j++) {
            const cell = table.rows[i].cells[j];
            if (gameArr[i][j] === 1) {
                if (wrapper.classList.contains('wrapper_darkMode')) {
                    cell.classList.add('clickedCell_darkMode');
                } else {
                    cell.classList.add('clickedCell')
                };
                
            } else {
                cell.classList.remove('clickedCell_darkMode');
                cell.classList.remove('clickedCell');
            }            
        }
    }
    // darkMode.addEventListener('click', function () {
    //     for (let i = 0; i < gameArr.length; i++) {
    //         for (let j = 0; j < gameArr.length; j++) {
    //             const cell = table.rows[i].cells[j];
    //             if (gameArr[i][j] === 1) {

    //                 if (wrapper.classList.contains('wrapper_darkMode')) {
    //                     cell.classList.add('clickedCell_darkMode');
    //                 } else {
    //                     cell.classList.remove('clickedCell_darkMode');
    //                     cell.classList.add('clickedCell')
    //                 };

    //             } else {
    //                 if (wrapper.classList.contains('wrapper_darkMode')) {
    //                     cell.classList.remove('clickedCell_darkMode');
    //                 } else {
    //                     cell.classList.remove('clickedCell_darkMode');
    //                     cell.classList.remove('clickedCell')
    //                 };

    //             };

    //         }
    //     }
    // });
});




const getRandomEasyArr = () => {
    gameArr = easyLevelNames[Math.floor(Math.random() * easyLevelNames.length)];
    initGame(gameArr)  }
  
  getRandomEasyArr();

function saveWin(time, seconds, gameArrName, level) {
    let wins = JSON.parse(localStorage.getItem('wins')) || [];
    wins.push({ time, seconds, gameArrName, level });
    if (wins.length > 5) {
        wins = wins.slice(-5);
    }
    localStorage.setItem('wins', JSON.stringify(wins));
};

function getLastFiveWins() {
    return JSON.parse(localStorage.getItem('wins')) || [];
};
const lastFiveWins = getLastFiveWins();

const winTableWrapper = document.createElement('div');
winTableWrapper.classList.add('win-table-wrapper');
mainLeft.appendChild(winTableWrapper);

const winTableTitle = document.createElement('div');
winTableTitle.classList.add('lev-choice-text');
winTableWrapper.appendChild(winTableTitle);
winTableTitle.innerText = 'Latest Wins:';

const winTable = document.createElement('table');
winTable.classList.add('win-table');
winTable.classList.add('table');
winTableWrapper.appendChild(winTable);


function displayLastFiveWins() {
    const lastFiveWins = getLastFiveWins();
    lastFiveWins.sort((a, b) => a.seconds - b.seconds);
    winTable.innerHTML = '';
    const headerRow = winTable.insertRow(0);
    const headerCell1 = headerRow.insertCell(0);
    const headerCell2 = headerRow.insertCell(1);
    const headerCell3 = headerRow.insertCell(2);

    headerCell1.textContent = 'Time';
    headerCell2.textContent = 'Game Name';
    headerCell3.textContent = 'Difficulty';

    lastFiveWins.forEach((win, index) => {
        const row = winTable.insertRow(index + 1); // Start from index 1 for data rows
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = win.time;
        cell2.textContent = win.gameArrName; 
        cell3.textContent = win.level;
    });
}


displayLastFiveWins();




//Burger handler


burger.addEventListener('click', function () {
    footer.classList.add('footer_active');
});

burgerClose.addEventListener('click', function () {
    footer.classList.remove('footer_active');
});

const footerButtons = document.querySelectorAll('.footerButton');
for (let i = 0; i < footerButtons.length; i += 1) {
    footerButtons[i].addEventListener('click', function () {
        footer.classList.remove('footer_active');
    });
}

// const sixthRows = document.querySelectorAll('tr:nth-child(5n + 1) td');
//     sixthRows.forEach(function (cell) {
//         cell.classList.add('lightModeSixthRows');
//    });

darkMode.addEventListener('click', function () {
    document.body.classList.toggle('darkMode');
    wrapper.classList.toggle('wrapper_darkMode');
    header.classList.toggle('header_darkMode');
    timer.classList.toggle('timer_darkMode');
    table.classList.toggle('table_darkMode');
    table.classList.toggle('darkMode');
    winTable.classList.toggle('win-table_darkMode');

    const firstColumnCells = document.querySelectorAll('td:first-child');
    firstColumnCells.forEach(function (cell) {
        cell.classList.toggle('_darkMode');
    });

     const sixthColumns = document.querySelectorAll('td:nth-child(5n + 1)');
     sixthColumns.forEach(function (cell) {
         cell.classList.toggle('darkMode');
    });


    const firstRowCells = document.querySelectorAll('tr:first-child td');
    firstRowCells.forEach(function (cell) {
        cell.classList.toggle('__darkMode');
       
    }); 
  
    const sixthRows = document.querySelectorAll('tr:nth-child(5n + 1) td');
    sixthRows.forEach(function (cell) {
        cell.classList.toggle('darkModeSixthRows');
   });


    burgerCloseLine1.classList.toggle('burger__close_line_darkMode');
    burgerCloseLine2.classList.toggle('burger__close_line_darkMode');
    levChoiceText.classList.toggle('lev-choice-text_darkMode');
    winTableTitle.classList.toggle('lev-choice-text_darkMode');


    table.classList.toggle('table_darkMode');
    table.classList.toggle('table_darkMode');
});