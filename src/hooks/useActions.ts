import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useAppDispatch } from './typedHooks';
import { getProducts } from '@store/features/product/getProductsApi';
import { getPhones } from '@store/features/phones/getPhoneApi';
import { getTablets } from '@store/features/tablets/getTabletsApi';
import { getAccessories } from '@store/features/accessories/getAccessoriesApi';
import { addFavourites } from '@store/features/favourites/favourites.slice';
import { setSortBy } from '@store/features/product/product.slice';
import {
  addCart,
  checkoutItems,
  deleteCart,
  toggleCart,
} from '@store/features/cart/cart.slice';

const rootAction = {
  getProducts,
  getPhones,
  getTablets,
  getAccessories,
  addCart,
  deleteCart,
  toggleCart,
  checkoutItems,
  addFavourites,
  setSortBy,
};

export const useAction = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
