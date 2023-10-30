import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

import { Button } from '@mui/material';

import Logo from '../../assets/icons/logo.svg';

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <img className="not-found__logo" src={Logo} alt="логотип приложения" />
      <h1 className="not-found__title">Яндекс.Найм</h1>
      <p className="not-found__message">Такая страница не найдена</p>
      <Button
        type="button"
        variant="contained"
        onClick={() => navigate('/', { replace: true })}
        sx={{
          height: '52px',
          color: 'var(--White)',
          padding: '16px 92px',
          borderRadius: 0,
          backgroundColor: 'var(--Blue)',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        Вернуться на главную
      </Button>
    </main>
  );
}

export default NotFound;
