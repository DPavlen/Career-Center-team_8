import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import './AppliedFilters.scss';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import closeIcon from '../../assets/icons/close.svg';

import { InitialState } from '../../store/vacanciesFilter/vacanciesFilter';

import { RootState } from '../../store/store';

function AppliedFilters() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<string[] | null>(null);
  const [isOverflow, setOverflow] = useState<boolean>(false);

  const stackRef = useRef<HTMLDivElement | null>(null);

  const filters: InitialState = useSelector((state: RootState) => state.vacanciesFilter);

  function extractValues(saveFilters: InitialState): string[] | null {
    let result: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const key in saveFilters) {
      if (saveFilters[key] !== null) {
        if (typeof saveFilters[key] === 'object') {
          result = result.concat(saveFilters[key] as string[]);
        } else {
          result.push(saveFilters[key] as string);
        }
      }
    }

    if (result.length > 0) return result;

    return null;
  }

  function handleShowAllChips() {
    setIsShow(!isShow);
  }

  useEffect(() => {
    if (stackRef.current) setOverflow(stackRef.current.offsetHeight > 28);

    setAppliedFilters(extractValues(filters));
  }, [filters]);

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
            {appliedFilters !== null && appliedFilters.map((filter, index) => (
              <Chip
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                label={filter}
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
                onDelete={() => { }}
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
