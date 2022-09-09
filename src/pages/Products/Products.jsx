import { Component } from 'react';
import { ProductCard } from '../../components';
import './Products.css';

export default class Products extends Component {

    render() {
        return (
            this.props.products.length > 1 && (
                <section className="products-section">
                    <h1 className="category-name">
                        {this.props.categoryName}
                    </h1>
                    <div className="products-box">
                        {this.props.products.map((product) => (
                            this.props.categoryName !== 'all' ? (
                                this.props.categoryName === product.category && (

                                    <ProductCard
                                        productName={product.name}
                                        productImage={product.gallery[0]}
                                        outOfStock={product.inStock}
                                        currencySymbol={product.prices[this.props.activeCurrency].currency.symbol}
                                        price={product.prices[this.props.activeCurrency].amount}
                                        key={product.id}

                                    />
                                )
                            ) : (
                                <ProductCard
                                    productName={product.name}
                                    productImage={product.gallery[0]}
                                    outOfStock={product.inStock}
                                    currencySymbol={product.prices[this.props.activeCurrency].currency.symbol}
                                    price={product.prices[this.props.activeCurrency].amount}
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
