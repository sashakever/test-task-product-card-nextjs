'use client';

import {FC} from 'react';
import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import {Price} from '@/shared/ui';
import {ColorOptions} from './ColorOptions';
import {useProductCard} from '../hooks/useProductCard';
import {MediaInfo} from './MediaInfo';

type Props = {
  className?: string;
  product: Product;
};

const ProductCard: FC<Props> = ({className, product}) => {
    console.log('product -> ', product)
  const {
    selectedVariant,
    mainImage,
    secondaryImage,
    price,
    compareAtPrice,
    variants,
    isOnSale,
    handleSelectedVariant,
  } = useProductCard(product);

  return (
    <div
      className={clsx(
        'p-2 md:px-7 md:pb-7 md:pt-5.5 flex flex-col justify-between gap-3 md:gap-4 font-roboto',
        className,
      )}>
      <MediaInfo
        handle={product.handle}
        isOnSale={isOnSale}
        mainImage={mainImage}
        secondaryImage={secondaryImage}
      />
      {variants.length ? (
        <ColorOptions
          className='-ml-0.5'
          variants={variants}
          selectedVariant={selectedVariant}
          handleSelectedVariant={handleSelectedVariant}
        />
      ) : null}
      <div className='flex flex-col gap-1.5'>
        {product.vendor ? (
          <span className='line-clamp-1 text-sm text-main-black leading-tight font-normal'>
            {product.vendor}
          </span>
        ) : null}
        <h4 className='line-clamp-1 text-base text-main-navy leading-tight font-medium m-0'>
          {product.title}
        </h4>
        <Price price={price} compareAtPrice={compareAtPrice} />
      </div>
    </div>
  );
};

export default ProductCard;
