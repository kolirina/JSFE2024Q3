import FormField from './formField';
import { IUser } from './user';
import { validateForm } from './validation';
import { storeUserData, retrieveUserData } from './localStorageUtil';

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
    this.loginButton.textContent = 'Log in';
    this.form.appendChild(this.loginButton);

    // this.logoutButton = document.createElement('button');
    // this.logoutButton.type = 'button';
    // this.logoutButton.textContent = 'Logout';
    // this.logoutButton.classList.add('hidden');

    // this.form.appendChild(this.logoutButton);

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
      event.preventDefault();
      this.removeErrorMessages();
      this.firstNameField.getElement().classList.remove('wrongInput');
      this.surnameField.getElement().classList.remove('wrongInput');
      this.validateForm();
    });

    // this.logoutButton.addEventListener('click', () => {
    //   this.logout();
    // });
  }

  private updateUI(): void {
    const userData = retrieveUserData();
    if (userData) {
      this.loginButton.classList.add('hidden');
      this.firstNameField.getElement().classList.add('hidden');
      this.surnameField.getElement().classList.add('hidden');
      // this.logoutButton.classList.remove('hidden');
    } else {
      this.loginButton.classList.remove('hidden');
      this.firstNameField.getElement().classList.remove('hidden');
      this.surnameField.getElement().classList.remove('hidden');
      // this.logoutButton.classList.add('hidden');
    }
  }

  private validateForm(): void {
    const errors: ValidationErrors = validateForm(this.firstNameField, this.surnameField);

    this.displayErrorMessages(errors);

    this.loginButton.disabled = Object.keys(errors).length > 0;
    if (errors.firstName.length === 0 && errors.surname.length === 0) {
      const firstName = this.firstNameField.getValue();
      const surname = this.surnameField.getValue();
      storeUserData(firstName, surname);
      console.log('Stored user data:', localStorage.getItem('userData'));
      this.clearInputFields();
      this.updateUI();
      this.hide();
      const welcomePage = new WelcomePage();
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

  // private logout(): void {
  //   localStorage.removeItem('userData');
  //   this.updateUI();
  //   console.log('Stored user data:', localStorage.getItem('userData'));
  // }


  public getUser(): IUser {
    return {
      firstName: this.firstNameField.getValue(),
      surname: this.surnameField.getValue(),
    };
  }

  public show(): void {
    this.form.style.display = 'block';
  }

  public hide(): void {
    this.form.style.display = 'none';
  }

}
