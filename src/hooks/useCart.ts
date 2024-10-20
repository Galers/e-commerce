import { useAppSelector } from './typedHooks';

export const useCart = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.length;

  return { cartItems, cartCount };
};
