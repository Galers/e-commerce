import { FC } from 'react';
import cn from 'classnames';

import { ColorNames } from '@utils/types/colorNames.type';
import { getColorHex } from '@utils/helpers/getColorHex';

import styles from './CardColors.module.scss';

type TProps = {
  colors?: string[];
  currentColor?: string;
  onColorChange: (color: string) => void;
};

export const CardColors: FC<TProps> = ({
  colors = [],
  currentColor,
  onColorChange,
}) => {
  return (
    <div className={styles.colors}>
      <span>Available colors</span>
      {colors.map(color => (
        <button
          key={color}
          type="button"
          className={cn(styles.circle, color === currentColor && styles.active)}
          onClick={() => onColorChange(color)}
          aria-label={`Select color ${color}`}
        >
          <span
            className={styles.rectangle}
            title={color}
            style={{ backgroundColor: `${getColorHex(color as ColorNames)}` }}
          ></span>
        </button>
      ))}
    </div>
  );
};
