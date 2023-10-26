import './AppliedFilters.scss';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import React, { useCallback } from 'react';
import Icon from '@mui/material/Icon';
// import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import closeIcon from '../../assets/icons/close.svg';
// import mockFilters from '../../utils/mockData';
import { RootState } from '../../store/store';
// import { InitialState } from '../../store/vacanciesFilter/vacanciesFilter';
import { resetFilter } from '../../store/vacanciesFilter/vacanciesFilter';

type Filters = RootState['vacanciesFilter'];

interface AppliedFilter {
  filterKey: keyof Filters;
  filterValue: string;
}

function AppliedFilters() {
  const stackRef = React.useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = React.useState(false);
  const dispatch = useDispatch();
  const [stackHeight, setStackHeight] = React.useState(0);
  const [isMultipleLines, setisMultipleLines] = React.useState(false);

  const [appliedFilters, setAppliedFilters] = React.useState<AppliedFilter[]>([]);

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

  React.useEffect(() => setAppliedFilters(extractValues(filters)), [filters]);

  /* код Ростислава конец */

  const handleShowButtons = () => {
    setIsShow(!isShow);
  };
  React.useEffect(() => {
    // const stackHeight = stackRef.current?.clientHeight;
    setStackHeight(stackRef.current!.clientHeight);
  }, []);

  const btnShow = () => (
    <Button
      sx={{
        textTransform: 'none',
        height: 28,
        position: 'absolute',
        top: 0,
        right: 32,
      }}
      onClick={handleShowButtons}
    >
      Показать всё
    </Button>
  );
  const btnHide = () => (
    <Button
      sx={{ textTransform: 'none', height: 28 }}
      onClick={handleShowButtons}
    >
      Скрыть
    </Button>
  );
  const btns = () => (
    (!isShow) ? (btnShow()) : (btnHide())
  );
  React.useEffect(() => {
    if (stackHeight > 40) {
      // collapseRef.current!.style!.gridTemplateColumns = '1fr 28px';
      setisMultipleLines(true);
    } else setisMultipleLines(false);
  }, [stackHeight]);

  return (
    <Box sx={{
      position: 'relative',
      paddingRight: '32px',
      /* width: 804 */
    }}
    >
      <Collapse
        in={isShow}
        collapsedSize={34}
        // ref={collapseRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: !isShow ? '1fr 96px' : '1fr',
          // gridTemplateColumns: '1fr',
        }}
      >
        <Stack
          spacing={1.5}
          useFlexGap
          flexWrap="wrap"
          direction="row"
          ref={stackRef}
        >
          {/* Chip чекать высоту Stack */}
          {/* <Chip label={stackHeight} /> */}
          {/* {mockFilters.map((filter) => ( */}
          {appliedFilters.map((filter) => (
            <Chip
              key={`${filter.filterKey}_${filter.filterValue}`}
              label={filter.filterValue}
              deleteIcon={
              (
                <Icon className="xmark_icon" sx={{ width: '10px', height: '10px' }}>
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
                '&:hover': {
                  backgroundColor: '#EBEDF0',
                },
              }}
            />
          ))}
          {isMultipleLines ? btns() : null}
        </Stack>
        {/* {btnShow()} */}
      </Collapse>
    </Box>
  );
}

export default AppliedFilters;
