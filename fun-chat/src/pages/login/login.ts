import FormField from './formField';
import { validateForm } from './validation';
import AboutPage from '../about/about';
import MainPage from '../main/main';
// import handleRoute from '../../router';

export interface IUser {
  login: string;
  password: string;
  isLogined?: boolean;
}

type ValidationErrors = {
  [key: string]: string[];
  login: string[];
  password: string[];
};

export default class LoginForm {
  private loginField: FormField;

  private passwordField: FormField;

  private loginButton: HTMLButtonElement;

  private aboutButton: HTMLButtonElement;

  private form: HTMLFormElement;

  constructor() {
    this.form = document.createElement('form');
    this.form.id = 'loginForm';

    this.loginField = new FormField('text', 'login', 'Enter your name', true);
    this.passwordField = new FormField('password', 'password', 'Enter your password', true);

    this.form.appendChild(this.loginField.getElement());
    this.form.appendChild(this.passwordField.getElement());

    this.form.addEventListener('keydown', this.handleKeyDown.bind(this));

    this.loginButton = document.createElement('button');
    this.loginButton.classList.add('login-page-button');
    this.loginButton.type = 'submit';
    this.loginButton.textContent = 'Log in';
    this.form.appendChild(this.loginButton);
    this.loginButton.disabled = true;

    this.aboutButton = document.createElement('button');
    this.aboutButton.classList.add('login-page-button');
    this.aboutButton.type = 'button';
    this.aboutButton.textContent = 'About';
    this.aboutButton.addEventListener('click', () => {
      history.pushState(null, '', '/about');
      // handleRoute('/about');
      this.hide();
      const about = new AboutPage();
      about.show();
    });
    this.form.appendChild(this.aboutButton);

    document.body.appendChild(this.form);

    this.setupListeners();
  }

  private setupListeners(): void {
    this.loginField.getElement().addEventListener('input', this.handleInput.bind(this));
    this.passwordField.getElement().addEventListener('input', this.handleInput.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private handleInput(): void {
    this.removeErrorMessages();
    const errors: ValidationErrors = validateForm(this.loginField, this.passwordField);
    this.displayErrorMessages(errors);
    if (Object.keys(errors).length === 0) {
      this.loginButton.disabled = false;
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.loginButton.disabled === false) {
      event.preventDefault();
      this.handleSubmit(event);
    }
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();

    const errors: ValidationErrors = validateForm(this.loginField, this.passwordField);
    this.loginButton.disabled = !(Object.keys(errors).length > 0);
    if (errors.login.length === 0 && errors.password.length === 0) {
      const userData: IUser = {
        login: this.loginField.getValue(),
        password: this.passwordField.getValue(),
      };
      this.clearInputFields();
      this.hide();
      history.pushState(null, '', '/main');
      const main = new MainPage(userData);
      main.show();
    }
  }

  private displayErrorMessages(errors: ValidationErrors): void {
    this.removeErrorMessages();
    for (const fieldName in errors) {
      const field = fieldName === 'login' ? this.loginField : this.passwordField;
      const messages = errors[fieldName];
      if (errors.login.length || errors.password.length) {
        this.loginButton.disabled = true;
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
    this.loginField.getElement().classList.remove('wrongInput');
    this.passwordField.getElement().classList.remove('wrongInput');
  }

  private clearInputFields(): void {
    (this.loginField.getElement() as HTMLInputElement).value = '';
    (this.passwordField.getElement() as HTMLInputElement).value = '';
  }

  public show(): void {
    this.form.style.display = 'block';
  }

  public hide(): void {
    this.form.style.display = 'none';
  }

  public showAlreadyAuthorizedModal(): void {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContainer.appendChild(modalContent);

    const message = document.createElement('p');
    message.textContent = 'User with this login is already authorized.';
    modalContent.appendChild(message);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('login-page-button');
    closeButton.classList.add('modal-button');
    closeButton.addEventListener('click', () => {
      modalContainer.remove();
    });
    modalContent.appendChild(closeButton);

    document.body.appendChild(modalContainer);
  }

  public showWrongPasswordModal(): void {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContainer.appendChild(modalContent);

    const message = document.createElement('p');
    message.textContent = 'Wrong password.';
    modalContent.appendChild(message);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('login-page-button');
    closeButton.classList.add('modal-button');
    closeButton.addEventListener('click', () => {
      modalContainer.remove();
    });
    modalContent.appendChild(closeButton);

    document.body.appendChild(modalContainer);
  }
}
