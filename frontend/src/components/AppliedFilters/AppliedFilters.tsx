import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AppliedFilters.scss';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import closeIcon from '../../assets/icons/close.svg';

import { RootState } from '../../store/store';
import { resetFilter } from '../../store/vacanciesFilter/vacanciesFilter';

type Filters = RootState['vacanciesFilter'];

interface AppliedFilter {
  filterKey: keyof Filters;
  filterValue: string;
}

function AppliedFilters() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
  const [isOverflow, setOverflow] = useState<boolean>(false);
  const dispatch = useDispatch();

  const stackRef = useRef<HTMLDivElement | null>(null);

  const filters: Filters = useSelector((state: RootState) => state.vacanciesFilter);

  const extractValues = useCallback((savedFilters: Filters): AppliedFilter[] => {
    let result: AppliedFilter[] = [];

    Object.entries(savedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        result = [...result, ...value.map((v): AppliedFilter => ({
          filterKey: key as keyof Filters,
          filterValue: v,
        }))];

        return;
      }

      if (value) {
        result.push({
          filterKey: key as keyof Filters,
          filterValue: value,
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

  if (appliedFilters) {
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
                key={`${filter.filterKey}_${filter.filterValue}`}
                label={filter.filterValue}
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
                  () => dispatch(resetFilter({ key: filter.filterKey, value: filter.filterValue }))
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
            {isOverflow
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

export default AppliedFilters;
