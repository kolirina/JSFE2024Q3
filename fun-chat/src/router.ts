// import LoginForm from './pages/login/login';
// // import main from './pages/main/main';
// import AboutPage from './pages/about/about';

// type Routes = {
//   [key: string]: () => void;
// };

// // Определение маршрутов
// const routes: Routes = {
//   login: () => {
//     const loginForm = new LoginForm();
//     console.log('creating loginform in router');
//     loginForm.show();
//   },
//   // main: main,
//   about: () => {
//     const about = new AboutPage();
//     console.log('creating aboutpage in router');
//     about.show();
//   },
// };

// Функция для обработки маршрутов
// export default function handleRoute(pathname: string) {
//   console.log(pathname);
//   const segments = pathname.split('/').filter((segment) => segment !== '');
//   const route = segments[0];
//   console.log(route);
//   const params = segments.slice(1);
//   const routeHandler = routes[route];

//   if (routeHandler) {
//     console.log('in routerhandler');
//     routeHandler();
//   } else {
//     renderNotFoundPage();
//   }
// }

// function renderNotFoundPage() {
//   console.log('404 Not Found');
// }
