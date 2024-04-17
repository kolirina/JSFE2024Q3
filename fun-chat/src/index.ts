// import handleRoute from './router';
import './pages/login/login.css';
import './pages/about/about.css';
import './pages/main/main.css';
import LoginForm from './pages/login/login';
console.log(window.location.pathname);
history.pushState(null, '', '/login');
const loginForm = new LoginForm();
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  console.log('Redirecting to /login...');

  // handleRoute('/login');
}

// Обработчик события загрузки страницы
window.addEventListener('load', () => {
  const pathname = window.location.pathname;
  console.log(window.location.pathname);

  // handleRoute(pathname);
});

window.addEventListener('popstate', () => {
  const pathname = window.location.pathname;
  // handleRoute(pathname);
});
