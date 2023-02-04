import { Component } from 'react';
import { ProductsConsumer } from '../../context';
import { ProductCard } from '../../components';

import './Products.css';

export default class Products extends Component {

    componentDidUpdate() {
        console.log('COMPONENT UPDATED');
    };

    render() {

        return (
            <ProductsConsumer>

                {(productsProps) => {
                    
                    const {
                        products,
                        selectedCategory,
                        activeCurrency,
                    } = productsProps

                    return (
                        products.length > 1 && (
                            <section className="products-section">
                                <h1 className="category-name">
                                    {selectedCategory}
                                </h1>
                                <div className="products-box">
                                    {products.map((product) => (
                                        selectedCategory !== 'all' ? (
                                            selectedCategory === product.category && (
            
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
                            </section>
                        )
                    );
                }}
            </ProductsConsumer>
        );
    };
};
