import { SubmitHandler, useForm } from 'react-hook-form';

import './login.scss';

import { Button } from '@mui/material';

type TForm = {
  username: string;
  password: string;
}

interface LoginProps {
  // eslint-disable-next-line no-unused-vars
  logIn: (username: string, password: string) => void
}

function Login({ logIn }: LoginProps) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { register, handleSubmit, formState: { errors } } = useForm<TForm>();

  const onSubmit: SubmitHandler<TForm> = ({ username, password }) => {
    logIn(username, password);
  };

  return (
    <main className="login">
      <div className="login__container">
        <h1 className="login__title">Яндекс.Найм</h1>
        <h2 className="login__account">Войдите в аккаунт</h2>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Логин"
            className="login__input"
            {...register('username', { required: true })}
          />
          <input
            type="password"
            className="login__input"
            placeholder="Пароль"
            {...register('password', { required: true, max: 20, min: 6 })}
          />
          <Button
            type="submit"
            variant="contained"
            className="login__button"
            sx={{
              height: '52px',
              marginTop: '16px',
            }}
          >
            Войти
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Login;
