import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCandidates } from '../../store/candidates/candidates';
import { addCandidateInfo } from '../../store/candidateInfo/candidateInfo';

import './App.scss';

import Main from '../../pages/Main/Main';
import Vacancy from '../../pages/Vacancy/Vacancy';
import Candidates from '../../pages/Candidates/Candidates';
import Candidate from '../../pages/Candidate/Candidate';
import Favorites from '../../pages/Favorites/Favorites';
import Sidebar from '../Sidebar/Sidebar';

import tesData from '../../utils/testData.json';
import testResume from '../../utils/testResume.json';
import Login from '../../pages/Login/Login';
// import mainApi from '../../utils/MainApi';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCandidates({ candidates: tesData }));
    dispatch(addCandidateInfo({ candidateInfo: testResume[0] }));

    // mainApi.signIn('admin23', 'sansan1234')
    //   .then((token) => {
    //     console.log(token);
    //     mainApi.getUser(token.auth_token)
    //       .then((user) => console.log(user));
    //   })
    //   .catch((err) => console.log(err));

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Sidebar />
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
