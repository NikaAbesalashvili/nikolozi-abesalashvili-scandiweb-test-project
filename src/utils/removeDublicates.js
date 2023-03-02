export const removeDublicates = (array) => {
    const filteredArray = [];

    array.map((category) => {

        let temporaryAttributes = {
            name: category.name,
            attributes: []
        };

        let stringifiedAttributes = [];

        category.products.map((product) => {

            product.attributes.map((attribute) => {

                if(!stringifiedAttributes.includes(JSON.stringify(attribute))) {
                    temporaryAttributes.attributes.push(attribute);
                }
    
                stringifiedAttributes.push(JSON.stringify(attribute));

                return null;
            });

            return null;
        });

        filteredArray.push(temporaryAttributes);

        return null;
    });
    return filteredArray;
};
