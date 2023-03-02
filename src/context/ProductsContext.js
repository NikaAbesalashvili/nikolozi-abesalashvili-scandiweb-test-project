import React, { Component } from 'react';
import { LOCAL_STORAGE_PREFIX } from '../constants';
import { ProductsService } from '../services';
import { removeDublicates } from '../utils';

export const ProductsContext = React.createContext();
export const ProductsConsumer = ProductsContext.Consumer;

export class ProductsProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
			categories: [],
			currencies: [],
			attributes: [],
			selectedAttributes: {},
            products: [],
			currencySymbol: '$',
			activeCurrency: 0,
			selectedCategoryIndex: 0,
        };

		this.fetchCategories = this.fetchCategories.bind(this);
		this.fetchCurrencies = this.fetchCurrencies.bind(this);
		this.fetchAttributes = this.fetchAttributes.bind(this);
		this.fetchProducts = this.fetchProducts.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.handleAttributeSelect = this.handleAttributeSelect.bind(this);
    };

	async fetchCategories() {
		const apiCategories = await ProductsService.getCategories()
			.catch((error) => {
				console.log(error);
			});
	
		const { categories } = apiCategories;
		this.setState({ categories });
	};

	async fetchCurrencies() {
		const apiCurrencies = await ProductsService.getCurrencies()
			.catch((error) => {
				console.log(error);
			});
		
		const { currencies } = apiCurrencies;
		
		this.setState({ currencies });
	};

	async fetchAttributes() {
		const apiAttributes = await ProductsService.getAttributes()
			.catch((error) => {
				console.log(error);
			});

		const { categories } = apiAttributes;

		this.setState({ attributes: removeDublicates(categories) });
	};

	async fetchProducts() {
		const apiProducts = await ProductsService.getProducts()
			.catch((error) => {
				console.log(error);
			});
		const { products } = apiProducts.category;
		
		this.setState({ products });
	};

	handleCategoryChange(newIndex) {
        this.setState({ selectedCategoryIndex: newIndex });

		const localStorageData = localStorage.getItem(LOCAL_STORAGE_PREFIX);

		if(localStorageData) {
			const parsedLocalStorageData = JSON.parse(localStorageData);

			localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify({
				...parsedLocalStorageData,
				selectedCategoryIndex: newIndex,
			}));
		};
    };

    handleCurrencyChange(newCurrency) {
		this.setState({
			activeCurrency: newCurrency,
			currencySymbol: this.state.currencies[newCurrency].symbol
		});

		const localStorageData = localStorage.getItem(LOCAL_STORAGE_PREFIX);
		
		if(localStorageData) {
			const parsedLocalStorageData = JSON.parse(localStorageData);
			const newLocalStorageData = {
				...parsedLocalStorageData,
				activeCurrency: newCurrency,
				currencySymbol: this.state.currencies[newCurrency].symbol,
			};
			
			if(parsedLocalStorageData.totalAmount) {
				newLocalStorageData.totalAmount = parsedLocalStorageData.productsInCart.reduce((total, product) => {
					return total + product.amount * product.prices[newCurrency].amount
				}, 0);
			}
			localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify(newLocalStorageData));
		};
	};

	handleAttributeSelect(attributeName, attributeValue) {

		if(!this.state.selectedAttributes[attributeName] || this.state.selectedAttributes[attributeName] !== attributeValue) {
			let newSelectedAttributes = {
				...this.state.selectedAttributes,
				[attributeName]: attributeValue
			};
			this.setState({ selectedAttributes: newSelectedAttributes });
		} else {
			let newSelectedAttributes = {}
			
			Object.keys(this.state.selectedAttributes).forEach((key) => {
				if(key !== attributeName) {
					newSelectedAttributes = {
						...newSelectedAttributes,
						[key]: this.state.selectedAttributes[key]
					}
				}
			});
			
			this.setState({ selectedAttributes: newSelectedAttributes });
		}
	};

    componentDidMount() {
		this.fetchCategories();
		this.fetchCurrencies();
		this.fetchAttributes();
		this.fetchProducts();

		let localStorageData = localStorage.getItem(LOCAL_STORAGE_PREFIX);

		if(localStorageData) {
			let {
				activeCurrency,
				currencySymbol,
				selectedCategory,
			} = JSON.parse(localStorageData);

			this.setState({
				activeCurrency,
				currencySymbol,
				selectedCategory,
			});
			
		} else {
			let dataToSave = {
				activeCurrency: this.state.activeCurrency,
				currencySymbol: this.state.currencySymbol,
				selectedCategory: this.state.selectedCategory,
			};

			localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify(dataToSave));
		}
	};

    render() {

        const {
			categories,
			attributes,
			currencies,
			products,
			currencySymbol,
			activeCurrency,
			selectedCategoryIndex
		} = this.state;

        const {
			handleCategoryChange,
			handleCurrencyChange,
			handleAttributeSelect,
		} = this;

		return (
            <ProductsContext.Provider 
                value={{
					categories,
					attributes,
					currencies,
                    products,
                    currencySymbol,
                    activeCurrency,
                    selectedCategoryIndex,
                    handleCategoryChange,
                    handleCurrencyChange,
					handleAttributeSelect,
                }} 
            >
                {this.props.children}
            </ProductsContext.Provider>
        );
    };
};
