import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { Products, Cart, Product } from './pages';

export const CartContext = React.createContext(); 

export default class App extends Component {

	render() {
		return (
			<>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path='/:category?' element={<Products/>} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/products/:category/:id' element={<Product />} />
					</Routes>
				</BrowserRouter>
			</>
		);
	};
};
