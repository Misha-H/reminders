import { Home, Settings, Events, Contacts, Timetable } from '~/pages';
import {
  Calendar,
  CalendarFill,
  ClipboardPlus,
  ClipboardPlusFill,
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
  { path: '/', name: 'Home', page: Home, icon: House, activeIcon: HouseFill },
  { path: '/events', name: 'Events', page: Events, icon: ClipboardPlus, activeIcon: ClipboardPlusFill },
  { path: '/timetable', name: 'Timetable', page: Timetable, icon: Calendar, activeIcon: CalendarFill },
  { path: '/contacts', name: 'Contacts', page: Contacts, icon: People, activeIcon: PeopleFill },
  { path: '/settings', name: 'Settings', page: Settings, icon: Gear, activeIcon: GearFill },
];
