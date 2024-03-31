import GarageView from "./garageView/garageView";
export function renderPagination(
  currentPage: number,
  totalPages: number,
  prevPage: () => void,
  nextPage: () => void
): HTMLDivElement {
  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination");

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.addEventListener("click", prevPage);
  paginationContainer.appendChild(prevButton);

  const pageIndicator = document.createElement("span");
  pageIndicator.classList.add("page-indicator");
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  paginationContainer.appendChild(pageIndicator);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", nextPage);
  paginationContainer.appendChild(nextButton);

  return paginationContainer;
}

export function nextPage(garageView: GarageView): void {
  if (garageView.currentPage < garageView.totalPages) {
    garageView.currentPage++;
    garageView.pageNum.innerHTML = `Page #${garageView.currentPage}`;
    garageView.renderGaragePage();
  }
}

export function prevPage(garageView: GarageView): void {
  if (garageView.currentPage > 1) {
    garageView.currentPage--;
    garageView.renderGaragePage();
    garageView.pageNum.innerHTML = `Page #${garageView.currentPage}`;
  }
}
