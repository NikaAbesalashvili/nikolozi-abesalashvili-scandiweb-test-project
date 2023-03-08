export const filterProducts = (products, attributes, category) => {

    let newProducts = products;

    if(attributes && Object.keys(attributes).length > 0) {
        newProducts = newProducts.filter((product) => {
            return product.attributes?.length > 0 && product.attributes.some(attribute => attribute.id.split(' ').join("_") in attributes);
        });
    }

    if(category !== 'all' && category !== '') {
        newProducts = newProducts.filter((product) => {
            if(product.category === category) {
                console.log('HERE');
                return product;
            }
        });
    }

    return newProducts;
};