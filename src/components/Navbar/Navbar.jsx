import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductsConsumer, CartConsumer } from '../../context';
import Select from '../Select/Select';
import CartProduct from '../CartProduct/CartProduct';
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
                                                    
                                                    {this.state.miniCartOpened && (
                                                        <div className="mini-cart-box">
                                                            <div className="mini-cart-products">
                                                            
                                                                {productsInCart.map((productInCart) => (
                                                                    <CartProduct
                                                                        variant='small'
                                                                        product={productInCart}
                                                                        key={productInCart.id}
                                                                    />
                                                                ))}

                                                                <div className="cart-buttons">
                                                                    <Link to='/cart' className='to-cart-link'>
                                                                        VIEW BAG
                                                                    </Link>
                                                                    
                                                                    <button className='check-out-button' >CHECK OUT</button>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    )}

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
