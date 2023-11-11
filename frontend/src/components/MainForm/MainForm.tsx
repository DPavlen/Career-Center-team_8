import { FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './MainForm.scss';

import { Button } from '@mui/material';

import Logo from '../../assets/icons/logo.svg';

interface MainFormProps {
  title: string,
  buttonName: string,
  // eslint-disable-next-line no-unused-vars
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void,
  children: ReactNode,
  isDisabled: boolean,
  errorMessage: string,
  isLogin: boolean
}

function MainForm({
  title,
  buttonName,
  onSubmit,
  children,
  isDisabled,
  errorMessage,
  isLogin,
}: MainFormProps) {
  return (
    <main className="main-form">
      <div className="main-form__container">
        <img className="main-form__logo" src={Logo} alt="Логотип приложения" />
        <h1 className="main-form__title">Яндекс.Найм</h1>
        <h2 className="main-form__account">{title}</h2>
        <form className="main-form__form" onSubmit={onSubmit}>
          {children}
          <Button
            type="submit"
            variant="contained"
            className="main-form__button"
            sx={{
              fontFamily: 'YS Text',
              height: '52px',
              marginTop: '16px',
              fontSize: '16px',
              color: 'var(--White)',
              backgroundColor: 'var(--Blue)',
              fontWeight: 500,
            }}
            fullWidth
            disabled={isDisabled}
          >
            {buttonName}
          </Button>
        </form>
        <span className="main-form__error">
          {isLogin && errorMessage}
        </span>
        {isLogin
          ? (
            <p className="main-form__description">
              Ещё не зарегистрированы?&nbsp;
              <Link
                to="/signup"
                className="main-form__link"
              >
                Регистрация
              </Link>
            </p>
          )
          : (
            <p className="main-form__description">
              Уже зарегистрированы?&nbsp;
              <Link
                to="/login"
                className="main-form__link"
              >
                Войти
              </Link>
            </p>
          )}
      </div>
    </main>
  );
}

export default MainForm;
