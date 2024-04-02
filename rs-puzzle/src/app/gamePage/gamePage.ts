import { Round, GameData, WordCard } from '../interfaces';
import fetchRoundsData from '../fetchData';
import LoginForm from '../loginPage/loginForm';

export default class GamePage {
  private gameData: GameData;
  private rounds: Round[] = [];
  private currentRoundIndex: number = 0;
  private textExampleIndex: number = 0;
  private newContainers: HTMLDivElement[] = [];
  private gameContainer!: HTMLDivElement;
  private container!: HTMLDivElement;
  private draggedElement: HTMLElement | null = null;
  private continueButton: HTMLButtonElement = document.createElement('button');
  private words: string[] = [];
  private originalOrder: string[] = [];

  constructor() {
    this.gameData = { rounds: [], roundsCount: 0 };
    this.initGame();
    this.continueButton.addEventListener('click', this.handleContinue.bind(this));
  }

  public async initGame(): Promise<void> {
    try {
      this.gameData = await fetchRoundsData();
      this.rounds = this.gameData.rounds;
      const mainWrapper = document.createElement('div');
      mainWrapper.id = 'main-wrapper';
      mainWrapper.classList.add('main-wrapper');
      document.body.appendChild(mainWrapper);

      mainWrapper.appendChild(this.continueButton);
      const gameContainer = document.createElement('div');
      gameContainer.id = 'game-container';
      gameContainer.classList.add('game-container');
      mainWrapper.appendChild(gameContainer);
      if (this.rounds.length > 0) {
        this.container = document.createElement('div');
        this.container.id = 'word-container';
        gameContainer.appendChild(this.container);
        this.startGame();
      }
      console.log('запущена initgame');
      const paintingContainer = document.createElement('div');
      paintingContainer.id = 'painting-container';
      paintingContainer.classList.add('painting-container');
      gameContainer.appendChild(paintingContainer);

      for (let i = 0; i < this.gameData.rounds[0].words.length; i++) {
        console.log(this.gameData.rounds[0].words.length);
        const newContainer = document.createElement('div');
        newContainer.id = `new-container-${i}`;
        newContainer.classList.add('new-container');
        this.newContainers.push(newContainer);
        paintingContainer.appendChild(newContainer);
        newContainer.addEventListener('dragover', this.handleDragOver.bind(this));
        newContainer.addEventListener('drop', this.handleDrop.bind(this));
      }
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  }

  public startGame(): void {
    const textExamplesByLevel = this.getTextExamplesByLevel();
    const currentRound = this.rounds[this.currentRoundIndex];
    const currentLevelId = currentRound.levelData.id;
    const textExamples = textExamplesByLevel[currentLevelId];
    this.continueButton.removeEventListener('click', this.handleContinue);

    if (textExamples && textExamples.length > 0) {
      const sentence = textExamples[this.textExampleIndex];
      this.originalOrder = sentence.split(/\s+/);
      this.words = this.shuffleArray(this.originalOrder.slice());
      const shuffledWords: string[] = this.words;
      this.renderWordContainer(shuffledWords);
      this.renderContinueButton();
    } else {
      console.error('No text examples found for the current level.');
    }
  }

  private renderContinueButton(): void {
    console.log('внутри renderContinueButton');
    this.continueButton.textContent = 'Continue';
    this.continueButton.classList.add('continue-button');
    this.continueButton.disabled = true;
  }

  private handleContinue(): void {
    if (this.textExampleIndex < this.rounds[this.currentRoundIndex].words.length - 1) {
      console.log('запущен handlecontinue');
      this.textExampleIndex++;
      console.log(this.textExampleIndex);
      this.container.innerHTML = '';
      this.startGame();
    } else {
      console.log('End of text examples reached for the current round.');
      this.continueButton.removeEventListener('click', this.handleContinue.bind(this));
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private renderWordContainer(words: string[]): void {
    words.forEach((word) => {
      console.log('внутри renderWordContainer');
      const wordElement = document.createElement('div');
      wordElement.textContent = word;
      wordElement.classList.add('word-element');
      wordElement.draggable = true;
      const wordWidth = Math.max(50, word.length * 10);
      wordElement.style.width = wordWidth + 'px';
      wordElement.addEventListener('click', this.handleWordCardClick.bind(this));
      this.container.appendChild(wordElement);

      wordElement.addEventListener('dragstart', this.handleDragStart.bind(this));
      wordElement.addEventListener('dragover', this.handleDragOver.bind(this));
      wordElement.addEventListener('drop', this.handleDrop.bind(this));
    });
  }

  private handleDragStart(event: DragEvent): void {
    this.draggedElement = event.target as HTMLElement;
    if (this.draggedElement) {
      this.draggedElement.classList.add('dragged');
      event.dataTransfer?.setData('text/plain', 'dragged');
    }
  }

  private handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private handleDrop(event: DragEvent): void {
    event.preventDefault();

    // Проверяем, что this.draggedElement не равен null и содержит один из классов
    if (
      this.draggedElement &&
      (this.draggedElement.classList.contains('word-element') ||
        this.draggedElement.classList.contains('new-container-element'))
    ) {
      const targetElement = event.target as HTMLElement;

      // Проверяем, куда был брошен элемент
      if (targetElement.classList.contains('new-container')) {
        const targetContainerIndex = this.newContainers.findIndex((container) => container.id === targetElement.id);
        if (targetContainerIndex !== -1) {
          const newDiv = document.createElement('div');
          newDiv.textContent = this.draggedElement.textContent;
          newDiv.classList.add('new-container-element');
          this.newContainers[targetContainerIndex].appendChild(newDiv);
          if (this.draggedElement.textContent) {
            const wordWidth = Math.max(50, this.draggedElement.textContent.length * 10);
            newDiv.style.width = wordWidth + 'px';
            newDiv.addEventListener('click', this.handleWordCardClick.bind(this));
          }
          this.draggedElement.remove();
          this.checkOrder();
        }
      } else {
        const wordElement = document.createElement('div');
        wordElement.textContent = this.draggedElement.textContent;
        wordElement.classList.add('word-element');
        this.container.appendChild(wordElement);
        if (this.draggedElement.textContent) {
          const wordWidth = Math.max(50, this.draggedElement.textContent.length * 10);
          wordElement.style.width = wordWidth + 'px';
          wordElement.addEventListener('click', this.handleWordCardClick.bind(this));
        }
        this.draggedElement.remove();
        this.checkOrder();
      }
    } else {
      console.error('draggedElement is null');
    }
  }
  private handleWordCardClick(event: MouseEvent): void {
    const clickedCard = event.target as HTMLElement;
    if (clickedCard.classList.contains('word-element') || clickedCard.classList.contains('new-container-element')) {
      const sourceContainer = clickedCard.parentElement as HTMLElement;
      const targetContainer =
        sourceContainer === this.container ? this.newContainers[this.textExampleIndex] : this.container;

      targetContainer.appendChild(clickedCard);

      clickedCard.classList.toggle('new-container-element');
      clickedCard.classList.toggle('word-element');
      clickedCard.addEventListener('dragstart', this.handleDragStart.bind(this));
      clickedCard.addEventListener('dragover', this.handleDragOver.bind(this));
      clickedCard.addEventListener('drop', this.handleDrop.bind(this));
    }
    this.checkOrder();
  }

  private checkOrder(): void {
    const resultContainerElements = Array.from(
      this.newContainers[this.textExampleIndex].querySelectorAll('.new-container-element')
    );
    const wordsInContainer = resultContainerElements.map((element) => element.textContent?.trim() || '');

    for (let i = 0; i < this.words.length; i++) {
      if (this.originalOrder[i] !== wordsInContainer[i]) {
        console.log('Does not match');
        return;
      }
    }
    this.continueButton.disabled = false;
    console.log('🎉');
  }

  private getTextExamplesForLevels(): Record<string, string[]> {
    const textExamplesByLevel: Record<string, string[]> = {};
    this.rounds.forEach((round) => {
      const levelId = round.levelData.id;
      const textExamples: string[] = round.words.map((word: WordCard) => word.textExample);
      textExamplesByLevel[levelId] = textExamples;
    });
    console.log(textExamplesByLevel);
    return textExamplesByLevel;
  }

  public getTextExamplesByLevel(): Record<string, string[]> {
    return this.getTextExamplesForLevels();
  }
}
