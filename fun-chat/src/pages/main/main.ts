import LoginForm from '../login/login';
import AboutPage from '../about/about';
import { IUser } from '../login/login';

export default class MainPage {
  // private socket: WebSocket;
  public userData: IUser;
  private users: IUser[] = [];
  private mainContainer: HTMLDivElement;

  private header: HTMLDivElement;

  private usersAndMessagesContainer: HTMLDivElement;

  private usersContainer: HTMLDivElement;

  private userSearchInput: HTMLInputElement;

  //   private messagesContainer: HTMLDivElement;
  private footer: HTMLDivElement;

  public searchText: string;

  // public GET_USERS_ID: number;

  constructor(userData: IUser) {
    this.userData = userData;

    this.mainContainer = document.createElement('div');
    this.mainContainer.classList.add('main-container');
    document.body.appendChild(this.mainContainer);

    this.header = document.createElement('div');
    this.header.classList.add('header');
    this.mainContainer.appendChild(this.header);
    const userInfo = document.createElement('p');
    userInfo.innerHTML = `User: ${userData.login}`;
    this.header.appendChild(userInfo);

    const appName = document.createElement('p');
    appName.innerHTML = 'Fun Chat';
    this.header.appendChild(appName);

    const aboutButton = document.createElement('button');
    aboutButton.textContent = 'About';
    aboutButton.classList.add('main-page-button');
    aboutButton.addEventListener('click', () => {
      history.pushState(null, '', '/about');
      this.hide();
      const about = new AboutPage();
      about.show();
    });
    this.header.appendChild(aboutButton);

    const logOutButton = document.createElement('button');
    logOutButton.textContent = 'Log Out';
    logOutButton.classList.add('main-page-button');
    logOutButton.addEventListener('click', () => {
      history.pushState(null, '', '/login');
      this.hide();
      const login = new LoginForm();
      login.show();
    });
    this.header.appendChild(logOutButton);

    this.usersAndMessagesContainer = document.createElement('div');
    this.usersAndMessagesContainer.classList.add('users-and-messages-container');
    this.mainContainer.appendChild(this.usersAndMessagesContainer);

    this.usersContainer = document.createElement('div');
    this.usersContainer.classList.add('users-container');
    this.usersAndMessagesContainer.appendChild(this.usersContainer);

    this.userSearchInput = document.createElement('input');
    this.userSearchInput.classList.add('userSearchInput');
    this.header.appendChild(this.userSearchInput);
    this.searchText = '';
    this.usersContainer.innerHTML = '';
    // this.header.appendChild(this.userSearchInput);
    this.userSearchInput.value = this.searchText;
    this.userSearchInput.addEventListener('input', () => this.userSearch(this.users));

    this.footer = document.createElement('div');
    this.footer.classList.add('footer');
    this.mainContainer.appendChild(this.footer);

    const RssLogo = document.createElement('img');
    RssLogo.src = './src/images/rss.png';
    this.footer.appendChild(RssLogo);

    const RSSName = document.createElement('p');
    RSSName.textContent = 'the Rolling Scopes School';
    this.footer.appendChild(RSSName);

    const myName = document.createElement('p');
    myName.textContent = 'Irina Kolotilkina';
    this.footer.appendChild(myName);

    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/kolirina';
    const githubImg = document.createElement('img');
    githubImg.src = './src/images/github.png';
    githubLink.appendChild(githubImg);
    this.footer.appendChild(githubLink);

    const year = document.createElement('p');
    year.classList.add('year');
    year.textContent = '2024';
    this.footer.appendChild(year);
  }

  public show(): void {
    this.mainContainer.style.display = 'flex';
    this.renderChat(this.userData);
  }

  public hide(): void {
    this.mainContainer.style.display = 'none';
  }

  // Create WebSocket connection.
  public renderChat(userData: IUser) {
    let socket = new WebSocket('ws://localhost:4000');
    let users: IUser[] = [];

    socket.addEventListener('open', (event) => {
      socket.send(
        JSON.stringify({
          id: 'USER',
          type: 'USER_LOGIN',
          payload: {
            user: {
              login: userData.login,
              password: userData.password,
            },
          },
        })
      );
      socket.send(
        JSON.stringify({
          // id: GET_USERS_ID.toString(),
          id: 'GET_USERS',
          type: 'USER_ACTIVE',
          payload: null,
        })
      );

      socket.send(
        JSON.stringify({
          // id: GET_USERS_ID.toString(),
          id: 'GET_USERS',
          type: 'USER_INACTIVE',
          payload: null,
        })
      );
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);

      const message = JSON.parse(event.data);
      console.log('Message from server ', message.type);
      if (message.type === 'USER_ACTIVE') {
        users = message.payload.users;
        this.renderUsersList(users);
        console.log(users);
      }
      if (message.type === 'USER_INACTIVE') {
        users = message.payload.users;
        this.renderUsersList(users);
        console.log(users);
      }
    });

    console.log(users);
    this.userSearchInput.addEventListener('input', () => this.userSearch(users));
    // let GET_USERS_ID = 0;
    // private fillUsersContainer(socket: WebSocket) {

    //   GET_USERS_ID += 1;
    // }
  }

  public renderUsersList(users: IUser[]) {
    this.usersContainer.innerHTML = '';
    users.forEach((user) => {
      if (user.login !== this.userData.login) {
        const userInUsersListContainer = document.createElement('div');
        userInUsersListContainer.classList.add('userInUsersListContainer');
        this.usersContainer.appendChild(userInUsersListContainer);

        const onlineIndicator = document.createElement('div');
        if (user.isLogined) {
          onlineIndicator.classList.add('online');
        } else {
          onlineIndicator.classList.add('offline');
        }
        userInUsersListContainer.appendChild(onlineIndicator);

        const userNameinUsersList = document.createElement('p');
        userNameinUsersList.classList.add('userNameinUsersList');
        userNameinUsersList.innerHTML = `${user.login}`;
        userInUsersListContainer.appendChild(userNameinUsersList);

        const newMessagesinUsersList = document.createElement('div');
        newMessagesinUsersList.classList.add('newMessagesinUsersList');
        newMessagesinUsersList.innerHTML = `${1}`;
        userInUsersListContainer.appendChild(newMessagesinUsersList);
      }
    });
  }

  private userSearch(users: IUser[]): void {
    this.searchText = this.userSearchInput.value.trim();
    console.log(this.searchText);
    console.log(users);
    const filteredUsers = users.filter((user: IUser) => user.login.includes(this.searchText));
    console.log(filteredUsers);
    this.renderUsersList(filteredUsers);

    // this.userSearchInput.addEventListener('keydown', (event) => {
    //   const key = event.key;
    //   this.searchText += key;
    //   const updatedFilteredUsers = users.filter((user: IUser) => user.login.includes(this.searchText));
    //   console.log(updatedFilteredUsers);
    //   this.renderUsersList(updatedFilteredUsers);
    // });
  }
}
