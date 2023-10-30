import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Sidebar.scss';

import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import Navigation from '../Navigation/Navigation';

import { RootState } from '../../store/store';

interface SidebarProps {
  onLogOut: () => void,
}

function Sidebar({ onLogOut }: SidebarProps) {
  const [name, setName] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user.user);

  function createStringName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName.slice(0, 1).toUpperCase()}.`;
  }

  useEffect(() => {
    if (user) {
      setName(createStringName(user.first_name, user.last_name));
    } else {
      setName(null);
    }
  }, [user]);

  return (
    <section className="sidebar">
      <h2 className="sidebar__name">{name && name}</h2>
      <Navigation />
      <Button
        onClick={() => onLogOut()}
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
