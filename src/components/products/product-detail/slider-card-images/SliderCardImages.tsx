import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './SliderCardImages.module.scss';

type TProps = {
  images?: string[];
};

export const SliderCardImages: FC<TProps> = ({ images = [] }) => {
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (!images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  return (
    <div className={styles.images}>
      <div className={styles.currentImage}>
        <img src={currentImage} alt="Selected image" />
      </div>
      {images.map((image, index) => (
        <button
          key={`${image}-${index}`}
          type="button"
          className={cn(
            styles.imagesList,
            currentImage === image && styles.active,
          )}
          onClick={() => setCurrentImage(image)}
          aria-label={`Select image ${index + 1}`}
        >
          <img
            src={image}
            alt={`Image ${index + 1}`}
            width={80}
            height={80}
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
};
