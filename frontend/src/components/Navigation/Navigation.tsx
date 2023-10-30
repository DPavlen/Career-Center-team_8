import { NavLink, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import './Navigation.scss';

import Suitcase from '../../assets/icons/suitcase.svg';
import SuitcaseWhite from '../../assets/icons/suitcase-white.svg';
import Personal from '../../assets/icons/personal info.svg';
import PersonalWhite from '../../assets/icons/personal-white.svg';
import Lenta from '../../assets/icons/lenta.svg';
import LentaWhite from '../../assets/icons/lenta-white.svg';

function Navigation() {
  const location = useLocation();
  function checkLinkState(isActive: boolean): string {
    return isActive ? 'navigation__link navigation__link_active' : 'navigation__link';
  }

  return (
    <nav className="navigation">
      <ul className="navigation__menu list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => checkLinkState(isActive)}
          >
            <img src={Personal} alt="Иконка человека" className="navigation__icon" />
            Кандидаты
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vacancies"
            className={({ isActive }) => checkLinkState(isActive)}
          >
            <img
              src={
                location.pathname === '/vacancies'
                  ? SuitcaseWhite
                  : Suitcase
              }
              alt="Иконка чемодана"
              className="navigation__icon"
            />
            Вакансии
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => checkLinkState(isActive)}
          >
            <img
              src={
                ((location.pathname.indexOf('/candidates') === 0) || (location.pathname === '/'))
                  ? PersonalWhite
                  : Personal
              }
              alt="Иконка человека"
              className="navigation__icon"
            />
            <span className={(location.pathname.indexOf('/candidates') === 0) ? 'text-active' : ''}>
              Кандидаты
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) => checkLinkState(isActive)}
          >
            <img
              src={
                location.pathname === '/favorites'
                  ? LentaWhite
                  : Lenta
              }
              alt="Иконка ленты"
              className="navigation__icon"
            />
            Избранное
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
