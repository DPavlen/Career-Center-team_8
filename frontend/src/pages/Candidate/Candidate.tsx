import './Candidate.css';

import CandidateHeader from '../../components/CandidateHeader/CandidateHeader';
import CandidateInfo from '../../components/CandidateInfo/CandidateInfo';
import Education from '../../components/EducationUnit/EducationUnit';
import Experience from '../../components/Experience/Experience';

// const candidate = useSelector((state: RootState) => state.candidateInfo.candidateInfo);

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
