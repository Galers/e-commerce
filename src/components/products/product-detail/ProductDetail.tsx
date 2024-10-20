import { FC, useCallback, useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { ProductsSlider } from '../products-slider/ProductsSlider';
import { ProductPrice } from '../product-prices/ProductPrice';
import { ProductSpec } from '../product-specs/ProductSpec';
import { SliderCardImages } from './slider-card-images/SliderCardImages';
import { CardDescription } from './card-description/CardDescription';
import { CardColors } from './card-colors/CardColors';
import { CardCapacity } from './card-capacity/CardCapacity';
import { Breadcrumbs } from '@ui/links/Breadcrumbs';
import { BackArrow } from '@ui/button/arrow/BackArrow';
import { ActionButtons } from '@ui/button/action-buttons/ActionButtons';
import { Loader } from '@ui/loader/Loader';

import { useProducts } from '@hooks/useProducts';
import { ROUTES } from '@utils/constants/routes';
import { getProductUrl } from '@utils/helpers/getProductUrl';

import styles from './ProductDetail.module.scss';
import { useRandomID } from '@hooks/useRandomID';

export const ProductDetail: FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { products, loading, randomProducts, productsWithDetails } =
    useProducts();

  if (!itemId) {
    return <Navigate to={ROUTES.NOTFOUND} replace />;
  }

  const selectedProduct = useMemo(() => {
    return productsWithDetails.find(item => item.id === itemId);
  }, [productsWithDetails, itemId]);

  const product = products.find(product => product.itemId === itemId);

  const randomID = useRandomID(itemId);

  const getNewItemId = useCallback(
    (
      category: string,
      capacity: string,
      color: string,
      nameSpaceId: string,
    ) => {
      const groupByNameSpaceId = productsWithDetails.filter(
        product => product.namespaceId === nameSpaceId,
      );

      const foundProduct = groupByNameSpaceId.find(
        product =>
          product.category === category &&
          product.capacity === capacity &&
          product.color === color,
      );

      return foundProduct?.id;
    },
    [productsWithDetails],
  );

  const handleChange = useCallback(
    (newCapacity?: string, newColor?: string) => {
      if (!selectedProduct) return;

      const newItemId = getNewItemId(
        selectedProduct.category,
        newCapacity || selectedProduct.capacity,
        newColor || selectedProduct.color,
        selectedProduct.namespaceId,
      );

      if (newItemId) {
        navigate(getProductUrl(selectedProduct.category, newItemId), {
          state: { itemId: newItemId },
        });
      }
    },
    [selectedProduct, navigate],
  );

  const onCapacityChange = useCallback(
    (capacity: string) => {
      handleChange(capacity, undefined);
    },
    [handleChange],
  );

  const onColorChange = useCallback(
    (color: string) => {
      handleChange(undefined, color);
    },
    [handleChange],
  );

  return (
    <>
      {loading && (
        <section className={styles.productCard}>
          <Loader />
        </section>
      )}
      {!loading && selectedProduct && (
        <section className={styles.productCard}>
          <Breadcrumbs
            text={selectedProduct.category}
            id={selectedProduct.name}
            category={selectedProduct.category}
          />
          <BackArrow />
          <div className={styles.card}>
            <h2>{selectedProduct.name}</h2>

            <div className={styles.features}>
              <SliderCardImages images={selectedProduct.images} />

              <div className={styles.wrapper}>
                <div className={styles.ids}>ID: {randomID}</div>
                <CardColors
                  colors={selectedProduct.colorsAvailable}
                  currentColor={selectedProduct.color}
                  onColorChange={onColorChange}
                />

                <hr />
                <CardCapacity
                  capacities={selectedProduct.capacityAvailable}
                  currentCapacity={selectedProduct.capacity}
                  onCapacityChange={onCapacityChange}
                />
                <hr />

                <div className={styles.price}>
                  <ProductPrice
                    price={selectedProduct.priceDiscount}
                    fullPrice={selectedProduct.priceRegular}
                    discount
                  />
                  <ActionButtons product={product} />
                </div>

                <ProductSpec
                  screen={selectedProduct.screen}
                  resolution={selectedProduct.resolution}
                  processor={selectedProduct.processor}
                  ram={selectedProduct.ram}
                />
              </div>
            </div>

            <div className={styles.overview}>
              <div className={styles.description}>
                <h3>About</h3>
                <hr />
                <CardDescription description={selectedProduct?.description} />
              </div>

              <div className={styles.techSpecs}>
                <h3>Tech specs</h3>
                <hr />
                <ProductSpec
                  screen={selectedProduct.screen}
                  resolution={selectedProduct.resolution}
                  capacity={selectedProduct.capacity}
                  processor={selectedProduct.processor}
                  ram={selectedProduct.ram}
                  camera={selectedProduct.camera}
                  zoom={selectedProduct.zoom}
                  memory={selectedProduct.capacity}
                  cell={selectedProduct.cell}
                />
              </div>
            </div>

            <ProductsSlider
              title="You may also like"
              products={randomProducts}
              discount
            />
          </div>
        </section>
      )}
    </>
  );
};
