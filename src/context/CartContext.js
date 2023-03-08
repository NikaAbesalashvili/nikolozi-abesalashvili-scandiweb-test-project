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

        let newProducts = this.state.productsInCart;
        let localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));

        if(!selectedAttributes) {
            let cartProductToAdd = {
                ...product,
                selectedAttributes: product.attributes.reduce((defaultAttributes, attribute) => ({...defaultAttributes, [attribute.id]: attribute.items[0].value }), {}),
                amount: 1
            }

            if(this.state.productsInCart.every((cartProduct) => cartProduct.id !== cartProductToAdd.id)) {
                newProducts = [
                    ...this.state.productsInCart,
                    cartProductToAdd
                ];
            }

        } else {
            const isAcceptable = newProducts.every((cartProduct) => {
                return (
                    (cartProduct.id === product.id && JSON.stringify(cartProduct.selectedAttributes) !== JSON.stringify(selectedAttributes)) ||
                    (cartProduct.id !== product.id)
                );
            });

            if(!newProducts.length || isAcceptable) {
                newProducts = [
                    ...newProducts,
                    {
                        ...product,
                        selectedAttributes,
                        amount: 1,
                    }
                ]
            }
        }

        if(newProducts !== this.state.productsInCart) {
            let newTotalPrice = this.state.totalPrice + product.prices[localStorageData.activeCurrency].amount;
            let newQuantity = this.state.quantity + 1;

            this.setState({
                productsInCart: newProducts,
                totalPrice: newTotalPrice,
                taxPrice: newTotalPrice * 21 / 100,
                quantity: newQuantity,
            });

            localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
                ...localStorageData,
                productsInCart: newProducts,
                totalPrice: newTotalPrice,
                
            }))
        }

    };

    handleAttributeChange(productId, previousAttributes, newAttributes) {
        let newProducts = this.state.productsInCart;

        const productToMerge = newProducts.find((productInCart) => {
            return productInCart.id === productId && JSON.stringify(productInCart.selectedAttributes) === JSON.stringify(newAttributes);
        });


        if(productToMerge) {
            newProducts = newProducts.map((productInCart) => {
                if(productInCart.id === productId && JSON.stringify(productInCart.selectedAttributes) === JSON.stringify(newAttributes)) {
                    let productToChangeAmount = newProducts.find((product) => {
                        if(product.id === productId && JSON.stringify(product.selectedAttributes) === JSON.stringify(previousAttributes)) {
                            return product
                        }
                    });

                    console.log('CHANGING AMOUNT');

                    return {
                        ...productInCart,
                        amount: productInCart.amount + productToChangeAmount.amount,
                    }
                }
                return productInCart;
            }).filter((productInCart) => {
                if(
                    (productInCart.id !== productId) ||
                    (productInCart.id === productId && JSON.stringify(productInCart.selectedAttributes) !== JSON.stringify(previousAttributes)) ||
                    (productInCart.id === productId && (JSON.stringify(productInCart.selectedAttributes) !== JSON.stringify(previousAttributes) && JSON.stringify(productInCart.selectedAttributes) !== JSON.stringify(newAttributes)))
                ) {
                    return productInCart;
                }
            });
        } else {
            newProducts = newProducts.map((productInCart) => {
                if(productInCart.id === productId && JSON.stringify(productInCart.selectedAttributes) === JSON.stringify(previousAttributes)) {
                    return {
                        ...productInCart,
                        selectedAttributes: newAttributes,
                    }
                }
                return productInCart;
            });
        }

        this.setState({ productsInCart: newProducts });

        const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
        
        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
            productsInCart: newProducts,
        }));
    };

    decreaseProductAmount(productId, selectedAttributes) {

        let newProducts = this.state.productsInCart;

        const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));

        const newTotalPrice = newProducts.reduce((newTotal, productInCart) => {
            return newTotal + (productInCart.prices[localStorageData.activeCurrency].amount * productInCart.amount)
        }, 0) - newProducts.find((product) => product.id === productId).prices[localStorageData.activeCurrency].amount;

        newProducts = newProducts.map((productInCart) => {
            if(productInCart.id === productId && JSON.stringify(productInCart.selectedAttributes) === JSON.stringify(selectedAttributes)) {
                return {
                    ...productInCart,
                    amount: productInCart.amount - 1,
                }
            }
            return productInCart;
        }).filter((productInCart) => {
            if(productInCart.amount > 0) return productInCart;
        });

        this.setState({
            productsInCart: newProducts,
            taxPrice: newTotalPrice * 21 / 100,
            totalPrice: newTotalPrice,
            quantity: this.state.quantity - 1
        });

        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
            totalPrice: newTotalPrice,
            productsInCart: newProducts,
        }));
    };

    increaseProductAmount(productId, selectedAttributes) {
        let newProducts = this.state.productsInCart;
        const quantity = this.state.quantity;

        const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));

        const newTotalPrice = newProducts.reduce((newTotal, productInCart) => {
            return newTotal + (productInCart.prices[localStorageData.activeCurrency].amount * productInCart.amount)
        }, 0) + newProducts.find((product) => product.id === productId).prices[localStorageData.activeCurrency].amount;

        
        newProducts = newProducts.map((productInCart) => {
            if(productInCart.id === productId && JSON.stringify(productInCart.selectedAttributes) === JSON.stringify(selectedAttributes)) {
                return {
                    ...productInCart,
                    amount: productInCart.amount + 1,
                }
            }
            return productInCart;
        });

        this.setState({
            productsInCart: newProducts,
            taxPrice: newTotalPrice * 21 / 100,
            totalPrice: newTotalPrice,
            quantity: quantity + 1,
        });

        localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
            ...localStorageData,
            totalPrice: newTotalPrice,
            productsInCart: newProducts,
        }));
    };

    componentDidUpdate(prevProps, prevState) {
        const localStorageData = localStorage.getItem(LOCAL_STORAGE_PREFIX);
        if(localStorageData && JSON.parse(localStorageData).totalPrice) {
            const parsedLocalStorageData = JSON.parse(localStorageData);

            if(prevState.totalPrice !== parsedLocalStorageData.totalPrice) {
                this.setState({
                    taxPrice: parsedLocalStorageData.totalPrice * 21 / 100,
                    totalPrice: parsedLocalStorageData.totalPrice,
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
                taxPrice: parsedLocalStorageData.totalPrice ? parsedLocalStorageData.totalPrice * 21 / 100 : 0,
                quantity: quantity > 0 ? quantity : 0,
                totalPrice: parsedLocalStorageData.totalPrice ? parsedLocalStorageData.totalPrice : 0,
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
