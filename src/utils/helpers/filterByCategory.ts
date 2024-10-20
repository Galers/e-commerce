import { TProduct } from 'utils/types/product.type';

export const filterByCategory = (products: TProduct[], text: string) => {
  if (!text) return products;
  return products.filter(product => product.category === text);
};
