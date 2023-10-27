import './VacancyInput.scss';

interface VacancyInputProps {
  // eslint-disable-next-line react/require-default-props
  placeholder?: string,
}

function VacancyInput({ placeholder } : VacancyInputProps) {
  return (
    <textarea
      className="vacancy-input"
      wrap="hard"
      placeholder={placeholder}
    />
  );
}

export default VacancyInput;
