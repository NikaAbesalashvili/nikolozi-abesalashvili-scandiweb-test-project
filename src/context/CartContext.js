import React, { Component } from 'react';
import { LOCAL_STORAGE_PREFIX } from '../constants';
import { ProductsContext } from './ProductsContext';

export const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

export class CartProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productsInCart: [],
            taxPrice: 0,
            quantity: 0,
            totalPrice: 0,
        };

        this.updateCartState = this.updateCartState.bind(this);
        this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
        this.decreaseProductAmount = this.decreaseProductAmount.bind(this);
        this.increaseProductAmount = this.increaseProductAmount.bind(this);
    };

    handleAddProductToCart(event, product) {
        event?.stopPropagation();
        const { id, brand, name, gallery, prices, attributes } = product;
        const cartProduct = {
            id,
            name,
            brand,
            gallery,
            prices,
            attributes,
            amount: 1,
        };

        if(this.state.productsInCart.every((product) => product.id !== id)) {
            const newCartState = [...this.state.productsInCart, cartProduct]

            this.setState({ productsInCart: newCartState });
            
            const { activeCurrency } = this.context;
            this.setState({ totalPrice: this.state.totalPrice += prices[activeCurrency] })

            const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));

            if(localStorageData) {
                const newLocalStorageData = [...localStorageData, cartProduct]
                localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify(newLocalStorageData));
            } else {
                localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify(newCartState));
            };
        };
    };

    decreaseProductAmount(productId) {
        let newProducts = this.state.productsInCart;
        
        for(let product of newProducts) {
            if(product.id === productId) {
                product.amount -= 1;
                if(product.amount === 0) {
                    newProducts = newProducts.filter((product) => {
                        return product.id !== productId;
                    });
                }
                break;
            }
        };

        this.setState({ productsInCart: newProducts });
        localStorage.removeItem(LOCAL_STORAGE_PREFIX)
        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify(newProducts));
        this.updateCartState();
    };

    increaseProductAmount(productId) {
        const newProducts = this.state.productsInCart;
        
        for(let product of newProducts) {
            if(product.id === productId) {
                product.amount += 1;
                break;
            }
        };

        this.setState({ productsInCart: newProducts });
        localStorage.removeItem(LOCAL_STORAGE_PREFIX)
        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify(newProducts));
        this.updateCartState();
    };

    updateCartState() {
        const localStorageData = localStorage.getItem(LOCAL_STORAGE_PREFIX);

        if(localStorageData && localStorageData.cartProducts) {
            this.setState({ productsInCart: localStorageData.cartProducts });

            const { activeCurrency } = this.context;
            let quantity = 0;
            let totalPrice = 0;

            for(let product of JSON.parse(localStorageData)) {
                quantity += product.amount;
                totalPrice += product.prices[activeCurrency].amount * product.amount;
            };

            this.setState({ quantity });
            this.setState({ totalPrice });
            this.setState({ taxPrice: totalPrice * 21 / 100 });
        };
    };

    componentDidMount() {
        this.updateCartState();
    };

    render() {
        const {
                productsInCart,
                taxPrice,
                quantity,
                totalPrice,
        } = this.state;
        const {
            handleAddProductToCart,
            decreaseProductAmount,
            increaseProductAmount,
        } = this;

        const { currencySymbol } = this.context;
        
        return (
            <CartContext.Provider
                value={{
                    currencySymbol,
                    productsInCart,
                    taxPrice,
                    quantity,
                    totalPrice,
                    handleAddProductToCart,
                    decreaseProductAmount,
                    increaseProductAmount,
                }}
            >
                {this.props.children}
            </CartContext.Provider>
        );
    };
};

CartProvider.contextType = ProductsContext
