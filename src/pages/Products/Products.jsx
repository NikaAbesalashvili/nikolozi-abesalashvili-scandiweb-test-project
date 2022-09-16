import { Component } from 'react';
import { ProductsContext } from '../../context';
import { ProductCard } from '../../components';

import './Products.css';

export default class Products extends Component {
    render() {

        const {
            products,
            selectedCategory,
            activeCurrency,
        } = this.context;

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
                                        productName={product.name}
                                        productImage={product.gallery[0]}
                                        outOfStock={product.inStock}
                                        currencySymbol={product.prices[activeCurrency].currency.symbol}
                                        price={product.prices[activeCurrency].amount}
                                        key={product.id}

                                    />
                                )
                            ) : (
                                <ProductCard
                                    productName={product.name}
                                    productImage={product.gallery[0]}
                                    outOfStock={product.inStock}
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
    };
};

Products.contextType = ProductsContext;
