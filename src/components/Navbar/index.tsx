import { NavLink } from 'react-router-dom';

import { routes } from '~/routes';

export default function () {
  return (
    <div className='nav'>
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                title={route.name}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {({ isActive }) => isActive ? route.activeIcon() : route.icon()}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
