import React, { Component } from 'react';
import { ProductsService } from '../services';

export const ProductsContext = React.createContext();

export class ProductsProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
			categories: [],
			currencies: [],
            products: [],
			currencySymbol: '$',
			activeCurrency: 0,
			selectedCategory: 'all'
        };

		this.fetchCategories = this.fetchCategories.bind(this)
		this.fetchCurrencies = this.fetchCurrencies.bind(this)
		this.fetchProducts = this.fetchProducts.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
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

	async fetchProducts() {
		const apiProducts = await ProductsService.getProducts()
			.catch((error) => {
				console.log(error);
			});
		const { products } = apiProducts.category;
		this.setState({ products });
	};

	handleCategoryChange(newCategory) {
        this.setState({ selectedCategory: newCategory });
    };

    handleCurrencyChange(newCurrency) {
		this.setState({ activeCurrency: newCurrency, currencySymbol: this.state.currencies[newCurrency].symbol });
	};

    componentDidMount() {
		this.fetchCategories();
		this.fetchCurrencies();
		this.fetchProducts();
	};

    render() {

        const { categories, currencies, products, currencySymbol, activeCurrency, selectedCategory } = this.state;
        const { handleCategoryChange, handleCurrencyChange } = this;

		return (
            <ProductsContext.Provider 
                value={{
					categories,
					currencies,
                    products,
                    currencySymbol,
                    activeCurrency,
                    selectedCategory,
                    handleCategoryChange,
                    handleCurrencyChange,
                }} 
            >
                {this.props.children}
            </ProductsContext.Provider>
        );
    };
};
