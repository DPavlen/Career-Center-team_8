import React, { useEffect, useRef } from 'react';
import './VacancyInput.scss';

interface VacancyInputProps {
  // eslint-disable-next-line react/require-default-props
  placeholder?: string,
  value: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | number) => void;
  errorMessage: string;
}

function VacancyInput({
  value, onChange, placeholder, errorMessage,
} : VacancyInputProps) {
  const MIN_TEXTAREA_HEIGHT = 47;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // eslint-disable-next-line max-len
  const onTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value);

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT,
      )}px`;
    }
  }, [value]);

  return (
    <>
      <textarea
        rows={1}
        className="vacancy-input"
        wrap="hard"
        placeholder={placeholder}
        onChange={onTextareaChange}
        value={value}
        ref={textareaRef}
        style={{
          minHeight: MIN_TEXTAREA_HEIGHT,
          resize: 'none',
        }}
      />
      <p className="vacancy-input__input-error">{errorMessage}</p>
    </>
  );
}

export default VacancyInput;
