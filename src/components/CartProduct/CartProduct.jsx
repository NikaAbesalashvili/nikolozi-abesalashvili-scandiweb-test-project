import { Component } from "react";
import { ProductsConsumer, CartConsumer } from '../../context';

import './CartProduct.css';

export default class CartProduct extends Component {

    render() {

        const {
            id,
            amount,
            attributes,
            selectedAttributes,
            brand,
            gallery,
            name,
            prices,
        } = this.props.product;

        return (
            <ProductsConsumer>
                {(productsProps) => {

                    const {
                        activeCurrency,
                        currencySymbol,
                    } = productsProps;

                    return (

                        <CartConsumer>
                            {(cartProps) => {

                                const {
                                    handleAttributeChange,
                                    decreaseProductAmount,
                                    increaseProductAmount,
                                } = cartProps;

                                return (
                                    <div className={`cart-product ${this.props.variant ? 'small' : ''}`}>

                                    <div className="left-side">
                                        <h2 className="brand-name">{brand}</h2>
                                        <h3 className="product-name">{name}</h3>
                                        <h4 className="product-price">{currencySymbol}{prices[activeCurrency].amount}</h4>
                    
                                        {attributes && (
                                            <div className="attributes">
                    
                                                {attributes.map((attribute, index) => (
                                                    <div className="attribute" key={attribute.id} >
                                                        <h5 className="attribute-name">{attribute.id}:</h5>
                                                        <div className="attribute-items">
                                                            
                                                            {attribute.items.map((item) => (
                                                                <span
                                                                    className={`attribute-item ${attribute.id !== 'Color' ? 'not-color-item' : 'color'} ${selectedAttributes[index][attribute.id] === item.displayValue ? attribute.id !== 'Color' ? 'selected' : 'selected-color' : ''}`}
                                                                    key={item.id}
                                                                    style={{ backgroundColor: attribute.id !== 'Color' ? '': item.value}}
                                                                    onClick={() => handleAttributeChange(id, index, attribute.id, item.displayValue)}
                                                                >
                                                                    {attribute.id !== 'Color' && item.displayValue}
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
                            }}
                        </CartConsumer>
                    );
                }}
            </ProductsConsumer>
        );
    };
};
