import { Component } from "react";
import { ProductsConsumer, CartConsumer } from "../../context";
import { CartProduct } from '../../components';

import './Cart.css';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taxPrice: 0,
            quantity: 0,
            totalPrice: 0,
        }

    };

    render() {
        return (
            <ProductsConsumer>
                {(productsProps) => {
                    const { currencySymbol } = productsProps;

                    return (
                    <CartConsumer>
                        
                        {(cartProps) => {
                            
                            const {
                                productsInCart,
                                taxPrice,
                                quantity,
                                totalPrice,
                            } = cartProps;
                            
                            return (
                                <section className="cart-section">
                                <h1 className="cart-title" >CART</h1>
                
                                <div className="products">
                                    {productsInCart.length > 0 ? productsInCart.map((product, index) => (
                                        product.amount > 0 && (
                                            <CartProduct noBorders={false} product={product} key={index} />
                                        )
                                    )) : (
                                        <h2 className="no-pruducts-in-cart" >NO PRODUCTS IN CART</h2>
                                    )}
                                </div>
                
                                {productsInCart.length > 0 && (
                
                                    <div className="cart-info">
                                        <h6 className="tax" >Tax 21%: <span className="cart-span" >{currencySymbol}{ `${taxPrice}`.includes('.') ?  `${taxPrice}`.slice(0, `${taxPrice}`.indexOf('.') + 3) : taxPrice}</span></h6>
                                        <h6 className="quantity" >Quantity: <span className="cart-span" >{quantity}</span></h6>
                                        <h6 className="total" >Total: <span className="cart-span" >{currencySymbol}{`${totalPrice}`.includes('.') ? `${totalPrice}`.slice(0, `${totalPrice}`.indexOf('.') + 3) : totalPrice}</span></h6>
                                        <button className="order-button" >ORDER</button>
                                    </div>
                
                                )}
                
                            </section>
                            );
                        }}
                    </CartConsumer>
                    );
                }}
            </ProductsConsumer>
        );
    };
};
