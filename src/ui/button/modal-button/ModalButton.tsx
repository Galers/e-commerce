import { FC } from 'react';
import styles from './ModalButton.module.scss';

interface IProps {
  onClickAction: () => void;
  ariaLabel: string;
  text: string;
}

export const ModalButton: FC<IProps> = ({ ariaLabel, text, onClickAction }) => {
  return (
    <button
      type="button"
      onClick={onClickAction}
      className={styles.button}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
};
