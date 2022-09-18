import { Component } from 'react';
import { CartContext } from '../../context';
import { BsCart2 } from 'react-icons/bs';

import './ProductsCard.css';

export default class ProductCard extends Component {

    constructor() {
        super();
        this.state = {
            mouseHovered: false,
        };
    };

    render() {

        const { inStock, gallery, name, brand } = this.props.product;
        const {
            handleAddProductToCart,
        } = this.context;

        return (
            <div
                className='product-card'
                onMouseEnter={() => this.setState({ mouseHovered: true })}
                onMouseLeave={() => this.setState({ mouseHovered: false })}
            >
                <div className="image-section">

                    <img
                        className={`product-image ${inStock ? 'half-opacity' : ''}`}
                        src={gallery[0]}
                        alt={name}
                    />

                    {inStock ? (
                        <h2 className="out-of-stock">
                            OUT OF STOCK
                        </h2>
                    ) : this.state.mouseHovered && (
                        <button 
                            className='add-to-cart-button'
                            onClick={() => handleAddProductToCart(this.props.product)}
                        >
                            <BsCart2 />
                        </button>
                    )}

                </div>
                
                <h2 className='product-name'>{brand} {name}</h2>
                <h3 className='currency-price' >
                    {this.props.currencySymbol}{this.props.price}
                </h3>
            </div>
        );
    };
};

ProductCard.contextType = CartContext;
