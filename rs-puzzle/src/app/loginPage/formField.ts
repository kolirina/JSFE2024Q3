export default class FormField {
  private input: HTMLInputElement;

  private label: HTMLLabelElement;

  private wrapper: HTMLDivElement;

  constructor(labelText: string, inputType: string, inputName: string, required: boolean) {
    this.wrapper = document.createElement('div');
    this.label = document.createElement('label');
    this.label.textContent = `${labelText}:`;
    this.input = document.createElement('input');
    this.input.type = inputType;
    this.input.name = inputName;
    this.input.required = required;

    this.wrapper.appendChild(this.label);
    this.wrapper.appendChild(this.input);
  }

  public getElement(): HTMLDivElement {
    return this.wrapper;
  }

  getValue(): string {
    return this.input.value.trim();
  }
}
