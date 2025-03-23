import React, {FC} from 'react';
import clsx from 'clsx';
import {Product} from '@shopify/hydrogen-react/storefront-api-types';
import {ProductCard} from '@/features';

type Props = {
  products: Product[];
};

const HomePageProducts: FC<Props> = ({products}: {products: Product[]}) => {
  return (
    <div className='w-full p-5'>
      <h2>Home Page Products</h2>
      <div className={clsx('grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4')}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <br />
    </div>
  );
};

export default HomePageProducts;
