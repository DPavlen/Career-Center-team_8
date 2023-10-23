import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import './Sidebar.scss';

import Navigation from '../Navigation/Navigation';

function Sidebar() {
  return (
    <section className="sidebar">
      <h2 className="sidebar__name">Татьяна М.</h2>
      <Navigation />
      <Button
        variant="text"
        sx={{
          justifyContent: 'flex-start',
          padding: 0,
          margin: 0,
          '& span': { margin: '0 8px 0 0' },
        }}
        startIcon={(
          <LogoutIcon
            sx={{
              color: 'var(--Black-100)',
              padding: 0,
            }}
          />
        )}
      >
        <span className="sidebar__exit">Выход</span>
      </Button>
    </section>
  );
}

export default Sidebar;
