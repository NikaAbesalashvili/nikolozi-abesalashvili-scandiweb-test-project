import { Component } from "react";
import { CartContext } from '../../context';

import './CartProduct.css';

export default class CartProduct extends Component {

    constructor(props) {
        super(props);
    };

    render() {

        const {
            id,
            amount,
            attributes,
            brand,
            gallery,
            name,
            prices
        } = this.props.product;

        const {
            decreaseProductAmount,
            increaseProductAmount,
            activeCurrency,
            currencySymbol,
        } = this.context;

        return (
            <div className="cart-product">

                <div className="left-side">
                    <h2 className="brand-name">{brand}</h2>
                    <h3 className="product-name">{name}</h3>
                    <h4 className="product-price">{currencySymbol}{prices[activeCurrency].amount}</h4>

                    {attributes && (
                        <div className="attributes">

                            {attributes.map((attribute) => (
                                <div className="attribute" key={attribute.id} >
                                    <h5 className="attribute-name">{attribute.id}:</h5>
                                    <div className="attribute-items">
                                        
                                        {attribute.items.map((item) => (
                                            <span
                                                className={`attribute-item ${attribute.id !== 'Color' ? 'not-color-item' : 'color'}`}
                                                key={item.id}
                                                style={{ backgroundColor: attribute.id !== 'Color' ? '#FFF': item.value}}
                                            >
                                                {attribute.id !== 'Color' && item.value}
                                            </span>
                                        ))}
        
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                </div>


                <div className="right-side">
                    <div className="amount-controller">
                        <span className="amount-span" onClick={() => increaseProductAmount(id)} >+</span>
                        <span className="amount-number">{amount}</span>
                        <span className="amount-span" onClick={() => decreaseProductAmount(id)} >-</span>
                    </div>
                    <img src={gallery[0]} alt={name} className="product-image" />
                </div>

            </div>
        );
    };
};

CartProduct.contextType = CartContext;
