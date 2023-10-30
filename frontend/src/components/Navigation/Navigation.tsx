import { NavLink } from 'react-router-dom';

import './Navigation.scss';

import Suitcase from '../../assets/icons/suitcase.svg';
import Personal from '../../assets/icons/personal info.svg';
import Lenta from '../../assets/icons/lenta.svg';

function Navigation() {
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
            <img src={Suitcase} alt="Иконка чемодана" className="navigation__icon" />
            Вакансии
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) => checkLinkState(isActive)}
          >
            <img src={Lenta} alt="Иконка ленты" className="navigation__icon" />
            Избранное
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
