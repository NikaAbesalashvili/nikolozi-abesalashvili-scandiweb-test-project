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

export const GET_ATTRIBUTES = gql`
    query Attributes {
        categories {
            name
            products {
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }
`

export const GET_PRODUCT = gql`
    query Product($id: String!) {
        product(id: $id) {
            id
            name
            inStock
            gallery
            description
            attributes {
                id
                name
                type
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
`;
