import './RadioGroupFilter.scss';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useEffect, useState } from 'react';
import Filter, { IFilterProps } from '../Filter/Filter';
import radioSelect from '../../assets/icons/radiobuttonSelect.svg';
import radio from '../../assets/icons/radiobutton.svg';
import { IFilter } from '../../store/filter';

interface IOption {
  id: number;
  value: string;
}

interface IRadioFilterProps extends Partial<IFilterProps> {
  data: IOption[];
  filter: keyof IFilter;
  filterValue: IFilter;
  // eslint-disable-next-line no-unused-vars
  onSetFilter: (filter: Partial<IFilter>) => void;
}

function RadioGroupFilter({
  filter, filterValue, onSetFilter, data, ...filterProps
}: IRadioFilterProps) {
  const [value, setValue] = useState<IFilter[keyof IFilter]>(null);
  useEffect(() => {
    setValue(filterValue[filter]);
  }, [filter, filterValue]);

  return (
    <Filter filter={filter} text="Направление" {...filterProps}>
      <RadioGroup
        value={value}
        onChange={(e) => onSetFilter({
          [filter]: e.target.value,
        })}
      >
        {data.map((option : IOption) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            control={(
              <Radio
                icon={<img alt="radio-field" src={radio} />}
                checkedIcon={<img alt="radio-field" src={radioSelect} />}
                sx={{ padding: 0, margin: '12px 12px 12px 24px', '&:hover': { backgroundColor: 'white' } }}
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
