import * as React from 'react';
import classnames from 'classnames';
import './DangerUnderlineButton.css';

type DangerUnderlineButtonProps = React.PropsWithChildren<{
  onClick(): void;
  className?: string;
}>;

export const DangerUnderlineButton: React.FC<DangerUnderlineButtonProps> = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={classnames('danger-underline-btn', className)}>
      {children}
    </button>
  )
};
