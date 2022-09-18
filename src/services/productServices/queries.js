import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query Categories {
        category {
            name
            products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                    id
                    items {
                        id
                        displayValue
                        value
                    }
                }
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
                brand
            }
        }
    }
`;

export const GET_CURRENCIES = gql`
    query Currencies {
		currencies {
			label
			symbol
		}
	}
`;

export const GET_CATEGORIES = gql`
    query Category {
        categories {
            name
        }
    }
`;
