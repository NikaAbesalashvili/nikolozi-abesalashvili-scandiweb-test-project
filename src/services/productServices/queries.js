import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query Categories {
		category {
			name
            products {
				id
                name
                inStock
                category
                gallery
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }   
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
