import LoginForm from '../login/login';
import AboutPage from '../about/about';
import { IUser } from '../login/login';

export interface IFriend {
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
  public userData: IUser;

  private users: IUser[] = [];

  public friendData: IFriend;

  private messages: IMessage[] = [];

  public newMessages: IMessage[] = [];

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

  private editButton: HTMLButtonElement;

  private footer: HTMLDivElement;

  public searchText: string;

  private friendsName: HTMLDivElement;

  private friendsStatus: HTMLDivElement;

  private socket: WebSocket = new WebSocket('ws://localhost:4000');

  public messageText: string = '';

  private reconnectingModal!: HTMLDivElement;

  private editMessageId: string = '';

  private scrollEventHandler: (id: string) => (event: Event) => void;

  public userScrolling: boolean = false;
  public IdOfNewMessageUserScrolling: string = '';

  constructor(userData: IUser, friendData?: IFriend) {
    this.userData = userData;
    this.friendData = friendData || {};
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
      const about = new AboutPage(this.userData, this.friendData);
      console.log(this.userData);
      console.log(this.friendData);
      about.show();
      this.socket.send(
        JSON.stringify({
          id: 'USER_LOGOUT',
          type: 'USER_LOGOUT',
          payload: {
            user: {
              login: userData.login,
              password: userData.password,
            },
          },
        })
      );
    });
    headerButtonsWrapper.appendChild(aboutButton);

    const logOutButton = document.createElement('button');
    logOutButton.textContent = 'Log Out';
    logOutButton.classList.add('main-page-button');
    logOutButton.addEventListener('click', () => {
      this.socket.send(
        JSON.stringify({
          id: 'USER_LOGOUT',
          type: 'USER_LOGOUT',
          payload: {
            user: {
              login: userData.login,
              password: userData.password,
            },
          },
        })
      );

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

    this.messageInput.addEventListener('input', () => {
      // console.log(this.messageInput.value.trim());
      // console.log(this.messageInput.value);
      if (this.messageInput.value.trim()) {
        this.sendButton.disabled = false;
      } else {
        this.sendButton.disabled = true;
      }
    });

    this.messageInput.addEventListener('keydown', this.handleKeyDown.bind(this));

    this.sendButton = document.createElement('button');
    this.sendButton.textContent = 'Send';
    this.sendButton.classList.add('main-page-button');
    this.sendButton.disabled = true;
    this.messagesInputContainer.appendChild(this.sendButton);
    this.sendButton.addEventListener('click', () => {
      // console.log(this.friendData.login);
      // console.log(this.messageText);
      this.messageText = this.messageInput.value;
      if (this.friendData.login && this.messageText) {
        this.sendMessage(this.friendData.login, this.messageText);
      }
      this.messageInput.value = '';
      this.messageText = '';
      this.sendButton.disabled = true;
    });

    this.editButton = document.createElement('button');
    this.editButton.textContent = 'Save changes';
    this.editButton.classList.add('main-page-button');
    this.editButton.classList.add('hidden');
    this.editButton.addEventListener('click', () => {
      this.onEditButtonClick();
    });

    this.scrollEventHandler = (id: string) => (event) => {
      console.log('scroll');
      if (this.userScrolling) {
        this.markMessagesAsRead(id);
        this.userScrolling = false;
      }
    };

    this.messagesInputContainer.appendChild(this.editButton);

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

    this.createReconnectingModal();
  }

  public show(): void {
    this.mainContainer.style.display = 'flex';
    this.renderChat(this.userData);
  }

  public hide(): void {
    this.mainContainer.style.display = 'none';
  }

  public renderChat(userData: IUser) {
    let users: IUser[] = [];

    if (this.socket) {
      this.socket.addEventListener('open', (event) => {
        this.socket.send(
          JSON.stringify({
            id: Date.now().toString(),
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
            id: 'GET_USERS',
            type: 'USER_ACTIVE',
            payload: null,
          })
        );
        this.socket.send(
          JSON.stringify({
            id: 'GET_USERS',
            type: 'USER_INACTIVE',
            payload: null,
          })
        );
      });

      this.socket.onclose = () => {
        this.showReconnectingModal();
        console.log('Соединение с сервером потеряно. Пытаюсь восстановить...');
        this.reconnect();
      };

      this.socket.addEventListener('message', (event) => {
        // console.log('Message from server ', event.data);

        const message = JSON.parse(event.data);
        console.log('Message from server ', message.type);

        if (message.type === 'USER_LOGIN') {
          sessionStorage.setItem('login', this.userData.login);
          sessionStorage.setItem('password', this.userData.password);
        }

        if (message.type === 'USER_LOGOUT') {
          sessionStorage.removeItem('login');
          sessionStorage.removeItem('password');
        }

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
        //
        if (message.type === 'ERROR' && message.payload.error === 'incorrect password') {
          console.log(message.payload.error);

          history.pushState(null, '', '/login');
          this.hide();
          const login = new LoginForm();
          login.showWrongPasswordModal();
          return;
        }

        if (message.type === 'ERROR' && message.payload.error === 'a user with this login is already authorized') {
          console.log(message.payload.error);

          history.pushState(null, '', '/login');
          this.hide();
          const login = new LoginForm();
          login.showAlreadyAuthorizedModal();
          return;
        }

        if (
          message.type === 'USER_EXTERNAL_LOGOUT' ||
          message.type === 'USER_EXTERNAL_LOGIN' ||
          message.type === 'MSG_SEND'
        ) {
          users = [];
          this.socket.send(
            JSON.stringify({
              id: 'GET_USERS',
              type: 'USER_ACTIVE',
              payload: null,
            })
          );
          this.socket.send(
            JSON.stringify({
              id: 'GET_USERS',
              type: 'USER_INACTIVE',
              payload: null,
            })
          );
        }
        if (
          (message.type === 'MSG_SEND' ||
            message.type === 'MSG_READ' ||
            message.type === 'MSG_DELETE' ||
            message.type === 'MSG_EDIT') &&
          this.friendData.login
        ) {
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

        const newMessagesFromUser = this.newMessages.filter((newMessage) => newMessage.from === user.login);
        console.log(this.newMessages);
        newMessagesinUsersList.innerHTML = `${newMessagesFromUser.length}`;

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
    if (messages.length === 0) {
      this.messagesContainer.classList.add('messagesContainerEmpty');
      this.messagesContainer.innerHTML = 'Type tour first message...';
    }
    let timeOfUnread = Date.now();

    messages.sort((a, b) => {
      return b.datetime - a.datetime;
    });
    let areThereNewMessages = false;
    let firstReadMessage = false;
    // let isLineDrawn = false;

    messages.forEach((message) => {
      if (message.to === this.userData.login && message.status.isReaded === false) {
        areThereNewMessages = true;
        let clickListenerAdded = false;
        console.log(`this is the new message ${message.datetime}`);
        if (!clickListenerAdded) {
          this.messagesContainer.addEventListener('click', () => this.markMessagesAsRead(message.id));
          this.sendButton.addEventListener('click', () => this.markMessagesAsRead(message.id));
          this.messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !this.sendButton.disabled) {
              this.markMessagesAsRead(message.id);
            }
          });
          clickListenerAdded = true;
        }

        this.messagesContainer.addEventListener('scroll', () => {
          console.log(this.userScrolling);
          if (!this.userScrolling) {
            // Проверяем состояние флага
            console.log('user scroll');
            this.userScrolling = true;
            this.markMessagesAsRead(message.id);
          }
        });
      }

      if (
        areThereNewMessages === true &&
        (message.status.isReaded === true || message.from === this.userData.login) &&
        !firstReadMessage
      ) {
        console.log(`this is the firstReadMsg ${message.datetime}`);
        console.log('the case');
        firstReadMessage = true;
        const unreadDivider = document.createElement('div');
        unreadDivider.classList.add('unread-divider');
        unreadDivider.textContent = 'New Messages';
        this.messagesContainer.appendChild(unreadDivider);
      }
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('messageContainer');

      this.messagesContainer.appendChild(messageContainer);

      messageContainer.addEventListener('contextmenu', (e: MouseEvent) => {
        if (message.from === this.userData.login) {
          e.preventDefault();
          console.log(document.getElementsByClassName('context-menu'));
          const existingContextMenus = document.getElementsByClassName('context-menu');
          Array.from(existingContextMenus).forEach((menu) => menu.remove());
          this.renderMessageContextMenu(message.id, message.text, e.pageX, e.pageY);
        }
      });

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
      if (from.innerHTML === 'you') {
        deliveredOrRead.innerHTML = 'sent';
        if (message.status.isDelivered) {
          deliveredOrRead.innerHTML = 'delivered';
        }
        if (message.status.isReaded) {
          deliveredOrRead.innerHTML = 'read';
        }
      }
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.sendButton.disabled === false && !this.sendButton.classList.contains('hidden')) {
      this.messageText = this.messageInput.value;
      if (this.friendData.login && this.messageText) {
        this.sendMessage(this.friendData.login, this.messageText);
      }
      this.messageInput.value = '';
      this.messageText = '';
      this.sendButton.disabled = true;
    }
  }

  private renderMessageContextMenu(messageId: string, messageText: string, mouseX: number, mouseY: number) {
    const contextMenuContainer = document.createElement('div');
    contextMenuContainer.classList.add('context-menu');

    contextMenuContainer.style.left = mouseX + 'px';
    contextMenuContainer.style.top = mouseY + 'px';

    const editOption = document.createElement('div');
    editOption.textContent = 'Изменить';
    editOption.classList.add('context-menu-option');
    editOption.addEventListener('click', () => {
      this.editMessage(messageId, messageText);
      console.log(`вешаю editmessage на это сообщение: ${messageText}`);
      contextMenuContainer.remove();
    });
    contextMenuContainer.appendChild(editOption);

    const deleteOption = document.createElement('div');
    deleteOption.textContent = 'Удалить';
    deleteOption.classList.add('context-menu-option');
    deleteOption.addEventListener('click', () => {
      this.deleteMessage(messageId);
      contextMenuContainer.remove();
    });
    contextMenuContainer.appendChild(deleteOption);
    document.body.appendChild(contextMenuContainer);
    document.addEventListener('click', (e) => {
      if (!contextMenuContainer.contains(e.target as Node)) {
        contextMenuContainer.remove();
      }
    });
  }

  private deleteMessage(messageID: string) {
    this.socket.send(
      JSON.stringify({
        id: 'MSG_DELETE',
        type: 'MSG_DELETE',
        payload: {
          message: {
            id: messageID,
          },
        },
      })
    );
  }

  private editMessage(messageID: string, messageText: string) {
    this.messageInput.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.messageInput.value = messageText;
    console.log(this.messageInput.value);
    console.log(messageText);
    this.editButton.classList.remove('hidden');
    this.sendButton.classList.add('hidden');
    this.editMessageId = messageID;
  }

  private onEditButtonClick() {
    this.messageInput.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.socket.send(
      JSON.stringify({
        id: 'MSG_EDIT',
        type: 'MSG_EDIT',
        payload: {
          message: {
            id: this.editMessageId,
            text: this.messageInput.value,
          },
        },
      })
    );
    this.messageInput.value = '';
    this.editMessageId = '';
    this.editButton.classList.add('hidden');
    this.sendButton.classList.remove('hidden');
    this.messageInput.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private saveCredentialsToSessionStorage(login: string, password: string): void {
    sessionStorage.setItem('login', login);
    sessionStorage.setItem('password', password);
  }

  private clearCredentialsFromSessionStorage(): void {
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('password');
  }

  private markMessagesAsRead(id: string) {
    this.socket.send(
      JSON.stringify({
        id: 'MSG_READ',
        type: 'MSG_READ',
        payload: {
          message: {
            id: `${id}`,
          },
        },
      })
    );
    this.messagesContainer.removeEventListener('click', () => this.markMessagesAsRead(id));
    this.messagesContainer.removeEventListener('scroll', () => this.scrollEventHandler(id));
    this.sendButton.removeEventListener('click', () => this.markMessagesAsRead(id));
    this.messageInput.removeEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !this.sendButton.disabled) {
        this.markMessagesAsRead(id);
      }
    });
  }

  private reconnect(): void {
    setTimeout(() => {
      this.socket = new WebSocket('ws://localhost:4000');

      this.socket.onopen = () => {
        console.log('Соединение восстановлено.');
        this.hideReconnectingModal();
        this.autoReauthorize();
      };

      this.socket.onerror = (error) => {
        console.error('Ошибка восстановления соединения:', error);
      };
    }, 20000);
  }

  private autoReauthorize(): void {
    const login = sessionStorage.getItem('login');
    const password = sessionStorage.getItem('password');
    if (login && password) {
      console.log('Автоматическая повторная авторизация...');
      this.socket.send(
        JSON.stringify({
          id: 'USER_LOGIN',
          type: 'USER_LOGIN',
          payload: {
            user: {
              login: login,
              password: password,
            },
          },
        })
      );
    } else {
      console.log('Данные пользователя не найдены в sessionStorage.');
    }
  }

  private createReconnectingModal(): void {
    this.reconnectingModal = document.createElement('div');
    this.reconnectingModal.classList.add('modal');
    this.reconnectingModal.textContent = 'Reconnecting in 20 seconds...';
    document.body.appendChild(this.reconnectingModal);
    this.hideReconnectingModal();
    console.log('show recon modal');
  }

  private showReconnectingModal(): void {
    this.reconnectingModal.style.display = 'block';
  }

  private hideReconnectingModal(): void {
    this.reconnectingModal.style.display = 'none';
  }
}
