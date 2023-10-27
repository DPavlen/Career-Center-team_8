import React, { useEffect, useRef, useState } from 'react';
import './VacancyInput.scss';

interface VacancyInputProps {
  // eslint-disable-next-line react/require-default-props
  placeholder?: string,
}

function VacancyInput({ placeholder } : VacancyInputProps) {
  const MIN_TEXTAREA_HEIGHT = 47;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<string>('');
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT,
      )}px`;
    }
  }, [value]);

  return (
    <textarea
      rows={1}
      className="vacancy-input"
      wrap="hard"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      ref={textareaRef}
      style={{
        minHeight: MIN_TEXTAREA_HEIGHT,
        resize: 'none',
      }}
    />
  );
}

export default VacancyInput;
