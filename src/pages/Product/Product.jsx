import { Component } from "react";
import { ProductsService } from './../../services';
import { ProductsConsumer, CartConsumer } from '../../context';

import './Product.css';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            activeImage: 0,
            selectedAttributes: [],
        };

        this.fetchProduct = this.fetchProduct.bind(this);
        this.handleAttributeSelect = this.handleAttributeSelect.bind(this);
        this.changeImage = this.changeImage.bind(this);
    };

    async fetchProduct(productId) {
        const apiResponse = await ProductsService.getProduct(productId)
            .catch((error) => {
                console.log(error);
            });
        
        const { product } = apiResponse;
        this.setState({
            product,
            selectedAttributes: product.attributes.map((attribute) => ({ [attribute.id]: attribute.items[0].displayValue })),
        });
    };

    changeImage(imageIndex) {
        this.setState({ activeImage: imageIndex });
    };

    handleAttributeSelect(attributeName, attributeValue, attributeIndex) {
        let attributes = this.state.selectedAttributes;
        attributes[attributeIndex][attributeName] = attributeValue;
        this.setState({
            selectedAttributes: {...attributes, [attributeName]: attributeValue }
        });
    };

    componentDidMount() {
        const productId = window.location.href.split('products')[1].slice(1);
        this.fetchProduct(productId);
    };

    render() {

        return (
            <ProductsConsumer>
                {(productProps) => {

                    const { activeCurrency, currencySymbol } = productProps;

                    return (
                        <CartConsumer>
                            {(cartProps) => {

                                const { handleAddProductToCart } = cartProps; 

                                return (
                                    this.state.product && (
                                        <section className="product-description-page" >
                        
                                            {this.state.product.gallery && (
                        
                                                <div className="product-gallery">
                                                    <div className="product-images">
                                                        
                                                        {this.state.product.gallery.map((productImage, index) => (
                                                            <img
                                                                className="mini-image"
                                                                alt=""
                                                                src={productImage}
                                                                key={index}
                                                                onClick={() => this.changeImage(index)}
                                                            />
                                                        ))}
                                                    </div>
                        
                                                    <img className="main-image" src={this.state.product.gallery[this.state.activeImage]} alt="" />
                                                </div>
                        
                                            )}
                        
                                            <div className="product-description">
                        
                                                <div className="brand-and-name">
                                                    <h2 className="brand">{this.state.product.brand}</h2>
                                                    <h3 className="name">{this.state.product.name}</h3>
                                                </div>
                        
                                                {this.state.product.attributes && (
                                                    <div className="attributes">
                                                        {this.state.product.attributes.map((attribute, index) => (
                                                            
                                                            <div className="attribute" key={attribute.id} >
                                                                <h5 className="attribute-name">{attribute.id}:</h5>
                                                                <div className="attribute-items">
                                                                    
                                                                    {attribute.items.map((item) => (
                                                                        <span
                                                                            className={`attribute-item ${attribute.id !== 'Color' ? 'not-color-item' : 'color'} ${this.state.selectedAttributes[index][attribute.id] === item.displayValue ? attribute.id !== 'Color' ? 'selected': 'selected-color' : ''}`}
                                                                            key={item.id}
                                                                            style={{ backgroundColor: attribute.id !== 'Color' ? 'auto': item.value}}
                                                                            onClick={() => this.handleAttributeSelect(attribute.id, item.displayValue, index)}
                                                                        >
                                                                            {attribute.id !== 'Color' && item.value}
                                                                        </span>
                                                                    ))}
                                    
                                                                </div>
                                                            </div>

                                                        ))}
                                                    </div>
                                                )}
                                                
                        
                                                {this.state.product.prices && (
                                                    <div className="price">
                                                        <h4 className="price-title">PRICE:</h4>
                                                        <h5 className="price-amount">{currencySymbol}{this.state.product.prices[activeCurrency].amount}</h5>
                                                    </div>
                                                )}

                                                {this.state.product.inStock && (
                                                    <button 
                                                        className="add-to-cart"
                                                        onClick={(event) => handleAddProductToCart(event, this.state.product, this.state.selectedAttributes)}
                                                    >
                                                        ADD TO CART
                                                    </button>
                                                )}

                                                {this.state.product.description && (
                                                    <div className="product-description" dangerouslySetInnerHTML={{ __html: this.state.product.description }} />
                                                    
                                                )}
                                            
                                            </div>
                        
                                        </section>
                                    )
                                )
                            }}
                        </CartConsumer>
                    )
                }}
            </ProductsConsumer>
        );
    };
};
