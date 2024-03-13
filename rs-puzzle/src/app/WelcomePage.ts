import { IUser } from './loginPage/user';
import { retrieveUserData } from './loginPage/localStorageUtil';
import LoginForm from './loginPage/loginForm';
import GamePage from './gamePage/gamePage';


export default class WelcomePage {
  private wrapper: HTMLDivElement;
  private title: HTMLDivElement;
  private welcome: HTMLDivElement;
  private startButton: HTMLButtonElement;
  private logoutButton: HTMLButtonElement;

  constructor() {
    this.wrapper = document.createElement('div');
    this.wrapper.id = 'welcome-wrapper';
    this.wrapper.classList.add('fade-in');
    setTimeout(() => {
      this.wrapper.classList.add('active');
    }, 500);

    this.title = document.createElement('div');
    this.title.id = 'title';
    this.title.classList.add('welcome');
    this.title.innerText = 'ENGLISH  PUZZLE';

    this.welcome = document.createElement('div');
    this.welcome.classList.add('welcome');
    this.welcome.id = 'welcome';

    const userData = retrieveUserData();
    if (userData) {
      this.welcome.innerHTML = `Welcome, ${userData.firstName} ${userData.surname}!<br>Improve your English with the interactive puzzle game.<br>You are going to do a puzzle with English words forming sentences<br>and bit by bit reveal a work of art.<br>Enjoy the learning process!`;
    }

    this.wrapper.appendChild(this.title);
    this.wrapper.appendChild(this.welcome);

    this.startButton = document.createElement('button');
    this.startButton.type = 'button';
    this.startButton.textContent = 'START';
    this.wrapper.appendChild(this.startButton);

    this.logoutButton = document.createElement('button');
    this.logoutButton.type = 'button';
    this.logoutButton.textContent = 'Logout';
    this.wrapper.appendChild(this.logoutButton);
    document.body.appendChild(this.wrapper);
    this.setupListeners();
  }

  private setupListeners(): void {
    this.logoutButton.addEventListener('click', () => {
      this.logout();
      this.hide();
    });

    this.startButton.addEventListener('click', () => {
      this.hide();
      const gamePage = new GamePage();
    });
  }

  private logout(): void {
    localStorage.removeItem('userData');
    console.log('Stored user data:', localStorage.getItem('userData'));
    this.hide();
    const loginPage = new LoginForm();
  }

  public show(): void {
    this.wrapper.style.display = 'block';
  }

  public hide(): void {
    this.wrapper.style.display = 'none';
  }
}
