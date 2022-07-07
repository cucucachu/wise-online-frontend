import * as React from 'react';
import './OutlineButton.css';

export const OutlineButton: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <button className='outline-btn'>
      {children}
    </button>
  );
};
