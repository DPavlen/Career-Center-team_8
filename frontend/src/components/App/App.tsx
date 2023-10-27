import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, clearUser } from '../../store/user/user';
import { addCandidates, clearCandidates } from '../../store/candidates/candidates';
import { addCandidateInfo } from '../../store/candidateInfo/candidateInfo';

import './App.scss';

import mainApi from '../../utils/MainApi';

import Sidebar from '../Sidebar/Sidebar';
import Main from '../../pages/Main/Main';
import Vacancy from '../../pages/Vacancy/Vacancy';
import Candidates from '../../pages/Candidates/Candidates';
import Candidate from '../../pages/Candidate/Candidate';
import Favorites from '../../pages/Favorites/Favorites';
import Login from '../../pages/Login/Login';

import testResume from '../../utils/testResume.json';

function App() {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const dispatch = useDispatch();

  function logOut() {
    localStorage.clear();

    dispatch(clearUser());
    dispatch(clearCandidates());

    setIsLogged(false);
  }

  function searchCandidates() {
    const token = localStorage.getItem('token');

    if (token) {
      mainApi.getCandidates(token)
        .then((candidates) => dispatch(addCandidates({ candidates })));
    }
  }

  useEffect(() => {
    dispatch(addCandidateInfo({ candidateInfo: testResume[0] }));

    const token = localStorage.getItem('token');

    if (token) {
      setIsLogged(true);
      mainApi.getUser(token)
        .then((user) => {
          dispatch(addUser({ user }));
        })
        .catch((err) => console.log(err));

      searchCandidates();
    } else {
      mainApi.signIn('front_test', 'Hakaton8front')
        .then(({ auth_token }) => {
          setIsLogged(true);

          localStorage.setItem('token', auth_token);
          mainApi.getUser(auth_token)
            .then((user) => {
              dispatch(addUser({ user }));
            })
            .catch((err) => console.log(err));

          // mainApi.getCandidates(token.auth_token)
          //   .then((candidate) => console.log(candidate));
          // mainApi.getCandidateExperience(token.auth_token)
          //   .then((candidate) => console.log(candidate));
          // mainApi.getCandidateEducation(token.auth_token)
          //   .then((candidate) => console.log(candidate));
          // mainApi.logOut(token.auth_token)
          //   .then((mes) => console.log(mes));

          searchCandidates();
        })
        .catch((err) => console.log(err));
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Sidebar onLogOut={() => logOut()} />
      <Routes>
        <Route
          path="/"
          element={(<Main />)}
        />
        <Route
          path="/vacancy"
          element={(<Vacancy />)}
        />
        <Route
          path="/candidates"
          element={(<Candidates />)}
        />
        <Route
          path="/candidates/:id"
          element={(<Candidate />)}
        />
        <Route
          path="/favorites"
          element={(<Favorites />)}
        />
        <Route
          path="/login"
          element={(<Login />)}
        />
      </Routes>
    </div>
  );
}

export default App;
