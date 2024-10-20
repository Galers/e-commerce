import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './NavIcon.module.scss';

type TProps = {
  text: string;
  products: number;
  ROUTE: string;
  children: ReactNode;
  closeMenu?: () => void;
};

export const NavIcon: FC<TProps> = ({
  text,
  products,
  ROUTE,
  children,
  closeMenu,
}) => {
  const hasProducts = !!products;
  const isFavorite = text === 'Favourite';

  return (
    <NavLink
      to={ROUTE}
      className={({ isActive }) =>
        cn(styles.navIcon, isActive && styles.active)
      }
      onClick={closeMenu}
      title={`Products ${text}`}
      aria-label={text}
    >
      <div className={styles.wrapper}>
        {children}
        {hasProducts && (
          <span
            className={cn(styles.count, isFavorite && styles.countFavorite)}
          >
            {products}
          </span>
        )}
      </div>
    </NavLink>
  );
};
