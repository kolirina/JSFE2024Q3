import { getCars, createCar, updateCar, deleteCar } from "../serverInteraction";
import { Car, Garage } from "../interface";
import { garageView } from "../index";

export default class GarageView {
  public mainContainer!: HTMLDivElement;
  public header!: HTMLDivElement;

  private createContainer!: HTMLDivElement;
  private updateContainer!: HTMLDivElement;
  private raceResetGenerateContainer!: HTMLDivElement;
  private racingTrackContainer!: HTMLDivElement;

  private cars: Car[] = [];
  private winners: Car[] = [];
  private garage!: Garage;

  public carToUpdate!: Car;

  constructor() {
    this.initGame();
  }

  public async initGame(): Promise<void> {
    try {
      this.garage = await getCars();

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
      updateInput.id = "updateCarName"; // Corrected id attribute
      this.updateContainer.appendChild(updateInput);

      const updateColorInput = document.createElement("input");
      updateColorInput.type = "color";
      updateColorInput.id = "updateCarColor";
      this.updateContainer.appendChild(updateColorInput);

      const updateButton = document.createElement("button");
      updateButton.classList.add("update-button");
      updateButton.textContent = "Update Car";
      updateButton.id = "updateButton"; // Added id attribute
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
      this.raceResetGenerateContainer.appendChild(raceButton);

      const resetButton = document.createElement("button");
      resetButton.classList.add("reset-button");
      resetButton.textContent = "Reset";
      this.raceResetGenerateContainer.appendChild(resetButton);

      const generateCarsButton = document.createElement("button");
      generateCarsButton.classList.add("generate-cars-button");
      generateCarsButton.textContent = "Generate Cars";
      this.raceResetGenerateContainer.appendChild(generateCarsButton);

      this.racingTrackContainer = document.createElement("div");
      this.racingTrackContainer.classList.add("racing-container");
      this.mainContainer.appendChild(this.racingTrackContainer);

      const garageCount = document.createElement("div");
      garageCount.classList.add("garage-count");
      garageCount.innerHTML = `Garage (${this.garage.cars.length})`;
      this.racingTrackContainer.appendChild(garageCount);

      const pageNum = document.createElement("div");
      pageNum.classList.add("page-num");
      pageNum.innerHTML = `Page #${Math.ceil(this.garage.cars.length / 7)}`;
      this.racingTrackContainer.appendChild(pageNum);

      fillRacingTrack(this.garage.cars, this.racingTrackContainer);
      this.setupListeners();
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  }

  private setupListeners(): void {
    const createButton = document.getElementById("createButton");
    const updateButton = document.getElementById("updateButton");
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
      console.log(this);
    }
  }
  private async refreshGarage(): Promise<void> {
    try {
      this.garage = await getCars();
      this.clearGarage();
      this.drawGarage();
    } catch (error) {
      console.error("Error refreshing garage:", error);
    }
  }

  private clearGarage(): void {
    this.racingTrackContainer.innerHTML = "";
  }

  private drawGarage(): void {
    fillRacingTrack(this.garage.cars, this.racingTrackContainer);
  }
}

function fillRacingTrack(
  cars: Car[],
  racingTrackContainer: HTMLDivElement
): void {
  for (let i = 0; i < cars.length; i += 1) {
    let carDiv = document.createElement("div");
    racingTrackContainer.appendChild(carDiv);
    carDiv.id = cars[i].id?.toString() || "";
    carDiv.classList.add("car-div");
    fillCarDiv(cars[i], carDiv, garageView);
  }
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
  carDivTopWrapper.appendChild(removeButton);

  const carName = document.createElement("div");
  carName.classList.add("car-name");
  carName.innerHTML = `${car.name}`;
  carDivTopWrapper.appendChild(carName);

  const carDivBottomWrapper = document.createElement("div");
  carDivBottomWrapper.classList.add("car-bottom-wrapper");
  carDiv.appendChild(carDivBottomWrapper);

  const goButton = document.createElement("button");
  goButton.classList.add("button-small");
  goButton.textContent = "A";
  carDivBottomWrapper.appendChild(goButton);

  const stopButton = document.createElement("button");
  stopButton.classList.add("button-small");
  stopButton.textContent = "B";
  carDivBottomWrapper.appendChild(stopButton);

  const carPicContainer = document.createElement("div");
  carPicContainer.classList.add("car-pic-container");
  carDivBottomWrapper.appendChild(carPicContainer);

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("fill", car.color);
  svgElement.setAttribute("height", "60px");
  svgElement.setAttribute("width", "100px");
  svgElement.setAttribute("version", "1.1");
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svgElement.setAttribute("viewBox", "0 0 612.001 612.001");
  svgElement.setAttribute("xml:space", "preserve");
  svgElement.setAttribute("style", "padding: 0;");
  const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute(
    "d",
    "M589.333,276.033c-11.234-3.756-89.378-20.834-89.378-20.834s-144.86-82.375-162.245-82.375s-136.639,0.053-136.639,0.053 c-29.137,0-53.487,22.203-81.68,47.909c-13.287,12.112-27.953,25.442-44.13,37.299l-60.249,8.011 C6.306,268.872,0,277.018,0,286.643v69.03c0,11.913,9.656,21.571,21.57,21.571h41.401c3.007,34.65,32.153,61.932,67.57,61.932 c35.415,0,64.563-27.283,67.57-61.931h197.687c3.007,34.65,32.153,61.931,67.57,61.931s64.563-27.283,67.57-61.931h34.013 c26.95,0,40.119-11.64,43.426-22.566C616.739,327.03,610.724,283.185,589.333,276.033z M130.541,406.48 c-19.38,0-35.148-15.766-35.148-35.146s15.766-35.148,35.148-35.148c19.38,0,35.146,15.766,35.146,35.148 C165.688,390.714,149.921,406.48,130.541,406.48z M261.008,255.201H143.134c8.526-6.736,16.409-13.886,23.671-20.505 c19.086-17.402,35.57-32.432,55.294-32.432c0,0,17.85-0.008,38.91-0.017V255.201z M289.711,202.236 c14.588-0.005,27.592-0.009,34.116-0.009c16.245,0,82.135,38.264,106.864,52.975h-140.98L289.711,202.236L289.711,202.236z M463.367,406.48 c-19.38,0-35.146-15.766-35.146-35.146s15.766-35.148,35.146-35.148c19.38,0,35.148,15.766,35.148,35.148 C498.515,390.714,482.747,406.48,463.367,406.48z"
  );
  gElement.appendChild(pathElement);
  svgElement.appendChild(gElement);
  carPicContainer.appendChild(svgElement);
}

// const garageView = new GarageView();
