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

const game = document.createElement('section');
game.classList.add('game');
mainContainer.appendChild(game);

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
easyButton.innerText = 'Easy'
levels.appendChild(easyButton);

const notSoEasyButton = document.createElement('button');
notSoEasyButton.classList.add('button');
notSoEasyButton.innerText = 'Not So Easy'
levels.appendChild(notSoEasyButton);

const crazyButton = document.createElement('button');
crazyButton.classList.add('button');
crazyButton.innerText = 'CRAZY'
levels.appendChild(crazyButton);



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

