import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Products } from './pages';
import { Navbar } from './components';

export const CartContext = React.createContext(); 

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			products: [],
			currencySymbol: '',
			activeCurrency: 0,
			selectedCategory: 'all'
		}

		this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	};

	handleCurrencyChange(newCurrency) {
		this.setState({ activeCurrency: newCurrency });
	};

	handleCategoryChange(newCategory) {
		this.setState({ selectedCategory: newCategory });
	};


	render() {
		return (
			<>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path='/' element={<Products/>} />
					</Routes>
				</BrowserRouter>
			</>
		);
	};
};
