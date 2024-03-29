import { apolloClient } from '../../graphql';
import { GET_PRODUCTS, GET_CURRENCIES, GET_CATEGORIES, GET_ATTRIBUTES, GET_PRODUCT } from './queries';

class ProductsService {

    async getProducts() {
        try {
            const response = await apolloClient.query({ query: GET_PRODUCTS });

            if(!response || !response.data) throw new Error('No products available!!!');
            return response.data;
        } catch(error) {
            throw error;
        }
    };

    async getCurrencies() {
        try {
            const response = await apolloClient.query({ query: GET_CURRENCIES });

            if(!response || !response.data) throw new Error('No currencies available');
            return response.data;
        } catch(error) {
            throw error;
        };
    };

    async getCategories() {
        try {
            const response = await apolloClient.query({ query: GET_CATEGORIES });

            if(!response || !response.data) throw new Error('No categories available');
            return response.data;
        } catch(error) {
            throw error;
        };
    };

    async getAttributes() {
        try {
            const response = await apolloClient.query({ query: GET_ATTRIBUTES });

            if(!response || !response.data) throw new Error('No attributes available');
            return response.data;
        } catch(error) {
            throw error;
        };
    };

    async getProduct(id) {
        try {
            const response = await apolloClient.query({ query: GET_PRODUCT, variables: { id } });

            if(!response || !response.data) throw new Error('No product available');
            return response.data;
        } catch(error) {
            throw error;
        };
    };
};

export default new ProductsService();
