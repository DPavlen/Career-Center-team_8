import './RadioGroupFilter.scss';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Filter, { IFilterProps } from '../Filter/Filter';
import radioSelect from '../../assets/icons/radiobuttonSelect.svg';
import radio from '../../assets/icons/radiobutton.svg';

interface IOption {
  id: number;
  value: string;
}

interface IRadioFilterProps extends Partial<IFilterProps> {
  value: string | null;
  data: IOption[];
  // eslint-disable-next-line no-unused-vars
  onChange(value: string | null): void;
}

function RadioGroupFilter({
  value, data, onChange, ...filterProps
}: IRadioFilterProps) {
  return (
    <Filter text="Направление" {...filterProps}>
      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {data.map((option : IOption) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            control={(
              <Radio
                icon={<img alt="radio-field" src={radio} />}
                checkedIcon={<img alt="radio-field" src={radioSelect} />}
                sx={{ padding: '12px 12px 12px 24px' }}
              />
              )}
            label={option.value}
            sx={{
              marginLeft: 0,
            }}
          />
        ))}
      </RadioGroup>
    </Filter>
  );
}

export default RadioGroupFilter;
