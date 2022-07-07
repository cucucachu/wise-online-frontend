import * as React from 'react';
import './Card.css';

type ICard = React.FC<React.PropsWithChildren<{
  className?: string;
}>> & {
  Body: typeof CardBody
  Header: typeof CardHeader
};

const CardBody: React.FC<React.PropsWithChildren<{className?:string}>> = ({ children, className }) => {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  );
}

const CardHeader: React.FC<React.PropsWithChildren<{className?:string}>> = ({ children, className }) => {
  return (
    <div className={`card-header ${className}`}>
      {children}
    </div>
  );
}
export const Card: ICard = ({ children, className }) => {
  return (
    <div className={`shadow-card ${className}`}>
      {children}
    </div>
  );
}

Card.Body = CardBody;
Card.Header = CardHeader;
