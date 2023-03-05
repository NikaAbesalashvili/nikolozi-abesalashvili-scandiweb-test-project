export const filterProductsByAttributes = (products, attributes) => {

    return products.filter((product) => {

        return product.attributes?.length > 0 && product.attributes.some(attribute => attribute.id.split(' ').join("_") in attributes);
    });
};