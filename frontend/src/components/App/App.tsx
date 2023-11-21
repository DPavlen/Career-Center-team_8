import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, clearUser } from '../../store/user/user';
import { addCandidates, clearCandidates } from '../../store/foundCandidates/foundCandidates';

import './App.scss';

import mainApi from '../../utils/MainApi';

import Sidebar from '../Sidebar/Sidebar';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

import Vacancy from '../../pages/Vacancy/Vacancy';
import Candidates from '../../pages/Candidates/Candidates';
import Favorites from '../../pages/Favorites/Favorites';
import Login from '../../pages/Login/Login';
import CreateVacancy from '../../pages/CreateVacancy/CreateVacancy';
import Candidate from '../../pages/Candidate/Candidate';
import NotFound from '../../pages/NotFound/NotFound';
import SignUp from '../../pages/SignUp/SignUp';

export interface ValidationMessageList {
  email: string[],
  first_name: string[]
  last_name: string[],
  username: string[],
  password: string[],
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [
    validationMessageList,
    setValidationMessageList,
  ] = useState<ValidationMessageList | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function searchCandidates(): void {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getCandidates()
        .then((response) => dispatch(addCandidates(response)))
        .catch((err) => console.log(err));
    }
  }

  function logIn(username: string, password: string): void {
    setErrorMessage('');

    mainApi.signIn(username, password)
      .then(({ data }) => {
        localStorage.setItem('token', data.auth_token);

        mainApi.getUser()
          .then((user) => {
            dispatch(addUser({ user }));

            setIsLoggedIn(true);

            searchCandidates();

            navigate('/', { replace: true });
          })
          .catch((err) => console.log(err));
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          setErrorMessage('Неверный логин или пароль');
        } else {
          setErrorMessage('Произошла ошибка при входе в систему');
        }
      });
  }

  function signUp(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
  ) {
    setErrorMessage('');
    setValidationMessageList(null);

    mainApi.signUp(
      firstName,
      lastName,
      email,
      username,
      password,
    )
      .then(() => logIn(username, password))
      .catch(({ response }) => setValidationMessageList(response.data));
  }

  function logOut(): void {
    const token = localStorage.getItem('token');

    setIsLoggedIn(false);

    dispatch(clearUser());
    dispatch(clearCandidates());

    if (token) {
      mainApi.logOut(token)
        .catch((err) => console.log(err));
    }

    navigate('/login', { replace: true });

    localStorage.clear();
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const path = location.pathname;

      mainApi.getUser()
        .then((user) => {
          dispatch(addUser({ user }));

          setIsLoggedIn(true);

          searchCandidates();

          navigate(path, { replace: true });
        })
        .catch((err) => {
          console.log(err);

          navigate('/login', { replace: true });
        });
    } else {
      navigate('/login', { replace: true });
    }

    return undefined;
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/vacancies"
          element={(
            <>
              <Sidebar onLogOut={() => logOut()} />
              <ProtectedRouteElement
                element={<Vacancy />}
                isLoggedIn={isLoggedIn}
              />
            </>
          )}
        />
        <Route
          path="/"
          element={(
            <>
              <Sidebar onLogOut={() => logOut()} />
              <ProtectedRouteElement
                element={<Candidates />}
                isLoggedIn={isLoggedIn}
              />
            </>
          )}
        />
        <Route
          path="/favorites"
          element={(
            <>
              <Sidebar onLogOut={() => logOut()} />
              <ProtectedRouteElement
                element={<Favorites />}
                isLoggedIn={isLoggedIn}
              />
            </>
          )}
        />
        <Route
          path="/candidates/:id"
          element={(
            <>
              <Sidebar onLogOut={() => logOut()} />
              <ProtectedRouteElement
                element={<Candidate />}
                isLoggedIn={isLoggedIn}
              />
            </>
          )}
        />
        <Route
          path="/create-vacancy"
          element={(
            <>
              <Sidebar onLogOut={() => logOut()} />
              <ProtectedRouteElement
                element={<CreateVacancy />}
                isLoggedIn={isLoggedIn}
              />
            </>
          )}
        />
        <Route
          path="/login"
          element={(
            <Login
              // eslint-disable-next-line react/jsx-no-bind
              logIn={logIn}
              errorMessage={errorMessage}
            />
          )}
        />
        <Route
          path="/signup"
          element={(
            <SignUp
              // eslint-disable-next-line react/jsx-no-bind
              signUp={signUp}
              errorMessage={errorMessage}
              validationMessageList={validationMessageList}
            />
          )}
        />
        <Route
          path="*"
          element={(<NotFound />)}
        />
      </Routes>
    </div>
  );
}

export default App;
