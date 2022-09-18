import { Component } from "react";
import { CartContext } from "../../context";
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

        const {
            productsInCart,
            taxPrice,
            quantity,
            totalPrice,
            activeCurrency,
        } = this.context;

        return (
            <section className="cart-section">
                <h1 className="cart-title" >CART</h1>

                <div className="products">
                    {productsInCart.map((product) => (
                        product.amount > 0 && (
                            <CartProduct product={product} key={product.id} />
                        )
                    ))}
                </div>

                {productsInCart.length > 0 && (

                    <div className="cart-info">
                        <h6 className="tax" >Tax 21%: <span className="cart-span" >{productsInCart[0].prices[activeCurrency].currency.symbol}{ `${taxPrice}`.includes('.') ?  `${taxPrice}`.slice(0, `${taxPrice}`.indexOf('.') + 3) : taxPrice}</span></h6>
                        <h6 className="quantity" >Quantity: <span className="cart-span" >{quantity}</span></h6>
                        <h6 className="total" >Total: <span className="cart-span" >{productsInCart[0].prices[activeCurrency].currency.symbol}{`${totalPrice}`.includes('.') ? `${totalPrice}`.slice(0, `${totalPrice}`.indexOf('.') + 3) : totalPrice}</span></h6>
                        <button className="order-button" >ORDER</button>
                    </div>

                )}

            </section>
        );
    };
};

Cart.contextType = CartContext;
