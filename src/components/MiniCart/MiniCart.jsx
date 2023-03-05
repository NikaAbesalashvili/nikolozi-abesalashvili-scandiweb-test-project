import { Component, createRef } from "react";
import { Link } from 'react-router-dom';
import CartProduct from '../CartProduct/CartProduct';

import './MiniCart.css';
import { BsCart2 } from 'react-icons/bs';


export default class MiniCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            miniCartOpened: false,
        };

        this.wrapperRef = createRef();
        this.miniCartButtonRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleCartOpen = this.handleCartOpen.bind(this);
        this.handleMiniCartRedirect = this.handleMiniCartRedirect.bind(this);
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    };

    handleClickOutside(event) {
        if((this.wrapperRef && !this.wrapperRef.current?.contains(event.target)) || (this.state.miniCartOpened && this.miniCartButtonRef.current.contains(event.target))) {
            this.setState({ miniCartOpened: false });
            document.body.style.overflow = 'auto';
        };
    };

    handleCartOpen() {
        this.setState({ miniCartOpened: !this.state.miniCartOpened });
        document.body.style.overflow = 'hidden';
    };

    handleMiniCartRedirect() {
        this.setState({ miniCartOpened: false });
        document.body.style.overflow = 'auto';
    };

    render() {
        const { productsInCart, totalPrice, currencySymbol } = this.props;

        return (


            <div className="mini-cart">
                
                <button
                    className='cart-button'
                    onClick={this.handleCartOpen}
                    ref={this.miniCartButtonRef}
                >
                        <BsCart2/>
                </button>
                                                    
                {this.state.miniCartOpened && (
                    <div className="mini-cart-box" >
                        <div className="mini-cart-products" ref={this.wrapperRef} >
                        
                            {productsInCart && productsInCart.map((productInCart) => (
                                <CartProduct
                                    variant='small'
                                    product={productInCart}
                                    key={productInCart.id}
                                />
                            ))}

                            {totalPrice > 0 && (
                                <div className="total-price-container" >
                                    <span className="text-span" >Total</span>
                                    <span className="value-span" >
                                        {currencySymbol}{`${totalPrice}`.slice(0, `${totalPrice}`.indexOf('.') + 3)}
                                    </span>
                                </div>
                            )}

                            <div className="cart-buttons">
                                <Link
                                    to='/cart'
                                    className='to-cart-link'
                                    onClick={this.handleMiniCartRedirect}
                                >
                                    VIEW BAG
                                </Link>
                                
                                <button className='check-out-button' >CHECK OUT</button>

                            </div>

                        </div>
                    </div>
                )}
            </div>
        );
    };
};
