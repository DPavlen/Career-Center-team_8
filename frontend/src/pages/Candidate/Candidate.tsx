// import { useParams } from 'react-router-dom';

import './Candidate.css';
// simport Navigation from '../../components/Navigation/Navigation';
import Resume from '../../components/Resume/Resume';

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
      {/* <Navigation /> */}
      <Resume />
    </main>
  );
}

export default Candidate;
