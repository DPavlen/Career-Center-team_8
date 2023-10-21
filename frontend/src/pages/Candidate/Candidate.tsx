import { useParams } from 'react-router-dom';

import './Candidate.css';

function Candidate() {
  const { id } = useParams();

  return (
    <main>
      <h1 className="title">
        Candidate
      </h1>
      <p>
        {id}
      </p>
    </main>
  );
}

export default Candidate;
