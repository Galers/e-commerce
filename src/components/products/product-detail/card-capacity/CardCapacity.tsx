import { FC } from 'react';
import cn from 'classnames';

import styles from './CardCapacity.module.scss';

type TProps = {
  capacities?: string[];
  currentCapacity?: string;
  onCapacityChange: (capacity: string) => void;
};

export const CardCapacity: FC<TProps> = ({
  capacities = [],
  currentCapacity,
  onCapacityChange,
}) => {
  return (
    <div className={styles.capacity}>
      <span>Select capacity</span>
      {capacities.map(capacity => (
        <button
          key={capacity}
          type="button"
          onClick={() => onCapacityChange(capacity)}
          className={cn(
            styles.rectangle,
            capacity === currentCapacity && styles.active,
          )}
          aria-label={`Select capacity ${capacity}`}
          title={capacity}
        >
          {capacity}
        </button>
      ))}
    </div>
  );
};
