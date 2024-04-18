import LoginForm from '../login/login';
// import handleRoute from '../../router';
import { IUser } from '../login/login';
import MainPage from '../main/main';

export default class AboutPage {
  private container: HTMLDivElement;
  private title: HTMLDivElement;

  private description: HTMLDivElement;

  private link: HTMLAnchorElement;
  private backButton: HTMLButtonElement;

  constructor(userData?: IUser) {
    // handleRoute(window.location.pathname);
    this.container = document.createElement('div');
    this.container.id = 'aboutContainer';
    document.body.appendChild(this.container);
    this.container = document.createElement('div');
    this.container.id = 'aboutContainer';

    document.body.appendChild(this.container);

    this.title = document.createElement('div');
    this.title.id = 'title';
    this.title.innerHTML = 'Welcome to Fun-Chat!';

    this.container.appendChild(this.title);

    this.description = document.createElement('div');
    this.description.id = 'description';

    this.container.appendChild(this.description);
    this.description.innerHTML = 'Chat with your friends. Make new friends. Have fun!';

    this.link = document.createElement('a');

    this.link.href = 'https://kolirina.github.io/rsschool-cv/cv';

    this.link.textContent = 'About the author';

    this.container.appendChild(this.link);

    this.backButton = document.createElement('button');
    this.backButton.type = 'button';
    this.backButton.classList.add('login-page-button');
    this.backButton.textContent = 'Back';
    this.container.appendChild(this.backButton);

    this.backButton.addEventListener('click', () => {
      if (userData) {
        const main = new MainPage(userData);
        this.hide();
        main.show();
      } else {
        const login = new LoginForm();
        this.hide();
        login.show();
      }
    });
  }

  public show(): void {
    this.container.style.display = 'flex';
  }

  public hide(): void {
    this.container.style.display = 'none';
  }
}
