import { FC } from 'react';

import CART_EMPTY from '/img/cart/cart-is-empty.webp';

import styles from './CartEmpty.module.scss';

export const CartEmpty: FC = () => (
  <section className={styles.cartEmpty}>
    <img src={CART_EMPTY} alt="Cart is empty" />
  </section>
);
