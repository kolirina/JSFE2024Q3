import { Round, GameData } from '../interfaces';
import fetchRoundsData from '../fetchData';

export class GamePage {
  private gameData: GameData;
  private rounds: Round[] = [];
  private newContainer: HTMLDivElement = document.createElement('div');
  private words: string[] = [];
  private originalOrder: string[] = [];
  constructor() {
    this.gameData = { rounds: [], roundsCount: 0 };
    this.initGame();
  }

  public async initGame(): Promise<void> {
    try {
      this.gameData = await fetchRoundsData();
      this.rounds = this.gameData.rounds;
      if (this.rounds.length > 0) {
        const firstRound = this.rounds[0];
        const firstWordCard = firstRound.words[0];
        const sentence = firstWordCard.textExample;
        this.startGame(sentence);
      }
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  }

  public startGame(sentence: string): void {
    this.originalOrder = sentence.split(/\s+/);
    this.words = this.shuffleArray(this.originalOrder.slice());
    const shuffledWords: string[] = this.words;
    this.renderWordContainer(shuffledWords);
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private renderWordContainer(words: string[]): void {
    const container = document.createElement('div');
    container.id = 'word-container';

    words.forEach((word) => {
      const wordElement = document.createElement('div');
      wordElement.textContent = word;
      wordElement.classList.add('word-element');
      wordElement.draggable = true;
      const wordWidth = Math.max(50, word.length * 10);
      wordElement.style.width = wordWidth + 'px';
      wordElement.addEventListener('click', this.handleWordCardClick.bind(this));
      container.appendChild(wordElement);

      wordElement.addEventListener('dragstart', this.handleDragStart.bind(this));
      wordElement.addEventListener('dragover', this.handleDragOver.bind(this));
      wordElement.addEventListener('drop', this.handleDrop.bind(this));
    });

    this.newContainer.id = 'new-container';
    this.newContainer.classList.add('new-container');
    document.body.appendChild(container);
    document.body.appendChild(this.newContainer);
    this.newContainer.addEventListener('dragover', this.handleDragOver.bind(this));
    this.newContainer.addEventListener('drop', this.handleDrop.bind(this));
  }

  private handleDragStart(event: DragEvent): void {
    const draggedElement = event.target as HTMLElement;
    draggedElement.classList.add('dragged');
    event.dataTransfer?.setData('text/plain', 'dragged');
  }

  private handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private handleDrop(event: DragEvent): void {
    event.preventDefault();
    const draggedElement = document.querySelector('.dragged');
    if (draggedElement) {
      const targetElement = event.target as HTMLElement;
      if (targetElement.classList.contains('new-container')) {
        const newDiv = document.createElement('div');
        newDiv.textContent = draggedElement.textContent;
        newDiv.classList.add('new-container-element');
        this.newContainer.appendChild(newDiv);
        if (draggedElement.textContent) {
          const wordWidth = Math.max(50, draggedElement.textContent.length * 10);
          newDiv.style.width = wordWidth + 'px';
        }

        draggedElement.remove();
        this.checkOrder();
      }
    }
  }

  // private handleWordCardClick(event: MouseEvent): void {
  //   const clickedCard = event.target as HTMLElement;
  //   if (!clickedCard.classList.contains('word-element')) return;

  //   const clickedWord = clickedCard.textContent?.trim();
  //   if (!clickedWord) return;

  //   if (this.newContainer) {
  //     const newDiv = document.createElement('div');
  //     newDiv.textContent = clickedWord;
  //     newDiv.classList.add('new-container-element');
  //     this.newContainer.appendChild(newDiv);
  //     console.log(this.newContainer);
  //   }

  //   clickedCard.remove();
  //   this.checkOrder();
  // }

  private handleWordCardClick(event: MouseEvent): void {
    const clickedCard = event.target as HTMLElement;
    if (!clickedCard.classList.contains('word-element')) return; // Ensure the clicked element is a word card

    const clickedWord = clickedCard.textContent?.trim();
    if (!clickedWord) return; // Ensure the clicked word is not empty

    const sourceContainer = document.getElementById('word-container');
    const resultContainer = document.getElementById('new-container');

    // Check if the clicked card is in the source container
    if (sourceContainer && clickedCard.parentElement === sourceContainer) {
      // Move the clicked card to the result container
      if (resultContainer) {
        clickedCard.classList.add('new-container-element');
        resultContainer.appendChild(clickedCard);
      }
    } else if (resultContainer && clickedCard.parentElement === resultContainer) {
      // Move the clicked card back to the source container
      if (sourceContainer) {
        sourceContainer.appendChild(clickedCard);
        clickedCard.classList.remove('new-container-element');
      }
    }

    this.checkOrder(); // Check the order after moving the word card
  }

  private checkOrder(): boolean {
    const resultContainerElements = Array.from(this.newContainer.querySelectorAll('.new-container-element'));
    const wordsInContainer = resultContainerElements.map((element) => element.textContent?.trim() || '');
    console.log(resultContainerElements);

    console.log(wordsInContainer);
    console.log(this.originalOrder);

    for (let i = 0; i < this.words.length; i++) {
      if (this.originalOrder[i] !== wordsInContainer[i]) {
        console.log('Does not match');
        console.log(wordsInContainer[i]);
        return false;
      }
    }
    console.log('🎉');
    return true;
  }
}
