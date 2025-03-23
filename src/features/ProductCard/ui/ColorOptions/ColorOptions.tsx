import {FC} from 'react';
import {ProductVariant} from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
import {COLORS} from '@/shared/constants';

type Props = {
  className?: string;
  selectedVariant?: ProductVariant | null;
  variants: ProductVariant[];
  handleSelectedVariant: (variant: ProductVariant) => () => void;
};

const ColorOptions: FC<Props> = ({
  className,
  selectedVariant,
  variants,
  handleSelectedVariant,
}) => {
  const colorsOptions = variants
    .map((variant) => {
      const colorKey = variant.selectedOptions
        .find((option) => option.name.toLowerCase() === 'color')
        ?.value.toLowerCase();

      return {
        id: variant.id,
        color:
          COLORS.find((colorItem) => colorItem.name.toLowerCase() === colorKey)
            ?.hex || '',
        variant,
      };
    })
    .filter((item) => !!item.color);

  return (
    <ul
      className={clsx(
        'h-9 md:h-auto flex gap-1 overflow-x-auto overflow-y-hidden',
        className,
      )}>
      {colorsOptions.map((colorOption) => (
        <li
          key={colorOption.id}
          className={clsx('size-8.5 md:size-6 border rounded-full', {
            'border-main-navy': selectedVariant?.id === colorOption.variant.id,
            'border-transparent':
              selectedVariant?.id !== colorOption.variant.id,
          })}>
          <button
            className={clsx(
              'size-8 md:size-5.5 rounded-full border border-white cursor-pointer',
            )}
            style={{backgroundColor: colorOption.color}}
            onClick={handleSelectedVariant(colorOption.variant)}></button>
        </li>
      ))}
    </ul>
  );
};

export default ColorOptions;
