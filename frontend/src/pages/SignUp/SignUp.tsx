/* eslint-disable no-unused-vars */
import { FormEvent, useState } from 'react';

import './SignUp.scss';

import { TextField } from '@mui/material';

import MainForm from '../../components/MainForm/MainForm';
import { ValidationMessageList } from '../../components/App/App';

interface SignUpProps {
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
  ) => void
  errorMessage: string,
  validationMessageList: ValidationMessageList | null
}

function SignUp({ signUp, errorMessage, validationMessageList }: SignUpProps) {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (
      firstName
      && lastName
      && email
      && username
      && password) {
      signUp(
        firstName,
        lastName,
        email,
        username,
        password,
      );
    }
  }

  return (
    <MainForm
      title="Создайте аккаунт"
      buttonName="Зарегистрироваться"
      onSubmit={(evt) => onSubmit(evt)}
      isDisabled={
        !firstName
        || !lastName
        || !email
        || !username
        || !password
      }
      errorMessage={errorMessage}
      isLogin={false}
    >
      <TextField
        variant="outlined"
        type="text"
        label="Имя"
        placeholder="Анна"
        name="first-name"
        value={firstName}
        onChange={(evt) => setFirstName(evt.target.value)}
        error={validationMessageList?.first_name && true}
        helperText={validationMessageList?.first_name && validationMessageList?.first_name[0]}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          width: '49%',
        }}
        required
      />
      <TextField
        variant="outlined"
        type="text"
        label="Фамилия"
        placeholder="Иванова"
        name="last-name"
        value={lastName}
        onChange={(evt) => setLastName(evt.target.value)}
        error={validationMessageList?.last_name && true}
        helperText={validationMessageList?.last_name && validationMessageList?.last_name[0]}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          width: '49%',
        }}
        required
      />
      <TextField
        variant="outlined"
        type="email"
        label="Почта"
        placeholder="anna@exemple.ru"
        name="email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
        error={validationMessageList?.email && true}
        helperText={validationMessageList?.email && validationMessageList?.email[0]}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        required
      />
      <TextField
        variant="outlined"
        type="text"
        label="Логин"
        placeholder="annaIvanovo"
        name="username"
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
        error={validationMessageList?.username && true}
        helperText={validationMessageList?.username && validationMessageList?.username[0]}
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
        error={validationMessageList?.password && true}
        helperText={validationMessageList?.password && validationMessageList?.password[0]}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        required
      />
    </MainForm>
  );
}

export default SignUp;
