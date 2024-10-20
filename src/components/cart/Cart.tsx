import { FC, useRef } from 'react';

import CartModal from './cart-modal/CartModal';
import { CartEmpty } from './cart-empty/CartEmpty';
import { CartItem } from './cart-item/CartItem';
import { CartSummary } from './cart-summary/CartSummary';
import { BackArrow } from '@ui/button/arrow/BackArrow';

import { useCart } from '@hooks/useCart';

import styles from './Cart.module.scss';

export const Cart: FC = () => {
  const { cartItems } = useCart();
  const modalRef = useRef<HTMLDialogElement>(null);
  const hasItemsInCart = !!cartItems.length;

  const toggleModal = () => {
    if (!modalRef.current) return;
    const isOpen = modalRef.current?.hasAttribute('open');

    if (isOpen) {
      modalRef.current.close();
    } else {
      modalRef.current.showModal();
    }
  };

  return (
    <>
      {hasItemsInCart ? (
        <section className={styles.page}>
          <BackArrow />

          <h2>Cart</h2>

          <div className={styles.content}>
            <div className={styles.items}>
              {cartItems.map(item => (
                <CartItem
                  key={item.product.id}
                  item={item.product}
                  quantity={item.quantity}
                />
              ))}
            </div>

            <CartSummary toggleModal={toggleModal} />

            <CartModal ref={modalRef} toggleModal={toggleModal} />
          </div>
        </section>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};
