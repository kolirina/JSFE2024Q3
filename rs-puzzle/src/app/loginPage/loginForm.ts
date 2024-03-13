import FormField from './formField';
import { IUser } from './user';

export default class LoginForm {
  private firstNameField: FormField;

  private surnameField: FormField;

  private loginButton: HTMLButtonElement;

  private form: HTMLFormElement;

  constructor() {
    this.form = document.createElement('form');
    this.form.id = 'loginForm';

    this.firstNameField = new FormField('Enter your name', 'text', 'firstName', true);
    this.surnameField = new FormField('Enter your surname', 'text', 'surname', true);

    // Use getElement() to append.
    this.form.appendChild(this.firstNameField.getElement());
    this.form.appendChild(this.surnameField.getElement());

    this.loginButton = document.createElement('button');
    this.loginButton.type = 'submit';
    this.loginButton.textContent = 'Start';
    this.loginButton.disabled = true;
    this.form.appendChild(this.loginButton);

    document.body.appendChild(this.form);

    this.setupListeners();
  }

  private setupListeners(): void {
    this.firstNameField.getElement().querySelector('input')!.addEventListener('input', this.validateForm.bind(this));
    this.surnameField.getElement().querySelector('input')!.addEventListener('input', this.validateForm.bind(this));
  }

  private validateForm(): void {
    this.loginButton.disabled = !(this.firstNameField.getValue() && this.surnameField.getValue());
  }

  public getUser(): IUser {
    return {
      firstName: this.firstNameField.getValue(),
      surname: this.surnameField.getValue(),
    };
  }
}
