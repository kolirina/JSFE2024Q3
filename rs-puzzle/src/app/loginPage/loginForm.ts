import FormField from './formField';
import { IUser, Round, GameData } from '../interfaces';
import { validateForm } from './validation';
import { storeUserData, retrieveUserData } from './localStorageUtil';
import WelcomePage from '../WelcomePage';

type ValidationErrors = {
  [key: string]: string[];
  firstName: string[];
  surname: string[];
};

export default class LoginForm {
  private firstNameField: FormField;
  private surnameField: FormField;
  private loginButton: HTMLButtonElement;
  private form: HTMLFormElement;
  private GameData: GameData[];

  constructor(GameData: GameData[]) {
    this.GameData = GameData;
    this.form = document.createElement('form');
    this.form.id = 'loginForm';

    this.firstNameField = new FormField('text', 'firstName', 'Your First Name', true);
    this.surnameField = new FormField('text', 'surname', 'Your Surname', true);

    this.form.appendChild(this.firstNameField.getElement());
    this.form.appendChild(this.surnameField.getElement());

    this.loginButton = document.createElement('button');
    this.loginButton.type = 'submit';
    this.loginButton.textContent = 'Log in';
    this.form.appendChild(this.loginButton);
    document.body.appendChild(this.form);

    this.setupListeners();

    const userData = retrieveUserData();
    if (userData) {
      this.hide();
      const welcomePage = new WelcomePage(userData, GameData);
      welcomePage.show();
    }
  }

  private setupListeners(): void {
    this.firstNameField.getElement().addEventListener('input', this.handleInput.bind(this));
    this.surnameField.getElement().addEventListener('input', this.handleInput.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private handleInput(): void {
    this.removeErrorMessages();
    this.loginButton.disabled = false;
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const errors: ValidationErrors = validateForm(this.firstNameField, this.surnameField);
    this.displayErrorMessages(errors);

    this.loginButton.disabled = Object.keys(errors).length > 0;
    if (errors.firstName.length === 0 && errors.surname.length === 0) {
      const userData: IUser = {
        firstName: this.firstNameField.getValue(),
        surname: this.surnameField.getValue(),
      };
      storeUserData(userData.firstName, userData.surname);
      this.clearInputFields();
      this.hide();
      const welcomePage = new WelcomePage(userData, this.GameData);
      welcomePage.show();
    }
  }

  private displayErrorMessages(errors: ValidationErrors): void {
    this.removeErrorMessages();
    for (const fieldName in errors) {
      const field = fieldName === 'firstName' ? this.firstNameField : this.surnameField;
      const messages = errors[fieldName];
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
  }

  private clearInputFields(): void {
    (this.firstNameField.getElement() as HTMLInputElement).value = '';
    (this.surnameField.getElement() as HTMLInputElement).value = '';
  }

  public show(): void {
    this.form.style.display = 'block';
  }

  public hide(): void {
    this.form.style.display = 'none';
  }
}
