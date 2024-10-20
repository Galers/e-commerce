import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { HeartIcon } from '@ui/icon/HeartIcon';

import { useAction } from '@hooks/useActions';
import { useFavourites } from '@hooks/useFavourites';
import { useCart } from '@hooks/useCart';
import { ariaLabelText } from '@utils/helpers/ariaLabelTextToButton';
import { TProduct } from '@utils/types/product.type';

import styles from './ActionButtons.module.scss';

type TProps = {
  product?: TProduct;
};

enum CHOICE {
  cart = 'cart',
  favourites = 'favourites',
}

const ADD_TO = {
  cart: CHOICE.cart,
  favourites: CHOICE.favourites,
};

export const ActionButtons: FC<TProps> = ({ product }) => {
  const { itemId } = useParams();
  const { cartItems } = useCart();
  const { favouritesItems } = useFavourites();

  const { addCart, addFavourites } = useAction();

  useEffect(() => {
    const isInCart = cartItems.some(
      item => item.product && item.product.id === product?.id,
    );
    const isInFavourites = favouritesItems.some(
      item => item.id === product?.id,
    );

    setIsAdded({
      cart: isInCart,
      favourites: isInFavourites,
    });
  }, [itemId, cartItems, favouritesItems, product?.id]);

  const [text, setText] = useState('Added');
  const [isAdded, setIsAdded] = useState({
    cart: false,
    favourites: false,
  });

  const onMouseEnter = () => {
    setText('Remove');
  };

  const onMouseLeave = () => {
    setText('Added');
  };

  const handleStatus = (type: CHOICE, item: TProduct | undefined) => {
    if (!item) return;

    if (type === ADD_TO.cart) addCart(item);
    if (type === ADD_TO.favourites) addFavourites(item);

    setIsAdded(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className={styles.buttons}>
      <button
        className={cn(!isAdded.cart ? styles.add : styles.added)}
        onClick={() => handleStatus(ADD_TO.cart, product)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type="button"
        aria-label={ariaLabelText(isAdded.cart, ADD_TO.cart)}
      >
        {!isAdded.cart ? 'Add to cart' : text}
      </button>

      <button
        className={styles.favourites}
        onClick={() => handleStatus(ADD_TO.favourites, product)}
        type="button"
        aria-label={ariaLabelText(isAdded.favourites, ADD_TO.favourites)}
      >
        <HeartIcon isOpen={isAdded.favourites} />
      </button>
    </div>
  );
};
