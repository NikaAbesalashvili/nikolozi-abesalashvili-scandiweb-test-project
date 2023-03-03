export const filterProductsByAttributes = (products, attributes) => {

    return Object.keys(attributes) === 0 ? products : products.filter((product) => {

        return product.attributes?.length > 0 && product.attributes.some(attribute => attribute.id in attributes);
    });
};