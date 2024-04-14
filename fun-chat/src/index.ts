import handleRoute from './router';
import './pages/login/login.css';
console.log(window.location.pathname);

history.pushState(null, '', '/login');
// if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
//   // Перенаправляем на страницу логина (/login)
//   console.log('Redirecting to /login...');
handleRoute('/login');
// }

// Обработчик события загрузки страницы
window.addEventListener('load', () => {
  // Получаем текущий путь URL
  const pathname = window.location.pathname;
  console.log('index.ts');

  // Вызываем функцию для обработки маршрута на основе текущего пути
  // handleRoute(pathname);
});

// Обработчик события изменения URL
window.addEventListener('popstate', () => {
  // Получаем текущий путь URL
  const pathname = window.location.pathname;

  // Вызываем функцию для обработки маршрута на основе текущего пути
  // handleRoute(pathname);
});
