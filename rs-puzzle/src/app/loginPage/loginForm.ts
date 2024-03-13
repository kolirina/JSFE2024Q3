import FormField from './formField';
import { IUser } from './user';
import { validateForm } from './validation';

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

  constructor() {
    this.form = document.createElement('form');
    this.form.id = 'loginForm';

    this.firstNameField = new FormField('text', 'firstName', 'Your First Name', true);
    this.surnameField = new FormField('text', 'surname', 'Your Surname', true);

    this.form.appendChild(this.firstNameField.getElement());
    this.form.appendChild(this.surnameField.getElement());

    this.loginButton = document.createElement('button');
    this.loginButton.type = 'submit';
    this.loginButton.textContent = 'Start';
    this.form.appendChild(this.loginButton);

    document.body.appendChild(this.form);

    this.setupListeners();
  }

  private setupListeners(): void {
    this.firstNameField.getElement().addEventListener('input', () => {
      this.removeErrorMessages();
      this.firstNameField.getElement().classList.remove('wrongInput');
      this.loginButton.disabled = false;
    });

    this.surnameField.getElement().addEventListener('input', () => {
      this.removeErrorMessages();
      this.surnameField.getElement().classList.remove('wrongInput');
      this.loginButton.disabled = false;
    });
    this.form.addEventListener('submit', (event) => {
      console.log('🐪');
      event.preventDefault();
      this.removeErrorMessages();
      this.firstNameField.getElement().classList.remove('wrongInput');
      this.surnameField.getElement().classList.remove('wrongInput');
      console.log('🐐');
      this.validateForm();
    });
  }

  private validateForm(): void {
    const errors = validateForm(this.firstNameField, this.surnameField);

    this.displayErrorMessages(errors);

    this.loginButton.disabled = Object.keys(errors).length > 0;
  }

  private displayErrorMessages(errors: ValidationErrors): void {
    this.removeErrorMessages();
    for (const fieldName in errors) {
      const field = fieldName === 'firstName' ? this.firstNameField : this.surnameField;
      const messages = errors[fieldName];
      // if (messages.length > 0) {
      //   fieldElement.classList.add('wrongInput');
      // } else {
      //   fieldElement.classList.remove('wrongInput');
      // }
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

  public getUser(): IUser {
    return {
      firstName: this.firstNameField.getValue(),
      surname: this.surnameField.getValue(),
    };
  }
}
