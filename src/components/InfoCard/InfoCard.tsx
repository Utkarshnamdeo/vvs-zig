import clsx from 'clsx';
import { ReactNode } from 'react';

export const InfoCard = ({
  children,
  className,
}: {
  children?: ReactNode;
  className: string;
}) => {
  return (
    <div
      className={clsx(
        className,
        'flex flex-col shadow-lg rounded-lg p-3 m-2 w-40 h-24'
      )}
    >
      {children}
    </div>
  );
};
