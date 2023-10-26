import CandidateInfo from '../CandidateInfo/CandidateInfo';
import Education from '../EducationUnit/EducationUnit';
import './Resume.scss';

function Resume() {
  return (
    <main className="candidate">
      <CandidateInfo />
      <Education />
    </main>
  );
}

export default Resume;
