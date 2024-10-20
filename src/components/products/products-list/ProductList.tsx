import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ProductPrice } from '@components/products/product-prices/ProductPrice';
import { ProductSpec } from '@components/products/product-specs/ProductSpec';
import { ActionButtons } from '@ui/button/action-buttons/ActionButtons';

import { TProduct } from '@utils/types/product.type';
import { getProductUrl } from '@utils/helpers/getProductUrl';

import styles from './ProductList.module.scss';

interface TProps {
  product: TProduct;
  discount?: boolean;
}

export const ProductList: FC<TProps> = ({ product, discount }) => {
  const {
    id,
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

  const URL = getProductUrl(category, itemId);

  return (
    <article className={styles.item} key={id}>
      <Link
        to={URL}
        className={styles.product}
        title={`View details for ${name}`}
        aria-label={`View details for ${product.name}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className={styles.image}>
          <img
            src={image}
            alt={`${name} product image`}
            width={208}
            height={196}
            loading="eager"
          />
        </div>

        <div className={styles.title}>
          <h3>{name}</h3>
        </div>
      </Link>

      <ProductPrice price={price} fullPrice={fullPrice} discount={discount} />

      <hr />

      <ProductSpec screen={screen} capacity={capacity} ram={ram} />

      <ActionButtons product={product} />
    </article>
  );
};
