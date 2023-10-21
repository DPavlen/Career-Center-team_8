import { NavLink } from 'react-router-dom';
import './Header.scss';
import { AppBar } from '@mui/material';

function Header() {
  function checkLinkState(isActive: boolean): string {
    return isActive ? 'link link_active' : 'link';
  }

  return (
    <AppBar position="fixed" className="header" sx={{ bgcolor: 'var(--Blue)' }}>
      <nav>
        <ul className="list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => checkLinkState(isActive)}
            >
              Вакансии
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/candidates"
              className={({ isActive }) => checkLinkState(isActive)}
            >
              Кандидаты
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/callbacks"
              className={({ isActive }) => checkLinkState(isActive)}
            >
              Отклики
            </NavLink>
          </li>
        </ul>
      </nav>
    </AppBar>
  );
}

export default Header;
