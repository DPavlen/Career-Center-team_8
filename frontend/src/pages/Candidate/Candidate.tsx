import './Candidate.scss';

import CandidateHeader from '../../components/CandidateHeader/CandidateHeader';
import CandidateInfo from '../../components/CandidateInfo/CandidateInfo';
import Education from '../../components/EducationUnit/EducationUnit';
import Experience from '../../components/Experience/Experience';

function Candidate() {
  return (
    <main className="candidate">
      <CandidateHeader />
      <CandidateInfo />
      <Education />
      <Experience />
    </main>
  );
}

export default Candidate;
