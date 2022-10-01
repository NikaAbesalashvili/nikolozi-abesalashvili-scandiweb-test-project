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

        this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
        this.decreaseProductAmount = this.decreaseProductAmount.bind(this);
        this.increaseProductAmount = this.increaseProductAmount.bind(this);
    };

    handleAddProductToCart(event, product) {
        event.stopPropagation();

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

        if(this.state.productsInCart.length < 1) {
            this.setState({ productsInCart: [cartProduct] });
            
            const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
            
            const price = cartProduct.prices[localStorageData.activeCurrency].amount;

            localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
                totalAmount: price,
                productsInCart: [cartProduct],
            }));
        } else {
            if(this.state.productsInCart.every((product) => product.id !== cartProduct.id)) {
                const newProducts = [...this.state.productsInCart, cartProduct];

                this.setState({ productsInCart: newProducts });
                const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));

                localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
                    ...localStorageData,
                    totalAmount: localStorageData.totalAmount + cartProduct.prices[localStorageData.activeCurrency].amount,
                    productsInCart: this.state.productsInCart,
                }));
            };
        };
    };

    decreaseProductAmount(productId) {
        let newProducts = this.state.productsInCart;
        const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
        
        const productPrice = newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].prices[localStorageData.activeCurrency].amount;
        
        if(newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].amount === 1) {
            newProducts = newProducts.filter((product) => product.id !== productId);
        } else {
            newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].amount -= 1;
        }

        this.setState({ productsInCart: newProducts });
        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
            totalAmount: localStorageData.totalAmount - productPrice,
            productsInCart: newProducts,
        }));
    };

    increaseProductAmount(productId) {
        const newProducts = this.state.productsInCart;
        const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
        
        const productPrice =  newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].prices[localStorageData.activeCurrency].amount;

        newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].amount += 1;
        
        this.setState({ productsInCart: newProducts });
        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
            totalAmount: localStorageData.totalAmount + productPrice,
            productsInCart: newProducts,
        }));
    };


    componentDidMount() {
        const localStorageData = localStorage.getItem(LOCAL_STORAGE_PREFIX);
        if(localStorageData) {
            const parsedLocalStorageData = JSON.parse(localStorageData);
            this.setState({ productsInCart: parsedLocalStorageData.productsInCart })
        }
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
