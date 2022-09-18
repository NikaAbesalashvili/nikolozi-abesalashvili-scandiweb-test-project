import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { Products, Cart } from './pages';

export const CartContext = React.createContext(); 

export default class App extends Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path='/' element={<Products/>} />
						<Route path='/cart' element={<Cart />} />
					</Routes>
				</BrowserRouter>
			</>
		);
	};
};
