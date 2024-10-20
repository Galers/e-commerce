import { FC } from 'react';

import ERROR_IMAGE from '/img/error/page-not-found.webp';

import styles from './errorsPage.module.scss';

export const NotFound: FC = () => (
  <div className={styles.image}>
    <img src={ERROR_IMAGE} alt="Page not found" />
  </div>
);
