import { getCars, createCar, updateCar, deleteCar } from "../serverInteraction";
import { Car, Garage } from "../interface";
import { garageView } from "../index";
import { createSVGElement } from "./svgCar";
import getRandomColor from "../randomColor";
import getRandomName from "../randomName";
import { renderPagination, nextPage, prevPage } from "../pagination";
import { carAnimation, stopAnimation, startRace } from "./carAnimation";
import WinnersView from "../winnersView/winnersView";

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

      this.mainContainer = document.createElement("div");
      this.mainContainer.classList.add("main-container");
      document.body.appendChild(this.mainContainer);

      this.header = document.createElement("div");
      this.header.classList.add("header");
      this.mainContainer.appendChild(this.header);

      const toGarageButton = document.createElement("button");
      toGarageButton.classList.add("toGarageButton");
      toGarageButton.textContent = "to Garage";
      this.header.appendChild(toGarageButton);

      const toWinnersButton = document.createElement("button");
      toWinnersButton.classList.add("toWinnersButton");
      toWinnersButton.textContent = "to Winners";
      toWinnersButton.addEventListener("click", (event) => {
        const winnersView = new WinnersView();
        this.hide();
        winnersView.render();
        winnersView.show();
      });
      this.header.appendChild(toWinnersButton);

      this.createContainer = document.createElement("div");
      this.createContainer.classList.add("create-container");
      this.mainContainer.appendChild(this.createContainer);

      const createInput = document.createElement("input");
      createInput.id = "createCarName";
      createInput.placeholder = "Enter car name";
      this.createContainer.appendChild(createInput);

      const colorInput = document.createElement("input");
      colorInput.type = "color";
      colorInput.id = "createCarColor";
      this.createContainer.appendChild(colorInput);

      const createButton = document.createElement("button");
      createButton.classList.add("create-button");
      createButton.id = "createButton";
      createButton.textContent = "Create Car";
      createButton.type = "submit";
      this.createContainer.appendChild(createButton);

      this.updateContainer = document.createElement("div");
      this.updateContainer.classList.add("update-container");
      this.mainContainer.appendChild(this.updateContainer);

      const updateInput = document.createElement("input");
      updateInput.placeholder = "Choose a car";
      updateInput.id = "updateCarName";
      this.updateContainer.appendChild(updateInput);

      const updateColorInput = document.createElement("input");
      updateColorInput.type = "color";
      updateColorInput.id = "updateCarColor";
      this.updateContainer.appendChild(updateColorInput);

      const updateButton = document.createElement("button");
      updateButton.classList.add("update-button");
      updateButton.textContent = "Update Car";
      updateButton.id = "updateButton";
      updateButton.type = "submit";
      this.updateContainer.appendChild(updateButton);

      this.raceResetGenerateContainer = document.createElement("div");
      this.raceResetGenerateContainer.classList.add(
        "raceResetGenerate-container"
      );
      this.mainContainer.appendChild(this.raceResetGenerateContainer);

      const raceButton = document.createElement("button");
      raceButton.classList.add("race-button");
      raceButton.textContent = "Race";
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
      this.raceResetGenerateContainer.appendChild(raceButton);

      const resetButton = document.createElement("button");
      resetButton.classList.add("reset-button");
      resetButton.textContent = "Reset";
      this.raceResetGenerateContainer.appendChild(resetButton);

      const generateCarsButton = document.createElement("button");
      generateCarsButton.classList.add("generate-cars-button");
      generateCarsButton.id = "generateCarsButton";
      generateCarsButton.textContent = "Generate Cars";
      this.raceResetGenerateContainer.appendChild(generateCarsButton);

      this.garageCount = document.createElement("div");
      this.garageCount.classList.add("garage-count");
      this.garageCount.innerHTML = `Garage (${this.garage.cars.length})`;
      this.mainContainer.appendChild(this.garageCount);

      this.pageNum = document.createElement("div");
      this.pageNum.innerHTML = `Page #${this.currentPage}`;
      this.pageNum.classList.add("page-num");

      this.mainContainer.appendChild(this.pageNum);
      this.racingTrackContainer = document.createElement("div");
      this.racingTrackContainer.classList.add("racing-container");
      this.mainContainer.appendChild(this.racingTrackContainer);

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
    let carDiv = document.createElement("div");
    carDiv.id = car.id?.toString() || "";
    carDiv.classList.add("car-div");
    fillCarDiv(car, carDiv, garageView);
    racingTrackContainer.appendChild(carDiv);
  });
}

function fillCarDiv(
  car: Car,
  carDiv: HTMLDivElement,
  garageView: GarageView
): void {
  const carDivTopWrapper = document.createElement("div");
  carDivTopWrapper.classList.add("car-top-wrapper");
  carDiv.appendChild(carDivTopWrapper);

  const selectButton = document.createElement("button");
  selectButton.textContent = "select";
  selectButton.id = `selectButton${car.id}`;
  selectButton.addEventListener("click", (event) =>
    garageView.selectCarHandler(event, car)
  );
  carDivTopWrapper.appendChild(selectButton);

  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.addEventListener("click", (event) =>
    garageView.removeCarHandler(event, car)
  );
  carDivTopWrapper.appendChild(removeButton);

  const carName = document.createElement("div");
  carName.classList.add("car-name");
  carName.innerHTML = `${car.name}`;
  carDivTopWrapper.appendChild(carName);

  const carDivBottomWrapper = document.createElement("div");
  carDivBottomWrapper.classList.add("car-bottom-wrapper");
  carDivBottomWrapper.id = `car-bottom-wrapper${car.id}`;
  carDiv.appendChild(carDivBottomWrapper);

  const goButton = document.createElement("button");
  goButton.classList.add("button-small");
  goButton.id = `go-button${car.id}`;
  goButton.textContent = "A";
  goButton.addEventListener("click", (event) => {
    if (car.id) {
      carAnimation(car.id, carDivBottomWrapper, carPicContainer);
    }
  });
  carDivBottomWrapper.appendChild(goButton);

  const stopButton = document.createElement("button");
  stopButton.classList.add("button-small");
  stopButton.textContent = "B";
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

  carDivBottomWrapper.appendChild(stopButton);

  const carPicContainer = document.createElement("div");
  carPicContainer.classList.add("car-pic-container");
  carDivBottomWrapper.appendChild(carPicContainer);
  const svgElement = createSVGElement(car);
  carPicContainer.id = `car-pic-container${car.id}`;
  carPicContainer.appendChild(svgElement);
}
