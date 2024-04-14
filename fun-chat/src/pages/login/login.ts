import FormField from './formField';
import { validateForm } from './validation';

type ValidationErrors = {
  [key: string]: string[];
  name: string[];
  password: string[];
};

export default class LoginForm {
  private nameField: FormField;

  private passwordField: FormField;

  private loginButton: HTMLButtonElement;

  private aboutButton: HTMLButtonElement;

  private form: HTMLFormElement;

  constructor() {
    this.form = document.createElement('form');
    this.form.id = 'loginForm';

    this.nameField = new FormField('text', 'name', 'Enter your name', true);
    this.passwordField = new FormField('password', 'password', 'Enter your password', true);

    this.form.appendChild(this.nameField.getElement());
    this.form.appendChild(this.passwordField.getElement());

    this.loginButton = document.createElement('button');
    this.loginButton.type = 'submit';
    this.loginButton.textContent = 'Log in';
    this.form.appendChild(this.loginButton);
    this.loginButton.disabled = true;

    this.aboutButton = document.createElement('button');
    this.aboutButton.type = 'button';
    this.aboutButton.textContent = 'About';
    this.form.appendChild(this.aboutButton);

    document.body.appendChild(this.form);

    this.setupListeners();

    // const userData = retrieveUserData();
    // if (userData) {
    //   this.hide();
    //   const welcomePage = new WelcomePage(userData, GameData);
    //   welcomePage.show();
    // }
  }

  private setupListeners(): void {
    this.nameField.getElement().addEventListener('input', this.handleInput.bind(this));
    console.log('setupeventlisteners');
    this.passwordField.getElement().addEventListener('input', this.handleInput.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private handleInput(): void {
    this.removeErrorMessages();
    const errors: ValidationErrors = validateForm(this.nameField, this.passwordField);
    this.displayErrorMessages(errors);
    if (Object.keys(errors).length === 0) {
      this.loginButton.disabled = false;
    }
    console.log('handle input');
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const errors: ValidationErrors = validateForm(this.nameField, this.passwordField);
    // this.displayErrorMessages(errors);
    console.log('handle submit');

    this.loginButton.disabled = !(Object.keys(errors).length > 0);
    if (errors.name.length === 0 && errors.password.length === 0) {
      // const userData: IUser = {
      //   name: this.nameField.getValue(),
      //   password: this.passwordField.getValue(),
    }
    this.clearInputFields();
    this.hide();
    // const welcomePage = new WelcomePage(userData, this.GameData);
    // welcomePage.show();
  }

  private displayErrorMessages(errors: ValidationErrors): void {
    this.removeErrorMessages();
    for (const fieldName in errors) {
      const field = fieldName === 'name' ? this.nameField : this.passwordField;
      const messages = errors[fieldName];
      if (errors.name.length || errors.password.length) {
        this.loginButton.disabled = true;
        console.log(errors.name.length);
      } else {
        this.loginButton.disabled = false;
      }

      messages.forEach((message) => {
        const errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'error-message';
        errorMessageElement.textContent = message;
        field.getElement().after(errorMessageElement);
        field.getElement().classList.add('wrongInput');
      });
    }
  }

  private removeErrorMessages(): void {
    const errorMessages = this.form.querySelectorAll('.error-message');
    errorMessages.forEach((errorMessage) => errorMessage.remove());
    this.nameField.getElement().classList.remove('wrongInput');
    this.passwordField.getElement().classList.remove('wrongInput');
  }

  private clearInputFields(): void {
    (this.nameField.getElement() as HTMLInputElement).value = '';
    (this.passwordField.getElement() as HTMLInputElement).value = '';
  }

  public show(): void {
    this.form.style.display = 'block';
  }

  public hide(): void {
    this.form.style.display = 'none';
  }
}
