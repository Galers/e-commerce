import { TProduct } from '@utils/types/product.type';

export const getProductsSortedByYearAndStorage = (products: TProduct[]) =>
  [...products].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }

    if (b.fullPrice !== a.fullPrice) {
      return b.fullPrice - a.fullPrice;
    }

    const storageA = parseInt(a.capacity);
    const storageB = parseInt(b.capacity);
    return storageB - storageA;
  });
