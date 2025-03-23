import {FC} from 'react';
import {MoneyV2} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import {useMoney} from '@shopify/hydrogen-react';

type Props = {
  className?: string;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
};

const Price: FC<Props> = ({className, price, compareAtPrice}) => {
  const {currencySymbol} = useMoney(price);
  const shouldShowCompareAtPrice =
    !!compareAtPrice && compareAtPrice.amount > price.amount;

  return (
    <div className={clsx('flex gap-2 text-sm leading-tight', className)}>
      {shouldShowCompareAtPrice ? (
        <span className='line-through'>
          {currencySymbol} {compareAtPrice?.amount}
        </span>
      ) : null}
      <span className={clsx({'text-main-red': shouldShowCompareAtPrice})}>
        {currencySymbol} {price.amount}
      </span>
    </div>
  );
};

export default Price;
