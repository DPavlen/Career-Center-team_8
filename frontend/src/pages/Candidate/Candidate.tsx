// import { useParams } from 'react-router-dom';

import './Candidate.css';
import Resume from '../../components/Header/Header';

function Candidate() {
  // const { id } = useParams();

  return (
    <main>
      {/* <h1 className="title">
        Candidate
      </h1>
      <p>
        {id}
      </p> */}
      <Resume />
    </main>
  );
}

export default Candidate;
