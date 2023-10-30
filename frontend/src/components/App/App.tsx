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
import Vacancy from '../../pages/Vacancy/Vacancy';
import Candidates from '../../pages/Candidates/Candidates';
import Candidate from '../../pages/Candidate/Candidate';
import Favorites from '../../pages/Favorites/Favorites';
import Login from '../../pages/Login/Login';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

// import testResume from '../../utils/testResume.json';
import CreateVacancy from '../../pages/CreateVacancy/CreateVacancy';
import NotFound from '../../pages/NotFound/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function setfailedToFetch(error: { detail: string }): void {
    console.log(error);

    if (error.detail.includes('Failed to fetch')) {
      return alert('Ошибка при получении данных: Возможны проблемы с сетью или сервер может быть недоступен.');
    }

    return alert(error.detail);
  }

  function searchCandidates(): void {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getCandidates(token)
        .then((candidates) => dispatch(addCandidates({ candidates })))
        .catch((err) => setfailedToFetch(err));
    }
  }

  function logIn(username: string, password: string): void {
    mainApi.signIn(username, password)
      .then(({ auth_token }) => {
        localStorage.setItem('token', auth_token);

        mainApi.getUser(auth_token)
          .then((user) => {
            dispatch(addUser({ user }));

            setIsLoggedIn(true);

            searchCandidates();

            navigate('/', { replace: true });
          })
          .catch((err) => setfailedToFetch(err));
      })
      .catch((err) => setfailedToFetch(err));
  }

  function logOut(): void {
    const token = localStorage.getItem('token');

    setIsLoggedIn(false);

    dispatch(clearUser());
    dispatch(clearCandidates());

    if (token) {
      mainApi.logOut(token)
        .then(() => {
        })
        .catch((err) => setfailedToFetch(err));
    }

    navigate('/login', { replace: true });

    localStorage.clear();
  }

  useEffect(() => {
    // dispatch(addCandidateInfo({ candidateInfo: testResume[0] }));

    const token = localStorage.getItem('token');

    if (token) {
      const path = location.pathname;

      mainApi.getUser(token)
        .then((user) => {
          dispatch(addUser({ user }));

          setIsLoggedIn(true);

          searchCandidates();

          navigate(path, { replace: true });
        })
        .catch((err) => {
          setfailedToFetch(err);

          navigate('/login', { replace: true });
        });
    } else {
      navigate('/login', { replace: true });
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Candidate />
            </>
          )}
        />
        <Route
          path="/login"
          element={(
            <Login
              // eslint-disable-next-line react/jsx-no-bind
              logIn={logIn}
            />
          )}
        />
        <Route
          path="/create-vacancy"
          element={(
            <>
              <Sidebar onLogOut={() => logOut()} />
              <CreateVacancy />
            </>
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
