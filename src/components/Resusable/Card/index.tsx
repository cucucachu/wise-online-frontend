import * as React from 'react';
import './Card.css';

export const Card: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className='shadow'>
      {children}
    </div>
  );
}
