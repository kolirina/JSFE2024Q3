import LoginForm from './pages/login/login'; // Импортируем класс LoginForm из файла login.ts
// import main from './pages/main/main';
// import about from './pages/about/about';

type Routes = {
  [key: string]: () => void; // Ключи - строки, значения - функции без аргументов и возвращаемого значения
};

// Определение маршрутов
const routes: Routes = {
  login: () => {
    const loginForm = new LoginForm(); // Создаем экземпляр LoginForm и отображаем его
    console.log('creating loginform in router');
    loginForm.show();
  },
  // main: main,
  // about: about,
};

// Функция для обработки маршрутов
export default function handleRoute(pathname: string) {
  console.log(pathname);
  // Разбиваем путь на сегменты
  const segments = pathname.split('/').filter((segment) => segment !== '');

  // Получаем первый сегмент (маршрут)
  const route = segments[0];

  // Получаем оставшиеся сегменты (параметры)
  const params = segments.slice(1);

  // Если маршрут найден, вызываем соответствующий обработчик
  const routeHandler = routes[route];

  if (routeHandler) {
    console.log('if routerhandler');
    routeHandler();
  } else {
    // Если маршрут не найден, отображаем страницу 404
    renderNotFoundPage();
  }
}

// Функция для отображения страницы 404
function renderNotFoundPage() {
  console.log('404 Not Found');
}
