import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useAppSelector } from './typedHooks';
import {
  getMostExpensiveProduct,
  getProductWithLargestDiscount,
} from '@utils/helpers/sortedByPrice';
import { selectAllProducts } from '@store/selectors';
import { getProductsSortedByYearAndStorage } from '@utils/helpers/getProductByYear';

export const useProducts = () => {
  const { products, loading } = useAppSelector(state => state.products);

  const filteredByQuery = (query: string) =>
    products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );

  const productsWithDetails = useSelector(selectAllProducts);

  const expensiveProduct = useMemo(
    () => getMostExpensiveProduct(products),
    [products],
  );
  const productWithDiscount = useMemo(
    () => getProductWithLargestDiscount(products),
    [products],
  );
  const newModels = useMemo(
    () => getProductsSortedByYearAndStorage(products),
    [products],
  );

  const randomProducts = [...products].sort(() => Math.random() - 0.5);

  return {
    products,
    loading,
    filteredByQuery,
    newModels,
    expensiveProduct,
    productWithDiscount,
    productsWithDetails,
    randomProducts,
  };
};
