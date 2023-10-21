import { Routes, Route } from 'react-router-dom';

import './App.css';

import Main from '../../pages/Main/Main';
import Vacancy from '../../pages/Vacancy/Vacancy';
import Candidates from '../../pages/Candidates/Candidates';
import Candidate from '../../pages/Candidate/Candidate';
import Callbacks from '../../pages/Callbacks/Callbacks';

function App() {
  return (
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
  );
}

export default App;
