import { Component } from 'react';

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
                        activeCurrency,
                        handleCategoryChange,
                        handleCurrencyChange,
                    } = productsProps;

                    return (
                        <CartConsumer>
                            {(cartProps) => {

                                const { productsInCart } = cartProps;

                                return (

                                    <header>
                                        <nav>
                                            {categories && (
                                                <ul className="categories">
                                                    {categories.map((category, index) => (
                                                        <li key={index} onClick={() => handleCategoryChange(category.name)} >
                                                            {category.name}
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

                                                <MiniCart productsInCart={productsInCart} />

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
