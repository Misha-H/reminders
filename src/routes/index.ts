import { Settings, Tasks, Contacts, Timetable } from '~/pages';
import {
  Calendar,
  CalendarFill,
  Gear,
  GearFill,
  House,
  HouseFill,
  People,
  PeopleFill,
} from '~/assets/icons';

import type { ReactNode } from 'react';

interface Route {
  path: string;
  name: string;
  page: () => ReactNode;
  icon: () => ReactNode;
  activeIcon: () => ReactNode;
}

export const routes: Array<Route> = [
  { path: '/', name: 'Home', page: Tasks, icon: House, activeIcon: HouseFill },
  { path: '/timetable', name: 'Timetable', page: Timetable, icon: Calendar, activeIcon: CalendarFill },
  { path: '/contacts', name: 'Contacts', page: Contacts, icon: People, activeIcon: PeopleFill },
  { path: '/settings', name: 'Settings', page: Settings, icon: Gear, activeIcon: GearFill },
];
