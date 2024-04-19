import LoginForm from '../login/login';
import AboutPage from '../about/about';
import { IUser } from '../login/login';

interface IFriend {
  login?: string;
  isLogined?: boolean;
}

interface IMessage {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

export default class MainPage {
  // private socket: WebSocket;
  public userData: IUser;
  private users: IUser[] = [];
  public friendData: IFriend;
  private messages: IMessage[] = [];

  // public friendData: IFriend;

  private mainContainer: HTMLDivElement;

  private header: HTMLDivElement;

  private usersAndMessagesContainer: HTMLDivElement;

  private usersPlusSearch: HTMLDivElement;

  private usersContainer: HTMLDivElement;

  private userSearchInput: HTMLInputElement;

  private messagesPlusInput: HTMLDivElement;

  private messagesContainer: HTMLDivElement;

  private messagesInputContainer: HTMLDivElement;

  private messagesPlusInputNoHeader: HTMLDivElement;

  private messageInput: HTMLInputElement;

  private sendButton: HTMLButtonElement;

  private footer: HTMLDivElement;

  public searchText: string;

  private friendsName: HTMLDivElement;

  private friendsStatus: HTMLDivElement;

  private socket: WebSocket = new WebSocket('ws://localhost:4000');
  // public GET_USERS_ID: number;

  public messageText: string = '';

  constructor(userData: IUser) {
    this.userData = userData;
    this.friendData = {};
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

    const headerButtonsWrapper = document.createElement('div');
    headerButtonsWrapper.classList.add('headerButtonsWrapper');
    this.header.appendChild(headerButtonsWrapper);

    const aboutButton = document.createElement('button');
    aboutButton.textContent = 'About';
    aboutButton.classList.add('main-page-button');
    aboutButton.classList.add('about-main-button');
    aboutButton.addEventListener('click', () => {
      history.pushState(null, '', '/about');
      this.hide();
      const about = new AboutPage(this.userData);
      about.show();
    });
    headerButtonsWrapper.appendChild(aboutButton);

    const logOutButton = document.createElement('button');
    logOutButton.textContent = 'Log Out';
    logOutButton.classList.add('main-page-button');
    logOutButton.addEventListener('click', () => {
      history.pushState(null, '', '/login');
      this.hide();
      const login = new LoginForm();
      login.show();
    });
    headerButtonsWrapper.appendChild(logOutButton);

    this.usersAndMessagesContainer = document.createElement('div');
    this.usersAndMessagesContainer.classList.add('users-and-messages-container');
    this.mainContainer.appendChild(this.usersAndMessagesContainer);

    this.usersPlusSearch = document.createElement('div');
    this.usersPlusSearch.classList.add('usersPlusSearch');
    this.usersAndMessagesContainer.appendChild(this.usersPlusSearch);

    this.userSearchInput = document.createElement('input');
    this.userSearchInput.placeholder = 'Search...';
    this.userSearchInput.classList.add('userSearchInput');
    this.usersPlusSearch.appendChild(this.userSearchInput);
    this.searchText = '';

    this.userSearchInput.value = this.searchText;
    this.userSearchInput.addEventListener('input', () => this.userSearch(this.users));

    this.usersContainer = document.createElement('div');
    this.usersContainer.classList.add('users-container');
    this.usersPlusSearch.appendChild(this.usersContainer);
    // this.usersContainer.innerHTML = '';

    this.messagesPlusInput = document.createElement('div');
    this.messagesPlusInput.classList.add('messagesPlusInput');
    this.usersAndMessagesContainer.appendChild(this.messagesPlusInput);

    const messagesPlusInputHeader = document.createElement('div');
    messagesPlusInputHeader.classList.add('messagesPlusInputHeader');
    this.messagesPlusInput.appendChild(messagesPlusInputHeader);

    this.friendsName = document.createElement('div');
    messagesPlusInputHeader.appendChild(this.friendsName);

    this.friendsStatus = document.createElement('div');
    messagesPlusInputHeader.appendChild(this.friendsStatus);

    this.messagesPlusInputNoHeader = document.createElement('div');
    this.messagesPlusInputNoHeader.classList.add('messagesPlusInputNoHeader');
    this.messagesPlusInput.appendChild(this.messagesPlusInputNoHeader);

    this.messagesContainer = document.createElement('div');
    this.messagesContainer.classList.add('messagesContainerEmpty');
    this.messagesContainer.innerHTML = 'Hi! 😸 Choose someone to chat with...';
    this.messagesPlusInputNoHeader.appendChild(this.messagesContainer);

    this.messagesInputContainer = document.createElement('div');
    this.messagesInputContainer.classList.add('messagesInputContainer');
    this.messagesPlusInputNoHeader.appendChild(this.messagesInputContainer);

    this.messageInput = document.createElement('input');
    this.messageInput.placeholder = 'Choose a friend from the list...';
    this.messageInput.disabled = true;
    this.messageInput.classList.add('messageInput');
    this.messagesInputContainer.appendChild(this.messageInput);

    this.messageInput.addEventListener('focus', () => {
      this.sendButton.disabled = false;
    });

    this.messageInput.addEventListener('keydown', this.handleKeyDown.bind(this));

    this.sendButton = document.createElement('button');
    this.sendButton.textContent = 'Send';
    this.sendButton.classList.add('main-page-button');
    this.sendButton.disabled = true;
    this.messagesInputContainer.appendChild(this.sendButton);
    this.sendButton.addEventListener('click', () => {
      console.log(this.friendData.login);
      console.log(this.messageText);
      this.messageText = this.messageInput.value;
      if (this.friendData.login && this.messageText) {
        this.sendMessage(this.friendData.login, this.messageText);
      }
      this.messageInput.value = '';
      this.messageText = '';
    });

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

  public renderChat(userData: IUser) {
    // this.socket = new WebSocket('ws://localhost:4000');
    let users: IUser[] = [];

    if (this.socket) {
      this.socket.addEventListener('open', (event) => {
        this.socket.send(
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
        this.socket.send(
          JSON.stringify({
            // id: GET_USERS_ID.toString(),
            id: 'GET_USERS',
            type: 'USER_ACTIVE',
            payload: null,
          })
        );
        this.socket.send(
          JSON.stringify({
            // id: GET_USERS_ID.toString(),
            id: 'GET_USERS',
            type: 'USER_INACTIVE',
            payload: null,
          })
        );
      });

      // Listen for messages
      this.socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);

        const message = JSON.parse(event.data);
        console.log('Message from server ', message.type);

        if (message.type === 'USER_ACTIVE' || message.type === 'USER_INACTIVE') {
          if (message.type === 'USER_ACTIVE') {
            const activeUsers: IUser[] = message.payload.users;
            users = users.concat(activeUsers);
            console.log(users);
          }
          if (message.type === 'USER_INACTIVE') {
            const inactiveUsers: IUser[] = message.payload.users;
            users = users.concat(inactiveUsers);
            console.log(users);
          }
          this.renderUsersList(users);
          console.log(users);
        }

        if (message.type === 'USER_EXTERNAL_LOGOUT' || message.type === 'USER_EXTERNAL_LOGIN') {
          users = [];
          this.socket.send(
            JSON.stringify({
              // id: GET_USERS_ID.toString(),
              id: 'GET_USERS',
              type: 'USER_ACTIVE',
              payload: null,
            })
          );
          this.socket.send(
            JSON.stringify({
              // id: GET_USERS_ID.toString(),
              id: 'GET_USERS',
              type: 'USER_INACTIVE',
              payload: null,
            })
          );
        }
        if (message.type === 'MSG_SEND' && this.friendData.login) {
          this.messages = [];
          this.getMessageHistory(this.friendData.login);
        }

        if (message.type === 'MSG_FROM_USER') {
          this.messages = message.payload.messages;
          console.log(this.messages);
          this.renderMessageHistory(this.messages);
        }
      });
    }

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

        userInUsersListContainer.addEventListener('click', () => {
          this.friendData = {
            login: user.login,
            isLogined: user.isLogined,
          };
          if (this.friendData) {
            this.friendsName.innerHTML = `${this.friendData.login}`;
            this.friendsName.classList.add('friendsName');
            if (this.friendData.isLogined) {
              this.friendsStatus.innerHTML = 'online';
              this.friendsStatus.classList.remove('friendStatusOffline');
              this.friendsStatus.classList.add('friendStatusOnline');
            } else {
              this.friendsStatus.innerHTML = 'offline';
              this.friendsStatus.classList.remove('friendStatusOnline');
              this.friendsStatus.classList.add('friendStatusOffline');
            }
          }
          this.messageInput.disabled = false;
          this.messageInput.placeholder = 'Write a message...';
          if (this.friendData.login) {
            this.getMessageHistory(this.friendData.login);
          }
        });
      }
    });
  }

  private userSearch(users: IUser[]): void {
    this.searchText = this.userSearchInput.value.trim();
    const filteredUsers = users.filter((user: IUser) => user.login.includes(this.searchText));
    this.renderUsersList(filteredUsers);
  }

  private sendMessage(friend: string, message: string): void {
    console.log('sendmessage');
    this.socket.send(
      JSON.stringify({
        id: 'MSG_SEND',
        type: 'MSG_SEND',
        payload: {
          message: {
            to: `${friend}`,
            text: `${message}`,
          },
        },
      })
    );
  }

  private getMessageHistory(friend: string) {
    this.messages = [];
    this.socket.send(
      JSON.stringify({
        id: 'MSG_FROM_USER',
        type: 'MSG_FROM_USER',
        payload: {
          user: {
            login: friend,
          },
        },
      })
    );
  }

  private renderMessageHistory(messages: IMessage[]) {
    this.messagesContainer.innerHTML = '';
    this.messagesContainer.classList.remove('messagesContainerEmpty');
    this.messagesContainer.classList.add('messagesContainer');
    messages.sort((a, b) => {
      return b.datetime - a.datetime;
    });
    messages.forEach((message) => {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('messageContainer');
      this.messagesContainer.appendChild(messageContainer);

      const messageContainerHeader = document.createElement('div');
      messageContainerHeader.classList.add('messageContainerHeader');
      messageContainer.appendChild(messageContainerHeader);

      const from = document.createElement('p');
      from.classList.add('from');
      messageContainerHeader.appendChild(from);
      if (message.from === this.userData.login) {
        from.innerHTML = 'you';
        messageContainer.classList.add('messageFromMe');
      } else {
        from.innerHTML = `${message.from}`;
        messageContainer.classList.add('messageToMe');
      }
      console.log(message.from);

      const when = document.createElement('p');
      when.classList.add('when');
      messageContainerHeader.appendChild(when);

      const date = new Date(message.datetime);
      const formattedDateTime = date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      when.innerHTML = formattedDateTime;

      const messageText = document.createElement('div');
      messageText.classList.add('messageText');
      messageContainer.appendChild(messageText);
      messageText.innerHTML = `${message.text}`;

      const messageStatus = document.createElement('div');
      messageStatus.classList.add('messageStatus');
      messageContainer.appendChild(messageStatus);

      const isEdited = document.createElement('p');
      isEdited.classList.add('isEdited');
      messageStatus.appendChild(isEdited);
      if (message.status.isEdited) {
        isEdited.innerHTML = 'edited';
      }

      const deliveredOrRead = document.createElement('p');
      deliveredOrRead.classList.add('deliveredOrRead');
      messageStatus.appendChild(deliveredOrRead);
      deliveredOrRead.innerHTML = 'sent';
      if (message.status.isDelivered) {
        deliveredOrRead.innerHTML = 'delivered';
      }
      if (message.status.isReaded) {
        deliveredOrRead.innerHTML = 'read';
      }
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.sendButton.disabled === false) {
      this.messageText = this.messageInput.value;
      if (this.friendData.login && this.messageText) {
        this.sendMessage(this.friendData.login, this.messageText);
      }
      this.messageInput.value = '';
      this.messageText = '';
    }
  }
}
