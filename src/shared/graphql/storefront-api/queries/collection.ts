export const HOMEPAGE_COLLECTION_QUERY = `#graphql
fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
}

fragment ImageFragment on Image {
    altText
    id
    url
    height
    width
}

fragment VariantFragment on ProductVariant {
    id
    availableForSale
    title
    price {
        ...MoneyFragment
    }
    compareAtPrice {
        ...MoneyFragment
    }
    image {
        ...ImageFragment
    }
    selectedOptions {
        name
        value
    }
    metafield(key: "secondary_image", namespace: "custom") {
        reference {
            __typename
            ... on MediaImage {
                __typename
                id
                image {
                    ...ImageFragment
                }
            }
        }
    }
}

fragment ProductFragment on Product {
    id
    title
    vendor
    handle
    priceRange {
        minVariantPrice {
            ...MoneyFragment
        }
    }
    compareAtPriceRange {
        minVariantPrice {
            ...MoneyFragment
        }
    }
    variants(first: 20) {
        nodes {
            ...VariantFragment
        }
    }
    images(first: 50) {
        nodes {
            ...ImageFragment
        }
    }
}
query HomepageCollection ($country: CountryCode, $language: LanguageCode)
@inContext(country: $country, language: $language) {
    collection(handle: "frontpage") {
        id
        products(first: 4) {
            nodes {
                ...ProductFragment
            }
        }
    }
}
` as const;
