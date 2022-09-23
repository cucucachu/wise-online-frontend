import * as React from 'react';

type SortArrowProps = {
  direction: 'asc' | 'desc';
};

export const SortArrow: React.FC<SortArrowProps> = ({ direction }) => {
  return (
    <div className={direction === 'asc' ? 'table-sort-arrow--asc' : 'table-sort-arrow--desc'} />
  );
}
