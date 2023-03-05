import { Component } from 'react';
import { Link } from 'react-router-dom';

import { ProductsConsumer, CartConsumer } from '../../context';
import Select from '../Select/Select';
import MiniCart from '../MiniCart/MiniCart';

import logo from '../../assets/a-logo.png';
import './Navbar.css';

export default class Navbar extends Component {

    render() {

        return (
            <ProductsConsumer>
                {(productsProps) => {

                    const {
                        categories,
                        currencies,
                        currencySymbol,
                        activeCurrency,
                        handleCategoryChange,
                        handleCurrencyChange,
                    } = productsProps;

                    return (
                        <CartConsumer>
                            {(cartProps) => {

                                const {
                                    productsInCart,
                                    totalPrice,
                                    quantity,
                                } = cartProps;

                                return (

                                    <header>
                                        <nav>
                                            {categories && (
                                                <ul className="categories">
                                                    {categories.map((category, index) => (
                                                        <li key={index} >
                                                            <Link
                                                                to={category.name === 'all' ? '/' : `/${category.name}`}
                                                                onClick={() => handleCategoryChange(index)}
                                                            >
                                                                {category.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <img
                                                className='logo'
                                                src={logo}
                                                alt="Logo"
                                            />
                                            
                                            <div className='cart-and-currencies' >
                                                    
                                                <Select
                                                    selectedCurrency={activeCurrency}
                                                    currencies={currencies}
                                                    handleCurrencyChange={handleCurrencyChange}
                                                />

                                                <MiniCart
                                                    productsInCart={productsInCart}
                                                    totalPrice={totalPrice}
                                                    currencySymbol={currencySymbol}
                                                    quantity={quantity}
                                                />

                                            </div>

                                        </nav>
                                    </header>
                                );
                            }}
                        </CartConsumer>
                    );
                }}
            </ProductsConsumer>
        );
    };
};
