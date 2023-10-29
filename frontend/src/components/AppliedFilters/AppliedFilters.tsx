import {
  useState, useEffect, useRef, useCallback,
} from 'react';

import './AppliedFilters.scss';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import closeIcon from '../../assets/icons/close.svg';

import { initialState } from '../../store/vacanciesFilter/vacanciesFilter';
import { IFilter } from '../../store/filter';

interface AppliedFilter {
  key: keyof IFilter;
  value: string;
}

interface IAppliedFiltersProps {
  filterValue: IFilter,
  alwaysShow?: boolean;
  // eslint-disable-next-line no-unused-vars
  onResetFilter: (filter: AppliedFilter) => void,
}

function AppliedFilters({ filterValue, alwaysShow, onResetFilter }: IAppliedFiltersProps) {
  const [isShow, setIsShow] = useState<boolean>(!!alwaysShow);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
  const [isOverflow, setOverflow] = useState<boolean>(false);

  const stackRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState<IFilter>(initialState);
  useEffect(() => {
    setFilters(filterValue);
  }, [filterValue]);

  const extractValues = useCallback((savedFilters: IFilter): AppliedFilter[] => {
    let result: AppliedFilter[] = [];

    Object.entries(savedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        result = [...result, ...value.map((v): AppliedFilter => ({
          key: key as keyof IFilter,
          value: v,
        }))];

        return;
      }

      if (value) {
        result.push({
          key: key as keyof IFilter,
          value,
        });
      }
    });

    return result;
  }, []);

  function handleShowAllChips() {
    setIsShow(!isShow);
  }

  useEffect(() => {
    if (stackRef.current) setOverflow(stackRef.current.offsetHeight > 28);

    setAppliedFilters(extractValues(filters));
  }, [extractValues, filters]);

  if (appliedFilters.length > 0) {
    return (
      <Box sx={{ position: 'relative', width: '99%' }}>
        <Collapse
          in={isShow}
          collapsedSize={34}
        >
          <Stack
            spacing={1.5}
            useFlexGap
            flexWrap="wrap"
            direction="row"
            ref={stackRef}
            sx={{
              width: '90%',
            }}
          >
            {appliedFilters.map((filter) => (
              <Chip
                key={`${filter.key}_${filter.value}`}
                label={filter.value}
                deleteIcon={
                  (
                    <Icon
                      sx={{
                        width: '10px',
                        height: '10px',
                        cursor: 'pointer',
                        margin: 0,
                        '& img': {
                          margin: 0,
                        },
                      }}
                    >
                      <img src={closeIcon} alt="delete svg" />
                    </Icon>
                  )
                }
                onDelete={
                  () => onResetFilter({ key: filter.key, value: filter.value })
                }
                sx={{
                  height: '28px',
                  lineHeight: 1.2,
                  backgroundColor: '#DDE0E4',
                  display: 'flex',
                  margin: 0,
                  '&:hover': {
                    backgroundColor: '#EBEDF0',
                  },
                }}
              />
            ))}
            {isOverflow && !alwaysShow
              && (
                !isShow
                  ? (
                    <Button
                      sx={{
                        textTransform: 'none',
                        height: 28,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}
                      onClick={() => handleShowAllChips()}
                    >
                      Показать всё
                    </Button>
                  )
                  : (
                    <Button
                      sx={{ textTransform: 'none', height: 28 }}
                      onClick={() => handleShowAllChips()}
                    >
                      Скрыть
                    </Button>
                  )
              )}
          </Stack>
        </Collapse>
      </Box>
    );
  }
}

AppliedFilters.defaultProps = {
  alwaysShow: false,
};

export default AppliedFilters;
