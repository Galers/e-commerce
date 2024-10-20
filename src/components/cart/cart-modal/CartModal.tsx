/* eslint-disable react/prop-types */
import { forwardRef } from 'react';

import { ModalButton } from '@ui/button/modal-button/ModalButton';
import { CloseIcon } from '@ui/icon/CloseIcon';

import { useAction } from '@hooks/useActions';

import styles from './CartModal.module.scss';

interface TProps {
  toggleModal: () => void;
}

const CartModal = forwardRef<HTMLDialogElement, TProps>(
  ({ toggleModal }, ref) => {
    const { checkoutItems } = useAction();

    const clickOutSide = (
      e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
    ) => {
      if (e.currentTarget === e.target) toggleModal();
    };

    return (
      <dialog className={styles.modal} ref={ref} onClick={clickOutSide}>
        <div className={styles.header}>
          <h3 className={styles.title}>Confirmation</h3>
          <button
            type="button"
            onClick={toggleModal}
            aria-label="Close modal window"
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles.text}>
          <p>Checkout is not implemented yet. Do you want to clear the Cart?</p>
        </div>
        <div className={styles.buttons}>
          <ModalButton
            text="Yes, clear it!"
            ariaLabel="Clear the Cart if the you confirms the order"
            onClickAction={() => checkoutItems()}
          />
          <ModalButton
            text="Cancel"
            ariaLabel="Keep the Cart items and close the confirmation on cancel"
            onClickAction={toggleModal}
          />
        </div>
      </dialog>
    );
  },
);

CartModal.displayName = 'CartModal';

export default CartModal;
