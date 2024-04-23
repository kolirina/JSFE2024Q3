export function createDiv(
  className: string,
  parentContainer: HTMLElement
): HTMLDivElement {
  const element = document.createElement("div") as HTMLDivElement;
  element.classList.add(className);
  parentContainer.appendChild(element);
  return element;
}

export function createBtn(
  className: string,
  parentContainer: HTMLElement,
  textContent: string
): HTMLButtonElement {
  const element = document.createElement("button") as HTMLButtonElement;
  element.classList.add(className);
  parentContainer.appendChild(element);
  element.textContent = textContent;
  return element;
}

export function createInpt(
  parentContainer: HTMLElement,
  id?: string,
  type?: string,
  placeholder?: string
): HTMLInputElement {
  const element = document.createElement("input") as HTMLInputElement;
  parentContainer.appendChild(element);
  if (id) {
    element.id = id;
  }
  if (type) {
    element.type = type;
  }
  if (placeholder) {
    element.placeholder = placeholder;
  }
  return element;
}
