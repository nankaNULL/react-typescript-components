import Home from '@/pages/home';
import MainLayout from '@/layout/mainLayout';
import Exception from '@/pages/exception';

export const routerConf = [
  {
    path: '/',
    redirect: '/home',
  }, {
    path: '/home',
    component: Home,
    layout: MainLayout
  }, {
    path: '*',
    component: Exception
  }
];