import { FC, memo } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import styles from './icon.module.scss';

type TProps = {
  isOpen: boolean;
};

const HeartIconComponent: FC<TProps> = ({ isOpen }) => {
  return isOpen ? <FaHeart className={styles.fill} /> : <FaRegHeart />;
};

export const HeartIcon = memo(HeartIconComponent);
