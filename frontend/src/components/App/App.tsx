import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCandidates } from '../../store/candidates/candidates';

import './App.scss';

import Main from '../../pages/Main/Main';
import Vacancy from '../../pages/Vacancy/Vacancy';
import Candidates from '../../pages/Candidates/Candidates';
import Candidate from '../../pages/Candidate/Candidate';
import Callbacks from '../../pages/Callbacks/Callbacks';
import Header from '../Header/Header';

import tesData from '../../utils/testData.json';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCandidates({ candidates: tesData }));

    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Header />
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
          path="/callbacks"
          element={(<Callbacks />)}
        />
      </Routes>
    </div>
  );
}

export default App;
