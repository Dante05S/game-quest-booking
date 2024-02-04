import { type IconType } from 'react-icons';
import { FaCalendarCheck } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';

export interface NavItems {
  key: number;
  icon: IconType;
  title: string;
  href: string;
}

const navItemsUser: NavItems[] = [
  {
    key: 2,
    icon: FaCalendarCheck,
    title: 'Mis reservas',
    href: '/bookings'
  },
  {
    key: 3,
    icon: ImExit,
    title: 'Cerrar sesión',
    href: '/logout'
  }
];

export default navItemsUser;
