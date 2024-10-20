import { FC } from 'react';

import NOT_FOUND from '/img/error/product-not-found.webp';

import styles from './errorsPage.module.scss';

export const ProductNotFound: FC = () => (
  <div className={styles.image}>
    <img src={NOT_FOUND} alt="Product not found" />
  </div>
);
