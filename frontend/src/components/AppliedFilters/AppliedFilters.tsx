import {
  useState, useEffect, useRef, useCallback,
} from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { v4 as uuid } from 'uuid';
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
  // alwaysShow?: boolean;
  // eslint-disable-next-line no-unused-vars
  onResetFilter: (filter: AppliedFilter) => void,
}

function AppliedFilters({ filterValue, /* alwaysShow, */ onResetFilter }: IAppliedFiltersProps) {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
  const [isOverflow, setOverflow] = useState<boolean>(false);
  const [stackHeight, setStackHeight] = useState(0);

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

  const handleShowButtons = () => {
    setIsShow(!isShow);
  };
  const buttonShowAllChips = () => (
    <Button
      sx={{
        textTransform: 'none',
        height: 28,
        position: 'absolute',
        top: 0,
        right: 42,
      }}
      onClick={handleShowButtons}
    >
      Показать всё
    </Button>
  );
  const buttonHideChips = () => (
    <Button
      sx={{ textTransform: 'none', height: 28 }}
      onClick={handleShowButtons}
    >
      Скрыть
    </Button>
  );
  /*  const buttonChips = () => (
      (!isShow) ? (buttonShowAllChips()) : (buttonHideChips())
    ); */
  useEffect(() => {
    if (stackRef.current) setOverflow(stackRef.current.offsetHeight > 35);

    setAppliedFilters(extractValues(filters));
  }, [extractValues, filters]);
  useEffect(() => {
    if (stackRef.current) setStackHeight(stackRef.current.offsetHeight);
    if (stackHeight > 35) setIsShow(true);
    if (stackHeight < 35) setIsShow(false);
  }, [stackHeight, filters]);
  if (appliedFilters.length > 0) {
    return (
      <Box sx={{
        position: 'relative',
        paddingRight: '32px',
        // width: '99%',
      }}
      >
        <Collapse
          in={isShow}
          collapsedSize={34}
          sx={{
            display: !isShow ? 'grid' : 'flex',
            gridTemplateColumns: !isShow ? '1fr 126px' : '1fr',
          }}
        >
          <Stack
            spacing={1.5}
            useFlexGap
            flexWrap="wrap"
            direction="row"
            ref={stackRef}
          >
            {appliedFilters.map((filter) => (
              <Chip
                key={uuid()}
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
            {isOverflow
              && (isShow)
              && (buttonHideChips())}
          </Stack>
          <Box>
            {isOverflow
              && (!isShow)
              && (buttonShowAllChips())}
          </Box>
        </Collapse>
      </Box>
    );
  }
}

/* AppliedFilters.defaultProps = {
  alwaysShow: false,
}; */

export default AppliedFilters;
