import { Component } from 'react';
import { ProductsConsumer, CartConsumer } from '../../context';
import Select from '../Select/Select';
import { BsCart2 } from 'react-icons/bs';

import logo from '../../assets/a-logo.png';
import './Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            miniCartOpened: false,
        };

        this.handleCartOpen = this.handleCartOpen.bind(this);
    };

    handleCartOpen() {
        this.setState({ miniCartOpened: !this.state.miniCartOpened });
    };
    
    render() {

        const {
            categories,
            currencies,
            activeCurrency,
            handleCategoryChange,
            handleCurrencyChange,
        } = this.context;

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
                                            <img className='logo' src={logo} alt="logo" />
                                            <div className='cart-and-currencies' >
                                                    
                                                <Select
                                                    selectedCurrency={activeCurrency}
                                                    currencies={currencies}
                                                    handleCurrencyChange={handleCurrencyChange}
                                                />
                                                <div className="mini-cart">

                                                    <button
                                                        className='cart-button'
                                                        onClick={this.handleCartOpen}
                                                    >
                                                            <BsCart2/>
                                                    </button>
                                                    
                                                    <div className="mini-cart-box">

                                                    </div>

                                                </div>

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
