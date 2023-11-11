import { FormEvent, useState } from 'react';

import './Login.scss';

import { TextField } from '@mui/material';

import MainForm from '../../components/MainForm/MainForm';

interface LoginProps {
  // eslint-disable-next-line no-unused-vars
  logIn: (username: string, password: string) => void
  errorMessage: string,
}

function Login({ logIn, errorMessage }: LoginProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (username && password) logIn(username, password);
  }

  return (
    <MainForm
      title="Войдите в аккаунт"
      buttonName="Войти"
      onSubmit={(evt) => onSubmit(evt)}
      isDisabled={!username || !password}
      errorMessage={errorMessage}
      isLogin
    >
      <TextField
        variant="outlined"
        type="text"
        label="Логин"
        name="username"
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        required
      />
      <TextField
        variant="outlined"
        type="password"
        label="Пароль"
        name="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        required
      />
    </MainForm>
  );
}

export default Login;
