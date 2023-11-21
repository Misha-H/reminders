import { Home, Settings, Events } from '~/pages';

export const routes = [
  { path: '/', name: 'Home', page: Home },
  { path: '/events', name: 'Events', page: Events },
  { path: '/settings', name: 'Settings', page: Settings },
];
