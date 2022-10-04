import { Component } from 'react';
import { ProductsConsumer, CartConsumer } from '../../context';
import { BsCart2 } from 'react-icons/bs';

import './ProductsCard.css';
import { Navigate } from 'react-router-dom';

export default class ProductCard extends Component {

    constructor() {
        super();
        this.state = {
            mouseHovered: false,
            productClicked: false,
        };

        this.handleProductOpen = this.handleProductOpen.bind(this)
    };

    handleProductOpen() {
        this.setState({ productClicked: !this.state.productClicked })
    };

    render() {
        return (

            <ProductsConsumer>
                {(productsProps) => {
                    
                    const { selectedCategory } = productsProps;

                    return (
                        <CartConsumer>
                            {(cartProps) => {
                                
                                const { handleAddProductToCart } = cartProps;
                                const { id, inStock, gallery, name, brand } = this.props.product;


                                return (
                                    <div
                                        className='product-card'
                                        onClick={this.handleProductOpen}
                                        onMouseEnter={() => this.setState({ mouseHovered: true })}
                                        onMouseLeave={() => this.setState({ mouseHovered: false })}
                                    >
                                        {this.state.productClicked && <Navigate to={`/products/${selectedCategory}/${id}`} />}
                                        <div className="image-section">

                                            <img
                                                className={`product-image ${!inStock ? 'half-opacity' : ''}`}
                                                src={gallery[0]}
                                                alt={name}
                                            />


                                            {!inStock ? (
                                                <h2 className="out-of-stock">
                                                    OUT OF STOCK
                                                </h2>
                                            ) : this.state.mouseHovered && (
                                                <button 
                                                    className='add-to-cart-button'
                                                    onClick={(event) => handleAddProductToCart(event, this.props.product)}
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
                            }}
                        </CartConsumer>
                    )
                }}
            </ProductsConsumer>

        );
    };
};
