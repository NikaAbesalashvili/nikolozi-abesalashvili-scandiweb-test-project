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
        this.handleAttributeChange = this.handleAttributeChange.bind(this);
        this.decreaseProductAmount = this.decreaseProductAmount.bind(this);
        this.increaseProductAmount = this.increaseProductAmount.bind(this);
    };

    handleAddProductToCart(event, product, selectedAttributes = null) {
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

        if(Object.keys(selectedAttributes || !selectedAttributes).length === 0) {
            selectedAttributes = attributes.map((attribute) => {
                return { [attribute.id]: attribute.items[0].displayValue }
            });
            cartProduct.selectedAttributes = selectedAttributes;
        } else {
            cartProduct.selectedAttributes = selectedAttributes;
        }
        
        if(this.state.productsInCart?.length < 1 || !this.state.productsInCart) {
            this.setState({ productsInCart: [cartProduct] });
            
            const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
            
            const price = cartProduct.prices[localStorageData.activeCurrency].amount;

            localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
                totalAmount: price,
                productsInCart: [cartProduct],
            }));
        } else {
            if(this.state.productsInCart?.every((product) => product.id !== cartProduct.id)) {
                const newProducts = [...this.state.productsInCart, cartProduct];

                this.setState({ productsInCart: newProducts });
                const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));

                localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
                    ...localStorageData,
                    totalAmount: localStorageData.totalAmount + cartProduct.prices[localStorageData.activeCurrency].amount,
                    productsInCart: newProducts,
                }));
            };
        };
    };

    handleAttributeChange(productId, attributeIndex, attributeName, attributeValue) {
        let products = this.state.productsInCart;
        products.find((product) => productId === product.id).selectedAttributes[attributeIndex][attributeName] = attributeValue;

        this.setState({ productsInCart: products });

        const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
            productsInCart: products,
        }));
    };

    decreaseProductAmount(productId) {
        let newProducts = this.state.productsInCart;
        const quantity = this.state.quantity;
        const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
        
        const productPrice = newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].prices[localStorageData.activeCurrency].amount;
        
        if(newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].amount === 1) {
            newProducts = newProducts.filter((product) => product.id !== productId);
        } else {
            newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].amount -= 1;
        }

        this.setState({
            productsInCart: newProducts,
            taxPrice: (localStorageData.totalAmount - productPrice) * 21 / 100,
            totalPrice: localStorageData.totalAmount - productPrice,
            quantity: quantity - 1 !== 0 ? quantity - 1 : 0,
        });

        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
            totalAmount: localStorageData.totalAmount - productPrice,
            productsInCart: newProducts,
        }));
    };

    increaseProductAmount(productId) {
        const newProducts = this.state.productsInCart;
        const quantity = this.state.quantity;
        const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
        
        const productPrice =  newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].prices[localStorageData.activeCurrency].amount;

        newProducts[newProducts.indexOf(newProducts.find((product) => product.id === productId))].amount += 1;
        
        this.setState({
            productsInCart: newProducts,
            taxPrice: (localStorageData.totalAmount + productPrice) * 21 / 100,
            totalPrice: localStorageData.totalAmount + productPrice,
            quantity: quantity + 1,
        });

        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
            totalAmount: localStorageData.totalAmount + productPrice,
            productsInCart: newProducts,
        }));
    };

    componentDidUpdate(prevProps, prevState) {
        const localStorageData = localStorage.getItem(LOCAL_STORAGE_PREFIX);
        if(localStorageData && JSON.parse(localStorageData).totalAmount) {
            const parsedLocalStorageData = JSON.parse(localStorageData);

            if(prevState.totalPrice !== parsedLocalStorageData.totalAmount) {
                this.setState({
                    taxPrice: parsedLocalStorageData.totalAmount * 21 / 100,
                    totalPrice: parsedLocalStorageData.totalAmount,
                });
            };
        };
    };

    componentDidMount() {
        const localStorageData = localStorage.getItem(LOCAL_STORAGE_PREFIX);
        if(localStorageData) {
            const parsedLocalStorageData = JSON.parse(localStorageData);
           
            let quantity = parsedLocalStorageData.productsInCart?.reduce((total, product) => {
                return total + product.amount
            }, 0);
           
            this.setState({
                productsInCart: parsedLocalStorageData.productsInCart ? parsedLocalStorageData.productsInCart : [],
                taxPrice: parsedLocalStorageData.totalAmount ? parsedLocalStorageData.totalAmount * 21 / 100 : 0,
                quantity: quantity > 0 ? quantity : 0,
                totalPrice: parsedLocalStorageData.totalAmount ? parsedLocalStorageData.totalAmount : 0,
            });
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
            handleAttributeChange,
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
                    handleAttributeChange,
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
