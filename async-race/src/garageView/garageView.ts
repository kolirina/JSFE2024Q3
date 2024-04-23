import { getCars, createCar, updateCar, deleteCar } from "../serverInteraction";
import { Car, Garage } from "../interface";
import { garageView } from "../index";
import { createSVGElement } from "./svgCar";
import getRandomColor from "../randomColor";
import getRandomName from "../randomName";
import { renderPagination, nextPage, prevPage } from "../pagination";
import { carAnimation, stopAnimation, startRace } from "./carAnimation";
import WinnersView from "../winnersView/winnersView";
import { createDiv, createBtn, createInpt } from "../elementCreator";

export default class GarageView {
  public mainContainer!: HTMLDivElement;
  public header!: HTMLDivElement;

  private createContainer!: HTMLDivElement;
  private updateContainer!: HTMLDivElement;
  private raceResetGenerateContainer!: HTMLDivElement;
  public racingTrackContainer!: HTMLDivElement;
  private garageCount!: HTMLDivElement;
  public pageNum!: HTMLDivElement;

  private cars: Car[] = [];
  private winners: Car[] = [];
  public totalPages: number;

  currentPage: number;

  carsPerPage: number;

  public garage!: Garage;

  public carToUpdate!: Car;

  maxCarsAmount: number = 100;

  constructor() {
    this.initGame();
    this.currentPage = 1;
    this.carsPerPage = 7;
    this.totalPages = 0;
    this.maxCarsAmount = 100;
  }

  public async initGame(): Promise<void> {
    try {
      this.garage = await getCars();

      this.totalPages = Math.ceil(this.garage.cars.length / this.carsPerPage);

      this.mainContainer = createDiv("main-container", document.body);

      this.header = createDiv("header", this.mainContainer);

      const toGarageButton = createBtn(
        "toGarageButton",
        this.header,
        "to Garage"
      );

      const toWinnersButton = createBtn(
        "toWinnersButton",
        this.header,
        "to Winners"
      );
      toWinnersButton.addEventListener("click", (event) => {
        const winnersView = new WinnersView();
        this.hide();
        winnersView.render();
        winnersView.show();
      });

      this.createContainer = createDiv("create-container", this.mainContainer);

      const createInput = createInpt(
        this.createContainer,
        "createCarName",
        undefined,
        "Enter car name"
      );

      const colorInput = createInpt(
        this.createContainer,
        "createCarColor",
        "color",
        undefined
      );

      const createButton = createBtn(
        "create-button",
        this.createContainer,
        "Create Car"
      );
      createButton.id = "createButton";
      createButton.type = "submit";

      this.updateContainer = createDiv("update-container", this.mainContainer);

      const updateInput = createInpt(
        this.updateContainer,
        "updateCarName",
        undefined,
        "Choose a car"
      );

      const updateColorInput = createInpt(
        this.updateContainer,
        "updateCarColor",
        "color",
        undefined
      );

      const updateButton = createBtn(
        "update-button",
        this.updateContainer,
        "Update Car"
      );
      updateButton.id = "updateButton";
      updateButton.type = "submit";

      this.raceResetGenerateContainer = createDiv(
        "raceResetGenerate-container",
        this.mainContainer
      );

      const raceButton = createBtn(
        "race-button",
        this.raceResetGenerateContainer,
        "Race"
      );
      raceButton.addEventListener("click", async (event) => {
        try {
          const startIndex = (this.currentPage - 1) * this.carsPerPage;
          const endIndex = startIndex + this.carsPerPage;
          const carsToRace = this.garage.cars.slice(startIndex, endIndex);
          await startRace(carsToRace);
        } catch (error) {
          console.error("Ошибка при запуске гонки:", error);
        }
      });

      const resetButton = createBtn(
        "reset-button",
        this.raceResetGenerateContainer,
        "Reset"
      );

      const generateCarsButton = createBtn(
        "generate-cars-button",
        this.raceResetGenerateContainer,
        "Generate Cars"
      );
      generateCarsButton.id = "generateCarsButton";

      this.garageCount = createDiv("garage-count", this.mainContainer);
      this.garageCount.innerHTML = `Garage (${this.garage.cars.length})`;

      this.pageNum = createDiv("page-num", this.mainContainer);
      this.pageNum.innerHTML = `Page #${this.currentPage}`;

      this.racingTrackContainer = createDiv(
        "racing-container",
        this.mainContainer
      );

      this.renderGaragePage();

      this.setupListeners();
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  }

  public show(): void {
    this.mainContainer.style.display = "block";
  }

  public hide(): void {
    this.mainContainer.style.display = "none";
  }

  private setupListeners(): void {
    const createButton = document.getElementById("createButton");
    const updateButton = document.getElementById("updateButton");
    const generateCarsButton = document.getElementById("generateCarsButton");
    if (createButton) {
      createButton.addEventListener("click", (event) =>
        this.createCarHandler(event as MouseEvent)
      );
    }
    if (updateButton) {
      updateButton.addEventListener("click", (event) =>
        this.updateCarHandler(event as MouseEvent)
      );
    }
    if (generateCarsButton) {
      generateCarsButton.addEventListener("click", (event) =>
        this.generateCarsHandler(event as MouseEvent)
      );
    }
  }

  private async createCarHandler(event: MouseEvent): Promise<void> {
    event.preventDefault();

    const nameInput = document.querySelector(
      "#createCarName"
    ) as HTMLInputElement;
    const colorInput = document.querySelector(
      "#createCarColor"
    ) as HTMLInputElement;

    if (nameInput && colorInput) {
      const name = nameInput.value;
      const color = colorInput.value;

      try {
        const newCar = await createCar({ name, color });
        await this.refreshGarage();
      } catch (error) {
        console.error("Error creating car:", error);
      }
    }
  }

  private async updateCarHandler(event: MouseEvent): Promise<void> {
    event.preventDefault();

    const nameInput = document.querySelector(
      "#updateCarName"
    ) as HTMLInputElement;
    const colorInput = document.querySelector(
      "#updateCarColor"
    ) as HTMLInputElement;

    if (
      nameInput &&
      colorInput &&
      this.carToUpdate &&
      this.carToUpdate.id !== undefined
    ) {
      const name = nameInput.value;
      const color = colorInput.value;
      const id = this.carToUpdate.id;

      try {
        const updatedCar = await updateCar(id, { name, color });
        await this.refreshGarage();
      } catch (error) {
        console.error("Error updating car:", error);
      }
    }
  }

  public async selectCarHandler(event: MouseEvent, car: Car): Promise<void> {
    event.preventDefault();
    const updateNameInput = document.querySelector(
      "#updateCarName"
    ) as HTMLInputElement;
    const updateColorInput = document.querySelector(
      "#updateCarColor"
    ) as HTMLInputElement;

    if (updateNameInput && updateColorInput) {
      updateNameInput.value = car.name;
      updateColorInput.value = car.color;
      this.carToUpdate = car;
    }
  }

  public async removeCarHandler(event: MouseEvent, car: Car): Promise<void> {
    event.preventDefault();

    if (car.id !== undefined) {
      const id = car.id;

      try {
        const removedCar = await deleteCar(id);
        await this.refreshGarage();
      } catch (error) {
        console.error("Error updating car:", error);
      }
    }
  }

  private async generateCarsHandler(event: MouseEvent): Promise<void> {
    event.preventDefault();
    for (let i = 0; i < this.maxCarsAmount; i += 1) {
      const name = getRandomName();
      const color = getRandomColor();
      try {
        const newCar = await createCar({ name, color });
      } catch (error) {
        console.error("Error creating car:", error);
      }
      await this.refreshGarage();
    }
  }

  private async refreshGarage(): Promise<void> {
    try {
      this.garage = await getCars();
      this.garageCount.innerHTML = `Garage (${this.garage.cars.length})`;
      this.pageNum.innerHTML = `Page #${this.currentPage}`;
      this.clearGarage();
      this.totalPages = Math.ceil(this.garage.cars.length / this.carsPerPage);
      this.drawGarage();
    } catch (error) {
      console.error("Error refreshing garage:", error);
    }
  }

  private clearGarage(): void {
    this.racingTrackContainer.innerHTML = "";
  }

  private drawGarage(): void {
    this.renderGaragePage();
  }
  public renderPagination(): void {
    const pagination = renderPagination(
      this.currentPage,
      this.totalPages,
      () => this.prevPage(),
      () => this.nextPage()
    );

    this.racingTrackContainer.appendChild(pagination);
    pagination.classList.add("pagination");
  }

  private nextPage(): void {
    nextPage(this);
  }

  private prevPage(): void {
    prevPage(this);
  }

  public renderGaragePage(): void {
    const startIndex = (this.currentPage - 1) * this.carsPerPage;
    const endIndex = startIndex + this.carsPerPage;
    const currentCars = this.garage.cars.slice(startIndex, endIndex);
    this.clearGarage();
    fillRacingTrack(currentCars, this.racingTrackContainer);
    this.renderPagination();
  }
}

function fillRacingTrack(
  cars: Car[],
  racingTrackContainer: HTMLDivElement
): void {
  racingTrackContainer.innerHTML = "";
  cars.forEach((car) => {
    let carDiv = createDiv("car-div", racingTrackContainer);
    carDiv.id = car.id?.toString() || "";
    fillCarDiv(car, carDiv, garageView);
  });
}

function fillCarDiv(
  car: Car,
  carDiv: HTMLDivElement,
  garageView: GarageView
): void {
  const carDivTopWrapper = createDiv("car-top-wrapper", carDiv);

  const selectButton = createBtn("selectBtn", carDivTopWrapper, "select");
  selectButton.id = `selectButton${car.id}`;
  selectButton.addEventListener("click", (event) =>
    garageView.selectCarHandler(event, car)
  );

  const removeButton = createBtn("cteateBtn", carDivTopWrapper, "remove");
  removeButton.addEventListener("click", (event) =>
    garageView.removeCarHandler(event, car)
  );

  const carName = createDiv("car-name", carDivTopWrapper);
  carName.innerHTML = `${car.name}`;

  const carDivBottomWrapper = createDiv("car-bottom-wrapper", carDiv);
  carDivBottomWrapper.id = `car-bottom-wrapper${car.id}`;

  const goButton = createBtn("button-small", carDivBottomWrapper, "A");
  goButton.id = `go-button${car.id}`;
  goButton.addEventListener("click", (event) => {
    if (car.id) {
      carAnimation(car.id, carDivBottomWrapper, carPicContainer);
    }
  });

  const stopButton = createBtn("button-small", carDivBottomWrapper, "B");
  stopButton.addEventListener("click", (event) => {
    if (car.id) {
      const carDivBottomWrapper = document.getElementById(
        `car-bottom-wrapper${car.id}`
      );
      if (carDivBottomWrapper) {
        handleStopButton(car.id, carDivBottomWrapper);
      }
    }
  });

  async function handleStopButton(
    id: number,
    carDivBottomWrapper: HTMLElement
  ) {
    await stopAnimation(id, carDivBottomWrapper);
  }

  const carPicContainer = createDiv("car-pic-container", carDivBottomWrapper);

  const svgElement = createSVGElement(car);
  carPicContainer.id = `car-pic-container${car.id}`;
  carPicContainer.appendChild(svgElement);
}
