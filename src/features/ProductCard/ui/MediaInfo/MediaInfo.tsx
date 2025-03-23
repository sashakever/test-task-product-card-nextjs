import {FC} from 'react';
import {ImageType} from '@/shared/types';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  handle: string;
  isOnSale: boolean;
  mainImage: ImageType;
  secondaryImage?: ImageType | null;
};

const MediaInfo: FC<Props> = ({
  handle,
  isOnSale,
  mainImage,
  secondaryImage,
}) => {
  return (
    <Link
      className='relative group block aspect-[0.92] border border-main-grey rounded-[10px] overflow-hidden'
      href={`/products/${handle}`}>
      {isOnSale ? (
        <div
          className={clsx(
            'absolute top-2 left-2 h-6 md:top-5 md:left-5 md:h-7.5 z-10 backdrop-blur-lg',
            'px-2 md:px-4 flex items-center rounded-full border border-main-red',
          )}>
          <span className='hidden md:inline text-base text-main-red font-medium'>
            On Sale!
          </span>
          <span className='md:hidden text-xs text-main-red font-medium'>
            Sale
          </span>
        </div>
      ) : null}
      <Image
        className={clsx(
          'absolute top-0 left-0 size-full object-contain z-0',
          'transition-opacity duration-300 ease-in-out',
          {'group-hover:opacity-0': !!secondaryImage},
        )}
        fill
        src={mainImage.url}
        alt={mainImage.altText || 'Image text'}
      />
      {secondaryImage ? (
        <Image
          className={clsx(
            'absolute top-0 left-0 size-full object-contain opacity-0 group-hover:opacity-100',
            'transition-opacity duration-300 ease-in-out z-0',
          )}
          fill
          src={secondaryImage.url}
          alt={secondaryImage.altText || 'Image text'}
        />
      ) : null}
    </Link>
  );
};

export default MediaInfo;
