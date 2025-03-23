import {
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import {useState} from 'react';
import {ImageType} from '@/shared/types';

const useProductCard = (product: Product) => {
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | null | undefined
  >(product.selectedOrFirstAvailableVariant || product.variants.nodes[0]);

  const mainImage: ImageType =
    selectedVariant && selectedVariant.image
      ? selectedVariant.image
      : product.images.nodes[0];
  const secondaryImage: ImageType | null =
    selectedVariant &&
    selectedVariant?.metafield?.reference?.__typename === 'MediaImage' &&
    selectedVariant?.metafield?.reference?.image
      ? selectedVariant?.metafield?.reference?.image
      : null;

  const price = selectedVariant?.price || product.priceRange.minVariantPrice;
  const compareAtPrice =
    selectedVariant?.compareAtPrice ||
    product.compareAtPriceRange.minVariantPrice;

  const variants = product?.variants?.nodes || [];

  const isOnSale = !!compareAtPrice && compareAtPrice.amount > price.amount;

  const handleSelectedVariant = (variant: ProductVariant) => () => {
    setSelectedVariant(variant);
  };

  return {
    selectedVariant,
    mainImage,
    secondaryImage,
    price,
    compareAtPrice,
    variants,
    isOnSale,
    handleSelectedVariant,
  };
};

export default useProductCard;
