import { FC } from 'react';

import { useAppSelector } from '@hooks/typedHooks';
import {
  selectCartTotal,
  selectTotalQuantity,
} from '@store/features/cart/cart.slice';

import { getPlural } from '@utils/helpers/getPlural';

import styles from './cartSummary.module.scss';

type TProps = {
  toggleModal: () => void;
};

export const CartSummary: FC<TProps> = ({ toggleModal }) => {
  const totalPrice = useAppSelector(selectCartTotal);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  const plural = getPlural(totalQuantity);

  return (
    <div className={styles.summary}>
      <span>${totalPrice}</span>
      <p>
        Total for {totalQuantity} {plural}
      </p>
      <div className={styles.separator}></div>
      <button type="button" onClick={toggleModal}>
        Checkout
      </button>
    </div>
  );
};
