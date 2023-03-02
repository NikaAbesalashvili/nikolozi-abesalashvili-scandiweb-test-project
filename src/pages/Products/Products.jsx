import { Component } from 'react';
import { ProductsConsumer } from '../../context';
import { ProductCard, Filter } from '../../components';

import './Products.css';

export default class Products extends Component {

    render() {

        return (
            <ProductsConsumer>

                {(productsProps) => {
                    
                    const {
                        products,
                        categories,
                        attributes,
                        selectedCategoryIndex,
                        activeCurrency,
                    } = productsProps

                    return (
                        products.length > 1 && (
                            <section className="products-section">
                                <h1 className="category-name">
                                    {categories[selectedCategoryIndex].name}
                                </h1>

                                <div className="filter-and-products">
                                    <Filter attributes={attributes[selectedCategoryIndex]} />

                                    <div className="products-box">
                                        {products.map((product) => (
                                            categories[selectedCategoryIndex].name !== 'all' ? (
                                                categories[selectedCategoryIndex].name === product.category && (
                
                                                    <ProductCard
                                                        product={product}
                                                        currencySymbol={product.prices[activeCurrency].currency.symbol}
                                                        price={product.prices[activeCurrency].amount}
                                                        key={product.id}
                
                                                    />
                                                )
                                            ) : (
                                                <ProductCard
                                                    product={product}
                                                    currencySymbol={product.prices[activeCurrency].currency.symbol}
                                                    price={product.prices[activeCurrency].amount}
                                                    key={product.id}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>

                            </section>
                        )
                    );
                }}
            </ProductsConsumer>
        );
    };
};
