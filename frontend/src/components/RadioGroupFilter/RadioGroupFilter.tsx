import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import './RadioGroupFilter.scss';

import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

import radioSelect from '../../assets/icons/radiobuttonSelect.svg';
import radio from '../../assets/icons/radiobutton.svg';

import { IFilter } from '../../store/filter';
import Filter, { IFilterProps } from '../Filter/Filter';

interface IRadioFilterProps extends Partial<IFilterProps> {
  data: string[];
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
    <Filter filter={filter} text="Направление*" {...filterProps}>
      <RadioGroup
        value={value}
        onChange={(e) => onSetFilter({
          [filter]: e.target.value,
        })}
      >
        {data.map((option) => (
          <FormControlLabel
            key={uuid()}
            value={option}
            control={(
              <Radio
                icon={<img alt="radio-field" src={radio} />}
                checkedIcon={<img alt="radio-field" src={radioSelect} />}
                sx={{ padding: 0, margin: '12px 12px 12px 0px', '&:hover': { backgroundColor: 'white' } }}
              />
              )}
            label={option}
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
