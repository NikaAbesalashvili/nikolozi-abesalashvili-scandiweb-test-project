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
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleCartOpen = this.handleCartOpen.bind(this);
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    };

    handleClickOutside(event) {
        if((this.wrapperRef && !this.wrapperRef.current?.contains(event.target))) {
            this.setState({ miniCartOpened: false });
        };
    };

    handleCartOpen() {
        this.setState({ miniCartOpened: !this.state.miniCartOpened });
    };

    render() {
        const { productsInCart } = this.props;

        return (


            <div className="mini-cart">
                
                <button
                    className='cart-button'
                    onClick={this.handleCartOpen}
                >
                        <BsCart2/>
                </button>
                                                    
                {this.state.miniCartOpened && (
                    <div className="mini-cart-box" >
                        <div className="mini-cart-products" ref={this.wrapperRef} >
                        
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
        );
    };
};
