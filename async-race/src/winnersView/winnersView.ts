import { getWinners } from "../serverInteraction";
import { Winner } from "../interface";
import { getCar } from "../serverInteraction";
import GarageView from "../garageView/garageView";

export default class WinnersView {
  private winnersTable: HTMLTableElement;
  private container: HTMLDivElement;
  public toGarageButton: HTMLButtonElement;

  constructor() {
    this.container = document.createElement("div");
    this.winnersTable = document.createElement("table");
    this.toGarageButton = document.createElement("button");
    this.winnersTable.id = "winners-table";
    document.body.appendChild(this.container);
  }

  public async render(): Promise<void> {
    console.log("inside render");
    try {
      const winners = await getWinners();

      this.winnersTable.innerHTML = "";

      const headerRow = this.winnersTable.insertRow();
      const headers = ["Name", "Wins", "Best Time"];
      console.log(headers);
      headers.forEach((header) => {
        const cell = headerRow.insertCell();
        cell.textContent = header;
        cell.addEventListener("click", () => this.sortTable(header));
      });

      for (const winner of winners) {
        const row = this.winnersTable.insertRow();
        console.log("row");
        getCar(winner.id)
          .then((car) => {
            const name = car.name;
            const { id, wins, time } = winner;
            row.insertCell().textContent = name;
            row.insertCell().textContent = wins.toString();
            row.insertCell().textContent = `${time} seconds`;
          })
          .catch((error) => {
            console.error("Error fetching car:", error);
          });
      }

      if (this.container) {
        this.container.innerHTML = "";
        this.container.appendChild(this.winnersTable);
        console.log(this.winnersTable);
        console.log(this.container);
      }
    } catch (error) {
      console.error("Error rendering winners table:", error);
    }

    this.container.appendChild(this.toGarageButton);
    this.toGarageButton.innerText = "To Garage";
    this.toGarageButton.addEventListener("click", (event) => {
      const garageView = new GarageView();
      this.hide();
      garageView.show();
    });
  }

  private sortTable(header: string): void {
    const index = Array.from(this.winnersTable.rows[0].cells).findIndex(
      (cell) => cell.textContent === header
    );
    const direction = this.winnersTable.dataset.sort === "asc" ? 1 : -1;
    const rows = Array.from(this.winnersTable.rows).slice(1);
    const sortedRows = rows.sort((a, b) => {
      const aValue = parseInt(a.cells[index].textContent!.split(" ")[0]);
      const bValue = parseInt(b.cells[index].textContent!.split(" ")[0]);
      return (aValue - bValue) * direction;
    });
    sortedRows.forEach((row) => this.winnersTable.appendChild(row));
    this.winnersTable.dataset.sort = direction === 1 ? "desc" : "asc";
  }

  public show(): void {
    this.container.style.display = "block";
  }
  public hide(): void {
    this.container.style.display = "none";
  }
}
