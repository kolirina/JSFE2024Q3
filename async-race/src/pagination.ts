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
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  paginationContainer.appendChild(pageIndicator);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", nextPage);
  paginationContainer.appendChild(nextButton);

  return paginationContainer;
}

export function nextPage(
  currentPage: number,
  totalPages: number,
  renderPage: () => void
): void {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
}

export function prevPage(
  currentPage: number,
  totalPages: number,
  renderPage: () => void
): void {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
}
