import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import './CheckboxGroupFilter.scss';

import { FormControlLabel, Checkbox } from '@mui/material';

import checkboxChecked from '../../assets/icons/checkboxChecked.svg';
import checkbox from '../../assets/icons/checkbox.svg';

import Scrollbar from '../Scrollbar/Scrollbar';
import FilterInput from '../FilterInput/FilterInput';
import Filter, { IFilterProps } from '../Filter/Filter';
import { IFilter } from '../../store/filter';

interface ICheckboxFilterProps extends Partial<IFilterProps> {
  data: string[];
  filter: keyof IFilter;
  filterValue: IFilter;
  // eslint-disable-next-line no-unused-vars
  onSetFilter: (filter: Partial<IFilter>) => void;
  title: string;
  placeholder?: string;
  withSearch?: boolean;
}

function CheckboxGroupFilter({
  data, withSearch, title, placeholder, filter, filterValue, onSetFilter, ...filterProps
}: ICheckboxFilterProps) {
  const [value, setValue] = useState<string[]>([]);

  const [search, setSearch] = useState<string>('');
  const [filtered, setFiltered] = useState<string[]>([]);

  // eslint-disable-next-line no-shadow
  const onValueChange = useCallback((name: string) => {
    if (value.some((d) => d === name)) {
      onSetFilter({
        [filter]: value.filter((d) => d !== name),
      });
      return;
    }

    onSetFilter({
      [filter]: [...value, name],
    });
  }, [value, onSetFilter, filter]);

  useEffect(() => {
    setFiltered(data.filter((d) => d.toLowerCase().includes(search.toLowerCase())));
  }, [search, data]);

  useEffect(() => {
    setValue(filterValue[filter] as string[]);
  }, [filter, filterValue]);

  return (
    <Filter text={title} {...filterProps} filter={filter}>
      { withSearch
        ? <FilterInput placeholder={placeholder} search={search} setSearch={setSearch} />
        : null}
      <Scrollbar maxHeight={withSearch ? '192px' : '240px'}>
        {filtered.map((p) => (
          <FormControlLabel
            key={uuid()}
            sx={{
              display: 'block',
              margin: 0,
              '& .MuiFormControlLabel-label': { fontSize: '16px' },
            }}
            control={(
              <Checkbox
                checked={value.some((v) => v === p)}
                onChange={() => onValueChange(p)}
                icon={<img alt="checkbox-field" src={checkbox} className="checkbox-image" />}
                checkedIcon={<img alt="checkbox-field" className="checkbox-image" src={checkboxChecked} />}
                sx={{
                  padding: 0, width: '24px', height: '24px', margin: '12px 12px 12px 24px',
                }}
              />
                  )}
            label={p}
          />
        ))}
      </Scrollbar>
    </Filter>
  );
}

CheckboxGroupFilter.defaultProps = {
  withSearch: false,
  placeholder: '',
};

export default CheckboxGroupFilter;
