import * as React from 'react';
import './Card.css';

type CardProps = {
  className?: string;
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ children, className }) => {
  return (
    <div className={`shadow-card ${className}`}>
      {children}
    </div>
  );
}
