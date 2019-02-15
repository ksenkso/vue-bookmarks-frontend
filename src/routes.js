import LoginPage from './components/LoginPage';
import IndexPage from './components/IndexPage';
import CreatePage from './components/CreatePage';
import EditPage from './components/EditPage';
import NotFoundPage from './components/NotFoundPage';

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/create',
    component: CreatePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:id',
    component: EditPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/not-found',
    component: NotFoundPage
  }
];
export default routes;
