import './Scrollbar.scss';
import * as React from 'react';

interface IScrollbar {
  maxHeight: React.CSSProperties['maxHeight'];
  children: React.ReactNode
}

function Scrollbar({
  maxHeight, children,
}: IScrollbar) {
  return (
    <div className="scrollbar" style={{ maxHeight }}>
      {children}
    </div>
  );
}

export default Scrollbar;
