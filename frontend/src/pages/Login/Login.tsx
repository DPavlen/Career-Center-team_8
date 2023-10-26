import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import background from '../../assets/icons/background.svg';
import './login.scss';

type TForm = {
  login: string;
  password: string;
}

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: TForm) => console.log(data);
  // console.log(errors);

  return (
    <main className="background_container">
      <img src={background} alt="фон страницы" />
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Яндекс.Найм</h2>
          <h4>Войдите в аккаунт</h4>
          <input type="text" placeholder="Логин" {...register('Email', { required: true, pattern: /^\S+@\S+$/i })} />
          <input type="password" className="input_password" placeholder="Пароль" {...register('password', { max: 20, min: 6 })} />
          <Button type="submit" variant="contained" className="submit-button">Войти</Button>
        </form>
      </div>
    </main>
  );
}

export default Login;
