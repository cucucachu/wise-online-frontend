import * as React from 'react';
import classnames from 'classnames';
import './BubbleButtonRow.css';

type BubbleButtonRowButtonProps = {
  selected?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const BubbleButtonRowButton: React.FC<React.PropsWithChildren<BubbleButtonRowButtonProps>> = (props) => {
  const { children, selected, ...rest } = props;
  return (
    <button {...rest} type='button' className={classnames('bubble-button-row-button', props.selected && 'bubble-button-row-button--selected')}>
      {props.children}
    </button>
  );
};

type IBubbleButtonRow = React.FC<React.PropsWithChildren<{}>> & {
  Button: typeof BubbleButtonRowButton;
};

export const BubbleButtonRow: IBubbleButtonRow = ({ children }) => {
  return (
    <div className='bubble-button-row'>
      {children}
    </div>
  );
};

BubbleButtonRow.Button = BubbleButtonRowButton;
