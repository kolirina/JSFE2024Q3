import { Round, GameData, WordCard } from "../interfaces";
import fetchRoundsData from "../fetchData";

export default class GamePage {
  private gameData: GameData;
  private rounds: Round[] = [];
  private currentRoundIndex: number = 0;
  private textExampleIndex: number = 0;
  private newContainers: HTMLDivElement[] = [];
  private container!: HTMLDivElement;
  private continueButton: HTMLButtonElement = document.createElement("button");
  private words: string[] = [];
  private originalOrder: string[] = [];

  constructor() {
    this.gameData = { rounds: [], roundsCount: 0 };
    this.initGame();
    this.continueButton.addEventListener(
      "click",
      this.handleContinue.bind(this),
    );
  }

  public async initGame(): Promise<void> {
    try {
      this.gameData = await fetchRoundsData();
      this.rounds = this.gameData.rounds;
      if (this.rounds.length > 0) {
        this.container = document.createElement("div");
        this.container.id = "word-container";
        document.body.appendChild(this.container);
        this.startGame();
      }
      console.log("запущена initgame");
      const paintingContainer = document.createElement("div");
      paintingContainer.id = "painting-container";
      paintingContainer.classList.add("painting-container");
      document.body.appendChild(paintingContainer);

      for (let i = 0; i < 10; i++) {
        const newContainer = document.createElement("div");
        newContainer.id = `new-container-${i}`;
        newContainer.classList.add("new-container");
        this.newContainers.push(newContainer);
        paintingContainer.appendChild(newContainer);
        newContainer.addEventListener(
          "dragover",
          this.handleDragOver.bind(this),
        );
        newContainer.addEventListener("drop", this.handleDrop.bind(this));
      }
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  }

  public startGame(): void {
    console.log("запущена startgame");
    const textExamplesByLevel = this.getTextExamplesByLevel();
    const currentRound = this.rounds[this.currentRoundIndex];
    const currentLevelId = currentRound.levelData.id;
    const textExamples = textExamplesByLevel[currentLevelId];
    this.continueButton.removeEventListener("click", this.handleContinue);

    if (textExamples && textExamples.length > 0) {
      const sentence = textExamples[this.textExampleIndex];
      this.originalOrder = sentence.split(/\s+/);
      this.words = this.shuffleArray(this.originalOrder.slice());
      const shuffledWords: string[] = this.words;
      this.renderWordContainer(shuffledWords);
      this.renderContinueButton();
    } else {
      console.error("No text examples found for the current level.");
    }
  }

  private renderContinueButton(): void {
    console.log("внутри renderContinueButton");
    this.continueButton.textContent = "Continue";
    this.continueButton.disabled = true;
    document.body.appendChild(this.continueButton);
  }

  private handleContinue(): void {
    if (
      this.textExampleIndex <
      this.rounds[this.currentRoundIndex].words.length - 1
    ) {
      console.log("запущен handlecontinue");
      this.textExampleIndex++;
      console.log(this.textExampleIndex);
      this.container.innerHTML = "";
      this.startGame();
    } else {
      console.log("End of text examples reached for the current round.");
      this.continueButton.removeEventListener(
        "click",
        this.handleContinue.bind(this),
      );
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
      console.log("внутри renderWordContainer");
      const wordElement = document.createElement("div");
      wordElement.textContent = word;
      wordElement.classList.add("word-element");
      wordElement.draggable = true;
      const wordWidth = Math.max(50, word.length * 10);
      wordElement.style.width = wordWidth + "px";
      wordElement.addEventListener(
        "click",
        this.handleWordCardClick.bind(this),
      );
      this.container.appendChild(wordElement);

      wordElement.addEventListener(
        "dragstart",
        this.handleDragStart.bind(this),
      );
      wordElement.addEventListener("dragover", this.handleDragOver.bind(this));
      wordElement.addEventListener("drop", this.handleDrop.bind(this));
    });
  }

  private handleDragStart(event: DragEvent): void {
    const draggedElement = event.target as HTMLElement;
    draggedElement.classList.add("dragged");
    event.dataTransfer?.setData("text/plain", "dragged");
  }

  private handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private handleDrop(event: DragEvent): void {
    event.preventDefault();
    const draggedElement = document.querySelector(".dragged");
    if (draggedElement) {
      const targetElement = event.target as HTMLElement;
      const targetContainerIndex = this.newContainers.findIndex(
        (container) => container.id === targetElement.id,
      );
      if (targetContainerIndex !== -1) {
        const newDiv = document.createElement("div");
        newDiv.textContent = draggedElement.textContent;
        newDiv.classList.add("new-container-element");
        this.newContainers[targetContainerIndex].appendChild(newDiv);
        if (draggedElement.textContent) {
          const wordWidth = Math.max(
            50,
            draggedElement.textContent.length * 10,
          );
          newDiv.style.width = wordWidth + "px";
        }
        draggedElement.remove();
        this.checkOrder();
      }
    }
  }
  private handleWordCardClick(event: MouseEvent): void {
    const clickedCard = event.target as HTMLElement;
    if (!clickedCard.classList.contains("word-element")) return;

    const clickedWord = clickedCard.textContent?.trim();
    if (!clickedWord) return;

    const sourceContainer = this.container;

    const resultContainer = this.newContainers[this.textExampleIndex];

    if (sourceContainer && clickedCard.parentElement === sourceContainer) {
      if (resultContainer) {
        clickedCard.classList.add("new-container-element");
        resultContainer.appendChild(clickedCard);
      }
    } else if (
      resultContainer &&
      clickedCard.parentElement === resultContainer
    ) {
      if (sourceContainer) {
        sourceContainer.appendChild(clickedCard);
        clickedCard.classList.remove("new-container-element");
      }
    }

    this.checkOrder();
  }

  private checkOrder(): void {
    const resultContainerElements = Array.from(
      this.newContainers[this.textExampleIndex].querySelectorAll(
        ".new-container-element",
      ),
    );
    const wordsInContainer = resultContainerElements.map(
      (element) => element.textContent?.trim() || "",
    );

    for (let i = 0; i < this.words.length; i++) {
      if (this.originalOrder[i] !== wordsInContainer[i]) {
        console.log("Does not match");
        return;
      }
    }
    this.continueButton.disabled = false;
    console.log("🎉");
  }

  private getTextExamplesForLevels(): Record<string, string[]> {
    const textExamplesByLevel: Record<string, string[]> = {};
    this.rounds.forEach((round) => {
      const levelId = round.levelData.id;
      const textExamples: string[] = round.words.map(
        (word: WordCard) => word.textExample,
      );
      textExamplesByLevel[levelId] = textExamples;
    });
    console.log(textExamplesByLevel);
    return textExamplesByLevel;
  }

  public getTextExamplesByLevel(): Record<string, string[]> {
    return this.getTextExamplesForLevels();

  }
}
