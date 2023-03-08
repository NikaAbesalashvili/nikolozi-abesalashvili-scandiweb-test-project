import { Component } from "react";
import { CartConsumer, ProductsConsumer } from '../../context';

import './MiniCartProduct.css';

export default class MiniCartProduct extends Component {
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
                {(productProps) => {

                    const {
                        activeCurrency,
                        currencySymbol,
                    } = productProps;

                    return (
                        <CartConsumer>
                            {(cartProps) => {

                                const {
                                    handleAttributeChange,
                                    decreaseProductAmount,
                                    increaseProductAmount,
                                } = cartProps;

                                return (
                                    <div className="mini-cart-product">
                                        <div className="mini-cart-product-description">
                                            <h3 className="mini-cart-product-brand" >{brand}</h3>
                                            <h4 className="mini-cart-product-name" >{name}</h4>
                                            <h5 className="mini-cart-product-price" >{currencySymbol}{prices[activeCurrency].amount}</h5>
                                        
                                            {attributes && (
                                                <div className="mini-cart-product-attributes">
                        
                                                    {attributes.map((attribute, index) => (
                                                        <div className="mini-cart-product-attribute" key={attribute.id} >
                                                            <h5 className="mini-cart-product-attribute-name">{attribute.id}:</h5>
                                                            <div className="mini-cart-product-attribute-items">
                                                                
                                                                {attribute.items.map((item) => (
                                                                    <span
                                                                        className={`mini-cart-product-attribute-item ${attribute.id !== 'Color' ? 'mini-cart-product-not-color-attribute' : 'mini-cart-product-color-attribute'} ${selectedAttributes[attribute.id] === item.displayValue ? attribute.id !== 'Color' ? 'mini-cart-product-selected-attribute' : 'mini-cart-product-selected-color-attribute' : ''}`}
                                                                        key={item.id}
                                                                        style={{ backgroundColor: attribute.id !== 'Color' ? '': item.value}}
                                                                        onClick={() => handleAttributeChange(id, selectedAttributes, { ...selectedAttributes, [attribute.id]: item.displayValue})}
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

                                        <div className="amount-and-image">
                                            <div className="mini-cart-product-amount-controller">
                                                <span onClick={() => increaseProductAmount(id, selectedAttributes)} className="amount-controller-span" >+</span>
                                                <span className="product-amount" >{amount}</span>
                                                <span onClick={() => decreaseProductAmount(id, selectedAttributes)} className="amount-controller-span" >-</span>
                                            </div>
                                            <img className="mini-cart-product-image" src={gallery[0]} alt={name} />                          
                                        </div>
                                    </div>
                                )
                            }}
                        </CartConsumer>
                    )
                }}
            </ProductsConsumer>
        );
    };
};
