import { Component } from 'react';
import { BsCart2 } from 'react-icons/bs';
import './ProductsCard.css';

export default class ProductCard extends Component {

    constructor() {
        super();
        this.state = {
            mouseHovered: false,
        };
    };

    handleAddToCart() {
        console.log('PRODUCT ADDED TO CART!!!');
    };

    render() {
        return (
            <div
                className='product-card'
                onMouseEnter={() => this.setState({ mouseHovered: true })}
                onMouseLeave={() => this.setState({ mouseHovered: false })}
            >
                <div className="image-section">

                    <img
                        className={`product-image ${this.props.outOfStock ? 'half-opacity' : ''}`}
                        src={this.props.productImage}
                        alt={this.props.productName}
                    />

                    {this.props.outOfStock ? (
                        <h2 className="out-of-stock">
                            OUT OF STOCK
                        </h2>
                    ) : this.state.mouseHovered && (
                        <button 
                            className='add-to-cart-button'
                            onClick={this.handleAddToCart}
                        >
                            <BsCart2 />
                        </button>
                    )}

                </div>
                
                <h2 className='product-name' >{this.props.productName}</h2>
                <h3 className='currency-price' >
                    {this.props.currencySymbol}{this.props.price}
                </h3>
            </div>
        );
    };
};
