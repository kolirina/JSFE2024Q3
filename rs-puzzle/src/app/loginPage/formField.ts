export default class FormField {
  private input: HTMLInputElement;

  private errorMessage: HTMLDivElement;

  constructor(type: string, id: string, placeholder: string, required: boolean) {
    this.input = document.createElement('input');
    this.input.type = type;
    this.input.id = id;
    this.input.placeholder = placeholder;
    this.input.required = required;
    this.errorMessage = document.createElement('div');
    this.errorMessage.className = 'error-message';
  }

  public getElement(): HTMLInputElement {
    return this.input;
  }

  public getValue(): string {
    return this.input.value.trim();
  }

  public validateEnglishAlphabet(): boolean {
    const regex = /^[a-zA-Z\-]+$/;
    return regex.test(this.getValue());
  }

  public validateFirstLetterUppercase(minLength: number): boolean {
    const value = this.getValue();
    return value.length >= minLength && value[0] === value[0].toUpperCase();
  }
}
