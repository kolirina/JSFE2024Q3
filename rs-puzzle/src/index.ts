import LoginForm from './app/loginPage/loginForm';
import { GamePage } from './app/gamePage/gamePage';
import './app/loginPage/loginPage.css';
import './app/welcomePage.css';
import './app/gamePage/gamePage.css';
import fetchRoundsData from './app/fetchData';
import { IUser, Round, GameData } from './app/interfaces';

// Загрузите данные об уровнях (roundsData)
fetchRoundsData()
  .then((gameData) => {
    // Создайте экземпляр LoginForm, передав roundsData
    const loginForm = new LoginForm([gameData]);
  })
  .catch((error) => {
    console.error('Error loading rounds data:', error);
  });

// const loginForm = new LoginForm();
