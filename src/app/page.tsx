import React from 'react';
import {shopifyClient} from '@/base/services';
import {HOMEPAGE_COLLECTION_QUERY} from '@/shared/graphql';
import {HomePageProducts} from '@/widgets/';

async function getData() {
  try {
    const response = await fetch(shopifyClient.getStorefrontApiUrl(), {
      body: JSON.stringify({query: HOMEPAGE_COLLECTION_QUERY}),
      headers: shopifyClient.getPrivateTokenHeaders(),
      method: 'POST',
    });
    const data = await response.json();
    return {products: data?.data?.collection?.products?.nodes || []};
  } catch (error) {
    console.log('error -> ', error);
    return {products: []};
  }
}

export default async function Home() {
  const {products} = await getData();

  return (
    <div className='w-full'>
      <HomePageProducts products={products} />
    </div>
  );
}
